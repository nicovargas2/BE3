import CustomRouter from "../../helpers/customRouter.helper.js";
import createMockProduct from "../../helpers/mocks/products.mock.js";
import createMockUser from "../../helpers/mocks/users.mock.js";
import { productsService, usersService } from "../../services/service.js";

class MocksRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }

    init = () => {
        this.read("/products/:n", ["PUBLIC"], async (req, res) => {
            const { n } = req.params;
            for (let index = 0; index < n; index++) {
                const one = createMockProduct();
                await productsService.createOne(one);
            }
            res.json201({ mocks: n });
        });
        this.read("/users/:n", ["PUBLIC"], async (req, res) => {
            const { n } = req.params;
            for (let index = 0; index < n; index++) {
                const one = createMockUser();
                await usersService.createOne(one);
            }
            res.json201({ mocks: n });
        });
    };
}

const mocksRouter = new MocksRouter();
export default mocksRouter.getRouter();
