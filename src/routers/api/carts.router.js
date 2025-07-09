import { Router } from 'express';
import cartsController from '../../controllers/carts.controller.js';
import setupPolicies from '../../middlewares/setPolicies.mid.js';

const cartsRouter = Router();

// Solo usuarios autenticados con rol USER pueden interactuar con el carrito
const userPolicy = setupPolicies(['USER']);

// Crear carrito para el usuario autenticado
cartsRouter.post('/create', userPolicy, cartsController.createCart);

// Agregar producto al carrito
cartsRouter.post('/add', userPolicy, cartsController.addProductToCart);

// Actualizar cantidad de un producto en el carrito
cartsRouter.put('/update/:cart_id', userPolicy, cartsController.updateQuantity);

// Leer productos del carrito del usuario autenticado
cartsRouter.get('/mycart', userPolicy, cartsController.readProductsFromUser);

// Vaciar carrito (eliminar producto del carrito)
cartsRouter.delete('/remove/:cart_id', userPolicy, cartsController.removeProductFromCart);

export default cartsRouter;

