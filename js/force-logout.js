const SESSION_TIME = 30 * 60 * 1000; // 30 menit

(async () => {

    try {

        // Cek apakah user benar-benar sudah login
        const {
            data: { session },
            error
        } = await sb.auth.getSession();

        if (error || !session) {

            console.log("Belum ada session aktif.");

            return;
        }

        let loginTime =
            Number(sessionStorage.getItem("loginTime"));

        // Kalau session ada tetapi loginTime belum ada,
        // buat waktu login sekarang
        if (!loginTime) {

            loginTime = Date.now();

            sessionStorage.setItem(
                "loginTime",
                loginTime
            );

        }

        const elapsed =
            Date.now() - loginTime;

        const remaining =
            SESSION_TIME - elapsed;

        // Session sudah lebih dari 30 menit
        if (remaining <= 0) {

            await sb.auth.signOut();

            sessionStorage.clear();

            location.replace("masuk.html");

            return;
        }

        console.log(
            "Session tersisa:",
            Math.ceil(remaining / 60000),
            "menit"
        );

        // Logout ketika waktu habis
        setTimeout(async () => {

            try {

                await sb.auth.signOut();

            } catch (err) {

                console.error(
                    "Gagal logout:",
                    err
                );

            }

            sessionStorage.clear();

            alert(
                "Sesi login telah berakhir.\nSilakan login kembali."
            );

            location.replace("masuk.html");

        }, remaining);

    } catch (err) {

        console.error(
            "FORCE LOGOUT ERROR:",
            err
        );

    }

})();
