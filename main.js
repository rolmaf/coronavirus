let xhr = new XMLHttpRequest();

let url = "https://covid.2gis.ru/covid19-global.json";

xhr.open("GET", url, true);

xhr.send();

let response;
let cards = document.querySelector(".cards");
let loading = document.querySelector(".cssload-thecube");


xhr.onload = function () {
    response = JSON.parse(xhr.response);
    cards.innerHTML = "";
    console.log(response);
    drawCards("ru");
};

function drawCards(countryCode) {
    let cardTitle;
    cards.innerHTML = "";
    let i = 0;
    cards.classList.add("hidden");
    if (countryCode === "ru") {
        response.items.map(num => {
            cards.innerHTML += `
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
                `;
        });
    } else if (countryCode === "en") {
        response.items.map(num => {
            cards.innerHTML += `
                <div class="card" style="width: 18rem;">
                            <div class="card-body">
                            <h5 class="card-title">${num.i18nCountryNames.en}</h5>
                            <p class="card-text">
                                <span class="confirmed">Confirmed cases: ${num.confirmed + num.confirmedInc}</span>
                                <br> 
                                <span class="recovered">Recovered: ${num.recovered + num.recoveredInc}</span>
                                <br>
                                <span class="deaths">Deaths: ${num.deaths + num.deathsInc}</span>
                                <br> 
                                <span class="confirmedInc">Sick today: ${num.confirmedInc}</span>
                                <br> 
                                <span class="deathsInc">Died today: ${num.deathsInc}</span>
                            </p>
                        </div>
                    </div>
                `;
        });
    };
    cards.classList.remove("hidden");
    loading.classList.add("hidden");

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
};


function myClick(event) {
    loading.classList.remove("hidden");
    document.querySelector(".hidden-fl").classList.remove("hidden-fl");
    event.target.classList.add("hidden-fl");
    if (event.target.classList[0] == "russia-flag") {
        drawCards("ru");
    } else if (event.target.classList[0] == "england-flag") {
        drawCards("en");
    };

    console.log(event.target.classList[0]);
};