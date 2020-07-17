
const calculator = {
   displayNumber: '0',
   operator: null,
   firstNumber: null,
   waitingForSecondNumber: false
};

 // fungsi untuk mengupdate angka pada layar dn menghapus data pada kalkulator
 function updateDisplay() {
   document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}
 
function clearCalculator() {
   calculator.displayNumber = '0';
   calculator.operator = null;
   calculator.firstNumber = null;
   calculator.waitingForSecondNumber = false;
}

// fungsi untuk memasukan angka ke dalam nilai displayNumber kalkulator
function inputDigit(digit) {
	if (calculator.waitingForSecondNumber && calculator.firstNumber === calculator.displayNumber) {
           calculator.displayNumber = digit;
   } else {
		if (calculator.displayNumber === '0') {  // agar kalkulator tdk menampilkan angka 0 di awal bilangan lagi.
			calculator.displayNumber = digit;
	   } else {
		calculator.displayNumber += digit;
		}
   }
}

// fungsi untuk menjalankan operasi (+-=)
function inverseNumber() {
   if (calculator.displayNumber === '0') {
       return;
   }
   calculator.displayNumber = calculator.displayNumber * -1;
}

// fungsi untuk menetapkan sebuah operator
function handleOperator(operator) {
   if (!calculator.waitingForSecondNumber) {
       calculator.operator = operator;
       calculator.waitingForSecondNumber = true;
       calculator.firstNumber = calculator.displayNumber;
   } else {
       alert('Operator sudah ditetapkan')
   }
}

function performCalculation() {
   if (calculator.firstNumber == null || calculator.operator == null) {
       alert("Anda belum menetapkan operator");
       return;
   }
 
   let result = 0;
   if (calculator.operator === "+") {
       result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
   } else {
       result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
   }
   
   // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
   const history = {
       firstNumber: calculator.firstNumber,
       secondNumber: calculator.displayNumber,
       operator: calculator.operator,
       result: result
   }
   putHistory(history);
   calculator.displayNumber = result;
   renderHistory();
}

// buat variable button dan  event clik pada tiap element
// Untuk mendapatkan nilai seluruh elemen button kita gunakan querySelectorAll(“#button”) kemudian kita looping nilainya dan berikan event click pada tiap itemnya.

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
   button.addEventListener('click', function(event) {
 
       // mendapatkan objek elemen yang diklik
       const target = event.target;
	   
	   // untuk proses operasi
	   if(target.classList.contains('clear')) {
           clearCalculator();
           updateDisplay();
           return;
       }
	   
	   if(target.classList.contains('negative')) {
           inverseNumber();
           updateDisplay();
           return;
       }
 
       if(target.classList.contains('equals')) {
           performCalculation();
           updateDisplay();
           return;
       }
 
       if(target.classList.contains('operator')) {
           handleOperator(target.innerText)
           updateDisplay();
           return;
       } 
 
       inputDigit(target.innerText);
       updateDisplay()
   });
}


