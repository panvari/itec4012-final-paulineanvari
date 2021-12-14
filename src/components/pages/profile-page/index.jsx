import "./styles.css";
import { useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useHistory } from "react-router-dom";

export const ProfilePage = () => {

  const history = useHistory();

    //check if user is logged in
    useEffect(
      () => {
        
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (!user) {
            history.push('/login');
          }
        })
      }, []
    );

  return (
    <div className="profile-page">
      <h1 className="profile-title">Profile</h1>
    
    </div>
  );
};