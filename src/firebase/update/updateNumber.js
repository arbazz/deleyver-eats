import firebase from '../index';


export default function updateNumber(number, docId, token){
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("users").doc(docId).update({
            number,
            token
        })
        .then(function() {
            console.log("Document successfully updated!");
            resolve("true")
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            resolve("false")
        });
    })
    
}