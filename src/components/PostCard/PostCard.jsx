import React, { useState, useEffect } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import tokenService from '../../utils/tokenService';
import { Link } from "react-router-dom";

function PostCard({ post, isProfile, user }) {

  const [attending, setAttendance] = useState(false)
  const currentUser = user.username;
    function onClickHandler(e) {
        console.log(post._id)
    }
    useEffect(() => {
      post.attending.map((attendee) => {
        if (attendee.username === currentUser){
          setAttendance(true)
        }
      })
    }, [attending])

    async function addAttendant(){
        return fetch(`/api/posts/addAttendant/${post._id}`, {
          headers: {
            'Authorization': 'Bearer ' + tokenService.getToken(),
            'Content-Type': 'application.json',
          },
          method: 'post',
        })
        .then((res) => res.text())
        .then((res) => setAttendance(true))
    }

    async function removeAttendance() {
      return fetch(`/api/posts/removeAttendance/${post._id}`, {
        headers: {
          'Authorization': 'Bearer ' + tokenService.getToken(),
          'Content-Type': 'application.json',
        },
        method: 'post',
      })
      .then((res) => res.text())
      .then((res) => setAttendance(false))
    }
  return (
    <Card key={post._id} raised>
      <Link to={`/event/${post._id}`}>
        <Image src={`${post.photoUrl}`} wrapped ui={false} />
        <Card.Content>
          <Card.Description>{post.eventName}</Card.Description>
          <button onClick={() => attending ? removeAttendance() : addAttendant() }>
            {attending ? 'Attending' : 'Join'}
          </button>
          <br></br>
        </Card.Content>
      </Link>
    </Card>
  );
}

export default PostCard;
