/**
 * Created by rickv on 18-5-2017.
 */
$(document).ready(function() {
    getExercises();

});

$(document).ajaxComplete(function () {
    var disabled = 0;

    $('.left_arrow').click(function(event){
        alert("previous");
    });
    $('.right_arrow').click(function(event){
        alert("next");
    });

    $('.doneButton').click(function(event){
        //TODO fix buttons
        alert(this.id.split("doneButton")[1]);

        var buttonExerciseId=this.id.split("doneButton")[1];

        disabled=buttonExerciseId;
        return false;
    });

    $('.notdoneButton').click(function(event){
        disabled = 0;
    });

    $('.likeButton').click(function(event){
        var buttonExerciseID=this.id.split("likeButton")[1];

        if (disabled != buttonExerciseID) {
            alert("Geef eerst aan dat je de oefening gedaan hebt");
            return false;
        }else{
            rateExercise(1, buttonExerciseID);
        }
    });

    $('.dislikeButton').click(function(event){
        var buttonExerciseId=this.id.split("dislikeButton")[1];

        if (disabled != buttonExerciseId) {
            alert("Geef eerst aan dat je de oefening gedaan hebt");
            return false;
        }else{
            rateExercise(-1, buttonExerciseId);
        }
    });
});

function getExercises(){
    var request = $.ajax({
        type: 'GET',
        url: "http://localhost:8000" + "/treatment/exercises-day",
        data: {"checkdate": getCurrentDate()},
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
        }
    });

    request.done(function (data) {
        placeExercises(data)
    });

    request.error(function (jqXHR, textStatus, errorThrown){
        console.log("ERROR: " + textStatus + " CODE: " + errorThrown);
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
}

function placeExercises(data) {

    var text = $("#template_exercise").html();

    data.forEach(function(exercise) {
        //Set all the right unique id's
        $("#all_exercises_container").append(text);
        $("#collapse0").attr("id", "collapse" + exercise.exercise_id);
        $("#link01").attr({href: "#collapse" + exercise.exercise_id, id: ""});
        $("#link02").attr({href: "#collapse" + exercise.exercise_id, id: ""});
        $("#doneButton0").attr("id", "doneButton" + exercise.exercise_id);
        $("#notDoneButton0").attr("id", "notDoneButton" + exercise.exercise_id);
        $("#likeButton0").attr("id", "likeButton" + exercise.exercise_id);
        $("#dislikeButton0").attr("id", "dislikeButton" + exercise.exercise_id);
        $("#exercise0").attr("id", "exercise" + exercise.exercise_id);

        // Fill the exercises

        //Quickview image
        $('#' + "exercise" + exercise.exercise_id).find('.quickview_image').attr("src", "img/" + exercise.image_url + ".jpg");

        //Expanded image
        $('#' + "exercise" + exercise.exercise_id).find('.collapse_image').attr("src", "img/" + exercise.image_url + ".jpg");

        // Title
        $('#' + "exercise" + exercise.exercise_id).find('.exercise_quickview_title').text(exercise.name);

        //Repeats amount
        $('#' + "exercise" + exercise.exercise_id).find('.exercise_quickview_amount_repeats').text(exercise.repetitions);

        //Repeats amount
        $('#' + "exercise" + exercise.exercise_id).find('.description_text').text(exercise.description);
    });
}

function doneExercise() {
    var request = $.ajax({
        type: 'POST',
        url: "http://localhost:8000" + "/exercise/rate",
        data: {"exerciseId": exerciseId, "rating":rating},
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
        }
    });

    request.done(function (data) {
        placeExercises(data);
    });

    request.error(function (jqXHR, textStatus, errorThrown){
        console.log("ERROR: " + textStatus + " CODE: " + errorThrown);
    });
}

/**
 *
 * @param rating        rating (1 or -1)
 * @param exerciseId    id of exercise to be changed
 */
function rateExercise(rating, exerciseId) {
    console.log("rating");
    var request = $.ajax({
        type: 'PUT',
        url: "http://localhost:8000" + "/exercise/rate",
        data: {"exerciseId": exerciseId, "rating":rating},
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
        }
        ,
        error: function (err) {
            alert("Error: " + err);
        }
    });

    request.done(function (data) {
        console.log("DONE")
    });

}
