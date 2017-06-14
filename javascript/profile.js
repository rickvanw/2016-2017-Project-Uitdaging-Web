$(document).ready(function() {

    getUserInfo();
});

function getUserInfo(){
    var request = $.ajax({
        type: 'GET',
        headers: {
            'authorization':jwt
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
            console.log("Error getting user info: " + err.message);
        }

    });

    request.done(function (data) {
        console.log(data[0].first_name);

        var first_name = document.getElementById("Name-2");
        first_name.value = data[0].first_name;

        var last_name = document.getElementById("Name-3");
        last_name.value = data[0].last_name;

        var email = document.getElementById("Email-2");
        email.value = data[0].email;

})}



