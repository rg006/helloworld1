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
const newT = document.querySelector('.newTask');
newT.addEventListener('click', newTask);
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

function newTask() {
    let name = document.querySelector(".nameF").value
    let description = document.querySelector(".description").value
    let money = document.querySelector(".moneyF").value

    const newPostKey = push(child(ref(db), 'people/' + getCookie("email") + '/tasks')).key;
    var data = {
        name: name,
        description: description,
        money: money
    };
    var updates = {};
    updates['people/' + getCookie("email") + '/tasks/' + newPostKey] = data;
    update(ref(db), updates).then((result) => {
        console.log("submitted to firebase")
        window.location.href = "../setTasks.html";
    });

}

function newPrize() {
    let name = document.querySelector(".nameF").value
    let description = document.querySelector(".description").value
    let money = document.querySelector(".money").value

    const newPostKey = push(child(ref(db), 'people/' + getCookie("email") + '/prizes')).key;
    var data = {
        name: name,
        description: description,
        money: money
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
    const dbRef = ref(db, 'people/' + getCookie("email") + '/tasks');
    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            console.log(childSnapshot.val());
            var name = childSnapshot.val().name;
            var money = childSnapshot.val().money;
            console.log(money)
            var desc = childSnapshot.val().description;
            createTaskDiv(name, money, desc);
        });
    }, {
        onlyOnce: true
    });
}

function createTaskDiv(name, money, desc) {
    var itemsContainer = document.querySelector(".tasks")
    var childDiv = document.createElement("div");
    var nameDiv = document.createElement("h2");
    var descDiv = document.createElement("h4");
    var moneyDiv = document.createElement("h4");

    nameDiv.innerHTML = name;
    descDiv.innerHTML = desc;
    moneyDiv.innerHTML = "Earn: " + money;

    childDiv.appendChild(nameDiv);
    childDiv.appendChild(descDiv);
    childDiv.appendChild(moneyDiv);

    // to add css classes
    childDiv.classList.add('task');
    nameDiv.classList.add('name');
    moneyDiv.classList.add('money');
    descDiv.classList.add('desc');

    itemsContainer.appendChild(childDiv);
}