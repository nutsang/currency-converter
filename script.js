let selectFrom = document.getElementById('from');
let selectTo = document.getElementById('to');
let inpAmount = document.getElementById('amount');
let displayExchangeRate = document.getElementById('exchange-rate');
let btnSwap = document.getElementById("btn-swap");
let rates = 0
function updateRates(){
    console.log("Hello")
    displayExchangeRate.innerText = inpAmount.value + " " + selectFrom.value + " เท่ากับ " + ((inpAmount.value/rates[selectFrom.value])*rates[selectTo.value]).toFixed(3) +" "+ selectTo.value
}
function setDefault(){
    inpAmount.value = 1
    displayExchangeRate.innerText = inpAmount.value + " " + selectFrom.value + " เท่ากับ " + ((inpAmount.value/rates[selectFrom.value])*rates[selectTo.value]).toFixed(3) +" "+ selectTo.value
}
function selectSwap(){
    let temp = selectFrom.value;
    selectFrom.value = selectTo.value;
    selectTo.value = temp;
}

async function getRates(){
    let selectFromOptions = ''
    let selectToOptions = ''
    const response = await fetch('http://data.fixer.io/api/latest?access_key=90add0a60e299e3a59cfbc356d57fd81');
    const data = await response.json();
    rates = data.rates;
    for(const currency in data.rates){
        if(currency === 'THB'){
            selectFromOptions+='<option value="'+currency+'" selected>'+currency+'</option>'
        }else{
            selectFromOptions+='<option value="'+currency+'">'+currency+'</option>'
        }
    }
    for(const currency in data.rates){
        if(currency === 'USD'){
            selectToOptions+='<option value="'+currency+'" selected>'+currency+'</option>'
        }else{
            selectToOptions+='<option value="'+currency+'">'+currency+'</option>'
        }
    }
    selectFrom.innerHTML = selectFromOptions
    selectTo.innerHTML = selectToOptions
    setDefault()
}
getRates()

btnSwap.addEventListener("click", selectSwap);
btnSwap.addEventListener("click", updateRates);
selectFrom.addEventListener("change", updateRates);
selectTo.addEventListener("change", updateRates);
inpAmount.addEventListener("change", updateRates);