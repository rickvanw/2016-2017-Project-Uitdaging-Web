var emailField;
var firstNameField;
var lastNameField;
var passwordField3;


$(document).on('click', '#register-button', function(){

    emailField = $('#email_field');
    firstNameField = $('#surname_field');
    lastNameField = $('#lastname_field');
    passwordField2 = $('#password_field-2');
    passwordField3 = $('#password_field-3');

        // Get the values
        var first_name = firstNameField.val();
        var last_name = lastNameField.val();
        var email = emailField.val();
        var password = passwordField3.val();

    // Executes ajax call only when fields are filled, and checkbox is checked.
    if(validateFields()) {
        if (checkUserAgreement()) {
            $.ajax({
                type: 'POST',
                url: "http://localhost:8000/user/add",
                dataType: 'json',
                data: {'email': email, 'first_name': first_name, 'last_name': last_name, 'password': password},
                success: function (data) {
                },
                statusCode: {
                    201: function (data) {
                        window.location.href = "login.html";
                    }

                },
                error: function (err) {
                    console.error(err);
                }
            });
        }
    }
});

/**
 * Checkes if fields are filled and if the filled in passwords are equal.
 * @returns {boolean}
 */
function validateFields() {

    var isValid = true;

    if(firstNameField.val() == "" || lastNameField.val() == "" || emailField.val() == "" || passwordField2.val() == "" || passwordField3.val() == "") {
        isValid = false;
        showEmptyFieldAlert();
    }
    else if(passwordField2.val() != passwordField3.val()) {
        isValid = false;
        showPasswordMismatchAlert()}

    return isValid;
}

function checkUserAgreement() {

    var agreed = false

    if($('#Checkbox-2').is(':checked')) {
        agreed = true;
    }
    else {
        showAgreementAlert()
    }
    return agreed;
}

/**
 * Adds the alert div into the alert-container.
 */
function showEmptyFieldAlert() {

    $("#register-alert-container").append('<div class="alert alert-danger" id="register-alert" role="alert">' +
        '<strong>Oops! </strong> Vul alle velden in alstublieft. </div>');
}

function showPasswordMismatchAlert() {

    $("#register-alert-container").append('<div class="alert alert-danger" id="register-alert" role="alert">' +
        '<strong>Oops! </strong> Wachtwoorden komen niet overeen. </div>');
}

function showAgreementAlert() {

    $("#register-alert-container").append('<div class="alert alert-danger" id="register-alert" role="alert">' +
        '<strong>Oops! </strong> U dient de gebruiksvoorwaarden te accepteren. </div>');
}
