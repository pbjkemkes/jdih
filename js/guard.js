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

await sb
.from("access_log")
.insert({

email:user.email

});

})();
