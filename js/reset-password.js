document
.getElementById("resetForm")
.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const password=
document
.getElementById("password")
.value;

const {error}
=
await sb.auth.updateUser({

password

});

if(error){

alert(error.message);

}
else{

alert(
"Password berhasil diganti"
);

location="masuk.html";

}

});
