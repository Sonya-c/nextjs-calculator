
const regex_digit = /[1-9]/;
const regex_op = /\+|\-|\*|\//;

/**
 * Recibe el array de entrada y retorna el array limpio (vacio).
 * @param {string[]} inputArray
 * @returns string[]
 */
export function getCleanArray(inputArray: string[]): string[] {
  return [];
}

/**
 * Recibe el array de entrada y retorna el array sin el ultimo elemento.
 * @param {string[]} inputArray
 * @returns string[]
 */
export function deleteLastItem(inputArray: string[]) {
  inputArray.splice(-1);
  return inputArray;
}

/**
 * Recibe el array de entrada y un caracter, y retorna el array con el caracter agregado.
 * @param {string[]} inputArray
 * @param {string} character
 * @returns string[]
 */
export function addToArray(inputArray: string[], character: string): string[] {
  // Regla: toda operacion debe estar rodeada de números
  // Esto ayudara a evitar verificaciones mas adeltante

  if (regex_op.test(character)) {
    // Caso 1: Es el primer caracter [op]. Es un caso invalido
    // ¿En este caso se debería poner un 0 al lado? Creo que algunas calculadoras lo hacen  
    if (inputArray.length === 0) return [];

    // Caso 2: Es el n carcter (n > 0). Cequear si el anterior (n - 1), es un número 
    if (!regex_digit.test(inputArray[inputArray.length - 1]!)) return inputArray;
  }

  return [...inputArray, character];
}

/**
 * Recibe el array de entrada y retorna los numeros presentes en el.
 * @param {string[]} inputArray
 * @returns string[]
 */
export function extractNumbers(inputArray: string[]): string[] {
  const numbers: string[] = [];
  let num = "";

  for (const elem of inputArray) {
    // Se examinan cada uno de los elementos 
    // Si se encuentra con un digito, se agrega a la variable digito 
    // Cuando nos encontremos con un operador, se agrega el numero al array 
    // Solo si num no es una string vacia

    if (regex_digit.test(elem)) {
      num += elem;
    } else if (num.length > 0) {
      numbers.push(num);
      num = "";
    }
  }

  if (num.length > 0) numbers.push(num); // Agregar el último número 
  return numbers;
}

/**
 * Recibe el array de entrada y retorna el operador presente en el.
 * @param {string[]} inputArray
 * @returns string[]
 */
export function extractOperation(inputArray: string[]): string[] {
  const ops: string[] = [];

  for (const elem of inputArray) {
    if (regex_op.test(elem)) ops.push(elem);
  }

  return ops;
}

/**
 * Recibe el array de entrada y resuelve la operación aritmetica presente en el.
 * @param {string[]} inputArray
 * @returns string
 */
export function getSolution(inputArray: string[]): string {
  const numbers = extractNumbers(inputArray);
  const ops = extractOperation(inputArray);

  /**
   * Dadas 3 strings (un número, una opración y otro número), realizar la operación y regresar el valor
   */
  const operate_two = (num1: string, op: string, num2: string): string => {
    switch (op) {
      case "+": return Number(num1) + Number(num2) + "";
      case "-": return Number(num1) - Number(num2) + "";
      case "*": return Number(num1) * Number(num2) + "";
      case "/": return Number(num1) / Number(num2) + "";
      default: return "";
    }
  }

  /**
   * Dada una lista de operaciones, opera los numeros 
   * Por cada par de números y operación que se realice
   * Se elimina un número de la lista de número y se elimina una operación de la lista de operaciones 
   * Esta función NO toma encuenta la prioridad de las operaciones (la realiza en orden)
   */
  const operate_many_for = (oprations: string[]) => {
    let i = 0;
    while (i < ops.length && ops.length > 0) {
      if (oprations.includes(ops[i]!)) {
        const result = operate_two(numbers[i]!, ops[i]!, numbers[i + 1]!);
        numbers[i] = result;
        numbers.splice(i + 1, 1);
        ops.splice(i, 1)
      } else {
        i = i + 1;
      }
    }
  }
  // Se va a suponer que no existen dos operadores seguidos
  // Y que, por lo menos, hay un número (revisar addToArray)
  // sin embargo, puede ocurrir el caso 
  // num op num ... op 
  // Es decir, termina en operación y no en número 
  if (ops.length != numbers.length - 1) return "ERROR";

  // Caso mas sencillo: una operación 
  if (numbers.length === 2)
    return operate_two(numbers[0]!, ops[0]!, numbers[1]!);

  // En caso de tener mas de una operación 
  // Primero se debe resolver las operación con prioridad mas alta (* y /)
  // Y luego las de prioridad más baja (+ y -)

  // Resolver * y / (misma prioridad)
  if (ops.includes("*") || ops.includes("/")) operate_many_for(["*", "/"]);

  // Resolver +  y - (misma prioridad)
  if (ops.includes("+") || ops.includes("-")) operate_many_for(["+", "-"]);

  // Al resolver todas las operaciones
  // La lista de operaciones debe estar vacia 
  // Y la lista de números debe haber quedado con un solo elemento 
  return numbers[0]!;
}
