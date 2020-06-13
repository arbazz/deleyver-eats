
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';  // <----

import signup from './auth/signup';
import checkuser from './auth/checkuser';
import saveuser from './save/saveuser';
import updateNumber from './update/updateNumber';
import getUserInfo from './fetch/getUserInfo';
import saveRestUser from './save/saveRestUser';
import signIn from './auth/signIn';
import saveImage from './storage/saveImage';
import saveImageToDb from './save/saveImageToDb';
import saveRequest from './save/saveRequest';
import getOrderForResturant from './fetch/getOrdersForResturant';
import saveCus from './save/saveCus';
import getCustomers from './fetch/getCustomer';
import updateCustomer from './update/updateCustomer';
import deleterMain from './delete/mainDelete';
import getAllResturants from './fetch/getAllResturants';
import updateResturants from './update/updateResturnats';
import updateRiderByAdmin from './update/updateRiderByAdmin';
import signOut from './auth/signOut';
import updateStatusOfRider from './update/updateStatusOfRider';
import getAllOrders from './fetch/getAllOrders';
import saveCharge from './save/saveCharge';
import getCharge from './fetch/getCharge';
import getRequestForRider from './fetch/getRequestForRider';
import updateStatusOfRequestByRider from './update/updateStatusOfRequestByRider';
import checkCurrentStatusOfRequest from './check/checkCurrentStatusOfRequest';
import getActiveRequestForRider from './fetch/getActiveRequestForRider';
import getInfoForRiderMap from './fetch/getInfoForRiderMap';

var firebaseConfig = {
    apiKey: "AIzaSyC4Ncgn4mFhO6AVObcLd5ElYp9t5arlZuw",
    authDomain: "deleyver-eats.firebaseapp.com",
    databaseURL: "https://deleyver-eats.firebaseio.com",
    projectId: "deleyver-eats",
    storageBucket: "deleyver-eats.appspot.com",
    messagingSenderId: "640371610908",
    appId: "1:640371610908:web:26e8790832316d7c8696d9",
    measurementId: "G-LP2SS8Y9TX"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    firebase.firestore();
    firebase.storage();
};
// Initialize Firebase

export default firebase;

export {
    signup,
    checkuser,
    saveuser,
    getUserInfo,
    updateNumber,
    saveRestUser,
    signIn,
    saveImage,
    saveImageToDb,
    saveRequest,
    getOrderForResturant,
    saveCus,
    getCustomers,
    signOut,
    updateCustomer,
    deleterMain,
    getAllResturants,
    updateResturants,
    updateRiderByAdmin,
    updateStatusOfRider,
    getAllOrders,
    saveCharge,
    getCharge,
    getRequestForRider,
    updateStatusOfRequestByRider,
    checkCurrentStatusOfRequest,
    getActiveRequestForRider,
    getInfoForRiderMap
};