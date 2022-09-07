import { createConsumer } from "@rails/actioncable";
import { HOST, PORT } from "../config";

const wsurl = `ws://${HOST}:${PORT}/cable`;

export default createConsumer(wsurl);
