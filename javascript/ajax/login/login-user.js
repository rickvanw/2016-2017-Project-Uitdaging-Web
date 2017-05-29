$(document).on('click', '#login-button', function(){

        // Get username and password
        var username = $('#username-field').val();
        var password = $('#password-field').val();

        $.ajax({
            type: 'POST',
            url: "http://localhost:8000/user/login",
            dataType: 'json',
            data: {'email': username,
                   'password': password},
            crossdomain: true,
            statusCode: {
                200: function(data) {
                    setToken(data.token);
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
     * Set the token in the session storage.
     * @param token the token.
     */
    function setToken(token) {
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

