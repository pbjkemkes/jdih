const url =
"https://script.google.com/macros/s/AKfycbxz4T5u8G9R_mf43WjEnGBFhAWOIIiwSgNhZ0D9eqZyN3YQOnJjOY_oRoX_4CUIKV8kGQ/exec";



// ================= LOAD DATA =================

fetch(url)

.then(res => res.json())

.then(result => {

const data = result.data;



// ================= STATISTIK =================

document.getElementById("totalData").innerText =
data.length;



let berlaku = 0;
let tidak = 0;



data.forEach(row => {

if(row["Status"] == "Berlaku") berlaku++;
if(row["Status"] == "Tidak Berlaku") tidak++;

});



document.getElementById("totalBerlaku").innerText =
berlaku;

document.getElementById("totalTidak").innerText =
tidak;



// ================= CHART TAHUN =================

let tahunMap = {};

data.forEach(row => {

let th = row["Tahun"] || "Tidak diketahui";

tahunMap[th] =
(tahunMap[th] || 0) + 1;

});



new Chart(

document.getElementById("chartTahun"),

{

type:"bar",

data:{

labels:Object.keys(tahunMap),

datasets:[

{

label:"Jumlah Peraturan",

data:Object.values(tahunMap)

}

]

}

}

);



// ================= CHART JENIS =================

let jenisMap = {};

data.forEach(row => {

let jenis =
row["jenis"] || "Tidak diketahui";

jenisMap[jenis] =
(jenisMap[jenis] || 0) + 1;

});



new Chart(

document.getElementById("chartJenis"),

{

type:"pie",

data:{

labels:Object.keys(jenisMap),

datasets:[

{

data:Object.values(jenisMap)

}

]

}

}

);

});



// ================= DATATABLE =================

$(document).ready(function(){

$("#tabelPeraturan").DataTable({

ajax:{
url:url,
dataSrc:"data"
},

pageLength:10,

lengthMenu:[10,25,50,100],

order:[[0,"asc"]],

columns:[

// Nomor otomatis

{
data:null,

render:function(data,type,row,meta){

return meta.row + 1;

}

},

// Nama

{
data:"Nama Peraturan",

render:function(data,type,row){

return `
<a href="detail.html?id=${row.id}">
${data}
</a>
`;

}

},

// Jenis

{
data:"jenis"
},

// Tanggal

{
data:"Tanggal Penetapan"
},

// Download

{
data:"url_",

render:function(data){

if(data){

return `
<center><a href="${data}"
target="_blank"
title="Unduh PDF">

<i class="fa-solid fa-file-pdf"
style="font-size:18px;color:#d9534f;"></i>

</a></center>
`;

}else{

return "-";

}

}

},

],

language:{

processing:
"Memuat...",

loadingRecords:
"Memuat...",

lengthMenu:
"Tampilkan _MENU_ peraturan",

zeroRecords:
"Data tidak ditemukan",

info:
"Menampilkan _START_ sampai _END_ dari _TOTAL_ peraturan",

infoEmpty:
"Tidak ada data",

search:
"Cari:",

paginate:{

next:"Berikutnya",

previous:"Sebelumnya"

}

}

});

});
