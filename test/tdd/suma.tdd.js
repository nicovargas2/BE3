import logger from '../../src/helpers/logger.helper.js';

/* desarrollar una funciona que sirva para sumar*/

//1ro: definir la funcion
// nums es un array de numeros llamado rest(es un operador), que se le pasa como argumento a la funcion
// la funcion recibe un numero indefinido de argumentos, y los suma
// la funcion devuelve el resultado de la suma de los numeros
// si no hay numeros, devuelve cero
// si hay un argumento que no es un numero, devuelve null
const sumarNumeros = (...nums) => {
    if (nums.length === 0) {
        return 0;
    }
    const hayNoNumeros = nums.some((num) => typeof num !== "number");
    if (hayNoNumeros) {
        return null;
    }
    const sumatoria = nums.reduce((acc, val) => acc + val);
    return sumatoria;
};

//2do: definir las pruebas que validan la funcion
//T1: sumar numeros que sean numericos, sino devuelve null
const test1 = () => {
    const resultado = sumarNumeros(1, "casa");
    if (resultado === null) {
        logger.INFO("TEST 1: ok");
    } else {
        logger.ERROR("TEST 1: no pasó");
    }
};
//T2: si no hay numeros, devuelve cero
const test2 = () => {
    const resultado = sumarNumeros();
    if (resultado === 0) {
        logger.INFO("TEST 2: ok");
    } else {
        logger.ERROR("TEST 2: no pasó");
    }
};

//T3: devuelve el resultado de la suma de 2 numeros
const test3 = () => {
    const resultado = sumarNumeros(1, 2);
    if (resultado === 3) {
        logger.INFO("TEST 3: ok");
    } else {
        logger.ERROR("TEST 3: no pasó");
    }
};

//T4: devuelve el resultado de la suma de n numeros
const test4 = () => {
    const resultado = sumarNumeros(1, 2, 3, 4, 5);
    if (resultado === 15) {
        logger.INFO("TEST 4: ok");
    } else {
        logger.ERROR("TEST 4: no pasó");
    }
}

test1();
test2();
test3();
test4();