import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Button, Label, Icon, Modal } from "semantic-ui-react";
import Tooltip from "../util/Tooltip";

export default function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost, { error }] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onError(err) {
      return err;
    },
  });

  function exampleReducer(state, action) {
    switch (action.type) {
      case "OPEN_MODAL":
        return { open: true, dimmer: action.dimmer };
      case "CLOSE_MODAL":
        return { open: false };
      default:
        throw new Error();
    }
  }

  const likeButton = user ? (
    liked ? (
      <Button color="red">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button basic color="red">
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" basic color="red">
      <Icon name="heart" />
    </Button>
  );

  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  });
  const { open, dimmer } = state;

  return (
    <>
      <Button
        as="div"
        labelPosition="right"
        onClick={
          error
            ? () => dispatch({ type: "OPEN_MODAL" })
            : user
            ? likePost
            : null
        }
      >
        <Tooltip content={liked ? "Unlike" : "Like"}>{likeButton}</Tooltip>
        <Label basic color="red" pointing="left">
          {likeCount}
        </Label>
      </Button>

      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: "CLOSE_MODAL" })}
      >
        <Modal.Header>Session Expired. Please relog.</Modal.Header>
        <Modal.Content>
          {error && (
            <div className="ui error message">
              <ul className="list">
                <li>{error.graphQLErrors[0].message}</li>
              </ul>
            </div>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
            Close
          </Button>
          <Button
            positive
            onClick={() => {
              window.location.replace("/login");
              dispatch({ type: "CLOSE_MODAL" });
            }}
          >
            Login
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
