// key untuk mengakses atau menyimpan data pada local storage
const CACHE_KEY = "calculation_history";

//fungsi checkForStorage() dengan mengembalikan nilai boolean dari pengecekan fitur Storage pada browser.
function checkForStorage() {
 return typeof(Storage) !== "undefined"
}

function putHistory(data) {
   if (checkForStorage()) {
       let historyData = null;
       if (localStorage.getItem(CACHE_KEY) === null) {
           historyData = [];
       } else {
           historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
       }
 
       historyData.unshift(data);
 
       if (historyData.length > 5) {
           historyData.pop();
       }
 
       localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
   }
}

function showHistory() {  // fungsi untuk mendapatkan data dari localStorage
   if (checkForStorage()) {
       return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
   } else {
       return [];
   }
}


// untuk merender data riwayat kalkulasi pada tabel html
function renderHistory() {
   const historyData = showHistory();
   let historyList = document.querySelector("#historyList");
 
 
   // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
   historyList.innerHTML = "";
 
 
   for (let history of historyData) {
       let row = document.createElement('tr');
       row.innerHTML = "<td>" + history.firstNumber + "</td>";
       row.innerHTML += "<td>" + history.operator + "</td>";
       row.innerHTML += "<td>" + history.secondNumber + "</td>";
       row.innerHTML += "<td>" + history.result + "</td>";
 
 
       historyList.appendChild(row);
   }
}

renderHistory(); //  agar data history muncul ketika website pertama kali dijalankan.




