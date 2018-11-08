import firebase from "firebase";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA4_TE8dODqi1pjSzNCjyT0kwFbazm9T4s",
    authDomain: "homers-ghost.firebaseapp.com",
    databaseURL: "https://homers-ghost.firebaseio.com",
    projectId: "homers-ghost",
    storageBucket: "homers-ghost.appspot.com",
    messagingSenderId: "783986607053"
  };

  const firebaseApp = firebase.initializeApp(config);
  firebaseApp.firestore().settings({ timestampsInSnapshots: true});

  export default firebaseApp;