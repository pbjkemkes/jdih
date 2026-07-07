const SESSION_TIME = 30 * 60 * 1000; // 30 menit

setTimeout(async () => {

    try {
        await sb.auth.signOut();
    } catch (e) {
        console.error(e);
    }

    sessionStorage.clear();

    localStorage.clear();

    alert("Sesi login telah berakhir. Silakan login kembali.");

    location.href = "masuk.html";

}, SESSION_TIME);
