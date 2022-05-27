import React, { useState, useEffect } from "react";
import './feed.css';
import PageHeader from "../../components/Header/Header";
import SearchBar from '../../components/SearchBar/SearchBar';
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import PostGallery from "../../components/PostGallery/PostGallery";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import * as postsAPI from "../../utils/postApi";
import PostCard from "../../components/PostCard/PostCard";



export default function Feed({user, handleLogout}) {
  console.log(postsAPI, " <-- postsAPI")
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    const [searchedEvents, setSearchedEvents] = useState();


  async function handleAddPost(post) {
    try {
      setLoading(true);
      console.log('create post initial', post)
      const data = await postsAPI.create(post); 
      console.log(data, " this is response from the server, in handleAddPost");

      if(data){
          console.log('there is data', data)
      }
      setPosts([data.post, ...posts]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  async function getPosts() {
    try {
      const data = await postsAPI.getAll();
      console.log(data, " this is data,");
      setPosts([...data.posts]);
      setLoading(false);
    } catch (err) {
    //   console.log(err.message, " this is the error");
      setError(err.message);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);



  if (error) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} user={user}/>
        <ErrorMessage error={error} />;
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} user={user}/>
        <Loading />
      </>
    );
  } 

  return (
    <div className="crayons">
        <div className="topFeed">
            <PageHeader handleLogout={handleLogout} user={user} setSearchedEvents={setSearchedEvents}/>
        </div>
        <br></br>
        
            <SearchBar setSearchedEvents={setSearchedEvents}/>
            { searchedEvents ? (
                <div>
                    {searchedEvents.length === 0 && (
                        <div>
                            Sorry, nothing matched
                        </div>
                    )}
                    {searchedEvents.map((event) => {
                        return (
                            <PostCard 
                                post={event}
                                isProfile={false}
                                user={user}
                            />
                        )
                    })}
                    <br></br>
                    
                    
                </div>
            ) : (
                <div className="feedLeft">
                    <br></br>
                    <PostGallery
                        posts={posts}
                        numPhotosCol={1}
                        isProfile={false}
                        loading={loading}
                        user={user}
                    />  
                    <br></br>
                </div>
            )}
            <div className="feedRight">
                <AddPostForm handleAddPost={handleAddPost} />  
            </div>     
        
        
    </div>
    
  );
}
