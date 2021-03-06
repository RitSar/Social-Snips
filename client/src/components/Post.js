import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Image, Label, Icon, Divider } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import Tooltip from "../util/Tooltip";

export default function Post({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card.Content>
      {user && user.username === username && (
        <DeleteButton postId={id}></DeleteButton>
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

      <Divider />

      <LikeButton user={user} post={{ id, likes, likeCount }} />

      <Tooltip content="Comment on this post">
        <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button basic color="teal">
            <Icon name="comments" />
          </Button>
          <Label basic color="teal" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Tooltip>

      <Tooltip content="Share this post">
        <Button basic color="teal" floated="right" icon>
          <Icon name="share alternate" />
        </Button>
      </Tooltip>
    </Card.Content>
  );
}
