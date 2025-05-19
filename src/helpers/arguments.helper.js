import { Command } from 'commander';

const argvs = new Command();

argvs.option('--mode <mode>', 'to specify mode', 'dev') //si no me especifican el modo, por defecto es dev
// dato importante:
// si es un solo caracter, se usa un guion.
// si son dos o mas caracteres, se usa dos guiones.

argvs.parse();

export default argvs.opts(); //esto es un objeto con las opciones que le pasamos al comando
