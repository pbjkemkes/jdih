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

        if (
            !sessionStorage.getItem("login_logged") &&
            location.pathname.endsWith("index.html")
        ) {

            const { error: logError } =
            await sb
            .from("access_log")
            .insert({

                email: user.email,

                halaman: location.pathname,

                browser: navigator.userAgent

            });

            if (!logError) {

                sessionStorage.setItem(
                    "login_logged",
                    "1"
                );

            } else {

                console.error(logError);

            }

        }

    } catch (err) {

        console.error(err);

        await sb.auth.signOut();

        sessionStorage.clear();

        location.replace("masuk.html");

    }

})();
