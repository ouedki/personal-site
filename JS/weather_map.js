(function () {
    "use strict";

    var addressInput = function () {
        return $("#address_marker").val();
    };

    //--------------------Ajax Request-----------------------//
    var sendAjaxReq = function (latitude, longitude) {
        $.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
            APPID: "d3d23950da1d9695957e5d4ca424b50b",
            lat: latitude,
            lon: longitude,
            units: "imperial",
            cnt: 3
        }).done(function (data) {
            console.log(data);
            getWeater(data)
        }).fail(function () {
            alert('something went wrong!');
        });
    };

    //--------------------Weather info-----------------------//
    var getWeater = function (data) {
        $("#forecast").html("");
        data.list.forEach(function (element) {
            $("#city").html(data.city.name + " 3 day weather forecast").css("font-weight", "bold");
            var day = moment.unix(element.dt);
            var weatherInfo = "<div class='forecast'>"
                + "<h4 id='date'>" + day.format('dddd, MMM-DD-YYYY') + "</h4>"
                + "<h3 class='bold'>" + Math.round(element.temp.max) + "°" + "  /  " + Math.round(element.temp.min) + "°" + "</h3>"
                + "<img src='http://openweathermap.org/img/w/" + element.weather[0].icon + ".png'>"
                + "<p>" + "<span class='bold'>" + element.weather[0].main + "</span>" + ": " + element.weather[0].description + "</p>"
                + "<p>" + "<span class='bold'>" + "Humidity: " + "</span>" + element.humidity + "%" + "</p>"
                + "<p>" + "<span class='bold'>" + "Wind: " + "</span>" + element.speed + "</p>"
                + "<p>" + "<span class='bold'>" + "pressure: " + "</span>" + element.pressure + "</p>"
                + "</div>";

            $("#forecast").append(weatherInfo);
        });

        changeBoxBackground(data.list)
    };

    //--------------------Google map Goecoder -----------------------//
    var mapOptions = {
        zoom: 13,
        center: {
            lat: 40.6971494,
            lng: -74.2598655
        }
    };

    var latLng;
    var lat;
    var lng;
    var map;
    var marker;
    var geocoder = new google.maps.Geocoder();

    //generates a marker
    function generateMarker(latLng) {
        marker = new google.maps.Marker({
            map: map,
            position: latLng,
            draggable: true

        });
    }

//-----------------------geocodes the inputted address-------------------//
    var geocodeAddress = function () {
        geocoder.geocode({"address": addressInput()}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
                map.setCenter(results[0].geometry.location);
                lat = results[0].geometry.location.lat();
                lng = results[0].geometry.location.lng();
                latLng = {"lat": lat, "lng": lng};
                console.log(latLng);

                generateMarker(latLng);
                sendAjaxReq(lat, lng);

                //drag event to display weather to where the marker is dragged to.
                google.maps.event.addListener(marker, 'dragend', function () {
                    lat = marker.position.lat();
                    lng = marker.position.lng();
                    latLng = {"lat": lat, "lng": lng};
                    sendAjaxReq(lat, lng);

                });

                //double click event to display the weather data wherever they drop the pin.
                google.maps.event.addListener(map, 'dblclick', function (event) {
                    marker.setMap(null);
                    lat = event.latLng.lat();
                    lng = event.latLng.lng();
                    latLng = {"lat": lat, "lng": lng};
                    sendAjaxReq(lat, lng);
                    generateMarker(latLng);
                    google.maps.event.addListener(marker, 'dragend', function () {
                        lat = marker.position.lat();
                        lng = marker.position.lng();
                        latLng = {"lat": lat, "lng": lng};
                        sendAjaxReq(lat, lng);

                    });
                });

            }else {
                alert("Geocoding was not successful - STATUS: " + status);
            }

        });

    };
    
//----------------------changing backgrounds for weather boxes---------------------------//
        var changeBoxBackground = function (weatherArray) {
            weatherArray.forEach (function (weatherCode, index) {
                switch (true) {
                    case (weatherCode.weather[0].id >= 200 && weatherCode.weather[0].id <= 299) :
                        $(".forecast:nth-child(" + (index + 1) + ")").addClass("stormy");
                        break;
                    case (weatherCode.weather[0].id >= 300 && weatherCode.weather[0].id <= 321) :
                        $(".forecast:nth-child(" + (index + 1) + ")").addClass("drizzle");
                        break;
                    case (weatherCode.weather[0].id >= 500 && weatherCode.weather[0].id <= 599) :
                        $(".forecast:nth-child(" + (index + 1) + ")").addClass("rain");
                        break;
                    case (weatherCode.weather[0].id >= 600 && weatherCode.weather[0].id <= 699) :
                        $(".forecast:nth-child(" + (index + 1) + ")").addClass("snow");
                        break;
                    case (weatherCode.weather[0].id == 800) :
                        $(".forecast:nth-child(" + (index + 1) + ")").addClass("clear");
                        break;
                    case (weatherCode.weather[0].id >= 801 && weatherCode.weather[0].id <= 899) :
                        $(".forecast:nth-child(" + (index + 1) + ")").addClass("clouds");
                        break;
                    case (weatherCode.weather[0].id >= 900 && weatherCode.weather[0].id <= 906) :
                        $(".forecast:nth-child(" + (index + 1) + ")").addClass("extreme");
                        break;
                    default:
                        console.log("Error with weather background")
                }
            });
        };

//------------------------------event listeners--------------------------------//
    $('#send').click(function () {
        geocodeAddress();
    });

//--------Create the autocomplete object, restricting the search to geographical location types-----//
    var autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('address_marker')),
        {types: ['geocode']});
})();