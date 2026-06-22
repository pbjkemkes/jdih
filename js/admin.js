import { db } from "./firebase-config.js";

import {
collection,
getDocs,
query,
orderBy
}
from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const q=query(
collection(db,"access_log"),
orderBy("waktu","desc")
);

const snap=await getDocs(q);

let html="";

snap.forEach(doc=>{

const d=doc.data();

html+=`
<tr>
<td>${d.nama}</td>
<td>${d.email}</td>
<td>${d.waktu?.toDate()}</td>
</tr>
`;

});

tb.innerHTML=html;
