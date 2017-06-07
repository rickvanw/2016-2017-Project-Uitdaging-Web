/**
 * Ajax call for marking an exercise as done.
 *
 * Created by maurice_2 on 17-5-2017.
 */
var hostAdress = "http://178.21.112.250:8000";

$("#complete-exercise").submit(function () {
    var exerciseId = localStorage.getItem('exerciseId');
    var done = 1;

    $.ajax({
        type: 'PUT',
        url: hostAdress + "/treatment/exercise-done",
        dataType: 'text',
        data: {"exerciseId": exerciseId, "done": done},
        headers: {"Authorization": localStorage.getItem('token')},
        success: function (data) {
            alert("Exercise completed!");
        },
        statusCode: {
            200:function(){
                console.log(200, "succes!");
            },
            401:function(error) {
                console.log(401);
            },
            404: function(error){
                console.log(404, error)
            }
        },
        error: function (err) {
            alert("Error: " + err);
        }
    });

});