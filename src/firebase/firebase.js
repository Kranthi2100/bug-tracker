import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyC6Uat6A7EgV0WawZLO7sc8EOEjIZJ59iY",
  authDomain: "bug-tracker-d7e5e.firebaseapp.com",
  databaseURL: "https://bug-tracker-d7e5e.firebaseio.com",
  projectId: "bug-tracker-d7e5e",
  storageBucket: "",
  messagingSenderId: "956762830274",
  appId: "1:956762830274:web:9fe76c868981eddd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();


export { firebase, database as default };
