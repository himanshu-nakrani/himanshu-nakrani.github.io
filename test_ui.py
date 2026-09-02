from playwright.sync_api import sync_playwright

def test_homepage():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.on("console", lambda msg: print(f"Browser console: {msg.text}"))
        page.goto('http://localhost:5000')
        page.wait_for_timeout(3000)
        page.screenshot(path='homepage.png', full_page=True)
        print("Screenshot taken.")
        browser.close()

if __name__ == '__main__':
    test_homepage()
