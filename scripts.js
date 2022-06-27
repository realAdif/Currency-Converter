// var currencyAPI = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=AUD,JPY,EUR&tryConversion=true';

// currency Elements
var exchangeRate = document.querySelector('#rate');
var buttonEl = document.querySelector('#button');
var toCurrencyEl = document.querySelector('#ToCurrency');
var formCurrencyEl = document.querySelector('#FormnCurrency');
var conversionRateEl = document.querySelector("#rate");
var conversionResultEl = document.querySelector("#result");
var currencyAmountEl = document.querySelector('#amount');
// news Elements 
var newsEl = document.getElementById('newsList');
var pageNumber = document.getElementById('page');
var prevButton = document.getElementById('btn_prev');
var nextButton = document.getElementById('btn_next');

// All of Currency Functions
buttonEl.addEventListener('click', function () {
   
    if(toCurrencyEl.value == formCurrencyEl.value){
        alert("You can not convert the same currency");
    }else{
        var toCurrency = toCurrencyEl.value;
        var formCurrency = formCurrencyEl.value;
        var currencyAmount = currencyAmountEl.value;
        var currencyAPI = 'https://v6.exchangerate-api.com/v6/cf8dd31c0dcdffdf669dd241/pair/'+toCurrency+'/'+formCurrency+'/'+currencyAmount;
        fetch(currencyAPI)
        .then(function(response){
        if(response.ok){
            response.json()
            .then(function(data){
                conversionRateEl.textContent = data.conversion_rate
                conversionResultEl.textContent = "$" + data.conversion_result
            })
        }else{
            alert('Error:', response.statusText);
        }
    })
    }
    localStorage.setItem('from',formCurrency);
    localStorage.setItem('to',toCurrency);
    var to = localStorage.getItem('to');
    var from = localStorage.getItem('from');
    console.log(to);
    console.log(from);
    toCurrencyEl.value = to;
    formCurrencyEl.value = from;
    
});


// All of News functions
var newsItems = []
function getNews() {
    var newsUrl = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
    fetch(newsUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                newsItems = data.Data;
                changePage(1);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
};
var newsLinksContainer = document.getElementById("newsLinks");

getNews();
var current_page = 1;
var records_per_page = 5;



prevButton.addEventListener('click', function prevPage() {
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
})
nextButton.addEventListener('click', function nextPage() {
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
})
function changePage(page) {
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();
    newsEl.innerHTML = "";
    for (var i = (page - 1) * records_per_page; i < (page * records_per_page); i++) {
        var newsLink = document.createElement('li');
        var newsLinkEl = document.createElement('a')
        newsLinkEl.setAttribute('href', newsItems[i].guid);
        var newsTitleEl = document.createElement('span');
        newsTitleEl.innerHTML = newsItems[i].title;
        newsLinkEl.appendChild(newsTitleEl);
        newsLink.appendChild(newsLinkEl);
        newsEl.appendChild(newsLink)
    }
    pageNumber.innerHTML = page;

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages() {
    if (newsItems.length !== 0) {
        return Math.ceil(newsItems.length / records_per_page);
    }
}