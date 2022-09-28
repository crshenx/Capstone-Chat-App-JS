import { useState } from "react";
import { Box, FormGroup, TextField } from "@mui/material";

function MessageInput({ sendMessage }) {
  const [messageTyped, setmessageTyped] = useState("");

  function handleSend(e) {
    e.preventDefault();
    if (messageTyped.length > 0) {
      sendMessage(messageTyped);
    }
    setmessageTyped("");
  }

  function onMessageChange(e) {
    setmessageTyped(e.target.value);
    console.log(e.target.value);
  }

  return (
    <FormGroup>
      <Box component="form" onSubmit={handleSend} sx={{ maxWidth: "100%" }}>
        {/* <FormControlLabel control={messageTyped}> */}
        <TextField
          id="messageInput"
          label="Begin typing to send message"
          fullWidth
          variant="outlined"
          sx={{ position: "relative", mt: 2 }}
          value={messageTyped}
          onChange={onMessageChange}
        />
      </Box>
    </FormGroup>
  );
}

export default MessageInput;
