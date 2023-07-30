import asyncio
from playwright.async_api import async_playwright
import requests

Webs = {"AMAZON": "www.amazon"}


async def get_amazon_detail(context, url):
    page = await context.new_page()
    await page.goto(url)
    product = {}
    price_element = await page.query_selector('.a-offscreen')
    image_element = await page.query_selector('.a-dynamic-image')
    name_element = await page.query_selector('#productTitle')
    product["name"] = await name_element.inner_text()    
    price = await price_element.inner_text()
    price = price.replace("€", "").replace(",", ".")
    product["price"] = price
    product["image"] = await image_element.get_attribute('src')
    page.close
    return product

async def open_new_pages(context, urls):
    results = []
    async with asyncio.TaskGroup() as group:
        for url in urls:
            if Webs["AMAZON"] in url:
                result = await group.create_task(get_amazon_detail(context, url))
                results.append(result)
    return results

async def main(products):
    products_url = [product.url for product in products]
    products_id = [product.id for product in products]
    results = []
    async with async_playwright() as playwright:
        chromium = playwright.chromium
        browser = await chromium.launch()
        context = await browser.new_context()
        results = await open_new_pages(context, products_url)
        print(results)

    for product in results:
        product["product_id"] = products_id[results.index(product)]
    # Post results with product_id to server
    requests.post("http://localhost:5000/add-price-history", json=results)

    return results

if __name__ == "__main__":
    urls = ["https://www.amazon.es/Logitech-Wireless-programables-Prolongada-Compatible/dp/B07G5XJLWK", "https://www.amazon.es/Logitech-Pro-Gaming-Headset-Black/dp/B07TQ6G276"]
    asyncio.run(main(urls))