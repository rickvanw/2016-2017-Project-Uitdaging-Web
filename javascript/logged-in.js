/**
 * Created by maurice_2 on 17-5-2017.
 */
function setCookie(key, value, days) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : "";
}

function getToken() {
    // TODO eerst proberen cookie of session en vervolgens de andere

    var jwt = sessionStorage.token;
    console.log("JWT SESSION: " + jwt);
    console.log("JWT COOKIE BEFORE: " + jwt);
    if(jwt==""){
        jwt = getCookie();
        console.log("JWT COOKIE AFTER: " + jwt);
    }

    return jwt;
}