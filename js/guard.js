(async () => {

    try {

        const {
            data: { session },
            error: sessionError
        } = await sb.auth.getSession();

        if (sessionError) {
            throw sessionError;
        }

        if (!session) {
            location.replace("masuk.html");
            return;
        }

        const {
            data: { user },
            error: userError
        } = await sb.auth.getUser();

        if (userError) {
            throw userError;
        }

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

        // Jangan langsung redirect saat network error
        // supaya tidak redirect loop

    }

})();
