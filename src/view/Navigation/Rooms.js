import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { useState } from "react";

function Rooms({ room, deleteClick, onRoomClick }) {
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  function roomClick(e) {
    onRoomClick(e);
  }

  function deleteRoom(e) {
    deleteClick(e);
  }

  return (
    <ListItem
      id={room.id}
      key={room.id}
      disablePadding
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <ListItemButton id={room.id} onClick={roomClick}>
        <ListItemText primary={room.name} />
      </ListItemButton>
      <div className="room__delete">
        {hovered ? (
          <IconButton
            id={room.id}
            aria-label="delete"
            size="small"
            onClick={deleteRoom}
            sx={{ disply: "flex", alignItems: "flex-end" }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        ) : null}
      </div>
    </ListItem>
  );
}

export default Rooms;
