import firebase from '../index';


export default function saveuser(user, email, last_name, first_name, number, city){
    console.log(user);
    firebase.firestore().collection("users").add({
        uid: user.uid,
        email,
        last_name,
        first_name,
        number,
        city
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}