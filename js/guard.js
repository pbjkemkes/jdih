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

            location.replace("masuk.html");
            return;

        }

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

        console.error("GUARD ERROR:", err);

    }

})();
