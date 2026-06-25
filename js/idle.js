const IDLE_TIME = 30 * 60 * 1000;      // 30 menit
const WARNING_TIME = 29 * 60 * 1000;   // peringatan setelah 29 menit

let idleTimer;
let warningTimer;
let warningShown = false;

function resetIdleTimer(){

    clearTimeout(idleTimer);
    clearTimeout(warningTimer);

    warningShown = false;

    warningTimer = setTimeout(()=>{

        warningShown = true;

        alert(
            "Anda tidak melakukan aktivitas selama 29 menit.\n\nSistem akan logout otomatis dalam 1 menit."
        );

    }, WARNING_TIME);

    idleTimer = setTimeout(async()=>{

        try{

            await sb.auth.signOut();

        }catch(e){

            console.error(e);

        }

        sessionStorage.clear();

        // Hapus jika memang ingin menghapus seluruh localStorage
        // localStorage.clear();

        alert("Session berakhir karena tidak ada aktivitas.");

        location.href = "masuk.html";

    }, IDLE_TIME);

}

[
    "mousemove",
    "mousedown",
    "mouseup",
    "keydown",
    "keypress",
    "touchstart",
    "touchmove",
    "scroll",
    "click"
].forEach(event=>{

    document.addEventListener(
        event,
        resetIdleTimer,
        true
    );

});

window.addEventListener("load", resetIdleTimer);
window.addEventListener("focus", resetIdleTimer);
