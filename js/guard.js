import { auth } from "./firebase-config.js";

import {
onAuthStateChanged
}
from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

onAuthStateChanged(auth,(user)=>{

if(!user){
    window.location="masuk.html";
    return;
}

if(!user.email.endsWith("@kemkes.go.id")){
    auth.signOut();
    window.location="masuk.html";
}

});
