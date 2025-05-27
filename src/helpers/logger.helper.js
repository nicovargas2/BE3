import { de } from '@faker-js/faker';
import { createLogger, format, addColors, transports } from 'winston';

const { colorize, simple } = format;

const levels = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    HTTP: 3,
};

const colors = {
    ERROR: 'red',
    WARN: 'orange',
    INFO: 'blue',
    HTTP: 'green',
};
addColors(colors);

const logger = createLogger({
    levels, format: colorize(), transports: [
        //graba desde nivel 'HTTP' hacia arriba
        new transports.Console({ level: 'HTTP', format: simple() }),
        // graba desde nivel 'INFO' hacia arriba
        new transports.File({ level: 'WARN', filename: './src/helpers/errors/errors.log', format: simple() })
    ]
});

export default logger;