/**
 * Ajax call for showing an exercise with a given exerciseId.
 *
 * Created by maurice_2 on 17-5-2017.
 */
var hostAdress = "http://178.21.112.250:8000";

$(document).ready(function() {

    $("#").submit(function() {
        var exerciseId = $('#exercise').val();

        var request = $.ajax({
            type: 'GET',
            url: hostAdress + "/exercise",
            data: {"exerciseId": exerciseId},
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
            }
        });

        request.done(function (exercise) {
            var html = '';
            html += '<tr><td>'
                + exercise.exercise_id + '</td> <td>'
                + exercise.name + '</td> <td>'
                + exercise.description + '</td> <td>'
                + exercise.media_url + '</td> <td>'
                + exercise.repetitions + '</td> <td>'
                + exercise.wait_time_hours + '</td> <td>'
                + exercise.rating + '</td> <td>'
                + exercise.active + '</td> <td>';
            $('#exercises').append(html);
        });
    });
});