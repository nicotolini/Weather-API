window.addEventListener(`load`, () => {
    let lon
    let lat

    const tempMax = document.getElementById(`tempMax`)
    const tempMin = document.getElementById(`tempMin`)
    const press = document.getElementById(`press`)
    const img = document.getElementById(`imagen`)
    const tempValor = document.getElementById(`temp_valor`)
    const ciudad = document.getElementById(`ciudad`)
    const descrip = document.getElementById(`desc`)
    const searchValor = document.getElementById(`searchValor`)
    const cloudyValor = document.getElementById(`cloudyValor`)
    const humidityValor = document.getElementById(`humidityValor`)
    const windValor = document.getElementById(`windValor`)
    const rainValor = document.getElementById(`rainValor`)
    const form = document.getElementById('miForm');

    function geo() {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=en&units=metric&appid=cdfc292ca0549f1b7ce5b3f115a335da`
        fetch(url)
            .then(response => response.json())
            .then(data => {

                let temp = Math.round(data.main.temp)
                tempValor.textContent = `${temp} º`

                press.textContent = `${data.main.pressure} Hpa`

                let tempMa = Math.round(data.main.temp_max)
                tempMax.textContent = `${tempMa} º`
                let tempMi = Math.round(data.main.temp_min)
                tempMin.textContent = `${tempMi} º`

                let desc = data.weather[0].description
                descrip.textContent = desc.toUpperCase()

                let wind = Math.round(data.wind.speed)
                windValor.textContent = `${wind} k/h`

                let humidity = Math.round(data.main.humidity)
                humidityValor.textContent = `${humidity} %`

                let rain = Math.round(data.visibility) / 100
                rainValor.textContent = `${rain} M`

                img.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"

                cloudyValor.textContent = `${data.clouds.all} %`

                ciudad.textContent = data.name

            })
            .catch(error => console.log(error))
    }

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        if (searchValor.value.trim() === "") {
            return;
        }
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValor.value}&lang=en&units=metric&&appid=cdfc292ca0549f1b7ce5b3f115a335da`)
            .then(response => response.json())
            .then(data => {

                let temp = Math.round(data.main.temp)
                tempValor.textContent = `${temp} º`

                let desc = data.weather[0].description
                descrip.textContent = desc.toUpperCase()

                press.textContent = `${data.main.pressure} Hpa`

                let tempMa = Math.round(data.main.temp_max)
                tempMax.textContent = `${tempMa} º`
                let tempMi = Math.round(data.main.temp_min)
                tempMin.textContent = `${tempMi} º`

                let wind = Math.round(data.wind.speed)
                windValor.textContent = `${wind} k/h`

                let humidity = Math.round(data.main.humidity)
                humidityValor.textContent = `${humidity} %`

                let rain = Math.round(data.visibility) / 100
                rainValor.textContent = `${rain} M`

                img.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"

                cloudyValor.textContent = `${data.clouds.all} %`


                ciudad.textContent = data.name

            })
            .catch(error => console.log(error))

    });



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posicion => {
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude
            geo();
        }


        )
    }



})