import { gameState } from "../models/gameState.js";
import { getRandomWord } from "../utils/wordGenerator.js";

export const resetGame = () => {

    gameState.word = getRandomWord();
    gameState.guessedLetters = [];
    gameState.attemptsLeft = 6;
}

export const processGuess = (letter, player) => {

    letter = letter.toUpperCase();

    if (gameState.guessedLetters.includes(letter)) {
        return {
            type: "info",
            message: `La letra ${letter} ya ha sido adivinada.`
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

        resetGame();
        return response;
    }

    //lose
    if(gameState.attemptsLeft <= 0) {
        const response = {
            type: "lose",
            word: gameState.word,
            message: `Juego terminado. La palabra era ${gameState.word}.`
        };

        resetGame();
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