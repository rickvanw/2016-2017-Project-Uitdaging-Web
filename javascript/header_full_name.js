/**
 * Created by rickv on 19-6-2017.
 */

$(document).ready(function() {
    getFullName();
});


function getFullName(){
    var request = $.ajax({
        type: 'GET',
        headers: {
            'authorization':getToken()
        },
        url: hostAdress + "/user",
        dataType: 'json',
        statusCode: {
            200:function(){
                console.log(200, "succes!");
            },
            401:function(error) {
                console.log(401);
            },
            404: function(error){
                console.log(404, error)
            }
        },
        error: function (err) {
            console.log("Error getting name: " + err.message);
        }
    });

    request.done(function (data) {
        console.log("getFullname " + data[0].first_name + " " + data[0].last_name);
        userInteraction();
        $('.welcome-text').text("Welkom terug, " + data[0].first_name + " " + data[0].last_name);
    });

}