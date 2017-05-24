
var emailField;
var firstNameField;
var lastNameField;
var passwordField;


$(document).on('click', '#register-button', function(){

        emailField = $('#email_field');
        firstNameField = $('#surname_field');
        lastNameField = $('#lastname_field');
        passwordField = $('#password_field-3');

        var first_name = firstNameField.val();
        var last_name = lastNameField.val();
        var email = emailField.val();
        var password = passwordField.val();

        $.ajax({
            type: 'POST',
            url: "http://localhost:8000/user/add",
            dataType: 'json',
            data: {'email': email, 'first_name': first_name, 'last_name': last_name, 'password': password},
            success: function () {

            },
            statusCode: {

            },
            error: function (err) {

            }
        });
});