import "./Messages.css";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Divider } from "@mui/material";
import { BASE_URL } from "../../config";
import DeleteIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

function Message({ message, user, data, deleteMessage }) {
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  function utcToLocal(utcTime) {
    let date = new Date(utcTime);
    let localTime = date.toLocaleString();
    let localTimeNoSeconds =
      localTime.split(":")[0] +
      ":" +
      localTime.split(":")[1] +
      " " +
      localTime.split(" ")[2].toLowerCase();
    return localTimeNoSeconds;
  }

  function deleteClick() {
    deleteMessage(data, user);
  }

  return (
    <div
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      className="message"
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
            <div className="time-div">{utcToLocal(data.created_at)}</div>
            <div className="message__delete">
              {hovered ? (
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={deleteClick}
                  sx={{ disply: "flex", alignItems: "flex-end" }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              ) : null}
            </div>
          </div>
          <Divider />
          <p className="message__text">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
