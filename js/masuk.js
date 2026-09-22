document
.getElementById("loginForm")
.addEventListener(
"submit",
async (e) => {

    e.preventDefault();

    const email =
        document
        .getElementById("email")
        .value
        .trim();

    const password =
        document
        .getElementById("password")
        .value;

    const { error } =
        await sb.auth.signInWithPassword({

            email,
            password

        });

    if (error) {

        alert(error.message);

        return;

    }

    // =========================
    // WAKTU MULAI SESSION
    // =========================

    sessionStorage.setItem(
        "loginTime",
        Date.now()
    );

    sessionStorage.setItem(
        "login_logged",
        "0"
    );

    sessionStorage.setItem(
        "userEmail",
        email
    );

    // =========================
    // MASUK KE APLIKASI
    // =========================

    location.replace("index.html");

});
