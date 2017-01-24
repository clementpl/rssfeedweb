class Ajax {
  constructor() {
  }

  post(url, body, callback) {

  }

  get(url, callback) {
    $.ajax({
      url: url,
      dataType: 'xml',
      method: 'GET',
      success: (xml) => {
        callback(xml);
      },
      error: this.errorHandler
    })
  }

  errorHandler(error) {
    console.log(error);
  }
}

module.exports = new Ajax();
