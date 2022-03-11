import {
    signOut
}
from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";

const logoutB = document.querySelector('.logout');
logoutB.addEventListener('click', logout)

function logout() {
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    signOut(auth).then(() => {
        console.log("signed out");
    }).catch((error) => {
        console.log("error");
    });
}