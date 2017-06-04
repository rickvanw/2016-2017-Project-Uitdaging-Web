/**
 * Created by rickv on 18-5-2017.
 */

//TODO get logged in user auth code
var jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ1YmVuYXNzaW5rQGhvdG1haWwuY29tIiwidXNlcl9pZCI6NCwicm9sZV9pZCI6MCwiaWF0IjoxNDk1MzkzNTYwLCJleHAiOjE1MjY5Mjk1NjB9.4UMl25J0i7C4d5METeHxY-4FYrf9ez0B0RkkijuoaCc";
var done_exercises =[];
var daysFromCurrentDate = 0;
getExercises(getCurrentDate());

$(document).ready(function() {
    userInteraction();
    $('.day_text').text(getDateString(getCurrentDate()));
    $('.right_arrow').css('visibility', 'hidden');

    $('.link_collapse').css('visibility', 'hidden');

});

function userInteraction () {

    // Pause video if expansion collapses
    $('.link_collapse').off("click").on("click", function (e) {
        var buttonExerciseId=$(this).attr("href").split("#collapse")[1];
        document.getElementById('video'+buttonExerciseId).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');

    });

    $('.left_arrow').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        clearExercises();
        console.log("CLLICk");
        daysFromCurrentDate--;
        getExercises(daysFromDate(daysFromCurrentDate));
        $('.day_text').text(getDateString(daysFromDate(daysFromCurrentDate)));
        if(daysFromCurrentDate<0){
            $('.right_arrow').css('visibility', 'visible');
        }
    });
    $('.right_arrow').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        clearExercises();
        daysFromCurrentDate++;
        getExercises(daysFromDate(daysFromCurrentDate));
        $('.day_text').text(getDateString(daysFromDate(daysFromCurrentDate)));

        if(daysFromCurrentDate==0){
            $('.right_arrow').css('visibility', 'hidden');
        }
    });

    $('.doneButton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();

        var buttonExerciseId=this.id.split("doneButton")[1];
        addToDoneExercises(buttonExerciseId);
        console.info(done_exercises);

        doneExercise(1, buttonExerciseId);

        $(this).css('background-color', '#BFE5BF');

        $('#' + "notDoneButton" + buttonExerciseId).css('background-color', 'white');

        return false;
    });

    $('.notDoneButton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();

        var buttonExerciseId=this.id.split("notDoneButton")[1];
        removeFromDoneExercises(buttonExerciseId);
        console.info(done_exercises);

        doneExercise(-1, buttonExerciseId);

        $(this).css('background-color', '#F99C9C');

        $('#' + "doneButton" + buttonExerciseId).css('background-color', 'white');

        return false;
    });

    $('.likeButton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();

        var buttonExerciseId=this.id.split("likeButton")[1];

        if (!isInDoneExercises(buttonExerciseId)) {
            // User should mark exercise as done first
            alert("Geef eerst aan dat je de oefening gedaan hebt");
        }else{
            rateExercise(1, buttonExerciseId);
            $(this).css('background-color', '#BFE5BF');

            $('#' + "dislikeButton" + buttonExerciseId).css('background-color', 'white');
        }
        return false;

    });

    $('.dislikeButton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();

        var buttonExerciseId=this.id.split("dislikeButton")[1];

        if (!isInDoneExercises(buttonExerciseId)) {
            // User should mark exercise as done first
            alert("Geef eerst aan dat je de oefening gedaan hebt");
        }else{
            rateExercise(-1, buttonExerciseId);
            $(this).css('background-color', '#F99C9C');

            $('#' + "likeButton" + buttonExerciseId).css('background-color', 'white');
        }
        return false;

    });
}

// TODO, afhandelen wanneer geen oefening beschikbaar
function getExercises(date){
    var request = $.ajax({
        type: 'GET',
        headers: {
            'authorization':jwt,
            'day':date
        },
        url: "http://localhost:8000" + "/treatment/exercises-day",
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

function placeExercises(data) {

    var text = $("#template_exercise").html();

    data.forEach(function(exercise) {

        console.log("FOREACH");

        //Set all the right unique id's
        $("#all_exercises_container").append(text);
        $("#collapse0").attr("id", "collapse" + exercise.treatment_exercise_id);
        $("#link01").attr({href: "#collapse" + exercise.treatment_exercise_id, id: ""});
        $("#link02").attr({href: "#collapse" + exercise.treatment_exercise_id, id: ""});
        $("#doneButton0").attr("id", "doneButton" + exercise.treatment_exercise_id);
        $("#notDoneButton0").attr("id", "notDoneButton" + exercise.treatment_exercise_id);
        $("#likeButton0").attr("id", "likeButton" + exercise.treatment_exercise_id);
        $("#dislikeButton0").attr("id", "dislikeButton" + exercise.treatment_exercise_id);
        $("#exercise0").attr("id", "exercise" + exercise.treatment_exercise_id);
        $("#video0").attr("id", "video" + exercise.treatment_exercise_id);


        // Fill the exercises

        //Quickview image
        $('#' + "exercise" + exercise.treatment_exercise_id).find('.quickview_image').attr("src", "img/" + exercise.image_url + ".jpg");

        //Expanded image
        $('#' + "exercise" + exercise.treatment_exercise_id).find('.collapse_image').attr("src", "img/" + exercise.image_url + ".jpg");

        //Expanded video
        $('#' + "exercise" + exercise.treatment_exercise_id).find('.collapse_video').attr("src", exercise.media_url + "?enablejsapi=1&autoplay=0&showinfo=0&controls=1&rel=0&iv_load_policy=3");

        // Title
        $('#' + "exercise" + exercise.treatment_exercise_id).find('.exercise_quickview_title').text(exercise.name);

        //Repeats amount
        $('#' + "exercise" + exercise.treatment_exercise_id).find('.exercise_quickview_amount_repeats').text(exercise.repetitions);

        //Repeats amount
        $('#' + "exercise" + exercise.treatment_exercise_id).find('.description_text').text(exercise.description);

        //Set previous like/dislike
        if(exercise.rating_user == 1) {
            $('#' + "exercise" + exercise.treatment_exercise_id).find('.likeButton').css('background-color', '#BFE5BF');
        }else if(exercise.rating_user == -1){
            $('#' + "exercise" + exercise.treatment_exercise_id).find('.dislikeButton').css('background-color', '#F99C9C');
        }

        //Set previous done/not done
        if(exercise.done == 1) {
            $('#' + "exercise" + exercise.treatment_exercise_id).find('.doneButton').css('background-color', '#BFE5BF');
        }else if(exercise.done == -1){
            $('#' + "exercise" + exercise.treatment_exercise_id).find('.notDoneButton').css('background-color', '#F99C9C');
        }
        if (exercise.done == 1) {
            console.log("ID - " + exercise.treatment_exercise_id);
            addToDoneExercises(exercise.treatment_exercise_id)
        }
        console.info(done_exercises);
    });

    userInteraction();
}

function doneExercise(done, treatment_exercise_id) {
    var request = $.ajax({
        type: 'PUT',
        headers: {
            'authorization':jwt
        },
        url: "http://localhost:8000" + "/treatment/exercise-done",
        data: {"treatment_exercise_id": treatment_exercise_id, "done":done},
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
            },
            error: function (err) {
                notifyUser("Kon de wijziging niet doorvoeren, neem contact op met uw systeembeheerder");
                console.log("Error marking exercise done: " + err.message);
            }
        }
    });

    request.done(function (data) {
        console.log("DONE");
    });
}

/**
 *
 * @param rating        rating (1 or -1)
 * @param exerciseId    id of exercise to be changed
 */
function rateExercise(rating, treatment_exercise_id) {
    console.log("rating");
    var request = $.ajax({
        type: 'PUT',
        headers: {
            'authorization':jwt
        },
        url: "http://localhost:8000" + "/exercise/rate",
        data: {"treatment_exercise_id": treatment_exercise_id, "rating":rating},
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
            notifyUser("Kon de rating niet doorvoeren, neem contact op met uw systeembeheerder");
            console.log("Error rating the exercise: " + err.message);
        }
    });

    request.done(function (data) {
        console.log("DONE");
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

function daysFromDate(daysBack) {
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() + daysBack);

    var dd = yesterday.getDate();
    var mm = yesterday.getMonth() + 1; // January is zero, so + 1
    var yyyy = yesterday.getFullYear();

    // If the days / months are smaller than 10, we want to put a 0 before it. So for example 2017-09-09 instead of 2017-9-9
    if(dd < 10) {
        dd = '0' + dd
    }

    if(mm < 10) {
        mm = '0' + mm
    }

    return yyyy + '-' + mm + '-' + dd;
}

function getDateString(date){

    var weekday = ["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"];

    date = new Date(date);

    var dd = date.getDate();
    var mm = date.getMonth() + 1; // January is zero, so + 1
    var yyyy = date.getFullYear();

    // If the days / months are smaller than 10, we want to put a 0 before it. So for example 2017-09-09 instead of 2017-9-9
    if(dd < 10) {
        dd = '0' + dd
    }

    if(mm < 10) {
        mm = '0' + mm
    }

    return weekday[date.getDay()]+', ' + dd + '-' + mm + '-' + yyyy;
}

function clearExercises() {
    //$("#all_exercises_container").find("*").off();
    $("#all_exercises_container").off();
    $("#all_exercises_container").html("");
    $("#notify_container").html("");
}

function isInDoneExercises(value) {
    return done_exercises.indexOf(value.toString()) > -1;
}

function addToDoneExercises(value) {
    if(!isInDoneExercises(value.toString())){
        done_exercises.push(value.toString());
    }
}

function removeFromDoneExercises(value) {
    if(isInDoneExercises(value.toString())){
        var index = done_exercises.indexOf(value.toString());
        if (index > -1) {
            done_exercises.splice(index, 1);
        }
    }
}

function notifyUser(message) {
    $("#notify_container").html("<div class='treatment notify_text'>"+message+"</div>");
}