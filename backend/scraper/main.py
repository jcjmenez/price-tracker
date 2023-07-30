import asyncio
from playwright.async_api import async_playwright
from enum import Enum


Webs = {"AMAZON": "www.amazon"}


async def get_amazon_detail(context, url):
    page = await context.new_page()
    await page.goto(url)
    price_element = await page.query_selector('.a-offscreen')
    image_element = await page.query_selector('.a-dynamic-image')
    name_element = await page.query_selector('#productTitle')
    print(await price_element.inner_text())
    print(await image_element.get_attribute('src'))
    print(await name_element.inner_text())
    page.close

async def open_new_pages(context, urls):
    async with asyncio.TaskGroup() as group:
        for url in urls:
            if Webs["AMAZON"] in url:
                await group.create_task(get_amazon_detail(context, url))

async def main():
    urls = ["https://www.amazon.es/Logitech-Wireless-programables-Prolongada-Compatible/dp/B07G5XJLWK", "https://www.amazon.es/Logitech-Pro-Gaming-Headset-Black/dp/B07TQ6G276"]

    async with async_playwright() as playwright:
        chromium = playwright.chromium
        browser = await chromium.launch()
        context = await browser.new_context()
        await open_new_pages(context, urls)

if __name__ == "__main__":
    asyncio.run(main())
