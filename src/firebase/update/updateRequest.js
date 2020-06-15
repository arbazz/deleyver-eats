import firebase from '../index';


export default function updateRequest(docId, price){
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("requests").doc(docId).update({
           paid: true,
           price
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