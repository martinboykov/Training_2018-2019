class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl || '../img/book-1228040_640.png';
    this.description = description;
    this.price = price;
  }
}

module.exports = Product;
