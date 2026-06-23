const {error} =
await sb.auth.signUp({

    email,
    password,

    options:{
        data:{
            nama:nama
        },
        emailRedirectTo:
        "https://pbjkemkes.github.io/jdih/masuk.html"
    }

});
