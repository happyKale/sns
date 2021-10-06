import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
// 인증정보!
    apiKey: "AIzaSyCYEnSLSvacTgOWjH76LhSGsivJqRBiwLc",
    authDomain: "react-deep-sns.firebaseapp.com",
    projectId: "react-deep-sns",
    storageBucket: "react-deep-sns.appspot.com",
    messagingSenderId: "606759415876",
    appId: "1:606759415876:web:95f717d035c0c42ca80c11",
    measurementId: "G-KC7XX21Q00"
};

firebase.initializeApp(firebaseConfig);
const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();

export { auth, apiKey };