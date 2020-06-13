import firebase from '../index';


export default function updateCustomer(docId, cus_name, phone_number, city, cus_address, cus_note) {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("customers").doc(docId).update({
            cus_name,
            phone_number,
            city,
            cus_address,
            cus_note
        })
            .then(function () {
                console.log("Document successfully updated!");
                resolve("true")
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                resolve("false")
            });
    })

}