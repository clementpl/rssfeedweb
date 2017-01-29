let ajax = require('./ajax');
let host = require('./host');

$(function() {

    $('#login-form-link').click((e) => {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click((e) => {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    function login(user, pass) {
        ajax.post(`${host}signin`, {
            userId: user,
            password: pass
        }, (response) => {
            if (response.Error)
                $("#errorBox").html(`<strong>${response.Error}</strong>`).show();
            else
                document.location.href = "/index.html";
        });
    }

    function register(user, pass) {
        ajax.post(`${host}signup`, {
            userId: user,
            password: pass
        }, (response) => {
            if (response.Error)
                $("#errorBox").html(`<strong>${response.Error}</strong>`).show();
            else
                document.location.href = "/index.html";
        });
    }

    $('#login-form').submit((e) => {
        e.preventDefault();
        let user = $('#login-form #username').val();
        let pass = $('#login-form #password').val();
        if (user != "" && pass != "") {
            login(user, pass);
        } else {
            $("#errorBox").html('<strong>Username and password require</strong>').show();
        }
    });

    $('#register-form').submit((e) => {
        e.preventDefault();
        let user = $('#register-form #username').val();
        let pass = $('#register-form #password').val();
        let passc = $('#register-form #confirm-password').val();
        if (user != "" && pass != "" && passc == pass) {
            register();
        } else {
            if (user == "" || pass == "")
                $("#errorBox").html('<strong>Username and password require</strong>').show();
            else if (passc != pass)
                $("#errorBox").html('<strong>Password and password confirmation must be the same</strong>').show();
        }
    });
});
