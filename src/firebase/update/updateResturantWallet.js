import firebase from '../index';


export default function updateResturantWallet(docId, amount){
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("users").doc(docId).update({
            wallet: amount,
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