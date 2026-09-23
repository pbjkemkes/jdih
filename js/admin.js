(async () => {

    const {
        data,
        error
    } = await sb
        .from("access_log")
        .select("*")
        .order("login_time", {
            ascending: false
        });

    if (error) {

        console.error(
            "Gagal mengambil access_log:",
            error
        );

        alert(
            "Gagal membaca data login:\n" +
            error.message
        );

        return;
    }

    console.log("DATA ACCESS LOG:", data);

    let map = {};

    data.forEach(row => {

        const email = row.email;

        if (!email) return;

        if (!map[email]) {

            map[email] = {
                jumlah: 0,
                terakhir: row.login_time
            };

        }

        map[email].jumlah++;

        // Karena data sudah ORDER BY login_time DESC,
        // login pertama yang ditemukan adalah yang terbaru.
        if (
            row.login_time &&
            new Date(row.login_time) >
            new Date(map[email].terakhir)
        ) {

            map[email].terakhir =
                row.login_time;

        }

    });


    // ==========================
    // TOTAL USER
    // ==========================

    document.getElementById(
        "totalUser"
    ).textContent =
        Object.keys(map).length;


    // ==========================
    // TOTAL LOGIN
    // ==========================

    document.getElementById(
        "totalLogin"
    ).textContent =
        data.length;


    // ==========================
    // LOGIN HARI INI
    // ==========================

    const sekarang = new Date();

    const awalHari = new Date(
        sekarang.getFullYear(),
        sekarang.getMonth(),
        sekarang.getDate()
    );

    const akhirHari = new Date(
        sekarang.getFullYear(),
        sekarang.getMonth(),
        sekarang.getDate() + 1
    );

    const jumlahHariIni =
        data.filter(row => {

            if (!row.login_time)
                return false;

            const waktu =
                new Date(row.login_time);

            return (
                waktu >= awalHari &&
                waktu < akhirHari
            );

        }).length;


    document.getElementById(
        "loginHariIni"
    ).textContent =
        jumlahHariIni;


    // ==========================
    // TABEL
    // ==========================

    let html = "";

    Object.entries(map)
        .forEach(([email, user]) => {

            let loginTerakhir = "-";

            if (user.terakhir) {

                loginTerakhir =
                    new Date(
                        user.terakhir
                    ).toLocaleString(
                        "id-ID",
                        {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit"
                        }
                    );

            }

            html += `
                <tr>

                    <td>
                        ${email}
                    </td>

                    <td>
                        ${loginTerakhir}
                    </td>

                    <td>
                        ${user.jumlah}
                    </td>

                </tr>
            `;

        });


    document
        .querySelector("#tbl tbody")
        .innerHTML = html;


    // ==========================
    // EXPORT EXCEL
    // ==========================

    document
        .getElementById("excel")
        .addEventListener(
            "click",
            () => {

                const table =
                    document.getElementById("tbl");

                const workbook =
                    XLSX.utils.table_to_book(
                        table
                    );

                XLSX.writeFile(
                    workbook,
                    "log-user.xlsx"
                );

            }
        );


})();
