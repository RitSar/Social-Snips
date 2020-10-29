import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { FETCH_POSTS_QUERY } from "../util/graphql";
import Tooltip from "../util/Tooltip";

export default function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        let data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        let newDataGroups = [...data.getPosts];
        newDataGroups = data.getPosts.filter((p) => p.id !== postId);
        data = { ...data, getPosts: newDataGroups };
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      }

      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });
  return (
    <>
      <Tooltip content={commentId ? "Delete this comment" : "Delete this post"}>
        <Button
          as="div"
          floated="right"
          color="red"
          icon
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" />
        </Button>
      </Tooltip>

      <Confirm
        open={confirmOpen}
        cancelButton="Cancel"
        confirmButton="Confirm"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
        content="Are you sure you want to delete this post?"
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;
