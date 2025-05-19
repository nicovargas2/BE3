import { config } from "dotenv";
import argvs from "./arguments.helper.js";

const { mode } = argvs; //destructuring

//const path = `./src/config/.env.${mode}`; //esto es una template string, es lo mismo que poner path = "./src/config/.env." + mode
const path = ".env." + mode; //esto es una template string, es lo mismo que poner path = "./src/config/.env." + mode

config({ path }); //esto carga las variables de entorno del archivo .env.dev o .env.prod dependiendo del modo que le pasamos por argumento

//env es el objeto que contiene las variables de entorno
const env = {
    PORT: process.env.PORT || 8080,
    LINK_DB_LOCAL: process.env.LINK_DB_LOCAL,
};

export default env; //esto exporta el objeto env que contiene las variables de entorno