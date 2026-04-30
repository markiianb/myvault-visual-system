#!/usr/bin/env python3
"""Render ebook/pages.html to PDF + per-page PNG via Playwright/Chromium."""

from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
HTML = ROOT / "ebook" / "pages.html"
PDF_OUT = ROOT / "ebook" / "pages.pdf"
PNG_DIR = ROOT / "ebook" / "pages-png"
PNG_DIR.mkdir(parents=True, exist_ok=True)


def main() -> None:
    url = HTML.resolve().as_uri()
    with sync_playwright() as p:
        browser = p.chromium.launch()
        # ---- PDF render at exact 800pt × 1200pt page geometry ----
        page = browser.new_page()
        page.goto(url, wait_until="networkidle")
        page.emulate_media(media="print")
        # 800pt × 1200pt = 11.1111in × 16.6667in
        page.pdf(
            path=str(PDF_OUT),
            width="11.1111in",
            height="16.6667in",
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
            print_background=True,
            prefer_css_page_size=True,
        )
        print(f"[ok] {PDF_OUT.relative_to(ROOT)}")

        # ---- PNG per page (screenshot at 800×1200pt = 1067×1600 px @ 96dpi) ----
        # We render each .ebook-page / .cover element directly; that gives a
        # pixel-exact image at 1.5× DPI for visual diffing against page-1.png etc.
        screenshot_page = browser.new_page(
            viewport={"width": 1067, "height": 1600},
            device_scale_factor=1.0,
        )
        screenshot_page.goto(url, wait_until="networkidle")
        # Switch to print media so paged-media @page rules apply (background paint, etc.)
        screenshot_page.emulate_media(media="print")
        # Force the screen-only flipbook styles off, so each section renders flush.
        screenshot_page.add_style_tag(content="""
          body { background: white !important; padding: 0 !important; }
          .ebook-page, .cover {
            margin: 0 !important; box-shadow: none !important;
          }
        """)

        labels = ["page-1", "page-4", "page-7"]
        selectors = ["section.cover", "section.ebook-page:nth-of-type(1)", "section.ebook-page:nth-of-type(2)"]
        # The cover is the 1st <section>; ebook-pages are 2nd and 3rd. Use index.
        sections = screenshot_page.query_selector_all("body > section")
        for label, section in zip(labels, sections):
            out = PNG_DIR / f"{label}.png"
            section.screenshot(path=str(out), scale="device")
            print(f"[ok] {out.relative_to(ROOT)}")

        browser.close()


if __name__ == "__main__":
    main()
