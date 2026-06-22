// js/firebase-config.js

import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyCJ6vhWRd7Kw7o24yus8zP22HViIcral7k",

  authDomain: "jdih-biro-pbj.firebaseapp.com",

  projectId: "jdih-biro-pbj",

  storageBucket: "jdih-biro-pbj.firebasestorage.app",

  messagingSenderId: "576809704014",

  appId: "1:576809704014:web:2fed889d5c1b5ab757811f"

};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
