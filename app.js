import { APIkey } from "./ApiKey.js";
const btn = document.getElementById("get_location");
const display_location = document.getElementById("status");
if (navigator.geolocation) {
  //test if the browser supports geoloction
  btn.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        btn.setAttribute("disabled", "");
        display_location.textContent = "retrieving ...";
        const { latitude, longitude } = position.coords;
        fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${APIkey}`
        )
          .then((location) => location.json())
          .then((location_object) => {
            let { city, continent, country, region } =
              location_object.results[0].components;
            display_location.textContent = `city : ${city}, continent : ${continent}, country : ${country}, region : ${region}`;
            btn.removeAttribute("disabled");
          });
      },
      (error) => {
        if (error.code === 2)
          //offline error
          display_location.textContent = "your are offline!";
        else if (error.code === 1)
          //if access to location was denied
          display_location.textContent =
            "Unable to retrieve your location (allow browser to access to your location )";
        else
          display_location.textContent =
            "an error was occurred! Pls! refresh page.";
      }
    );
  });
} else
  display_location.textContent = "this browser doesn't support Geolocation";
