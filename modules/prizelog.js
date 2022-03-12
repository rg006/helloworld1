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
    const dbRef = ref(db, 'people/' + getCookie("email") + '/bought');
    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            console.log(childSnapshot.val());
            var name = childSnapshot.val().child;
            var cost = childSnapshot.val().cost;
            var prize = childSnapshot.val().prize;
            createPrizeDiv(name, cost, prize);
        });
    }, {
        onlyOnce: true
    });
}

function createPrizeDiv(name, cost, prize) {
    var itemsContainer = document.querySelector(".logs")
    var childDiv = document.createElement("div");
    var nameDiv = document.createElement("h2");
    var prizeDiv = document.createElement("h4");
    var costDiv = document.createElement("h4");

    nameDiv.innerHTML = name;
    prizeDiv.innerHTML = prize;
    costDiv.innerHTML = "Cost: " + cost;

    childDiv.appendChild(nameDiv);
    childDiv.appendChild(prizeDiv);
    childDiv.appendChild(costDiv);

    // to add css classes
    childDiv.classList.add('prize');
    nameDiv.classList.add('name');
    costDiv.classList.add('cost');
    prizeDiv.classList.add('desc');

    itemsContainer.appendChild(childDiv);
}