import "./Messages.css";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Divider } from "@mui/material";
import { BASE_URL } from "../../config";
import { useRequireAuth } from "../../hooks/use-require-auth";

function Message({ message, user }) {
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);
  //const auth = useRequireAuth();
  // console.log(user.picture);
  // console.log(user);
  return (
    <div
      className="message"
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <div className="message__data">
        <div className="message__left">
          <Avatar src={user.picture ? BASE_URL + user.picture : ""}>
            {!user.picture ? user.username[0] : ""}
          </Avatar>
        </div>
        <div className="message__right">
          <div className="message__details">
            <div className="username-div">{user.username}</div>
          </div>
          <Divider />
          <p className="message__text">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
