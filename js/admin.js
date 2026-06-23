(async()=>{

    const {data,error} =
    await sb
    .from("access_log")
    .select("*")
    .order(
        "login_time",
        {ascending:false}
    );

    if(error){

        console.error(error);
        return;

    }

    let map={};

    data.forEach(r=>{

        if(!map[r.email]){

            map[r.email]={

                jumlah:0,

                terakhir:r.login_time

            };

        }

        map[r.email].jumlah++;

    });

    // Total user unik
    document.getElementById(
        "totalUser"
    ).innerHTML=
    Object.keys(map).length;

    // Total login
    document.getElementById(
        "totalLogin"
    ).innerHTML=
    data.length;

    // Login hari ini
    const hariIni =
    new Date()
    .toISOString()
    .substring(0,10);

    document.getElementById(
        "loginHariIni"
    ).innerHTML =
    data.filter(
        x=>x.login_time.startsWith(hariIni)
    ).length;

    // Isi tabel
    let html="";

    Object.entries(map)
    .forEach(([email,v])=>{

        html += `
        <tr>

            <td>${email}</td>

            <td>
            ${new Date(
                v.terakhir
            ).toLocaleString()}
            </td>

            <td>${v.jumlah}</td>

        </tr>
        `;

    });

    document
    .querySelector("tbody")
    .innerHTML = html;

    // Export Excel
    document
    .getElementById("excel")
    .onclick = ()=>{

        const wb =
        XLSX.utils.table_to_book(
            document.getElementById("tbl")
        );

        XLSX.writeFile(
            wb,
            "log-user.xlsx"
        );

    };

})();
