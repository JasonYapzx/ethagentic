from langchain_openai import ChatOpenAI
from browser_use import Agent
from browser_use.browser.browser import Browser, BrowserConfig
from browser_use.browser.context import BrowserContext, BrowserContextConfig
from playwright.async_api import async_playwright

import time
import os
import asyncio
import json
from dotenv import load_dotenv
load_dotenv()

async def saveCookies(website, cookiePath):
    async with async_playwright() as p:

        chrome_user_data_dir = "/Users/shaune/Library/Application Support/Google/Chrome" # Change according to your mac profile
        chrome_profile = "Profile 3"  # Change if you're using a different profile

        browser = await p.chromium.launch_persistent_context(
            user_data_dir=chrome_user_data_dir,
            channel='chrome',
            headless=False,
            args=[f"--profile-directory={chrome_profile}"]
        )

        page = await browser.new_page()

        print(f"Navigating to {website}...")
        await page.goto(website, wait_until='load')

        print("Extracting cookies...")
        cookies = await browser.cookies()

        # cookies = await context.cookies()
        print(f"Extracted: {cookies}")
        with open(cookiePath, 'w') as f:
            json.dump(cookies, f, indent=2)
        print(f"Cookies saved to {cookiePath}")
        await browser.close()


async def purchaseItem(product, website, cookiePath):
    browser = Browser(
        config=BrowserConfig(
        #     # NOTE: you need to close your chrome browser - so that this can open your browser in debug mode
            chrome_instance_path='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        )
    )

    file_path = os.path.join(os.path.dirname(__file__), cookiePath)
    config = BrowserContextConfig(
        cookies_file=file_path
    )
    context = BrowserContext(browser=browser, config=config)

    agent = Agent(
        browser_context=context,
        task=f"""
            Go to {website}, search for {product}, click on the first product, add it to cart and finally click proceed to checkout.
        """,
        llm=ChatOpenAI(model="gpt-4-turbo"),
    )
    result = await agent.run(max_steps=50)
    print(result)

async def main():
    product = "pepsi black canned 320ml"
    website = "https://www.amazon.sg/"
    cookiePath = "./website_cookie.json"

    # await saveCookies(website, cookiePath)
    await purchaseItem(product, website, cookiePath)

asyncio.run(main())