import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  };

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  };

const Login = props => (
    <div className="container">
        <div className="g-signin2" data-onsuccess="onSignIn"></div>
        <a href="#" onclick="signOut()">Sign out</a>

    </div>


);