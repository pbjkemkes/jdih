(async()=>{

const {

data:{user}

}
=
await sb.auth.getUser();

if(!user){

location="masuk.html";

return;

}

if(!user.email.endsWith("@kemkes.go.id")){

await sb.auth.signOut();

location="masuk.html";

return;

}

await sb
.from("access_log")
.insert({

email:user.email

});

})();
