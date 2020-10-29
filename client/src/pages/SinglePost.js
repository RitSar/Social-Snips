import React, { useContext, useState, useRef } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import {
  Button,
  Card,
  Icon,
  Label,
  Dimmer,
  Loader,
  Image,
  Form,
} from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import Tooltip from "../util/Tooltip";

export default function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  const commentInputRef = useRef(null);

  const [comment, setComment] = useState("");

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [submitComment, { error }] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
    onError(err) {
      return err;
    },
  });

  function deletePostCallback() {
    props.history.push("/");
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <>
        <Card fluid>
          <Card.Content>
            {user && user.username === username && (
              <DeleteButton postId={id} callback={deletePostCallback} />
            )}
            <Image
              floated="left"
              size="mini"
              src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
            />
            <Card.Header>{username}</Card.Header>
            <Card.Meta> {moment(createdAt).fromNow()} </Card.Meta>
            <Card.Description> {body} </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <LikeButton user={user} post={{ id, likeCount, likes }} />
            <Tooltip content="Comment on this post from the input below">
              <Button as="div" labelPosition="right">
                <Button basic color="teal">
                  <Icon name="comments" />
                </Button>
                <Label basic color="teal" pointing="left">
                  {commentCount}
                </Label>
              </Button>
            </Tooltip>
          </Card.Content>
        </Card>

        {user && (
          <Card fluid>
            <Card.Content>
              <p>Post a comment</p>
              <Form>
                <div className="ui action input fluid">
                  <input
                    type="text"
                    placeholder="Comment"
                    name={comment}
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    ref={commentInputRef}
                    error={error}
                  />
                  <button
                    type="submit"
                    className="ui button teal"
                    disabled={comment.trim() === ""}
                    onClick={submitComment}
                  >
                    Post
                  </button>
                </div>
              </Form>
            </Card.Content>
          </Card>
        )}
        {error && (
          <div className="ui error message">
            <ul className="list">
              <li>{error.graphQLErrors[0].message}</li>
            </ul>
          </div>
        )}

        {comments.map((comment) => (
          <Card fluid key={comment.id}>
            <Card.Content>
              {user && user.username === comment.username && (
                <DeleteButton postId={id} commentId={comment.id} />
              )}
              <Card.Header>{comment.username}</Card.Header>
              <Card.Meta> {moment(comment.createdAt).fromNow()} </Card.Meta>
              <Card.Description> {comment.body} </Card.Description>
            </Card.Content>
          </Card>
        ))}
      </>
    );
  }
  return postMarkup;
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;
