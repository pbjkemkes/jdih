(async()=>{

const {
data:{user}
}=await sb.auth.getUser();

if(user){

document.getElementById("userName")
.innerHTML=user.email;

}

})();
