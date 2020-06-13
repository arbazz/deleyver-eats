import firebase from '../index';


export default function getAllResturants(){
    return new Promise((resolve, reject) => {
        let data = [];
        firebase.firestore().collection("users").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                data.push({data: doc.data(), docId: doc.id});
            });
            resolve(data);
        });
        
    })
}

