$(document).ready(function() {
    getUserInfo();
});

parserr = new JWTParser(sessionStorage.token);

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


function changeTheUserInfo() {

    console.log("wijzigen");

    var first_name = $("#Name-2").val();
    var last_name = $("#Name-3").val();
    var email = $("#Email-2").val();
    var user_id = parserr.getUserId();

    var request = $.ajax({
        type: 'PUT',
        headers: {
            'authorization': jwt
        },
        url: hostAdress + "/user/change",
        data: {"email": email, "first_name": first_name, "last_name": last_name, "user_id": user_id},
        dataType: 'json',
        statusCode: {
            200: function () {
                console.log(200, "succes!");
                showInfoChangedModel();
            },
            401: function (error) {
                console.log(401);
            },
            404: function (error) {
                console.log(404, error)
            }
        },
        error: function (err) {
            console.log("Error changing user info: " + err.message);
        }
    });

    showInfoChangedModel();
}

function showInfoChangedModel() {
    $("#model-container-login").append('<div class="alert alert-success" id="register-alert" role="alert">' +
        '<strong>Succes! </strong> Je gegevens zijn gewijzigd! </div>');
}





