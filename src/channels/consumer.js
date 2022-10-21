import { createConsumer } from "@rails/actioncable";
import { HOST, PORT } from "../config";

// changed ws to wss for secure socket on heroku
const wsurl = `ws://${HOST}:${PORT}/cable`;

export default createConsumer(wsurl);
