"use strict";

var xhr = new XMLHttpRequest();
var x = document.getElementById("city");
var mt = document.getElementById("minT");
var maxt = document.getElementById("maxT");
var wnd = document.getElementById("wind");

document.addEventListener("DOMContentLoaded", Location);

function Location() {
    return new Promise(function (resolve, reject) {
        resolve(navigator.geolocation.getCurrentPosition(getLocation));
        reject(x.innerHTML = "Geolocation is not supported by this browser.");
    });
}

function getLocation(position) {

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    return new Promise(function (resolve, reject) {
        xhr.open('POST', 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=a265d5194c56485f220f32efc4b0fefd&units=metric', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            }
        };
        xhr.onerror = function () {
            return reject(xhr.error);
        };
        xhr.send();
    }).then(function () {

        var Weather = JSON.parse(xhr.responseText);
        var pic = document.getElementById("city");
        var img = document.createElement("img");

        x.innerHTML = 'Город: ' + Weather.name;
        img.src = 'https://openweathermap.org/img/wn/' + Weather.weather[0].icon + '.png';
        pic.append(img);
        pic.classList.add('logo');
        mt.innerHTML = 'Минимальная температура: ' + Weather.main.temp_min + " &#176;C";
        maxt.innerHTML = 'Максимальная температура: ' + Weather.main.temp_max + " &#176;C";
        wnd.innerHTML = 'Ветер: ' + Weather.wind.speed + " м/с";
    }).catch(function (error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "Пользователь отклонил запрос на геолокацию.";
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Информация о местоположении недоступна.";
                break;
            case error.TIMEOUT:
                x.innerHTML = "Время, на получение местоположения пользователя, истекло.";
                break;
            default:
                break;
        }
    });
}