/**
 * Created by larsw on 7-6-2017.
 */
$(document).ready(function() {
getQuestionAnswers();
});
function getQuestionAnswers() {
    var request = $.ajax({
        type: 'GET',
        headers: {
            'authorization': jwt
        },
        url: "http://localhost:8000" + "/treatment/exercises-day",
        dataType: 'json',
        statusCode: {
            200: function () {
                console.log(200, "succes!");
            },
            401: function (error) {
                console.log(401);
            },
            404: function (error) {
                console.log(404, error)
            }
        },
        error: function (err) {
            notifyUser("Kon geen oefeningen ophalen, neem contact op met uw systeembeheerder");
            console.log("Error getting exercises: " + err.message);
        }
    });
}
