(function() {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=London';
    const apiKey = '04b69c30d38add8005125371881f8689';

    $.get(url + '&appid=' + apiKey)
        .done((response) => {
            updateUISuccess(response);
        })
        .fail((error) => {
            handleUIError(error);
        });

    function updateUISuccess(response) {
        console.log(response);
        const condition = response.weather[0].main;
        const degC = response.main.temp - 273.15;
        const degCInt = Math.floor(degC);
        const degF = degC * 1.8 + 32;
        const degFInt = Math.floor(degF);
        const weatherBox = document.querySelector('#weather');
        console.log(condition, degCInt, degFInt);
        weatherBox.innerHTML = `<p>${degCInt}&#176;C/ ${degFInt}&#176;F</p>
                                <p>${condition}</p>`;
        for (const key in response) {
            if (response.hasOwnProperty(key)) {
                const element = response[key];
                console.log('success');
                // console.log(key, ': ', element);
            }
        }
    }
    function handleUIError(error) {
        const weatherBox = document.querySelector('#weather');
        weatherBox.className = 'hidden';
        console.log(error);
        console.log(error.responseText);
        console.log(error.statusText);
    }
}());
