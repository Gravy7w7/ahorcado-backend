import { getRandomWord } from "../utils/wordGenerator.js";

export const gameState = {
    word: getRandomWord(),
    guessedLetters: [],
    attemptsLeft: 6,
}