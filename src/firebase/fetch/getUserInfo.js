import firebase from '../index'

export default function getUserInfo(uid) {
    return new Promise((resolve , reject) => {
        firebase.firestore().collection("users").where("uid", "==", uid)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                resolve({docId: doc.id, data: doc.data()});
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    })


}