/**
 * Ajax call for liking / disliking an exercise with a given exerciseId.
 *
 * Created by maurice_2 on 17-5-2017.
 */
var hostAdress = "http://localhost:8000";

$("#rate-exercise").submit(function () {
    var exerciseId = $('#exercise').val();
    // TODO var rating = "";

    $.ajax({
        type: 'PUT',
        url: hostAdress + "/treatment/exercise-done",
        dataType: 'text',
        data: {
            "exerciseId": exerciseId, // TODO "rating": rating},
            headers: {"Authorization": localStorage.getItem('token')},
            success: function (data) {
                console.log("Exercise rated!");
            },
            statusCode: {
                201: function () {
                    console.log(201, "Rating opgeslagen!");
                },
                401: function (error) {
                    console.log(401);
                },
                404: function (error) {
                    console.log(404, error)
                }
            },
            error: function (err) {
                alert("Error: " + err);
            }
        }
    });
});