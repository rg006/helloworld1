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

function getTasks(parentEmail, childName, currentMoney) {
    const dbRef = ref(db, 'people/' + parentEmail + '/tasks');

    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            console.log(childSnapshot.val());
            var description = childSnapshot.val().description;
            var name = childSnapshot.val().name;
            var money = childSnapshot.val().money;
            createTaskDiv(description, name, money, childName, parentEmail, currentMoney);
        });
    }, {
        onlyOnce: true
    });
}

function getAll() {
    const dbRef = ref(db)
    get(child(dbRef, 'people/' + getCookie("email"))).then((snapshot) => {
        console.log(snapshot.val());
        var parentEmail = snapshot.val().parent;
        var childName = snapshot.val().name;
        var money = snapshot.val().money;
        getTasks(parentEmail, childName, money);
    }).catch((error) => {
        console.log(error)
    });
}

function createTaskDiv(description, name, money, childName, parentEmail, currentMoney) {
    var itemsContainer = document.querySelector(".tasks")
    var childDiv = document.createElement("div");
    var nameDiv = document.createElement("h2");
    var descriptionDiv = document.createElement("h4");
    var moneyDiv = document.createElement("h4");
    var button = document.createElement("button");

    nameDiv.innerHTML = name;
    descriptionDiv.innerHTML = description;
    moneyDiv.innerHTML = "Earn: " + money;
    button.innerHTML = "Do this task";


    childDiv.appendChild(nameDiv);
    childDiv.appendChild(descriptionDiv);
    childDiv.appendChild(moneyDiv);
    childDiv.appendChild(button);

    // to add css classes
    childDiv.classList.add('task');
    nameDiv.classList.add('name');
    descriptionDiv.classList.add('desc');
    moneyDiv.classList.add('money');
    button.classList.add('button');
    // Buy item
    button.onclick = function () {
        console.log("clicked");
        const dbRef = ref(db, 'people/' + parentEmail + '/done');
        push(dbRef, {
            child: childName,
            task: name,
            earned: money,
        });
        const dbRef2 = ref(db, 'people/' + getCookie("email") + '/money');
        set(dbRef2, parseInt(money) + parseInt(currentMoney));
        alert("You did " + name + " and earned " + money + "!");
    };

    itemsContainer.appendChild(childDiv);
}