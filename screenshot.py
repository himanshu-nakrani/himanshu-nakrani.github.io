from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:3000/experience")
    page.wait_for_timeout(3000)
    page.screenshot(path="experience_page.png", full_page=True)
    print("Screenshot taken.")
    browser.close()
