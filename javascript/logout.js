$(document).on('click', '#flag-button', function(){

    sessionStorage.clear();
    clearToken();
    window.location.href = "login.html";
});