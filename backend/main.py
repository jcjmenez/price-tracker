from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from urllib.parse import urlparse
from datetime import datetime
import scraper.main as Scraper

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

CORS(app)
db = SQLAlchemy(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    image = db.Column(db.String(150))
    url = db.Column(db.String(150))
    web = db.Column(db.String(20))

    def __init__(self, url):
        self.name = "PLACEHOLDER"
        self.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
        self.url = url
        self.web = urlparse(url).netloc

class PriceHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    price = db.Column(db.Float)
    date = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, product_id, price):
        self.product_id = product_id
        self.price = price

@app.route('/')
def home():
    return "Hello, World!"

@app.route('/add-product', methods=['POST'])
def add_product():
    # TODO: Should validate if URL is valid and domain is supported
    url = request.json['url']
    print(url)
    product = Product.query.filter_by(url=url).first()
    if product is None:
        product = Product(url)
        db.session.add(product)
        db.session.commit()
        return jsonify({'message': 'Product added successfully'})
    else:
        return jsonify({'message': 'Product already exists'})


@app.route('/get-products', methods=['GET'])
def get_products():
    products = Product.query.all()
    output = []
    for product in products:
        product_data = {}
        product_data['id'] = product.id
        product_data['name'] = product.name
        product_data['image'] = product.image
        product_data['url'] = product.url
        product_data['web'] = product.web
        output.append(product_data)
    return jsonify({'products': output})

@app.route('/add-price', methods=['POST'])
def add_price_history():
    product_id = request.json['product_id']
    price = request.json['price']
    price_history = PriceHistory(product_id, price)
    db.session.add(price_history)
    db.session.commit()
    return jsonify({'message': 'Price history added successfully'})

@app.route('/add-price-history', methods=['POST'])
def add_price_history_array():
    new_data = request.json
    for data in new_data:
        product_id = data['product_id']
        # update products with name and image
        product = Product.query.filter_by(id=product_id).first()
        product.name = data['name']
        product.image = data['image']
        # add to price history
        price = data['price']
        new_price = PriceHistory(product_id, price)
        db.session.add(new_price)
    db.session.commit()
    return jsonify({'message': 'Price history added successfully'})

@app.route('/get-price-history/<product_id>', methods=['GET'])
def get_price_history(product_id):
    price_history = PriceHistory.query.filter_by(product_id=product_id).all()
    output = []
    for price in price_history:
        price_data = {}
        price_data['id'] = price.id
        price_data['product_id'] = price.product_id
        price_data['price'] = price.price
        price_data['date'] = price.date
        output.append(price_data)
    return jsonify({'price_history': output})

@app.route('/refresh', methods=['GET'])
async def refresh():
    products = Product.query.all()
    print(products)
    products_url = [product.url for product in products]
    # send products to scraper
    await Scraper.main(products)

    return jsonify({'products': products_url})


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)