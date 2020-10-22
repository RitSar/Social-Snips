import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Header, Segment, Card } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  let posts;
  if (loading === false) posts = data.getPosts;
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
        <h1>Loading...</h1>
      ) : (
        posts &&
        posts.map((post) => (
          <Card key={post.id} fluid>
            <Post post={post} />
          </Card>
        ))
      )}
    </div>
  );
}
