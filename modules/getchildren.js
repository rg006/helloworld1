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

getC();

function getC() {
    const dbRef = ref(db, 'people/' + getCookie("email") + '/children');

    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var childEmail = childSnapshot.val();
            getChildren(childEmail.replaceAll(".", "-"));
        });
    }, {
        onlyOnce: true
    });
}

function getChildren(email) {
    const dbRef = ref(db)
    get(child(dbRef, 'people/' + email)).then((snapshot) => {
        console.log(snapshot.val());
        var name = snapshot.val().name;
        var money = snapshot.val().money;
        createChildrenDiv(name, email.replaceAll("-", "."), money);
    }).catch((error) => {
        console.log(error)
    });
}

function createChildrenDiv(name, email, money) {
    var itemsContainer = document.querySelector(".items-container")
    var childDiv = document.createElement("div");
    var nameDiv = document.createElement("h2");
    var emailDiv = document.createElement("h4");
    var moneyDiv = document.createElement("h4");
    var image = document.createElement("img");

    nameDiv.innerHTML = name;
    emailDiv.innerHTML = email;
    moneyDiv.innerHTML = money;

    var imgArr = ["../assets/image3.png", "../assets/image5.png", "../assets/image6.png", "../assets/image7.png"]
    image.src = imgArr[Math.floor(Math.random() * imgArr.length)];

    childDiv.appendChild(nameDiv);
    childDiv.appendChild(image);
    childDiv.appendChild(emailDiv);
    childDiv.appendChild(moneyDiv);

    // to add css classes
    childDiv.classList.add('child');
    nameDiv.classList.add('name');
    emailDiv.classList.add('email');
    moneyDiv.classList.add('money');
    image.classList.add("childImage");


    itemsContainer.appendChild(childDiv);
}