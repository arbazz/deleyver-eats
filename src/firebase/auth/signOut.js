import firebase from '../index';

export default function signOut(){
    return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            resolve("true");
          }).catch(function(error) {
            // An error happened.
          });
    })
}