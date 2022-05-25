import React from 'react';
import { Card, Dimmer, Segment, Image  } from 'semantic-ui-react'
import PostCard from '../PostCard/PostCard';
import Loader from '../Loader/Loader';

export default function PostFeed({posts, numPhotosCol, isProfile, loading, user }){
//removed addLike removeLike
    return (
        <Card.Group itemsPerRow={numPhotosCol} stackable style={{border: '1px soild black'}}>
        {loading ? (
          <Segment>
            <Dimmer active inverted>
              <Loader size="small">Loading</Loader>
            </Dimmer>
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        ) : null}
        {posts.map((post) => {
          return (
            <PostCard
              post={post}
              key={post._id}
              isProfile={isProfile}
            //   addLike={addLike}
            //   removeLike={removeLike}
              user={user}
            />
          );
        })}
      </Card.Group>
  
    )
}