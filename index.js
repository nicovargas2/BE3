import "./src/helpers/env.js"; //esto importa el archivo env.js que contiene las variables de entorno
import express from "express";
import compression from "express-compression"; //para comprimir las respuestas
import dbConnect from "./src/helpers/dbConnect.helper.js";
import indexRouter from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import argvs from "./src/helpers/arguments.helper.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js"; //para manejar los errores

/* server settings */
const server = express();
const port = process.env.PORT || 8080;
const ready = async () => {
    console.log("server ready on port: " + port + " and mode: " + argvs.mode);
    await dbConnect(process.env.LINK_DB_LOCAL);
};
server.listen(port, ready);

/* middlewares settings */
server.use(compression({ brotli: { enabled: true, zlib: {} } })); //para comprimir las respuestas
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));

/* router settings */
server.use("/", indexRouter);
server.use(errorHandler); //para manejar los errores
server.use(pathHandler);
//server.use(errorHandler);

// console.log(process.argv);
