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

function getPrizes(parentEmail, childName) {
    const dbRef = ref(db, 'people/' + parentEmail + '/prizes');

    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            console.log(childSnapshot.val());
            var description = childSnapshot.val().description;
            var name = childSnapshot.val().name;
            var cost = childSnapshot.val().cost;
            createPrizeDiv(description, name, cost, parentEmail, childName);
        });
    }, {
        onlyOnce: true
    });
}

function getAll() {
    const dbRef = ref(db)
    get(child(dbRef, 'people/' + getCookie("email"))).then((snapshot) => {
        console.log(snapshot.val());
        var childName = snapshot.val().name;
        var parentEmail = snapshot.val().parent;
        getPrizes(parentEmail, childName);
    }).catch((error) => {
        console.log(error)
    });
}

function createPrizeDiv(description, name, cost, parentEmail, childName) {
    var itemsContainer = document.querySelector(".prizes")
    var childDiv = document.createElement("div");
    var nameDiv = document.createElement("h2");
    var descriptionDiv = document.createElement("h4");
    var costDiv = document.createElement("h4");
    var button = document.createElement("button");

    nameDiv.innerHTML = name;
    descriptionDiv.innerHTML = description;
    costDiv.innerHTML = "Cost: " + cost;
    button.innerHTML = "Claim";

    childDiv.appendChild(nameDiv);
    childDiv.appendChild(descriptionDiv);
    childDiv.appendChild(costDiv);
    childDiv.appendChild(button);

    // to add css classes
    childDiv.classList.add('prize');
    nameDiv.classList.add('name');
    descriptionDiv.classList.add('desc');
    costDiv.classList.add('cost');
    button.classList.add('claim');
    // Buy item
    button.onclick = function () {
        console.log("clicked");
        const dbRef = ref(db)
        get(child(dbRef, 'people/' + getCookie("email"))).then((snapshot) => {
            console.log(snapshot.val());
            var money = snapshot.val().money;
            if (money < cost) {
                alert("You have too little money to buy this item! Do more tasks!");
            } else {
                const dbRef = ref(db, 'people/' + parentEmail + '/bought');
                push(dbRef, {
                    child: childName,
                    prize: name,
                    cost: cost,
                });

                const dbRef2 = ref(db, 'people/' + getCookie("email") + '/money');
                set(dbRef2, parseInt(money) - parseInt(cost));
                alert("You bought " + name + " and spent " + cost + "!");
            }
        }).catch((error) => {
            console.log(error)
        });

    };
    button.id = name;
    itemsContainer.appendChild(childDiv);
}