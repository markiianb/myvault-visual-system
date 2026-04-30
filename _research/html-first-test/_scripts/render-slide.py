#!/usr/bin/env python3
"""Render slide/slide.html to PDF + PNG (1920×1080) via Playwright/Chromium."""

from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
HTML = ROOT / "slide" / "slide.html"
PDF_OUT = ROOT / "slide" / "slide.pdf"
PNG_OUT = ROOT / "slide" / "slide.png"


def main() -> None:
    url = HTML.resolve().as_uri()
    with sync_playwright() as p:
        browser = p.chromium.launch()

        # ---- PDF (single-page slide) ----
        page = browser.new_page()
        page.goto(url, wait_until="networkidle")
        page.emulate_media(media="print")
        # 1920px × 1080px = 20in × 11.25in @ 96dpi
        page.pdf(
            path=str(PDF_OUT),
            width="20in",
            height="11.25in",
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
            print_background=True,
            prefer_css_page_size=True,
        )
        print(f"[ok] {PDF_OUT.relative_to(ROOT)}")

        # ---- PNG at 1920×1080 ----
        screen = browser.new_page(
            viewport={"width": 1920, "height": 1080},
            device_scale_factor=1.0,
        )
        screen.goto(url, wait_until="networkidle")
        screen.locator("section.slide").screenshot(path=str(PNG_OUT))
        print(f"[ok] {PNG_OUT.relative_to(ROOT)}")

        browser.close()


if __name__ == "__main__":
    main()
