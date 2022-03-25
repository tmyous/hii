// variables for API keys and ID
let lat = 37;
let lng = -122;
// let latitude;
// let longitude;
var apiKey = "AIzaSyAilENNSJKxEejwMcpDenzeWSmyheIPM54";
var mapSearchInput = document.querySelector("#map-search-input");
var cordinatesLatLng;

function getMap(location) {
  var requestURL =
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    location +
    "&key" +
    apiKey;
  fetch(requestURL)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data, location);
    });

  function formSubmit(event) {
    event.preventDefault();
  }
  var mapProp = {
    center: new google.maps.LatLng(lat, lng),
    zoom: 13.12,
    mapTypeId: "terrain",
  };
}
let map;
var bathroomsList = [];

var latitude;
var longitude;
async function myMap() {
  // var latitude;
  // var longitude;
  // Get location form
  var locationForm = document.getElementById("location-form");

  // Listen for submit
  locationForm.addEventListener("submit", geocode);

  function geocode(e) {
    if (e) {
      e.preventDefault();
    }

    var location = document.getElementById("map-search-input").value;
    if (!location) {
      location = "San Francisco";
    }
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: location,
          key: "AIzaSyAilENNSJKxEejwMcpDenzeWSmyheIPM54",
        },
      })
      .then(function (response) {
        // function geoFindMe() {
        //   console.log("click");
        // const status = document.querySelector("#status");
        // const mapLink = document.querySelector("#map-link");

        // mapLink.href = "";
        //   // mapLink.textContent = "";

        //   function success(position) {
        //     var latitude = position.coords.latitude;
        //     var longitude = position.coords.longitude;

        //     // status.textContent = "";
        //     // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        //     // mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
        //     // console.log(latitude, longitude);
        //   }

        //   function error() {
        //     // status.textContent = "Unable to retrieve your location";
        //   }

        //   if (!navigator.geolocation) {
        //     // status.textContent = "Geolocation is not supported by your browser";
        //   } else {
        //     // status.textContent = "Locating…";
        //     navigator.geolocation.getCurrentPosition(success, error);
        //     console.log(latitude, longitude);
        //   }
        // }
        // // window.onload = function () {
        // document.querySelector("#find-me").addEventListener("click", geoFindMe);
        // // };

        // Log full response
        // console.log(response);
        // console.log(latitude, longitude);
        // Geometry
        lat = response.data.results[0].geometry.location.lat || latitude;
        lng = response.data.results[0].geometry.location.lng || longitude;
        // console.log(lat);
        // console.log(lng);

        var mapStart =
          "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=100&offset=5&lat=" +
          lat +
          "&lng=" +
          lng;
        var mapProp = {
          center: new google.maps.LatLng(lat, lng),
          zoom: 13.12,
          mapTypeId: "terrain",
        };

        fetch(mapStart)
          .then((response) => response.json())
          .then((data) => {
            for (i = 0; i < data.length; i++) {
              var dataPoint = data[i];
              // console.log(data[i])
              bathroomsList.push(dataPoint);
            }
          })
          .then(() => {
            var map = new google.maps.Map(
              document.getElementById("googleMap"),
              mapProp
            );
            // console.log(bathroomsList);

            for (i = 0; i < bathroomsList.length; i++) {
              // console.log(bathroomsList[i]);
              var dataPoint = bathroomsList[i];

              const marker = new google.maps.Marker({
                position: { lat: dataPoint.latitude, lng: dataPoint.longitude },
                map: map,
              });
            }
          });
      });
  }
  geocode();
}

const eqfeed_callback = function (results) {
  for (let i = 0; i < results.features.length; i++) {
    const coords = results.features[i].geometry.coordinates;
    const latLng = new google.maps.LatLng(coords[1], coords[0]);

    new google.maps.Marker({
      position: latLng,
      map: map,
    });
  }
};

function geoFindMe() {
  console.log("click");
  // const status = document.querySelector("#status");
  // const mapLink = document.querySelector("#map-link");

  // mapLink.href = "";
  // mapLink.textContent = "";

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // status.textContent = "";
    // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    // mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    // works here
    // console.log(latitude, longitude);
    if (latitude & longitude) {
      async function myMap() {
        console.log(latitude, longitude);
        // var latitude;
        // var longitude;
        // Get location form
        var locationForm = document.getElementById("location-form");

        // Listen for submit
        locationForm.addEventListener("submit", geocode);

        function geocode(e) {
          if (e) {
            e.preventDefault();
          }

          var location = document.getElementById("map-search-input").value;
          if (!location) {
            location = "San Francisco";
          }
          axios
            .get("https://maps.googleapis.com/maps/api/geocode/json", {
              params: {
                address: location,
                key: "AIzaSyAilENNSJKxEejwMcpDenzeWSmyheIPM54",
              },
            })
            .then(function (response) {
              // Log full response
              // console.log(response);
              // console.log(latitude, longitude);
              // Geometry
              // lat = response.data.results[0].geometry.location.lat || latitude;
              // lng = response.data.results[0].geometry.location.lng || longitude;
              lat = latitude;
              lng = longitude;
              console.log(lat);
              console.log(lng);

              var mapStart =
                "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=100&offset=5&lat=" +
                lat +
                "&lng=" +
                lng;
              var mapProp = {
                center: new google.maps.LatLng(lat, lng),
                zoom: 13.12,
                mapTypeId: "terrain",
              };

              fetch(mapStart)
                .then((response) => response.json())
                .then((data) => {
                  for (i = 0; i < data.length; i++) {
                    var dataPoint = data[i];
                    // console.log(data[i])
                    bathroomsList.push(dataPoint);
                  }
                })
                .then(() => {
                  var map = new google.maps.Map(
                    document.getElementById("googleMap"),
                    mapProp
                  );
                  // console.log(bathroomsList);

                  for (i = 0; i < bathroomsList.length; i++) {
                    // console.log(bathroomsList[i]);
                    var dataPoint = bathroomsList[i];

                    const marker = new google.maps.Marker({
                      position: {
                        lat: dataPoint.latitude,
                        lng: dataPoint.longitude,
                      },
                      map: map,
                    });
                  }
                });
            });
        }
        geocode();
      }
      myMap();
    }
  }

  function error() {
    // status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    // status.textContent = "Geolocation is not supported by your browser";
  } else {
    // status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}
window.onload = function () {
  document.querySelector("#find-me").addEventListener("click", geoFindMe);
};

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
// let infoWindow;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 6,
//   });
//   infoWindow = new google.maps.InfoWindow();

//   const locationButton = document.createElement("button");

//   locationButton.textContent = "Pan to Current Location";
//   locationButton.classList.add("custom-map-control-button");
//   map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
//   locationButton.addEventListener("click", () => {
//     // Try HTML5 geolocation.
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };

//           infoWindow.setPosition(pos);
//           infoWindow.setContent("Location found.");
//           infoWindow.open(map);
//           map.setCenter(pos);
//         },
//         () => {
//           handleLocationError(true, infoWindow, map.getCenter());
//         }
//       );
//     } else {
//       // Browser doesn't support Geolocation
//       handleLocationError(false, infoWindow, map.getCenter());
//     }
//   });
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(
//     browserHasGeolocation
//       ? "Error: The Geolocation service failed."
//       : "Error: Your browser doesn't support geolocation."
//   );
//   infoWindow.open(map);
// }
// initMap();
