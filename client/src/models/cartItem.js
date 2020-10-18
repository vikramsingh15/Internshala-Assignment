class Cart {
  constructor(
    quantity,
    price,
    productTitle,
    sum,
    id,
    image,
    restaurantId
  ) {
    this.quantity = quantity;
    this.price = price;
    this.productTitle = productTitle;
    this.sum = sum;
    this._id = id;
    this.image = image;
    this.restaurantId = restaurantId;
  }
}

export default Cart;
