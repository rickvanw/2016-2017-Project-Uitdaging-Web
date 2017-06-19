var hostAdress = "http://178.21.112.250:8000";

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

function clearCookie(key) {
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function setToken(value) {
   setCookie("jwt", value, 365)
}

function getToken() {
    if(typeof sessionStorage.token != "undefined"){
        console.log("SESSION: " + sessionStorage.token);
        return sessionStorage.token;
    } else if(getCookie("jwt") != ""){
        console.log("COOKIE: " + getCookie("jwt"));
        return getCookie("jwt");
    } else {
        console.log("NO AUTH: session: " + sessionStorage.token);
        console.log("NO AUTH: cookie: " + getCookie("jwt"));

        alert("U bent niet ingelogd");
        window.location.href = "login.html";
        return null;
    }
}

function clearToken() {
    clearCookie("jwt");
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
