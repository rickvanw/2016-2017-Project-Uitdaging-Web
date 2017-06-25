var emailField;
var firstNameField;
var lastNameField;
var passwordField3;
var hostAdress = getConnection();
var jwt = getToken();

$('#register-button').off("click").on("click", function (e) {

    console.log("REGISTER");

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
        var request = $.ajax({
                type: 'POST',
                headers: {
                    'authorization':jwt
                },
                url: hostAdress + "/user/add-admin",
                dataType: 'json',
                data: {'email': email, 'first_name': first_name, 'last_name': last_name, 'password': password},
                statusCode: {
                201:function(){
                    console.log(200, "succes!");
                    alert("Administrator aangemaakt");
                }
            },
            error: function (err) {

                if(err.status == 409) {
                    alert("Dit emailadres is al in gebruik.");

                }else{
                    alert("Kon geen administrator aanmaken, neem contact op met uw systeembeheerder");

                }
                console.log("Error creating admin: " + err.message);
            }
        });

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
        showPasswordMismatchAlert();
    }

    return isValid;
}

function showEmptyFieldAlert() {

    alert("Vul alle velden in alstublieft.");

}

function showPasswordMismatchAlert() {
    alert("Wachtwoorden komen niet overeen.");
}

