import "./Messages.css";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Divider } from "@mui/material";

function Message({ message, user }) {
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  return (
    <div
      className="message"
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <div className="message__data">
        <div className="message__left">
          <Avatar>{user[0]}</Avatar>
        </div>
        <div className="message__right">
          <div className="message__details">
            <div className="username-div">{user}</div>
          </div>
          <Divider />
          <p className="message__text">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
