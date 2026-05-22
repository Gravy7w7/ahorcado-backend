
let wordCache = [];
const BATCH_SIZE = 5;

export const getRandomWord = async () => { 
    
    if(wordCache.length > 0) return wordCache.pop();

    try{

        const words = await Promise.all(
            Array(BATCH_SIZE).fill(null).map(() =>
                fetch("https://random-words-api.vercel.app/word/spanish")
                    .then(r => {
                        if (r.status === 429) throw new Error("Rate limit alcanzado");
                        return r.json();
                    })
                    .then(d => d[0].word.toUpperCase())
            )
        );

        wordCache = words;
        return wordCache.pop();

    }catch(error){
        console.error("Error al obtener la palabra de la API: ", error);
        const fallbackWords = ["PERRO", "GATO", "CASA", "ARBOL", "LIBRO",
             "CIELO", "MAR", "FUEGO", "TIERRA", "AMIGO", "FAMILIA", "CIUDAD", 
             "PAIS", "MUNDO", "HOMBRE", "MUJER", "NIÑO", "NIÑA", "AUTO", "AVION",
             "BARCO", "MOTO", "BICICLETA", "CAMION", "BUS", "TREN", "METRO", 
             "ESCUELA", "TRABAJO", "JUEGO", "DEPORTE", "MUSICA", "PELICULA", "SERIE"];
        return fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
    }

}