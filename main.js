let xhr = new XMLHttpRequest();

let url = "https://covid.2gis.ru/covid19-global.json";

xhr.open("GET", url, true);

xhr.send();

let width = screen.width;
console.log(width);

// let amountCards = width / (16 * 18);  
// amountCards = Math.floor(amountCards);
// console.log(amountCards);

// document.querySelector(".search").style.width = `${amountCards * 18}rem`;


xhr.onload = function () {
    let response = JSON.parse(xhr.response);
    let wrapper = document.querySelector(".wrapper");
    console.log(response);
    response.items.map(num => {
        // console.log(num);
        wrapper.innerHTML += `
            <div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">${num.i18nCountryNames.ru}</h5>
                    <p class="card-text">
                        <span class="confirmed">Подтвержденных случаев: ${num.confirmed + num.confirmedInc}</span>
                        <br> 
                        <span class="recovered">Выздоровело: ${num.recovered + num.recoveredInc}</span>
                        <br>
                        <span class="deaths">Смертей: ${num.deaths + num.deathsInc}</span>
                        <br> 
                        <span class="confirmedInc"> Сегодня заболело: ${num.confirmedInc}</span>
                        <br> 
                        <span class="deathsInc">Сегодня умерло: ${num.deathsInc}</span>
                    </p>
                </div>
            </div>
            `
    });
    // console.log(response);
};

function sortCountries() {
    let text = document.querySelector(".search").value;
    text = text.trim().toLowerCase();
    if (text != "") {
        let cards = document.getElementsByClassName("card-title");
        for (num of cards) {
            if (num.textContent.toLowerCase().indexOf(text) > -1) {
                num.parentElement.parentElement.style.display = "block";
            } else {
                num.parentElement.parentElement.style.display = "none";
            };
        };
    };
    // console.log(cards);
};