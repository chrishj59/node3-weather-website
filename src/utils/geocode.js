const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiY2hyaXM1OSIsImEiOiJjazF0bHZqNWowMWV3M25wYWdodjZ6dzN6In0.wdemQwwlgyu0EigpUF97vA&limit=1";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (body.features.length === 0) {
      callback("Location entered not found. Please correct", undefined);
    } else {
      // as ok set error to undefined
      let latitude = body.features[0].center[0];
      let longitude = body.features[0].center[1];
      let location = body.features[0].place_name;
      callback(undefined, {
        latitude,
        longitude,
        location
      });
    }
  });
};

module.exports = geocode;
