import { auth, db } from "./firebase-config.js";

import {
GoogleAuthProvider,
signInWithPopup
}
from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
collection,
addDoc,
serverTimestamp
}
from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const provider = new GoogleAuthProvider();

document.getElementById("loginBtn")
.addEventListener("click", async ()=>{

const result = await signInWithPopup(auth,provider);

const user=result.user;

if(!user.email.endsWith("@kemkes.go.id")){
    alert("Hanya email Kemenkes");
    await auth.signOut();
    return;
}

await addDoc(collection(db,"access_log"),{
    nama:user.displayName,
    email:user.email,
    waktu:serverTimestamp()
});

window.location="index.html";

});
