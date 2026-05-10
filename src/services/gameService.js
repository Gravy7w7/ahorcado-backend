import { gameState } from "../models/gameState.js";
import { getRandomWord } from "../utils/wordGenerator.js";
import { broadcast } from "../websocket/socket.js";

export const resetGame = () => {

    gameState.word = getRandomWord();
    gameState.guessedLetters = [];
    gameState.attemptsLeft = 6;
}

export const getGameStateResponse = () => {

    const maskedword = gameState.word
    .split("")
    .map(letter => gameState.guessedLetters.includes(letter) ? letter : "_")
    .join(" ");

    return {
        type: "update",
        word: maskedword,
        attempts: gameState.attemptsLeft,
        usedLetters: gameState.guessedLetters,
        message: "Nuevo juego iniciado. ¡Buena suerte!"
    };

};
export const processGuess = (letter, player) => {

    letter = letter.toUpperCase();

    if (gameState.guessedLetters.includes(letter)) {

        const maskedWord = gameState.word
        .split("")
        .map(letter => gameState.guessedLetters.includes(letter) ? letter : "_")
        .join("");

        return {
            type: "info",
            word: maskedWord,
            attempts: gameState.attemptsLeft,
            usedLetters: gameState.guessedLetters,
            message: `La letra ${letter} ya fue adivinada o utilizada.`
        };
    
    }

    gameState.guessedLetters.push(letter);

    if (!gameState.word.includes(letter)) {
        gameState.attemptsLeft--;
    }

    return buildResponse(player, letter);

};

const buildResponse = (player, letter) => {

    const maskedWord = gameState.word
    .split("")
    .map(letter => gameState.guessedLetters.includes(letter) ? letter : "_")
    .join(" ");

    //win
    if(!maskedWord.includes("_")) {
        const response = {
            type: "win",
            word: gameState.word,
            message: `Felicidades, la palabra era ${gameState.word}.`
        };

        setTimeout(() => {
            resetGame();

            const newState = getGameStateResponse();

            broadcast(newState);

        }, 2000);

        return response;
    }

    //lose
    if(gameState.attemptsLeft <= 0) {
        const response = {
            type: "lose",
            word: gameState.word,
            message: `Juego terminado. La palabra era ${gameState.word}.`
        };

        setTimeout(() => {
            resetGame();

            const newState = getGameStateResponse();

            broadcast(newState);

        }, 2000);

        return response;
    }

    return {
        type: "update",
        word: maskedWord,
        attempts: gameState.attemptsLeft,
        usedLetters: gameState.guessedLetters,
        message: gameState.word.includes(letter)
            ? `${player} adivinó la letra ${letter}`
            : `${player} falló con la letra ${letter}`
    }

}