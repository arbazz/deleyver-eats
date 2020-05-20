
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import signup from './auth/signup'
import checkuser from './auth/checkuser'

var firebaseConfig = {
    apiKey: "AIzaSyC4Ncgn4mFhO6AVObcLd5ElYp9t5arlZuw",
    authDomain: "deleyver-eats.firebaseapp.com",
    databaseURL: "https://deleyver-eats.firebaseio.com",
    projectId: "deleyver-eats",
    storageBucket: "deleyver-eats.appspot.com",
    messagingSenderId: "640371610908",
    appId: "1:640371610908:web:26e8790832316d7c8696d9",
    measurementId: "G-LP2SS8Y9TX"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}
// Initialize Firebase

export default firebase;

export {
    signup,
    checkuser
}