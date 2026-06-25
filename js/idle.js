const IDLE_TIME = 30 * 60 * 1000;
const WARNING_TIME = 29 * 60 * 1000;

let idleTimer;
let warningTimer;
let countdownTimer;

function logout(){

    sb.auth.signOut().finally(()=>{

        sessionStorage.clear();

        location.href="masuk.html";

    });

}

function resetIdle(){

    clearTimeout(idleTimer);
    clearTimeout(warningTimer);
    clearInterval(countdownTimer);

    $("#idleModal").modal("hide");

    warningTimer=setTimeout(showWarning,WARNING_TIME);

    idleTimer=setTimeout(logout,IDLE_TIME);

}

function showWarning(){

    let sisa=60;

    document.getElementById("countdown").innerHTML=sisa;

    $("#idleModal").modal({

        backdrop:"static",

        keyboard:false

    });

    countdownTimer=setInterval(()=>{

        sisa--;

        document.getElementById("countdown").innerHTML=sisa;

        if(sisa<=0){

            clearInterval(countdownTimer);

        }

    },1000);

}

document
.getElementById("stayLogin")
.onclick=()=>{

    resetIdle();

};

document
.getElementById("logoutNow")
.onclick=()=>{

    logout();

};

[
"mousemove",
"mousedown",
"mouseup",
"keydown",
"keypress",
"scroll",
"touchstart",
"touchmove",
"click"
].forEach(evt=>{

    document.addEventListener(
        evt,
        resetIdle,
        true
    );

});

window.onload=resetIdle;
