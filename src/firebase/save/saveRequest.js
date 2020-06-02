import firebase from '../index';
import moment from 'moment';

export default function saveRequest(item_name,
    item_price,
    pickup_address,
    cus_name,
    phone_number,
    city,
    cus_address,
    cus_note) {
        const uid = localStorage.getItem("uid");
        return new Promise((resolve, reject) => {
            firebase.firestore().collection("requests").add({
                item_name,
                item_price,
                pickup_address,
                cus_name,
                phone_number,
                city,
                cus_address,
                cus_note,
                uid,
                pending: true,
                timeStamp: new Date(),
                timeMoment: `${moment().get('date')}/${moment().get('month')+1}/${moment().get('year')}`
            })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    resolve("true")
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                    resolve("false")
                });
        })
}