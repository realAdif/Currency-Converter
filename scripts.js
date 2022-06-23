var requestUrl = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=AUD,JPY,EUR&tryConversion=true'
var testUrl = 'https://v6.exchangerate-api.com/v6/cf8dd31c0dcdffdf669dd241/pair/EUR/USD/50.00';
var exchangeRate = document.querySelector('#rate');
var buttonEl = document.querySelector('#button');
var cryptoOption = document.querySelector('#optionCrypto');


function API(){
    fetch(testUrl)
    .then(function(r){
        console.log(r);
        r.json()
        .then(function(data){
            console.log(data);
        })
    })
}
API();

buttonEl.addEventListener('click',function(){
    
    console.log(cryptoOption.value);
    fetch(requestUrl)

    .then(function(r){
        console.log(r)
        r.json()
        .then(function(data){
            console.log(data);
           return exchangeRate.textContent = data.AUD
        })
    
    }) 
});

// This aditya line of code 
//chujun test




