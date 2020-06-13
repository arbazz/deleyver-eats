import firebase from '../index';

export default function getAllOrders(){
    return new Promise((resolve, reject) => {
        let data = [];
        firebase.firestore().collection("requests").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                data.push({data: doc.data(), docId: doc.id});
            });
            resolve(data);
        });
        
    })
}