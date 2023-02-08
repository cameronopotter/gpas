// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhD3cnK71MuTFntSTugo_6ik8hhA4hJlU",
  authDomain: "griffinpools-744bb.firebaseapp.com",
  databaseUrl: "https://griffinpools-744bb-default-rtdb.firebaseio.com/",
  projectId: "griffinpools-744bb",
  storageBucket: "griffinpools-744bb.appspot.com",
  messagingSenderId: "935982003234",
  appId: "1:935982003234:web:65bbecf5d89808563c467b"
};

// Initialize Firebase

let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
    firebase.firestore().settings({ experimentalForceLongPolling: true, merge:true }); //add this..

}
else{
    app = firebase.app()
}

const auth = firebase.auth()

const database = getDatabase(app);


export { auth };
