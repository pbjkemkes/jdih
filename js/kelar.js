import { auth, db } from "./firebase-config.js";

import {
isSignInWithEmailLink,
signInWithEmailLink
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
doc,
getDoc,
setDoc,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

if(isSignInWithEmailLink(auth,window.location.href)){

  let email =
  localStorage.getItem("emailForSignIn");

  if(!email){
      email = prompt("Masukkan email Anda");
  }

  const result =
  await signInWithEmailLink(
      auth,
      email,
      window.location.href
  );

  const user=result.user;

  const ref =
  doc(db,"authorized_users",user.email);

  const snap = await getDoc(ref);

  if(!snap.exists()){

      alert("Anda tidak memiliki hak akses");

      await auth.signOut();

      location="masuk.html";

  }else{

      await setDoc(
      doc(db,"access_log",crypto.randomUUID()),
      {
          nama:user.email,
          email:user.email,
          waktu:serverTimestamp()
      });

      location="index.html";
  }

}
