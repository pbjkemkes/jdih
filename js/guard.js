(async () => {

    try {

        const {
            data: { session },
            error
        } = await sb.auth.getSession();

        if (error || !session) {

            location.replace("masuk.html");
            return;

        }

        const user = session.user;

        if (!user?.email?.endsWith("@kemkes.go.id")) {

            await sb.auth.signOut();

            sessionStorage.clear();

            location.replace("masuk.html");

            return;
        }

        // =====================================
        // CATAT LOGIN HANYA SEKALI PER SESSION
        // =====================================

        const sudahDicatat =
            sessionStorage.getItem("login_logged");

        if (sudahDicatat !== "1") {

            const { error: logError } =
            await sb
                .from("access_log")
                .insert({

                    email: user.email,

                    halaman: location.pathname,

                    browser: navigator.userAgent

                });

            if (logError) {

                console.error(
                    "Gagal mencatat login:",
                    logError
                );

            } else {

                sessionStorage.setItem(
                    "login_logged",
                    "1"
                );

            }

        }

    } catch (err) {

        console.error(
            "GUARD ERROR:",
            err
        );

    }

})();
