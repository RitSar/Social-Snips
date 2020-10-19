import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Button, Image, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';

export default function Post({post: {body, createdAt, id, username, likeCount, commentCount, likes}}) {
    function likePost(){
      console.log('like!');
    }
    function commentOnPost(){
      console.log('comment!');
    }
    return (
        <Card.Content>

          <Button floated='right' as='div' labelPosition='right' onClick={commentOnPost}>
            <Button basic color='green'>
              <Icon name='comments' />
            </Button>
            <Label basic color='green' pointing='left'>
              {commentCount}
            </Label>
          </Button>
          <Button floated='right' as='div' labelPosition='right' onClick={likePost}>
            <Button basic color='red'>
              <Icon name='heart' />
            </Button>
            <Label basic color='red' pointing='left'>
              {likeCount}
            </Label>
          </Button>

          <Image
            floated='left'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
          />

          <Card.Header>{username}</Card.Header>
          <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>

          <Card.Description>
            {body}
          </Card.Description>
        </Card.Content>
    )
}



