(async()=>{

const {data,error} =
await sb
.from("access_log")
.select("*")
.order(
"login_time",
{
ascending:false
});

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

document.getElementById(
"totalUser"
).innerHTML=
Object.keys(map).length;

document.getElementById(
"totalLogin"
).innerHTML=
data.length;

const hariIni=
new Date()
.toISOString()
.substring(0,10);

document.getElementById(
"loginHariIni"
).innerHTML=
data.filter(
x=>x.login_date==hariIni
).length;

let html="";

Object.entries(map)
.forEach(([email,v])=>{

html+=`

<tr>

<td>${email}</td>

<td>
${new Date(
v.terakhir
).toLocaleString()}
</td>

<td>
${v.jumlah}
</td>

</tr>

`;

});

document
.querySelector("tbody")
.innerHTML=html;

excel.onclick=()=>{

const wb=
XLSX.utils.table_to_book(
tbl
);

XLSX.writeFile(
wb,
"log-user.xlsx"
);

};

})();
