document.getElementById("loginForm")
.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    if(!email.endsWith("@kemkes.go.id")){
        alert("Gunakan email @kemkes.go.id");
        return;
    }

    const { error } =
    await sb.auth.signInWithPassword({

        email,
        password

    });

    if(error){

        alert(error.message);
        return;

    }

    location = "index.html";

});
