import firebase from '../index';


export default function saveCharge(charge) {
    const uid = localStorage.getItem("uid")
  return new Promise((resolve, reject) => {
      firebase.firestore().collection("admin").doc("charge").set({
          isCharge: true,
          charge
      })
          .then(function (docRef) {
              resolve("true")
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
                resolve("false");
          });
  })
}