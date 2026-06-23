document
.getElementById("registerForm")
.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const nama =
document.getElementById("nama").value.trim();

const email =
document.getElementById("email").value.trim();

const password =
document.getElementById("password").value;

const password2 =
document.getElementById("password2").value;

if(!email.endsWith("@kemkes.go.id")){

alert(
"Gunakan email @kemkes.go.id"
);

return;

}

if(password!==password2){

alert(
"Konfirmasi password tidak sama"
);

return;

}

const {error}
=
await sb.auth.signUp({

email,
password,

options:{

data:{

nama:nama

},

emailRedirectTo:
"https://pbjkemkes.github.io/jdih/masuk.html"

}

});

if(error){

alert(error.message);

}else{

alert(
"Registrasi berhasil.\nSilakan cek email Anda untuk verifikasi akun."
);

location="masuk.html";

}

});
