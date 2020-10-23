import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Image, Label, Icon } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

export default function Post({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card.Content>
      <Button
        floated="right"
        labelPosition="right"
        as={Link}
        to={`/posts/${id}`}
      >
        <Button basic color="green">
          <Icon name="comments" />
        </Button>
        <Label basic color="green" pointing="left">
          {commentCount}
        </Label>
      </Button>

      <LikeButton user={user} post={{ id, likes, likeCount }} />

      {user && user.username === username && (
        <Button
          as="div"
          floated="right"
          color="red"
          icon
          onClick={() => console.log("Delete Post")}
        >
          <Icon name="trash" />
        </Button>
      )}

      <Image
        floated="left"
        size="mini"
        src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
      />

      <Card.Header>{username}</Card.Header>
      <Card.Meta as={Link} to={`/posts/${id}`}>
        {moment(createdAt).fromNow()}
      </Card.Meta>

      <Card.Description>{body}</Card.Description>
    </Card.Content>
  );
}
// 4:16:27
