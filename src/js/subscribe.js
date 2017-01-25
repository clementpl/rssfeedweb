let ajax = require('./ajax');

class Subscribe {
  constructor() {}

  init() {
    $("#validateModal").click(() => {
      let url = $("#urlSubscribe").val();
      var regex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
      if (!url.match(regex) || url == "") {
        $("#errorSubscribe").html('<strong>Please enter a valid url</strong>').show();
      } else {
        ajax.post(`${host}subscribe`, {url: url}, (response) => {
          $("#subscribeModal").modal('hide');
        });
        $("#subscribeModal").modal('hide');
      }
    });
    $("#subscribe").click(() => {
      $("#urlSubscribe").val('');
      $("#errorSubscribe").hide()
      $("#subscribeModal").modal('show');
    });
  }
}

module.exports = new Subscribe();
