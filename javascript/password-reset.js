/**
 * Created by rickv on 15-6-2017.
 */
$('.password_reset_button').off("click").on("click", function (e) {
    e.stopImmediatePropagation();

    var email = $('.email_input').val();

    alert("HALLO " + email);

});