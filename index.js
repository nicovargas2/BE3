import "./src/helpers/env.js"; //esto importa el archivo env.js que contiene las variables de entorno
import express from "express";
import compression from "express-compression"; //para comprimir las respuestas
import dbConnect from "./src/helpers/dbConnect.helper.js";
import indexRouter from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import argvs from "./src/helpers/arguments.helper.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js"; //para manejar los errores
import logger from "./src/helpers/logger.helper.js"; //para manejar los logs
import winstonMiddleware from "./src/middlewares/winston.mid.js";
import cluster from "cluster"; //para manejar el cluster
import { cpus } from "os";

/* server settings */
const server = express();
const port = process.env.PORT || 8080;
const ready = async () => {
    //console.log("server ready on port: " + port + " and mode: " + argvs.mode);
    logger.INFO(`Server ready on port: ${port} and mode: ${argvs.mode}`);
    logger.INFO(`Server ready on pid:` + process.pid);
    await dbConnect(process.env.MONGODB_URI);
};

//antes de iniciar el servidor, verifico si estoy en modo cluster
const isPrimary = cluster.isPrimary;
if (isPrimary) {
    logger.INFO(`Primary Server ready, pid:` + process.pid);
    // si es un proceso primario crea los workers
    const numberOfProcess = cpus().length;
    for (let index = 1; index <= numberOfProcess; index++) {
        cluster.fork();
    }
} else {
    // si es un worker levanta un servidor/un nodo del cluster
    server.listen(port, ready);
}

// ya no levanto acá, porque estoy en modo cluster
//server.listen(port, ready);

/* middlewares settings */
server.use(compression({ brotli: { enabled: true, zlib: {} } })); //para comprimir las respuestas
server.use(express.json());
server.use(winstonMiddleware);
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));

/* router settings */
server.use("/", indexRouter);
server.use(errorHandler); //para manejar los errores
server.use(pathHandler);
//server.use(errorHandler);

// console.log(process.argv);
