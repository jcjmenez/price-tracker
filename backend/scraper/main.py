import asyncio
from playwright.async_api import async_playwright
import requests

Webs = {"AMAZON": "www.amazon", "BODYTONE": 'www.bodytone.eu',
         "BACKMARKET": "www.backmarket.es", "CARREFOUR": "www.carrefour.es",
         "PCCOM": "www.pccomponentes.com"}


def clean_price(price):
    return price.replace("€", "").replace(",", ".").replace("\xa0", "").strip()

# amazon.es
async def get_amazon_detail(context, url):
    page = await context.new_page()
    await page.goto(url)
    product = {}
    price_element = await page.query_selector('.a-offscreen')
    image_element = await page.query_selector('.a-dynamic-image')
    name_element = await page.query_selector('#productTitle')
    product["name"] = await name_element.inner_text()    
    price = await price_element.inner_text()
    price = clean_price(price)
    product["price"] = price
    product["image"] = await image_element.get_attribute('src')
    page.close
    return product

# bodytone.eu
async def get_bodytone_detail(context, url):
    page = await context.new_page()
    await page.goto(url)
    product = {}
    name_element = await page.query_selector('.product_title')
    price_element = await page.query_selector('.price')
    price_ins = await price_element.query_selector('ins')
    image_element = await page.query_selector('.wp-post-image')
    if price_ins:
        price_bdi = await price_ins.query_selector('bdi')
    else:
        price_bdi = await price_element.query_selector('bdi')
    price = await price_bdi.inner_text()
    price = clean_price(price)
    product["name"] = await name_element.inner_text()
    product["price"] = price
    product["image"] = await image_element.get_attribute('src')
    page.close
    return product

# backmarket.es
async def get_backmarket_detail(context, url):
    page = await context.new_page()
    await page.goto(url)
    product = {}
    name_element = await page.query_selector('.title-1')
    price_element = await page.query_selector('.max-h-6')
    image_elements = await page.query_selector_all('img')
    image = await image_elements[3].get_attribute('src')
    print()
    """
    for img in image_elements:
        x = await img.get_attribute('src')
        if "product_images/" in x:
            image = x
            break
    """
    name = await name_element.inner_text()
    name = name.replace("\n", "")
    name = name.strip()
    product["name"] = name
    price = await price_element.inner_text()
    price = clean_price(price)
    product["price"] = price
    image = "https"+image.split("https")[1]
    product["image"] = image
    page.close
    return product

# carrefour.es
async def get_carrefour_detail(context, url):
    page = await context.new_page()
    await page.goto(url)
    product = {}
    prices_div = await page.query_selector('.buybox__prices')
    price_element = await prices_div.query_selector('.buybox__price--current')
    if price_element is None:
        price_element = await prices_div.query_selector('.buybox__price')
    image_element = await page.query_selector('.normal')
    name_element = await page.query_selector('h1')
    price = await price_element.inner_text()
    price = clean_price(price)
    product["name"] = await name_element.inner_text()
    product["price"] = price
    product["image"] = await image_element.get_attribute('src')
    page.close
    return product

# pccomponentes.com
# TODO: cloudflare protection -> https://www.zenrows.com/blog/playwright-cloudflare-bypass#simulate-human-behavior
async def get_pccom_details(context, url):
    page = await context.new_page()
    await page.goto(url)
    product = {}
    
    price_element = await page.query_selector('.baseprice')
    image_element = await page.query_selector('.pc-com-zoom')
    name_element = await page.query_selector('.h4')
    print(price_element)
    price = await price_element.inner_text()
    print(price)
    price = clean_price(price)
    product["name"] = await name_element.inner_text()
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
            if Webs["BODYTONE"] in url:
                result = await group.create_task(get_bodytone_detail(context, url))
                results.append(result)
            if Webs["BACKMARKET"] in url:
                result = await group.create_task(get_backmarket_detail(context, url))
                results.append(result)
            if Webs["CARREFOUR"] in url:
                result = await group.create_task(get_carrefour_detail(context, url))
                results.append(result)
            if Webs["PCCOM"] in url:
                result = await group.create_task(get_pccom_details(context, url))
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

async def test_main(products):
    results = []
    async with async_playwright() as playwright:
        chromium = playwright.chromium
        browser = await chromium.launch(headless=False)
        context = await browser.new_context()
        results = await open_new_pages(context, products)
        print(results)

    return results

if __name__ == "__main__":
    #urls = ["https://www.amazon.es/Logitech-Wireless-programables-Prolongada-Compatible/dp/B07G5XJLWK", "https://www.amazon.es/Logitech-Pro-Gaming-Headset-Black/dp/B07TQ6G276"]

    urls = ["https://www.backmarket.es/es-es/p/iphone-12-128-gb-negro-libre/f494a8a4-ef58-4a1c-9495-a64d21fed02f#l=10", "https://www.backmarket.es/es-es/p/airpods-pro-con-estuche-de-carga-magsafe-blanco/0900e1dc-f9c4-4646-b62e-43bc66335110#l=10", "https://www.backmarket.es/es-es/p/macbook-pro-13-retina-2017-core-i7-25-ghz-ssd-512-gb-16gb-teclado-espanol/59c8646b-f2c7-40b1-901f-a9376d00bb2e#l=12"]
    #urls = ["https://www.carrefour.es/camiseta-de-algodon-con-print-de-hombre-tex/VC4A-22670058/p?skuId=1668090107", "https://www.carrefour.es/pantalon-jogger-cargo-sostenible-de-hombre-tex/VC4A-22872109/p?skuId=1680550101", "https://www.carrefour.es/lavadora-de-carga-frontal-9-kg-winia-d-wvd-09t1ww12un-blanca/VC4A-20361022/p", "https://www.carrefour.es/lavadora-evvo-310-10-kg-1500-rpm-blanco/0742832780629/p"]
    #urls = ["https://www.pccomponentes.com/msi-vigor-gk30-teclado-gaming-rgb", "https://www.pccomponentes.com/samsung-galaxy-tab-s9-wifi-12-256gb-beige-cargador", "https://www.pccomponentes.com/hp-victus-15-fa0053ns-intel-core-i5-12450h-16gb-512gb-ssd-rtx-3050-156"]
    asyncio.run(test_main(urls))
