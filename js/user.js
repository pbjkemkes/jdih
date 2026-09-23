(async()=>{

    const {
        data:{user}
    } = await sb.auth.getUser();

    const userName =
        document.getElementById("userName");

    if(user && userName){

        userName.textContent =
            user.email;

    }

})();
