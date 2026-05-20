import { getRandomWord } from "../utils/wordGenerator.js";

export const gameState = {
    word: "",
    guessedLetters: [],
    attemptsLeft: 6,
}

export const initGame = async () => {
    gameState.word = await getRandomWord();
    gameState.guessedLetters = [];
    gameState.attemptsLeft = 6;
};
