let xhr = new XMLHttpRequest();

let url = "https://covid.2gis.ru/covid19-global.json";

xhr.open("GET", url, true);

xhr.send();

let response;
let wrapper = document.querySelector(".cards");
let loading = document.querySelector(".cssload-thecube");


xhr.onload = function () {
    response = JSON.parse(xhr.response);
    wrapper.innerHTML = "";
    console.log(response);
    drawCards("ru");
};

function drawCards(countryCode) {
    let cardTitle;
    wrapper.innerHTML = "";
    loading.classList.remove("hidden");
    wrapper.classList.add("hidden");
    if (countryCode === "ru") {
        response.items.map(num => {
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
            `;
        });
    } else if (countryCode === "en") {
        response.items.map(num => {
            wrapper.innerHTML += `
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
    wrapper.classList.remove("hidden");
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
    document.querySelector(".hidden").classList.remove("hidden");
    event.target.classList.add("hidden");
    if (event.target.classList[0] == "russia-flag") {
        drawCards("ru");
    } else if (event.target.classList[0] == "england-flag") {
        drawCards("en");
    };

    console.log(event.target.classList[0]);
};