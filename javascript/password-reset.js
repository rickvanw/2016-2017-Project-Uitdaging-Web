
$('#password_reset_button').off("click").on("click", function (e) {
    e.stopImmediatePropagation();

    var email = $('.email_input').val();
    console.log(email);

    $.ajax({
        type: 'POST',
        url: hostAdress + "/user/password-reset-req",
        dataType: 'json',
        data: {'email': email},
        success: function (data) {
        },
        statusCode: {
            201: function (data) {
                window.location.href = "login.html";
            }
        },
        error: function (err) {
            if(err.status == 409) {


            }
            console.log("Error: " + err.message);
        }
    });
});