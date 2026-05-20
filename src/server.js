import express from 'express';
import http, { get } from 'http';
import cors from 'cors';
import { setupWebSocket } from './websocket/socket.js';
import { PORT } from './config/env.js';
import { gameState } from './models/gameState.js';
import { getRandomWord } from './utils/wordGenerator.js';
import { resetGame } from './services/gameService.js';
import { broadcast } from './websocket/socket.js';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Ruta base para verificar que el servidor está funcionando
app.get("/", (req, res) => {
    res.send("Servidor ahorcando funcionando...");
});

//Health check
app.get("/health", (req, res) => {
    res.json({status: "ok"});
});

//Obtener el estado del juego
app.get("/game", (req, res) => {

    const maskedWord = gameState.word
    .split("")
    .map(letter => gameState.guessedLetters.includes(letter) ? letter : "_")
    .join("");

    res.json({
        word: maskedWord,
        attempts: gameState.attemptsLeft,
        usedLetters: gameState.guessedLetters
    });

});

//Reiniciar el juego
app.post("/game/restart", async (req, res) => {

    await resetGame();

    broadcast({
        type: "restart",
        message: "El juego ha sido reiniciado. Nueva palabra generada.",
        word: "_".repeat(gameState.word.length),
        attempts: gameState.attemptsLeft
    });

    res.json({message: "Juego reiniciado"})

});

//Inicializar websocket
await setupWebSocket(server);

server.listen(PORT, () => {
    console.log('Servidor ahorcado corriendo en http://localhost:' + PORT);
});
