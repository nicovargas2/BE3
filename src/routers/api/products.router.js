//import { Router } from 'express';
import CustomRouter from '../../helpers/customRouter.helper.js';
import { productsController } from '../../controllers/controllers.js';

// const productsRouter = Router();

class ProductsRouter extends CustomRouter {
    constructor() {
        //para construir una clase extendida de CustomRouter, primero se debe llamar al constructor de la clase padre
        super();
        // Aquí se inicializan el ProductRouter con los metodos que necesita
        this.init();
    }

    init = () => {
        this.create('/', ["PUBLIC"], productsController.createOne);
        this.read('/', ["PUBLIC"], productsController.readAll);
        this.read('/error', ["PUBLIC"], productsController.readAllError);
        this.read('/:id', ["PUBLIC"], productsController.readById);
        this.update('/:id', ["ADMIN"], productsController.updateById);
        this.destroy('/:id', ["ADMIN"], productsController.destroyById);
    }
}

/* 
productsRouter.post('/', productsController.createOne);
productsRouter.get('/', productsController.readAll);
productsRouter.get('/error', productsController.readAllError);
productsRouter.get('/:id', productsController.readById);
productsRouter.put('/:id', productsController.updateById);
productsRouter.delete('/:id', productsController.destroyById);
*/

//export default productsRouter;
// se crea una instancia de ProductsRouter y se exporta el router
const productsRouter = new ProductsRouter();
// debo exportar un enrutador, por lo que se llama al método getRouter de CustomRouter
export default productsRouter.getRouter();