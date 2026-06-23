btnReset.onclick=async()=>{

const email =
document.getElementById("email")
.value.trim();

const {error}
=
await sb.auth.resetPasswordForEmail(
email,
{
redirectTo:
"https://pbjkemkes.github.io/jdih/reset-password.html"
}
);

if(error){

alert(error.message);

}
else{

alert(
"Tautan reset password telah dikirim"
);

}

}
