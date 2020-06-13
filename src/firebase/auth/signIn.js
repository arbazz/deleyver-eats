
import firebase from '../index';

export default function signIn(email, password) {
    return new Promise((resolve, reject) => {
        var errorCode = false;
        firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
            resolve("false")
        }).catch(function (error) {
            // Handle Errors here.
            errorCode = error.code;
            var errorMessage = error.message;
            resolve(errorMessage)
            
            // ...
        });
    })

}