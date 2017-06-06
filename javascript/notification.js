/**
 * Created by rickv on 1-6-2017.
 */
var hostAdress = "http://localhost:8000";

$(document).ready(function() {

    getTreatment();

    $('.header.notify_icon').css('color', 'red');

});

function getTreatment(date){
    var request = $.ajax({
        type: 'GET',
        headers: {
            'authorization':jwt,
            'day':date
        },
        url: hostAdress + "/treatment/exercises-day",
        dataType: 'json',
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
            notifyUser("Kon geen oefeningen ophalen, neem contact op met uw systeembeheerder");
            console.log("Error getting exercises: " + err.message);
        }
    });

    request.done(function (data) {
        placeExercises(data)
    });
}

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

    currentDate = yyyy + '-' + mm + '-' + dd;
    return currentDate;
}
