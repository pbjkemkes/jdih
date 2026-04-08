const url =
"https://script.google.com/macros/s/AKfycbxCOpXB2cR5se8ht1pNFOLx5zmCdhbgfvNXr8YZyOHQ2k19HOrwF4eXJymCCoCpODVs5Q/exec";


// ================= LOAD DATA SEKALI =================

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


// ================= DATATABLE =================

$("#tabelPeraturan").DataTable({

data:data, // 🔥 pakai data langsung

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

let badge = "";

if(row["Status"] === "Tidak Berlaku"){

badge = `
<br>
<span class="badge badge-tidak">
Tidak Berlaku
</span>
`;

}

return `
<a href="detail.html?id=${row.id}">
${data}
</a>
${badge}
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
<center>
<a href="${data}"
target="_blank"
title="Unduh PDF">

<i class="bi bi-file-earmark-pdf-fill"
style="font-size:18px;color:#d9534f;"></i>

</a>
</center>
`;

}else{

return "-";

}

}

}

],

language:{

processing:"Memuat...",

loadingRecords:"Memuat...",

lengthMenu:"Tampilkan _MENU_ peraturan",

zeroRecords:"Data tidak ditemukan",

info:"Menampilkan _START_ sampai _END_ dari _TOTAL_ peraturan",

infoEmpty:"Tidak ada data",

search:"Cari:",

paginate:{
next:"Berikutnya",
previous:"Sebelumnya"
}

}

});

});
