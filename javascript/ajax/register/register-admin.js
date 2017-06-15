/**
 * Ajax call for registering as admin
 *
 * Created by maurice_2 on 17-5-2017.
 */
var hostAdress = getConnection();

$(document).ready(function(){

    $('#register').submit(function () {

        var email = $('#email').val();
        var first_name = $('#first-name').val();
        var last_name = $('#last-name').val();
        var password = $('#password').val();

        $.ajax({
            type: 'POST',
            url: hostAdress + "/admin/register",
            dataType: 'json',
            data: {'email': email, 'first-name': first_name, 'last-name': last_name, 'password': password},
            success: function () {

            },
            statusCode: {

            },
            error: function (err) {

            }
        });
    });
});