/**
 * Ajax call for logging in as an admin
 *
 * Created by maurice_2 on 17-5-2017.
 */
var hostAdress = getConnection();

$(document).ready(function () {

    $('#login').submit(function () {
        // Get username and password
        var username = $('#username').val();
        var password = $('#password').val();

        $.ajax({
            type: 'POST',
            url: hostAdress + "/admin/login",
            dataType: 'json',
            data: {'userName': username, 'password': password},
            crossdomain: true,
            success: function(data){
                // TODO afhandeling succes
            },
            statusCode: {
                // TODO afhandeling status codes
            },
            error: function(err){
                console.log("Error: " + err);
            }
        });
    });
});