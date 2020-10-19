import React from 'react'
import {useQuery} from '@apollo/client';
import gql from 'graphql-tag';
import { Header, Segment, Card } from 'semantic-ui-react'

import Post from '../components/Post';


export default function Home() {
  const {
      loading,
      data
    } = useQuery(FETCH_POSTS_QUERY);
    let posts;
    if(loading === false) posts=data.getPosts;
  return (
    <div>
      <Segment className="heading">
        <Header as='h3'>Recent Posts</Header>
      </Segment>
      {loading?( <h1>Loading...</h1> ):(
        posts && posts.map(post=>(
          <Card key={post.id} fluid>
            <Post post={post} />
          </Card>
        ))
      )}
    </div>

  )
}
const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
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
