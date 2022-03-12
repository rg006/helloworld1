import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";

import {
    onAuthStateChanged,
    GoogleAuthProvider,
    getAuth
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAg39hT1_oKHFXqki2sWrqqIcrL1VYc43c",
    authDomain: "helloworld1-bccf0.firebaseapp.com",
    databaseURL: "https://helloworld1-bccf0-default-rtdb.firebaseio.com",
    projectId: "helloworld1-bccf0",
    storageBucket: "helloworld1-bccf0.appspot.com",
    messagingSenderId: "216126944055",
    appId: "1:216126944055:web:03b91e015ec392ce2560b2"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

// If not signed in, redirect
onAuthStateChanged(auth, (user) => {
    if (!user) {
        console.log("Not signed in");
        window.location.href = "./index.html";
    }
});