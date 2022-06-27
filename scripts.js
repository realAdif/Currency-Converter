// var currencyAPI = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=AUD,JPY,EUR&tryConversion=true';

// currency Elements
var exchangeRate = document.querySelector('#rate');
var buttonEl = document.querySelector('#button');
var toCurrencyEl = document.querySelector('#toCurrency');
var fromCurrencyEl = document.querySelector('#fromCurrency');
var conversionRateEl = document.querySelector("#rate");
var conversionResultEl = document.querySelector("#result");
var currencyAmountEl = document.querySelector('#amount');
var apiKeys = ['86b58b13edb4f7f71b662093', 'acc8143fb7c97c624d135788', '283ca082e3eb50ce3de7d61c'];
var errorEl = document.getElementById('error')
// news Elements 
var newsEl = document.getElementById('newsList');
var pageNumber = document.getElementById('page');
var prevButton = document.getElementById('btn_prev');
var nextButton = document.getElementById('btn_next');

// All of Currency Functions
buttonEl.addEventListener('click', function () {

    if (toCurrencyEl.value == fromCurrencyEl.value) {
        errorEl.style.display ='block';
    }else{
        errorEl.style.display ='none';
        var toCurrency = toCurrencyEl.value;
        var fromCurrency = fromCurrencyEl.value;
        var currencyAmount = currencyAmountEl.value;
        var currencyAPI = 'https://v6.exchangerate-api.com/v6/' + apiKeys[0] + '/pair/' + fromCurrency + '/' + toCurrency + '/' + currencyAmount;
        fetch(currencyAPI)
            .then(function (response) {
                if (response.ok) {
                    response.json()
                        .then(function (data) {
                            conversionRateEl.textContent = data.conversion_rate
                            conversionResultEl.textContent = "$" + data.conversion_result
                        })
                } else {
                    console.log('Error:', response.statusText);
                }
            })
    }
    localStorage.setItem('from', fromCurrency);
    localStorage.setItem('to', toCurrency);

});

toCurrencyEl.value = localStorage.getItem('to');
fromCurrencyEl.value = localStorage.getItem('from');

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
            console.log('Error: ' + response.statusText);
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