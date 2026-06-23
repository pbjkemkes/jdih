document.getElementById("btnLogin")
.onclick = async()=>{

const email =
document.getElementById("email").value.trim();

const password =
document.getElementById("password").value;

if(!email.endsWith("@kemkes.go.id")){

alert("Gunakan email @kemkes.go.id");

return;

}

const {
data,
error
}
=
await sb.auth.signInWithPassword({

email,
password

});

if(error){

alert(error.message);

return;

}

location="index.html";

};
