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

/**
 * PUT request for changing the password
 */
function changePassword() {

    var oldPassword = $("#password-0").val();
    var newPassword = $("#password-1").val();
    var newPasswordRepeat = $("#password-22").val();
    var email = parserr.getEmail();

        $.ajax({
            type: 'PUT',
            headers: {
                'authorization': jwt
            },
            url: hostAdress + "/user/changepassword",
            data: {"email": email, "password": newPassword},
            dataType: 'json',
            statusCode: {
                201: function () {
                    console.log(200, "succes!");
                    showPasswordChangedModel();
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

}

/**
 * PUT request for changing the user info
 */
function changeTheUserInfo() {

    var first_name = $("#Name-2").val();
    var last_name = $("#Name-3").val();
    var email = $("#Email-2").val();
    var user_id = parserr.getUserId();

    $.ajax({
        type: 'PUT',
        headers: {
            'authorization': jwt
        },
        url: hostAdress + "/user/change",
        data: {"email": email, "first_name": first_name, "last_name": last_name, "user_id": user_id},
        dataType: 'json',
        statusCode: {
            204: function () {
                console.log(200, "succes!");
                showInfoChangedModel();
            },
            401: function (error) {
                console.log(401, error);
            },
            404: function (error) {
                console.log(404, error)
            }
        },
        error: function (err) {
            console.log("Error changing user info: " + err.message);
        }
    });
}

/**
 * Alert for a succesfully changing the user info
 */
function showInfoChangedModel() {
    $("#model-container-login").append('<div class="alert alert-success" id="register-alert" role="alert">' +
        '<strong>Succes! </strong> Je gegevens zijn gewijzigd! </div>');
}

/**
 * Alert for successfully changing the user password
 */
function showPasswordChangedModel() {
    $("#model-container-login").append('<div class="alert alert-success" id="register-alert" role="alert">' +
        '<strong>Succes! </strong> Je wachtwoord is veranderd! </div>');
}





