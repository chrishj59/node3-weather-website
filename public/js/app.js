console.log("client side javascript");
//fetch("http://puzzle.mead.io/puzzle").then(resp => {
//  resp.json().then(data => {
//    console.log(data);
//  });
//});

const weatherForm = document.querySelector("form");
const searchLocation = document.getElementById("searchLocation");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  message1.textContent = "Loading..";
  message2.textContent = " ";
  const location = searchLocation.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then(res => {
    res.json().then(data => {
      if (data.error) {
        //return console.log(`Error: ${data.error} `);
        return (message1.textContent = data.error);
      }
      // console.log(`forecast: ${data.forecast}`);
      // console.log(`Location: ${data.location}`);
      message1.textContent = data.location;
      message2.textContent = data.forecast;
    });
  });
  console.log(location);
});
