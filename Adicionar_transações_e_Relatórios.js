//    Adicionar transações
const user = {
    name: "Mariana",
    transactions: [],
    balance: 0
  }
  
  const transaction = {
      type: "credit",
      value: 50.5
  }

  

  function createTransaction(TypeAndValue) {
    user.transactions.push(TypeAndValue)
    if (TypeAndValue.type == "credit"){
        user.balance += (TypeAndValue.value)
    } else {
        user.balance -= (TypeAndValue.value)
        }
    }

// createTransaction(transaction)

//Relatórios

// --------------------------------------------
function getHigherTransactionByType(typeOfTransaction){
    var HighestPayment = {}
	var highestPaymentToCompare = 0

	for(let listOfTransactions of user.transactions){
		if(listOfTransactions.type == typeOfTransaction && listOfTransactions.value > highestPaymentToCompare){
			highestPaymentToCompare = listOfTransactions.value
			HighestPayment = listOfTransactions
		}
    }
     console.log(HighestPayment)
}

// getHigherTransactionByType("credit") // Insert the type of transaction in parantheses

//---------------------------------------------------

function getAverageTransactionValue() {
    sum = 0

    for(const arrays of user.transactions){
        sum += arrays.value
        
    }
    
    console.log(sum / user.transactions.length)
}  

// getAverageTransactionValue(user)

//-------------------------------------------------------

function getTransactionsCount(){
    const total= {
        credit : 0,
        debit : 0
    }

        for(let arrays of user.transactions){
            switch(arrays.type) {
                case "credit": total.credit++;
                  break;
                case "debit": total.debit ++
                  break;
        }
    }
    console.log(total)
}

// getTransactionsCount(user)

createTransaction({ type: "credit", value: 50 });
createTransaction({ type: "credit", value: 120 });
createTransaction({ type: "debit", value: 80 });
createTransaction({ type: "debit", value: 30 });

console.log(user.balance); // 60

getHigherTransactionByType("credit"); // { type: 'credit', value: 120 }
getHigherTransactionByType("debit"); // { type: 'debit', value: 80 }

getAverageTransactionValue(); // 70

getTransactionsCount(); // { credit: 2, debit: 2 }
