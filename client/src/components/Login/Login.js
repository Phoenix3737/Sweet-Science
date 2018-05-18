import React from "react";
import "./Login.css";
// import firebase from "firebase/app";

//Google signon
// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     var userDiv = $(".user");
//     var userImage = $("<img>").attr("src", profile.getImageUrl());
//     var userName = $("<p>").attr("id", "signon-id").text(profile.getName());
//     userDiv.empty();
//     userDiv.append(userImage);
//     userDiv.append(userName);

//     //set name on Sweet Science
//     user.name = profile.getName();
//     user.email = profile.getEmail();
//     retrieveFromDatabase();
//  }

const Login = () => (
  <div className="container">
    Log in or create and account to access your dashboard and other premium features
  </div>
);

export default Login;