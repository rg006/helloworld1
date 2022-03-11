import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";

import {
    onAuthStateChanged,
    GoogleAuthProvider,
    getAuth,
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";

import {
    getDatabase,
    ref,
    child,
    get,
    set
}
from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";

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
const db = getDatabase();
const dbRef = ref(getDatabase());


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            console.log(c.substring(name.length, c.length));
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


// If not signed in, redirect
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "./index.html";
    }
});

// Check user type
get(child(dbRef, `people/${getCookie("email")}`)).then((snapshot) => {
    // If user exists
    if (snapshot.exists()) {
        console.log(snapshot.val());
        var type = snapshot.val().type;
        if (type == "parent") {
            window.location.href = "./parent.html";
        } else {
            window.location.href = "./child.html";
        }
    } else {
        // Create user if doesn't exist
        set(ref(db, 'people/' + getCookie("email")), {
            type: 'parent',
            children: [],
        });
    }
}).catch((error) => {
    console.log(error)
});