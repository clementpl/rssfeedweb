let host = require('./host');
var $ = require("jquery");

class Ajax {
  constructor() {
  }

  getFlux(id, callback, url=`${host}feed/${id}`) {
    this.get(url, callback, 'xml');
  }

  getListFlux(callback, url=`${host}feeds.json`) {
    this.get(url, (response) => {
      let list = response.feeds || [];
      let listret = [];
      for (let i=0; i<list.length; i++) {
        //[0] == id , [1] == title, [2] == ? [3] == description, [4] == date
        let l = list[i];
        listret.push({
          id: l[0],
          title: l[1],
          unknow: l[2],
          description: l[3],
          date: l[4],
        });
      }
      callback(listret)
    });
  }

  post(url, body, callback) {
    $.ajax({
      url: url,
      dataType: 'json',
      type: "POST",
      data: body,
      crossDomain: true,
      success: (xml) => {
        callback(xml);
      },
      error: this.errorHandler
    });
  }

  get(url, callback, responseType='json') {
    $.ajax({
      url: url,
      dataType: responseType,
      type: 'GET',
      crossDomain: true,
      success: (xml) => {
        callback(xml);
      },
      error: this.errorHandler
    });
  }

  errorHandler(error) {
    console.log(error);
  }
}

module.exports = new Ajax();
