import firebase from "firebase";

const config = {
    apiKey: "AIzaSyC5x8HE0PUnuQJ0uOpcdWSE5W2yKyvD7Ro",
    authDomain: "audit-5920a.firebaseapp.com",
    databaseURL: "https://audit-5920a.firebaseio.com",
    projectId: "audit-5920a",
    storageBucket: "",
    messagingSenderId: "279055103029",
    appId: "1:279055103029:web:62a8a02be869fe81"
};

const fire = firebase.initializeApp(config);

export default fire;