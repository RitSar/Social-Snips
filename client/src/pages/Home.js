import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import {
  Header,
  Segment,
  Card,
  Transition,
  Dimmer,
  Loader,
} from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );
  return (
    <div>
      {user && (
        <Segment className="heading">
          <PostForm />
        </Segment>
      )}

      <Segment className="heading">
        <Header as="h3">Recent Posts</Header>
      </Segment>
      {loading ? (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      ) : (
        <Transition.Group>
          {posts &&
            posts.map((post) => (
              <Card key={post.id} fluid>
                <Post post={post} />
              </Card>
            ))}
        </Transition.Group>
      )}
    </div>
  );
}
