const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIkey = '48707198c344c73ec087956174684839 ';
    const city = document.querySelector('.search-box input').value;

    container.classList.remove('active');

    if (city == '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json())
        .then(json => {

            if (json.cod == '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                container.classList.add('error');
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;

            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityHide.textContent == city) {
                return;
            }
            else {
                console.log("this is running  else")
                cityHide.textContent == city;
                container.style.height = '555px';
                container.classList.remove('error');
                container.classList.add('active');

                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');



                switchWeatherIcon(json.weather[0].main, image);

                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

                cloneAndRemoveElements('.info-weather', '#clone-info-weather');
                cloneAndRemoveElements('.info-humidity', '#clone-info-humidity');
                cloneAndRemoveElements('.info-wind', '#clone-info-wind');
            }
        });
});

function switchWeatherIcon(weatherCondition, imageElement) {
    const iconMap = {
        'Clear': 'images/clear.png',
        'Rain': 'images/rain.png',
        'Snow': 'images/snow.png',
        'Clouds': 'images/cloudy.png',
        'Mist': 'images/mist.png',
        'Haze': 'images/haze.png',
        'default': 'images/cloud.png'
    };

    const iconSrc = iconMap[weatherCondition] || iconMap['default'];
    imageElement.src = iconSrc;
}

function cloneAndRemoveElements(originalSelector, cloneSelector) {
    const originalElement = document.querySelector(originalSelector);
    const cloneElement = document.querySelector(cloneSelector);

    if (cloneElement) {
        cloneElement.remove();
    }

    const clonedElement = originalElement.cloneNode(true);
    clonedElement.id = cloneSelector.substring(1); // Remove the '#' from the ID
    clonedElement.classList.add('active-clone');

    const clonedElements = document.querySelectorAll(`${originalSelector}.active-clone`);
    const totalClonedElements = clonedElements.length;
    const firstClonedElement = clonedElements[0];

    if (totalClonedElements > 0) {
        firstClonedElement.classList.remove('active-clone');

        setTimeout(() => {
            firstClonedElement.remove();
        }, 2200);

    }
}