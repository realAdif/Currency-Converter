var requestUrlBTC = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=AUD,JPY,EUR&tryConversion=true'
var requestUrlETH = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=AUD,JPY,EUR&tryConversion=true'
var exchangeRate = document.querySelector('#rate');
var buttonEl = document.querySelector('#button');
var cryptoOption = document.querySelector('#optionCrypto');
console.log(cryptoOption);


buttonEl.addEventListener('click',function(){
    var requestUrl;
    cryptoOption.value;
    if(cryptoOption = 'BTC'){
        requestUrl = requestUrlBTC;
    }else{
        console.log("this works")
    }
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




