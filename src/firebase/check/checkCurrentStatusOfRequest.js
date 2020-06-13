import firebase from  '../index';

export default function checkCurrentStatusOfRequest(docId){
    return new Promise ((resolve, reject) => {
        firebase.firestore().collection("requests").doc(docId).get().then(function(doc) {
            if (doc.exists) {
                // console.log("Document data:", doc.data());
                resolve(doc.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
    })
}