import { cartsServices } from "../services/carts.service.js";
import { productsService } from "../services/service.js";
import { usersService } from "../services/service.js";

class CartsController {
    constructor(service) {
        this.service = service;
    }

    addProductToCart = async (req, res) => {
        try {
            const { cid, pid } = req.body;
            if (!cid || !pid) {
                return res.status(400).json({ status: "Error", msg: "Faltan datos" });
            }
            const product = await productsService.readById(pid);
            if (!product) {
                //console.log(`Product not found: ${pid}`);
                return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });
            } else {
                //console.log(`Product found: ${product._id}`);
            }

            const cart = await cartsServices.getById(cid);
            if (!cart) {
                //console.log(`Cart not found: ${cid}`);
                return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });
            } else {
                //console.log(`Cart found: ${cart._id}`);
            }

            const response = await cartsServices.addProductToCart(cid, pid);
            return res.status(201).json({ status: "Success", msg: "Producto agregado al carrito", data: response });
        } catch (error) {
            return res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });

        }
    }

    readProductsFromCart = async (req, res) => {
        const user = await usersService.readById(req.user.user_id);
        if (!user) {
            return res.status(404).json({ status: "Error", msg: "Usuario no encontrado" });
        }
        const cartId = user.cart._id;
        //console.log(`Cart ID: ${cartId}`);

        if (!cartId) {
            return res.status(400).json({ status: "Error", msg: "Carrito no encontrado" });
        }

        const response = await cartsServices.getById(cartId);
        //console.log(`Response from cart service: ${JSON.stringify(response)}`);

        if (response.products.length > 0) {
            res.status(200).json({
                status: "Success",
                msg: "Productos del carrito encontrados",
                data: response.products
            });
        } else {
            res.status(404).json({
                status: "Error",
                msg: "No hay productos en el carrito"
            });
        }
    }


    // Use same method from service but with different parameters
    updateQuantity = async (req, res) => {
        const { cart_id } = req.params;
        const { quantity } = req.body;
        const response = await cartsServices.updateCart(cart_id, { quantity });
        if (!response) {
            res.json404();
        } else {
            res.json200(response);
        }
    };

    removeProductsFromCart = async (req, res) => {
        const user = await usersService.readById(req.user.user_id);
        if (!user) {
            return res.status(404).json({ status: "Error", msg: "Usuario no encontrado" });
        }
        const cartId = user.cart._id;
        //console.log(`Cart ID: ${cartId}`);

        if (!cartId) {
            return res.status(400).json({ status: "Error", msg: "Carrito no encontrado" });
        }

        const response = await cartsServices.clearProductsToCart(cartId);
        //console.log(`Response from cart service: ${JSON.stringify(response)}`);

        if (response.products.length === 0) {
            res.status(200).json({
                status: "Success",
                msg: "Carrito vaciado correctamente"
            });
        } else {
            res.status(404).json({
                status: "Error",
                msg: "Error al vaciar el carrito"
            });
        }
    };
};

const cartsController = new CartsController(cartsServices);
export default cartsController;