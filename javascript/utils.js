/**
 * Created by maurice_2 on 17-5-2017.
 */
var hostAdress = "http://localhost:8000";

function getConnection() {
    return hostAdress;
}

function setCookie(key, value, days) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : "";
}

function removeCookie(key) {
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function setToken(value) {
   setCookie("jwt", value, 365)
}

function getToken() {
    if(typeof(Storage) !== "undefined") {
        console.log("SESSION");
        return sessionStorage.token;
    } else if(getCookie("jwt") != ""){
        console.log("COOKIE");
        return getCookie("jwt");
    } else {
        alert("U bent niet ingelogd");
        window.location.href = "login.html";
        return null;
    }
}

function JWTParser(token) {

    var payload = null;

    var parts = jwt.split(".");
    payload = JSON.parse(atob(parts[1]));

    /**
     * Returns user_id of logged in user
     */
    this.getUserId = function () {
        return payload["user_id"];
    };

    /**
     * Returns email of logged in user
     * @returns {*}
     */
    this.getEmail = function () {
        return payload["email"];
    }
}
