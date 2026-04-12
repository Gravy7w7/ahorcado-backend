const words = ["GATO", "PERRO", "CASA", "ARBOL", "LIBRO"]

export const getRandomWord = () => { 
    return words[Math.floor(Math.random() * words.length)];
}