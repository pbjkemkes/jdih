// js/firebase-config.js

import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "xxxxxxxx",
  authDomain: "xxxxxxxx.firebaseapp.com",
  projectId: "xxxxxxxx",
  storageBucket: "xxxxxxxx.appspot.com",
  messagingSenderId: "xxxxxxxx",
  appId: "xxxxxxxx"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
