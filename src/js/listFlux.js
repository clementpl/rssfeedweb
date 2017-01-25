let Flux = require('./flux');
let ajax = require('./ajax');

class ListFlux {
  constructor() {
    this.dom = $('#listFlux');
  }

  init() {
    this.dom.html('');
    ajax.getListFlux((list) => {
      for (let i=0; i<list.length; i++) {
        if (i==0)//render first flux in list
          new Flux(list[i].id);
        this.dom.append(`<li id=${list[i].id}><a id=${list[i].id} href="#">${list[i].title}</a></li>`);//bind the data
      }
      this.dom.click(function(event) {
        let id = event.target.getAttribute("id");
        if (id)
          new Flux(+id);
      });
    });
  }

  refresh() {
    console.log("refresh list flux");
  }
}

module.exports = new ListFlux();
