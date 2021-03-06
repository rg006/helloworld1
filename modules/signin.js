import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
}
from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";

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

const signInB = document.querySelector('.signin');
signInB.addEventListener('click', signIn);

function signIn() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            const email = user.email;
            console.log(email);
            var newEmail = email.replaceAll(".", "-");
            document.cookie = "email=" + newEmail;
            console.log("email=" + newEmail);
            window.location.href = "./home.html";
        }).catch((error) => {
            console.log(error);
        });
}
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
javascript
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'email', // Change to your recipient
  from: 'g.radh1ka2006@gmail.com', // Change to your verified sender
  subject: 'FINANCEBUD!',
  text: 'welcome to our web application',
  html: '<strong>help your child learn the importance of money!</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
