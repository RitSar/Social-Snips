import React from "react";
import { List } from "semantic-ui-react";

export default function PageFooter() {
  return (
    <div className="footer">
      <List floated="right" horizontal>
        <List.Item href="#">© GitHub, Inc.</List.Item>
        <List.Item href="#">Privacy</List.Item>
        <List.Item href="#">Contact</List.Item>
      </List>

      <List horizontal>
        <List.Item href="#">About Us</List.Item>
      </List>
    </div>
  );
}
