document.getElementById("btnLogin")
.onclick = async ()=>{

const email =
document.getElementById("email").value.trim();

if(!email.endsWith("@kemkes.go.id")){

alert("Gunakan email @kemkes.go.id");

return;

}

const {error}=await sb.auth.signInWithOtp({

email,

options:{

emailRedirectTo:
"https://pbjkemkes.github.io/jdih/index.html"

}

});

if(error){

alert(error.message);

}

else{

alert("Link login telah dikirim ke email Anda");

}

}
