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
    subscribe.init({onSubscribe: () => {
      listFlux.refresh();
    }});

    //Add logout hook
    $("#logout").click(() => {
      ajax.logout();
    });
  }
};

window.onload = () => {
  M.init();
};
