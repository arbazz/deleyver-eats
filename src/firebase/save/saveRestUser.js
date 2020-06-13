import firebase from '../index';


export default function saveRestUser(user, email, name, number, city){
    console.log(user);
    firebase.firestore().collection("users").add({
        uid: user.uid,
        email,
        number,
        city,
        name,
        rest: true
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}