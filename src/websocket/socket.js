import { WebSocketServer } from "ws";
import { handleMessage } from "../controllers/gameController.js";
import { gameState } from "../models/gameState.js";

let clients = [];

export const broadcast = (data) => {

    const message = JSON.stringify(data);

    clients.forEach(client => {
        if (client.readyState === client.OPEN){
            client.send(message);
        }
    });
    
};

export const setupWebSocket = (server) => {

    const wss = new WebSocketServer({ server});

    wss.on("connection", (ws) => {
        console.log("Nuevo cliente conectado");

        clients.push(ws);

    ws.send(JSON.stringify({
        type: "init",
        word: gameState.word
        .split("")
        .map(letter => gameState.guessedLetters.includes(letter) ? letter : "_")
        .join(""),
        attempts: gameState.attemptsLeft,
        usedLetters: gameState.guessedLetters
    }));

        ws.on("message", (message) => {
            const data = JSON.parse(message);
            handleMessage(data, ws);
        });

        ws.on("close", () => {
            clients = clients.filter(client => client !== ws);
            console.log("Cliente desconectado");

            broadcast({
                type: "player_left",
                message: "Un jugador se ha desconectado.",
                playersOnline: clients.length
            });
        });

    });

}