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
    push,
    onValue
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
const newT = document.querySelector('.newPrize');
newT.addEventListener('click', newPrize);
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

function newPrize() {
    let name = document.querySelector(".nameF").value
    let description = document.querySelector(".description").value
    let cost = document.querySelector(".cost").value

    const newPostKey = push(child(ref(db), 'people/' + getCookie("email") + '/prizes')).key;
    var data = {
        name: name,
        description: description,
        cost: cost
    };
    var updates = {};
    updates['people/' + getCookie("email") + '/prizes/' + newPostKey] = data;
    update(ref(db), updates).then((result) => {
        console.log("submitted to firebase");
        window.location.href = "../setPrizes.html";
    });
}

getAll();

function getAll() {
    const dbRef = ref(db, 'people/' + getCookie("email") + '/prizes');
    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            console.log(childSnapshot.val());
            var name = childSnapshot.val().name;
            var cost = childSnapshot.val().cost;
            var desc = childSnapshot.val().description;
            createPrizeDiv(name, cost, desc);
        });
    }, {
        onlyOnce: true
    });
}

function createPrizeDiv(name, cost, desc) {
    var itemsContainer = document.querySelector(".prizes")
    var childDiv = document.createElement("div");
    var nameDiv = document.createElement("h2");
    var descDiv = document.createElement("h4");
    var costDiv = document.createElement("h4");

    nameDiv.innerHTML = name;
    descDiv.innerHTML = desc;
    costDiv.innerHTML = "Cost: " + cost;

    childDiv.appendChild(nameDiv);
    childDiv.appendChild(descDiv);
    childDiv.appendChild(costDiv);

    // to add css classes
    childDiv.classList.add('prize');
    nameDiv.classList.add('name');
    costDiv.classList.add('cost');
    descDiv.classList.add('desc');

    itemsContainer.appendChild(childDiv);
}