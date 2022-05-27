import { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import PageHeader from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostGallery from "../../components/PostGallery/PostGallery";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import * as postsAPI from "../../utils/postApi";
import userService from "../../utils/userService";
import './profile.css';
import { useParams } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";




export default function ProfilePage(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  const { username } = useParams();
  const [allPosts, setAllPosts] = useState([]);

  async function getProfile() {
    try {
      const data = await userService.getProfile(username);
      console.log(data, " < -- data");
      setLoading(() => false);
      setUser(() => data.user);
      setUserPosts(() => data.posts);
    } catch (err) {
      console.log(err);
      setError("Profile Doesn't exists, CHECK YOUR TERMINAL FOR EXPRESS!");
    }
  }


  useEffect(() => {
    getProfile();
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const data = await postsAPI.getAll();
      console.log(data, " this is data,");
      setAllPosts([...data.posts]);
      setLoading(false);
    } catch (err) {
    //   console.log(err.message, " this is the error");
      setError(err.message);
    }
  }

  if (error) {
    return (
      <>
        <PageHeader handleLogout={props.handleLogout} user={props.user}/>
        <ErrorMessage error={error} />;
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PageHeader handleLogout={props.handleLogout} user={props.user}/>
        <Loading />
      </>
    );
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={props.handleLogout} user={props.user}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          <br></br>
          <br></br>
          <div class="events-header1">
            Events You've Created
          </div>
        <PostGallery
            isProfile={true}
            posts={userPosts}
            numPhotosCol={3}
            user={props.user}
          />
        </Grid.Column>
      </Grid.Row>
        <div class="events-header2">Events Attending</div>
        
        {allPosts.map((post) => {
           const attending = post.attending;
           return attending.map(event => {
             if (event.username === user.username) {
               return (
                 <div>
                   <PostCard
                     isProfile={true}
                     post={post}
                     key={post._id}
                     user={props.user}
                   />
                 </div>
               )
             }

           })
        })}
    </Grid>
  );
}

