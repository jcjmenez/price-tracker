from mailjet_rest import Client
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv('MJ_APIKEY_PUBLIC')
api_secret = os.getenv('MJ_APIKEY_PRIVATE')

mailjet = Client(auth=(api_key, api_secret), version='v3.1')

def send(email, product_name, product_price, product_url):
    data = {
    'Messages': [
                    {
                            "From": {
                                    "Email": "pricetrackernotifier@gmail.com",
                                    "Name": "Price Tracker"
                            },
                            "To": [
                                    {
                                            "Email": email,
                                            "Name": "User"
                                    }
                            ],
                            "Subject": "Aviso de bajada de precio: " + product_name + " - " + product_price + "€",
                            "TextPart": "Precio actual: " + product_price + "€\n" + "URL: " + product_url + "\n",
                            "HTMLPart": "<h3>Precio actual: " + product_price + "€</h3><br />" + "<a href=\"" + product_url + "\">" + product_url + "</a>",
                    }
            ]
    }
    result = mailjet.send.create(data=data)
    print(result.status_code)
    print(result.json())
