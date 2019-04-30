class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl || '../img/book-1228040_640.png';
    // this.id = (Math.floor(Math.random() * 1000000000000) + 1).toString();
  }
}

module.exports = Product;
