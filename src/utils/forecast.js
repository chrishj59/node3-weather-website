const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/ff77ce985fb8200c3f5e6011593a6625/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("could not connect to weather service ", undefined);
    } else if (body.error) {
      callback("Location is incorrect. Please correct your entry", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees. Temperature range ${body.daily.data[0].temperatureHigh} - ${body.daily.data[0].temperatureLow}.There a ${body.currently.precipProbability}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
