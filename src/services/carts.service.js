import { cartDao } from '../dao/cart.dao.js';
import { usersService } from '../services/service.js';

class CartsServices {

  async create() {
    return await cartDao.create();
  }

  async getById(cartId) {
    return await cartDao.getById(cartId);
  }

  async addProductToCart(cid, pid) {
    const cart = await cartDao.getById(cid);
    //console.log(`Adding product ${pid} to cart ${cart._id}`);

    if (!cart) throw new Error('Cart not found');

    const productInCart = cart.products.find((element) => element.product._id == pid);
    //console.log(`Product in cart: ${productInCart}`);

    if (productInCart) {
      productInCart.quantity += 1;
      //console.log(`Updated quantity for product ${pid} in cart ${cart._id}`);
    } else {
      cart.products.push({ product: pid, quantity: 1 });
      //console.log(`Added new product ${pid} to cart ${cart._id}`);
    }
    //console.log(`Cart after adding product: ${JSON.stringify(cart)}`);

    return await cartDao.update(cid, cart);
  }

  async deleteProductToCart(cartId, productId) {
    const cart = await cartDao.getById(cartId);
    cart.products = cart.products.filter((element) => element.product != productId);

    return await cartDao.update(cartId, { products: cart.products });
  }

  async updateQuantityProductInCart(cartId, productId, quantity) {
    const cart = await cartDao.findById(cartId);
    const product = cart.products.find((element) => element.product == productId);
    product.quantity = quantity;

    return await cartDao.update(cartId, { products: cart.products });
  }

  // Método para eliminar todos los productos de un carrito
  async clearProductsToCart(cartId) {
    const cart = await cartDao.getById(cartId);
    cart.products = [];

    return await cartDao.update(cartId, { products: [] });
  }

}

export const cartsServices = new CartsServices();
