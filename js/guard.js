(async () => {

    try {

        const {
            data: { user },
            error
        } = await sb.auth.getUser();

        if (error) {
            console.error("Gagal mengambil user:", error);
            location.replace("masuk.html");
            return;
        }

        // Belum login
        if (!user) {
            location.replace("masuk.html");
            return;
        }

        // Hanya email Kemenkes
        if (!user.email?.endsWith("@kemkes.go.id")) {

            await sb.auth.signOut();

            location.replace("masuk.html");
            return;
        }

        // Catat login sekali per session browser
        if (!sessionStorage.getItem("login_logged")) {

            const { error: logError } = await sb
                .from("access_log")
                .insert({
                    email: user.email,
                    halaman: location.pathname,
                    browser: navigator.userAgent,
                    login_date: new Date()
                        .toISOString()
                        .substring(0, 10)
                });

            if (logError) {
                console.error(
                    "Gagal mencatat log:",
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
            "Guard network error:",
            err
        );

        location.replace("masuk.html");

    }

})();
