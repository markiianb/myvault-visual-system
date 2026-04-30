#!/usr/bin/env python3
"""Render social/social.html to PNG (1080×1080) via Playwright/Chromium."""

from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
HTML = ROOT / "social" / "social.html"
PNG_OUT = ROOT / "social" / "social.png"


def main() -> None:
    url = HTML.resolve().as_uri()
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(
            viewport={"width": 1080, "height": 1080},
            device_scale_factor=1.0,
        )
        page.goto(url, wait_until="networkidle")
        page.locator("section.social").screenshot(path=str(PNG_OUT))
        print(f"[ok] {PNG_OUT.relative_to(ROOT)}")
        browser.close()


if __name__ == "__main__":
    main()
