let xhr = new XMLHttpRequest();

let url = "https://covid.2gis.ru/covid19-global.json";

xhr.open("GET", url, true);

xhr.send();


xhr.onload = function() {
    let response = JSON.parse(xhr.response); 
    let wrapper = document.querySelector(".wrapper");
    response.items.map(num => {
        // console.log(num);
        wrapper.innerHTML += `
        <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${num.countryCode}</h5>
                <p class="card-text">
                    <span class="confirmed">Подтвержденных случаев: ${num.confirmed + num.confirmedInc}</span>
                    <br> 
                    <span class="recovery">Выздоровело: ${num.recovery + num.recoveryInc}</span>
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