/**
 * Created by rubenassink on 31-05-17.
 */

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

function getToken() {
    if(typeof(Storage) !== "undefined") {
        return sessionStorage.token;
    } else {
        alert("U bent niet ingelogd");
        window.location.href = "login.html";

        return null;
    }
}