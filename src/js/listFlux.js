let Flux = require("./flux");

class ListFlux {
  constructor(list=[]) {
    this.dom = $('#listFlux');
    for (let i=0; i<list.length; i++) {
      this.dom.append(`<li><a href="#">${list[i].name}</a></li>`).on('click', function() {
        console.log('click' + this.name);
      }.bind(list[i]));
    }
  }
}

module.exports = ListFlux;
