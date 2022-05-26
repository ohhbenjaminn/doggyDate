import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
function PostCard({ post, isProfile, user }) {
    function onClickHandler(e) {
        console.log(post._id)
    }
  return (
    <Card key={post._id} raised>
      {isProfile ? (
        ""
      ) : (
        <Card.Content textAlign="left">
          <Card.Header onClick={onClickHandler} >

              {/* <Image
                size="large"
                avatar
                src={
                  post.user.photoUrl
                    ? post.user.photoUrl
                    : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                }
              /> */}
              {/* {post.user.username} */}
          </Card.Header>
        </Card.Content>
      )}
            <Link to={`/event/${post._id}`}>
      <Image src={`${post.photoUrl}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description>{post.eventName}</Card.Description>
      </Card.Content>

            </Link>
    </Card>
  );
}

export default PostCard;
