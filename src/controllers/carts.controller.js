import cartsService from "../services/carts.service.js";

class CartsController {
    constructor(service) {
        this.service = service;
    }

    addProductToCart = async (req, res) => {
        const { _id } = req.user;
        const { product_id, quantity } = req.body;
        const response = await cartsService.addProductToCart({
            product_id,
            user_id: _id,
            quantity,
        });
        res.json201(response);
    }

    readProductsFromUser = async (req, res) => {
        const { _id } = req.user;
        const response = await cartsService.readProductsFromUser({
            user_id: _id,
            state: "reserved",
        });
        if (response.length > 0) {
            res.json200(response);
        } else {
            res.json404();
        }
    }


    // Use same method from service but with different parameters
    updateQuantity = async (req, res) => {
        const { cart_id } = req.params;
        const { quantity } = req.body;
        const response = await cartsService.updateCart(cart_id, { quantity });
        if (!response) {
            res.json404();
        } else {
            res.json200(response);
        }
    };

    updateState = async (req, res) => {
        const { cart_id, state } = req.params;
        const states = ["reserved", "paid", "delivered"];
        if (states.includes(state)) {
            const response = await cartsService.updateCart(cart_id, { state });
            if (!response) {
                res.json404();
            } else {
                res.json200(response);
            }
        } else {
            res.json400();
        }
    };
    // End updateCart method

    removeProductFromCart = async (req, res) => {
        const { cart_id } = req.params;
        const response = await cartsService.removeProductFromCart(cart_id);
        if (!response) {
            res.json404();
        } else {
            res.json200(response);
        }
    };
};

const cartsController = new CartsController(cartsService);
export default cartsController;