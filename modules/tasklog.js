import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    push,
    onValue,
    get,
    child
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

getAll();

function getAll() {
    const dbRef = ref(db, 'people/' + getCookie("email") + '/done');
    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            console.log(childSnapshot.val());
            var name = childSnapshot.val().child;
            var earned = childSnapshot.val().earned;
            var task = childSnapshot.val().task;
            createTaskDiv(name, earned, task);
        });
    }, {
        onlyOnce: true
    });
}

function createTaskDiv(name, earned, task) {
    var itemsContainer = document.querySelector(".logs")
    var childDiv = document.createElement("div");
    var nameDiv = document.createElement("h2");
    var taskDiv = document.createElement("h4");
    var earnedDiv = document.createElement("h4");

    nameDiv.innerHTML = name;
    taskDiv.innerHTML = task;
    earnedDiv.innerHTML = "Earned: " + earned;

    childDiv.appendChild(nameDiv);
    childDiv.appendChild(taskDiv);
    childDiv.appendChild(earnedDiv);

    // to add css classes
    childDiv.classList.add('task');
    nameDiv.classList.add('name');
    earnedDiv.classList.add('money');
    taskDiv.classList.add('desc');

    itemsContainer.appendChild(childDiv);
}