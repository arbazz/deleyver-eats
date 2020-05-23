import firebase from '../index'

export default function checkuser() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          resolve(user);
          // var displayName = user.displayName;
          // var email = user.email;
          // var emailVerified = user.emailVerified;
          // var photoURL = user.photoURL;
          // var isAnonymous = user.isAnonymous;
          // var uid = user.uid;
          // var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          // ...
         resolve("false")
        }
      });
  })
      
}