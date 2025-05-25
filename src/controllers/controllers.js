//import CustomError from "../helpers/errors/customError.js";
import { productsService, usersService } from "../services/service.js";

// Esto tiene toda la lógica de negocio, es decir, la lógica de la aplicación.
class Controller {
    constructor(service) {
        this.service = service;
    }
    createOne = async (req, res) => {
        //const { method, originalUrl } = req;
        const data = req.body;
        const response = await this.service.createOne(data);
        //console.log('Pasa por aquí: createOne');
        //res.status(201).json({ response, method, url: originalUrl });
        res.json201(response);
    };
    readAllError = async (req, res) => {
        //const { method, originalUrl } = req;
        const filter = req.query;
        const response = await this.service.readAll(filter);
        console.log('Pasa por aquí: readAllError');
        return res.status(200).json({ response, method, url: origin.url });

    };
    readAll = async (req, res) => {
        //const { method, originalUrl } = req;
        const filter = req.query;
        const response = await this.service.readAll(filter);
        //console.log('Pasa por aquí: readAll');
        //console.log('response: ', response);
        if (response.length === 0) {
            //CustomError.new(errors.notFound);
            res.json404();
        }
        //return res.status(200).json({ response, method, url: originalUrl });
        res.json200(response);
    };
    readById = async (req, res) => {
        //const { method, originalUrl } = req;
        const { id } = req.params;
        const response = await this.service.readById(id);
        if (!response) {
            //CustomError.new(errors.notFound);
            res.json404();
        }
        res.json200(response);
    };
    updateById = async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        const response = await this.service.updateById(id, data);
        if (!response) {
            res.json404();
        }
        res.json200(response);
    };
    destroyById = async (req, res) => {
        const { id } = req.params;
        const response = await this.service.destroyById(id);
        if (!response) {
            res.json404();
        }
        res.json200(response);
    };
}

const productsController = new Controller(productsService);
const usersController = new Controller(usersService);
export { productsController, usersController };
