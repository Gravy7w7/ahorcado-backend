import { processGuess } from "../services/gameService.js";
import { broadcast } from "../websocket/socket.js";

export const handleMessage = (data, ws) => {

    switch (data.type) {
        case "guess":

        const result = processGuess(data.letter, data.player);
        broadcast(result);
        break;

        default:
            console.log("Tipo de mensaje desconocido: " + data.type);

    }

};