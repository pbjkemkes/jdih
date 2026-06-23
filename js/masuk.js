document
.getElementById("loginForm")
.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const email =
document.getElementById("email").value.trim();

const password =
document.getElementById("password").value;

const {error}
=
await sb.auth.signInWithPassword({

email,
password

});

if(error){

alert(error.message);

}else{

location="index.html";

}

});
