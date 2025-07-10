import User from "./models/users.model.js";
import Product from "./models/products.model.js";
//import Cart from "./models/carts.model.js";

class Manager {
    constructor(model) {
        this.model = model;
    }
    createOne = async (data) => await this.model.create(data);
    readAll = async (filter) => await this.model.find(filter).lean();
    readBy = async (data) => await this.model.findOne(data).lean();
    readById = async (id) => await this.model.findById(id).lean();
    updateONe = async (id, data) => await this.model.findOneAndUpdate({ _id: id }, data, { new: true });
    updateById = async (id, data) => await this.model.findByIdAndUpdate(id, data, { new: true });
    destroyOne = async (id) => await this.model.findOneAndDelete({ _id: id });
    destroyById = async (id) => await this.model.findByIdAndDelete(id);
}

export default Manager;

const usersManager = new Manager(User);
const productsManager = new Manager(Product);
//const cartsManager = new Manager(Cart);

//export { usersManager, productsManager, cartsManager };
export { usersManager, productsManager };