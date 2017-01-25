let Flux = require('./flux');
let listFlux = require('./listFlux');
let ajax = require('./ajax');
let host = require('./host');
let subscribe = require('./subscribe')
let $ = require("jquery");

let M = {
  init: () => {
    //list feeds
    listFlux.init();

    //Add subscribe hooks
    subscribe.init();

    //Add logout hook
    $("#logout").click(() => {
      ajax.get(`${host}logout`, (response) => {
        console.log('logout response');
        console.log(response);
        document.location.href("/login.html")
      });
    });
  }
};

window.onload = () => {
  M.init();
};
