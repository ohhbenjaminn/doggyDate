import React, { useState} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';
import FeedPage from '../FeedPage/FeedPage'; 
import ProfilePage from '../ProfilePage/ProfilePage';
import EventPage from '../Event/Event';
import EditEvent from '../Event/EditEvent';


function App() {
  const [user, setUser] = useState(userService.getUser())

  function handleSignUpOrLogin(){
    setUser(userService.getUser())
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  if(user) { // are we logged in?
    return (
    <Routes>
      <Route
        path="/"
        element={<FeedPage user={user} handleLogout={handleLogout} />}
      />
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route path="/:username" element={<ProfilePage user={user} handleLogout={handleLogout}  />} />
      <Route path="/event/:_id"
        element={<EventPage user={user}/>} />
      <Route path="/event/edit/:_id"
          element={<EditEvent user={user}/>} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}


export default App;
