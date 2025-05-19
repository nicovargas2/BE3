import { Router } from 'express';
import { productsController } from '../../controllers/controllers.js';

const productsRouter = Router();

//post
productsRouter.post('/', productsController.createOne);
//get
productsRouter.get('/', productsController.readAll);
//get by id
productsRouter.get('/:id', productsController.readById);
//put
productsRouter.put('/:id', productsController.updateById);
//delete
productsRouter.delete('/:id', productsController.destroyById);

export default productsRouter;


