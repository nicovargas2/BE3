import { Router } from 'express';
import cartsController from '../../controllers/carts.controller.js';
import setupPolicies from '../../middlewares/setPolicies.mid.js';

const cartsRouter = Router();

// Solo usuarios autenticados con rol USER pueden interactuar con el carrito
const userPolicy = setupPolicies(['USER']);

// Agregar producto al carrito
cartsRouter.post('/add/product', userPolicy, cartsController.addProductToCart);

// Actualizar cantidad de un producto en el carrito
//cartsRouter.put('/update/:cart_id', userPolicy, cartsController.updateQuantity);

// Leer productos del carrito del usuario autenticado
cartsRouter.get('/mycart', userPolicy, cartsController.readProductsFromCart);

// Vaciar carrito
cartsRouter.delete('/clear', userPolicy, cartsController.removeProductsFromCart);

export default cartsRouter;

