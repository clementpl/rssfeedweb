let ajax = require('./ajax');

class Subscribe {
  constructor() {}

  init(options={}) {
    $("#validateModal").click(() => {
      let url = $("#urlSubscribe").val();
      var regex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
      if (!url.match(regex) || url == "") {
        $("#errorSubscribe").html('<strong>Please enter a valid url</strong>').show();
      } else {
        ajax.subscribe(url, (response) => {
          $("#subscribeModal").modal('hide');
          if (options.onSubscribe)
            options.onSubscribe();
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
