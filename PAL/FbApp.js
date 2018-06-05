import * as firebase from "firebase";
const config = {
    apiKey: "AIzaSyDA_RXtRHQI4IlCK-M2r9wgyBMYBFgs4m4",
    authDomain: "pal394-a6f1f.firebaseapp.com",
    databaseURL: "https://pal394-a6f1f.firebaseio.com",
    projectId: "pal394-a6f1f",
    storageBucket: "",
    messagingSenderId: "33475295035"
};
export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
