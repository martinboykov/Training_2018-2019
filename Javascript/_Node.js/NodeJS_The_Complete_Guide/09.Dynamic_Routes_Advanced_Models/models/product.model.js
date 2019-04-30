class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl || '../img/book-1228040_640.png';
    this.description = description;
    this.price = price;
    this.id = (Math.floor(Math.random() * 1000000000000) + 1).toString();
  }
}

module.exports = Product;
