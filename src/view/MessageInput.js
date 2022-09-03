import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import SplitButton from "react-bootstrap/SplitButton";

function MessageInput({ sendMessage }) {
  const [messageTyped, setmessageTyped] = useState("");

  function handleSend() {
    if (messageTyped.length > 0) {
      sendMessage(messageTyped);
    }
    setmessageTyped("");
  }

  function onMessageChange(e) {
    setmessageTyped(e.target.value);
  }

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          aria-label="Text input with dropdown button"
          id="messageInput"
          onChange={onMessageChange}
          value={messageTyped}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <SplitButton
          variant="outline-secondary"
          title="Send"
          id="segmented-button-dropdown-2"
          type="button"
          onClick={handleSend}
          alignRight
        >
          <Dropdown.Item href="#">Action</Dropdown.Item>
          <Dropdown.Item href="#">Another action</Dropdown.Item>
          <Dropdown.Item href="#">Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#">Separated link</Dropdown.Item>
        </SplitButton>
      </InputGroup>
    </>
  );
}

export default MessageInput;
