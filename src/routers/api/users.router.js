import CustomRouter from "../../helpers/CustomRouter.helper.js";
import { usersController } from "../../controllers/controllers.js";

class UsersRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], usersController.createOne);
    this.read("/", ["ADMIN"], usersController.readAll);
    this.read("/:id", ["USER", "ADMIN"], usersController.readById);
    this.update("/:id", ["USER", "ADMIN"], usersController.updateById);
    this.destroy("/:id", ["ADMIN"], usersController.destroyById);
  };
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
