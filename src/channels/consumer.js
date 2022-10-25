import { createConsumer } from "@rails/actioncable";
import { HOST, PORT, WEBSOCKETHOST } from "../config";

// changed ws to wss for secure socket on heroku
const wsurl = `wss://${WEBSOCKETHOST}/cable?token=${sessionStorage.getItem(
  "jwt"
)}`;

export default createConsumer(wsurl);
