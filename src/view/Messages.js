// import React from "react";
// import { ListGroup } from "react-bootstrap";

// function Messages({ message }) {
//   return <ListGroup.Item>{message}</ListGroup.Item>;
// }

// export default Messages;

import Card from "react-bootstrap/Card";

function Messages({ message, user }) {
  return (
    <Card>
      <Card.Header>{user}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{message}</p>
          {/* <footer className="blockquote-footer">
            We could just delete this{" "}
            <cite title="Source Title">Bio Maybe?</cite>
          </footer> */}
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default Messages;
