import { auth } from "./firebase-config.js";

import {
sendSignInLinkToEmail
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const actionCodeSettings = {
  url: "https://pbjkemkes.github.io/jdih/kelar.html",
  handleCodeInApp: true
};

document.getElementById("btnLogin").onclick = async () => {

  try {

    const email =
      document.getElementById("email").value.trim();

    if (!email.endsWith("@kemkes.go.id")) {
      alert("Gunakan email @kemkes.go.id");
      return;
    }

    await sendSignInLinkToEmail(
      auth,
      email,
      actionCodeSettings
    );

    localStorage.setItem("emailForSignIn", email);

    alert("Tautan telah dikirim. Cek email Anda");

  } catch (err) {

    console.error(err);

    alert(
      err.code + "\n\n" +
      err.message
    );

  }

};
