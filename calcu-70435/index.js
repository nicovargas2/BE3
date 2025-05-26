//const sumar = (n1, n2) => n1 + n2;
//const restar = (n1, n2) => n1 - n2;
//const multiplicar = (n1, n2) => n1 * n2;
//const potencia = (n1, n2) => n1 ** n2;

import sumar from './modules/sumar.js';
import restar from './modules/restar.js';
import multiplicar from './modules/multiplicar.js';
import potencia from './modules/potencia.js';
import dividir from './modules/dividir.js';

// el export comun me va a exportar el objeto
export { sumar, restar, multiplicar, potencia, dividir };

// export default me va a exportar una cosa cerrada que despues tengo que desestructurar
export default {
    sumar,
    restar,
    multiplicar,
    potencia,
    dividir
};