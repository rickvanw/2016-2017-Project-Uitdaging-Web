/**
 * Created by rubenassink on 29-05-17.
 */

$(document).on('click', '#flag-button', function(){

    sessionStorage.clear();
    window.location.href = "login.html";
});