import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Image, Icon } from "semantic-ui-react";

export default function PageHeader({ user, handleLogout, setSearchedEvents }) {
  
  function returnHome() {
    setSearchedEvents(undefined)
  }
  return (
    <Segment clearing>

       <Header as="h2" floated="right">
        <Link to={`/${user?.username}`}>
          <Image
            src={
              user?.photoUrl
                ? user?.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
            avatar
          ></Image>
        </Link>
        <Link to="" onClick={handleLogout}>
          Logout
        </Link>
      </Header> 

      <Header as="h2" floated="center" >
      <Link to="/" onClick={returnHome}>
          DoggyDate
        </Link>
      </Header>

      <Header as="h2" floated="left">
        <Link to="/" onClick={returnHome}>
          <Icon name="home" size="large"></Icon>
        </Link>
      </Header>

    

      

    </Segment>
  );
}