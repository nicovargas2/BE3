import { Router } from "express";
import setResponses from "../middlewares/setResponses.mid.js";
import setupPolicies from "../middlewares/setPolicies.mid.js";

class CustomRouter {
    constructor() {
        this.router = Router();
        this.use(setResponses);
    }

    getRouter = () => this.router;

    // de esta forma se aplica a c/u de los controllers o middlewares
    // reduce y ordena el codigo, y el await se necesita por las dudas para todos
    // los que son async.
    setMiddleware = (middlewares) =>
        middlewares.map(each => async (req, res, next) => {
            try {
                await each(req, res, next);
            } catch (error) {
                next(error);
            }
        });

    // metodos para poder realizar el CRUD

    // path: es la ruta que se le pasa al router
    // midds: son los middlewares que se le pasan al router, 1, 2 o varios
    create = (path, policies, ...midds) =>
        this.router.post(path, setupPolicies(policies), this.setMiddleware(midds));
    read = (path, policies, ...midds) =>
        this.router.get(path, setupPolicies(policies), this.setMiddleware(midds));
    update = (path, policies, ...midds) =>
        this.router.put(path, setupPolicies(policies), this.setMiddleware(midds));
    destroy = (path, policies, ...midds) =>
        this.router.delete(path, setupPolicies(policies), this.setMiddleware(midds));
    use = (path, policies, ...midds) =>
        this.router.use(path, this.setMiddleware(midds));

}

export default CustomRouter;