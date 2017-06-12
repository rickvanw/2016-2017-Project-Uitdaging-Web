/**
 * Created by rubenassink on 12-06-17.
 */

var hostAdress = "http://localhost:8000";

var parser = new JWTParser(getToken());
var userid = parser.getUserId();

$(document).ready(function() {

    var request = $.ajax({
        type: 'GET',
        url: hostAdress,
        data: {"user_id": userid},
        dataType: 'json',
        statusCode: {
            200: function () {
                console.log(200, "succes!");
            },
            401: function (error) {
                console.log(401);
            },
            404: function (error) {
                console.log(404, error)
            }
        }
    });

    request.done(function (data) {
    });

    request.error(function (jqXHR, textStatus, errorThrown) {
        console.log("ERROR: " + textStatus + " CODE: " + errorThrown);
    });
});