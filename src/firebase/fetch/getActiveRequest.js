import firebase from '../index'

export default async function getOrderForResturant(uid) {
    return new Promise(async(resolve , reject) => {
        let data = [];
        await firebase.firestore().collection("requests").where("uid", "==", uid)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                data.push({docId: doc.id, data: doc.data()});
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        resolve(data);
    })


}