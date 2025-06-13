import swaggerJSDoc from "swagger-jsdoc";
import ____dirname from "../../utils.js";

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Coder - TP Final",
            description: "Documentacion de la API del TP Final de Coder",
        },
    },
    apis: [`${____dirname}` + `/src/docs/*.yaml`]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
