var hostAdress = getConnection();

$(document).on('click', '#login-button', function(){

        // Get username and password
        var username = $('#username-field').val();
        var password = $('#password-field').val();

        clearLoginAlert();

        $.ajax({
            type: 'POST',
            url: hostAdress + "/user/login",
            dataType: 'json',
            data: {'email': username,
                   'password': password},
            crossdomain: true,
            statusCode: {
                200: function(data) {
                    clearToken();
                    sessionStorage.clear();
                    rememberToken(data.token);

                    //console.log();
                    // Redirect to index page
                    window.location.href = "index.html";
                },
                401: function(data) {
                    // Wrong login
                    showLoginFailAlert();
                },
                404: function() {
                    // Server error
                    showUnreachableServerAlert();
                }
            }

        });
    });

    /**
     * Set the token in the session storage. If checked also set in cookie
     * @param token the token.
     */
    function rememberToken(token) {
        if($(".remember_me_checkbox").prop('checked') == true) {
            setToken(token);
        }
        if(typeof(Storage) !== "undefined") {
            sessionStorage.token = token;
        } else {
            alert("No session storage found. Site functions are limited.")
        }
    }

    function showLoginFailAlert() {
        $("#login-alert-container").append('<div class="alert alert-danger" id="register-alert" role="alert">' +
            '<strong>Oops! </strong> Inloggegevens incorrect! </div>');
    }

    function showUnreachableServerAlert() {
        $("#login-alert-container").append('<div class="alert alert-danger" id="register-alert" role="alert">' +
            '<strong>Oops! </strong> Server onbereikbaar! </div>');
    }

function clearLoginAlert() {
    $("#login-alert-container").empty();
}

