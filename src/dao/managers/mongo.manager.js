import Product from "../models/products.model.js";
import User from "../models/users.model.js";

class MongoManager {
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

const productsManager = new MongoManager(Product);
const usersManager = new MongoManager(User);
export { productsManager, usersManager };