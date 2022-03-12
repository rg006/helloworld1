import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";

import {
    getDatabase,
    ref,
    child,
    get,
    set,
    update,
    push
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
const newUser = document.querySelector('.newchild');
newUser.addEventListener('click', newChild);
const db = getDatabase();

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

function newChild() {
    let name = document.querySelector(".name").value
    let email = document.querySelector(".email").value
    let money = document.querySelector(".money").value

    if (name == "" || email == "" || money == "") {
        alert("All required fields must be filled!");
        return false;
    } else {
        set(ref(db, 'people/' + email.replaceAll(".", "-")), {
            type: 'child',
            name: name,
            money: 0,
            parent: getCookie("email"),
        });
        const newPostKey = push(child(ref(db), 'people/' + getCookie("email") + '/children')).key;
        const updates = {};
        updates['people/' + getCookie("email") + '/children/' + newPostKey] = email;
        update(ref(db), updates)
        console.log("submitted to firebase")
        window.location.href = "../add.html";
    }
}