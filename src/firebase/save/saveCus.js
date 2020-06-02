import firebase from '../index';


export default function saveCus(cus_name, phone_number, city, cus_address, cus_note) {
    const uid = localStorage.getItem("uid")
  return new Promise((resolve, reject) => {
      firebase.firestore().collection("customers").add({
          cus_name,
          phone_number,
          city,
          cus_address,
          cus_note,
          uid
      })
          .then(function (docRef) {
              console.log("Document written with ID: ", docRef.id);
              resolve("true")
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
                resolve("false");
          });
  })
}