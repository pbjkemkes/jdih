const SESSION_TIME = 30 * 60 * 1000; // 30 menit

(async()=>{

    const loginTime =
    Number(sessionStorage.getItem("loginTime"));

    if(!loginTime){

        location.href = "masuk.html";
        return;
    }

    const elapsed =
    Date.now() - loginTime;

    const remaining =
    SESSION_TIME - elapsed;

    if(remaining <= 0){

        await sb.auth.signOut();

        sessionStorage.clear();

        location.href = "masuk.html";

        return;

    }

    setTimeout(async()=>{

        alert(
            "Sesi login telah berakhir.\nSilakan login kembali."
        );

        await sb.auth.signOut();

        sessionStorage.clear();

        location.href = "masuk.html";

    }, remaining);

})();
