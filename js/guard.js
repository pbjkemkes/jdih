(async()=>{

    const {
        data:{user}
    } = await sb.auth.getUser();

    // Belum login
    if(!user){

        location="masuk.html";
        return;

    }

    // Hanya email Kemenkes
    if(!user.email.endsWith("@kemkes.go.id")){

        await sb.auth.signOut();

        location="masuk.html";

        return;

    }

    // Catat login sekali per session browser
    if(!sessionStorage.getItem("login_logged")){

        try{

            await sb
            .from("access_log")
            .insert({

                email:user.email,

                halaman:location.pathname

            });

            sessionStorage.setItem(
                "login_logged",
                "1"
            );

        }
        catch(err){

            console.error(
                "Gagal mencatat log:",
                err
            );

        }

    }

})();
