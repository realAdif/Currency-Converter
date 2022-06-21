var requestUrl = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=AUD,JPY,EUR&tryConversion=true'
var exchangeRate = document.querySelector('#rate');
var buttonEl = document.querySelector('#button')
console.log(buttonEl);


buttonEl.addEventListener('click',function(){
    fetch(requestUrl)
    .then(function(r){
        r.json()
        .then(function(data){
            console.log(data);
           return exchangeRate.textContent = data.AUD
        })
    
    }) 
});




