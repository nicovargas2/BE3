import { productsManager, usersManager } from "../dao/managers/mongo.manager.js";

class Service {
    constructor(manager) {
        this.manager = manager;
    }

    createOne = async (data) => await this.manager.createOne(data);
    readAll = async (filter) => await this.manager.readAll(filter);
    readBy = async (data) => await this.manager.readBy(data);
    readById = async (id) => await this.manager.readById(id);
    updateONe = async (id, data) => await this.manager.updateONe(id, data);
    updateById = async (id, data) => await this.manager.updateById(id, data);
    destroyOne = async (id) => await this.manager.destroyOne(id);
    destroyById = async (id) => await this.manager.destroyById(id);
}

const productsService = new Service(productsManager);
const usersService = new Service(usersManager);
export { productsService, usersService };