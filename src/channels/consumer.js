import { createConsumer } from "@rails/actioncable";
import { WS_BASE_URL } from "../config";

// changed ws to wss for secure socket on heroku
const wsurl = `${WS_BASE_URL}/cable`;

export default createConsumer(wsurl);
