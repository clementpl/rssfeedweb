let Flux = require("./flux");
let listFlux = require("./listFlux");

let M = {
  init: () => {
    let list = new listFlux([{name: 'test', url:'test.xml'}]);

/*
    let test = new Flux ('/test.xml', () => {
      console.log(test.getItems());
    });
*/
  }
};

window.onload = () => {
  M.init();
};
