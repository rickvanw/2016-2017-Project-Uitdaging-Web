/**
 * Ajax call for showing all exercises of a treatment on a specific day.
 *
 * Created by maurice_2 on 17-5-2017.
 */
var hostAdress = getConnection();

$(document).ready(function() {

    var request = $.ajax({
        type: 'GET',
        url: hostAdress + "/treatment/exercises-day",
        data: {"checkdate": getCurrentDate()},
        dataType: 'json',
        statusCode: {
            200:function(){
                //console.log(200, "succes!");
            },
            401:function(error) {
                //console.log(401);
            },
            404: function(error){
                //console.log(404, error)
            }
        }
    });

    request.done(function (data) {
        data.forEach(function (exercise) {
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

    request.error(function (jqXHR, textStatus, errorThrown){
        //console.log("ERROR: " + textStatus + " CODE: " + errorThrown);
    });

    /**
     * Function for returning the current date.
     * @returns {Date}
     */
    function getCurrentDate(){
        var currentDate = new Date();
        var dd = currentDate.getDate();
        var mm = currentDate.getMonth() + 1; // January is zero, so + 1
        var yyyy = currentDate.getFullYear();

        // If the days / months are smaller than 10, we want to put a 0 before it. So for example 2017-09-09 instead of 2017-9-9
        if(dd < 10) {
            dd = '0' + dd
        }

        if(mm < 10) {
            mm = '0' + mm
        }

        currentDate = yyyy + '/' + mm + '/' + dd;
        return currentDate;
    }

});

