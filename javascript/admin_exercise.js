/**
 * Created by rickv on 18-5-2017.
 */

//TODO remove temporary jwt token, replace with logged in user
var jwt = sessionStorage.token;
var done_exercises =[];
var currentPage = 1;
var hostAdress = "http://localhost:8000";
getExercises(currentPage);

$(document).ready(function() {
    userInteraction();
    $('.day_text').text("Pagina " + currentPage);
    $('.left_arrow').css('visibility', 'hidden');

    $('.link_collapse').css('visibility', 'hidden');

});

function userInteraction () {

    // Pause video if expansion collapses
    $('.link_collapse').off("click").on("click", function (e) {
        var buttonExerciseId=$(this).attr("href").split("#collapse")[1];
        document.getElementById('video'+buttonExerciseId).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');

    });

    $('.right_arrow').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        clearExercises();
        console.log("CLLICk");
        currentPage++;
        getExercises(currentPage);
        $('.day_text').text("Pagina " + currentPage);
        if(currentPage>1){
            $('.left_arrow').css('visibility', 'visible');
        }
    });
    $('.left_arrow').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        clearExercises();
        currentPage--;
        getExercises(currentPage);
        $('.day_text').text("Pagina " + currentPage);

        if(currentPage==1){
            $('.left_arrow').css('visibility', 'hidden');
        }
    });

    $('.notDoneButton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();

        var buttonExerciseId = this.id.split("notDoneButton")[1];

        var confirmWindow = confirm("Weet u zeker dat u deze oefening wilt verwijderen?");
        if (confirmWindow == true) {
            deleteExercise(buttonExerciseId);
        }
        clearExercises();
        getExercises(currentPage);
        // return false;
    });
}

// TODO, afhandelen wanneer geen oefening beschikbaar
function getExercises(page){
    var request = $.ajax({
        type: 'GET',
        headers: {
            'authorization':jwt,
            'page':page
        },
        url: hostAdress + "/exercise/admin-exercise-page",
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
        $("#collapse0").attr("id", "collapse" + exercise.exercise_id);
        $("#link01").attr({href: "#collapse" + exercise.exercise_id, id: ""});
        $("#link02").attr({href: "#collapse" + exercise.exercise_id, id: ""});
        $("#doneButton0").attr("id", "doneButton" + exercise.exercise_id);
        $("#notDoneButton0").attr("id", "notDoneButton" + exercise.exercise_id);
        $("#likeButton0").attr("id", "likeButton" + exercise.exercise_id);
        $("#dislikeButton0").attr("id", "dislikeButton" + exercise.exercise_id);
        $("#exercise0").attr("id", "exercise" + exercise.exercise_id);
        $("#video0").attr("id", "video" + exercise.exercise_id);


        // Fill the exercises

        //Quickview image
        $('#' + "exercise" + exercise.exercise_id).find('.quickview_image').attr("src", "img/" + exercise.image_url + ".jpg");

        //Expanded image
        $('#' + "exercise" + exercise.exercise_id).find('.collapse_image').attr("src", "img/" + exercise.image_url + ".jpg");

        //Expanded video
        $('#' + "exercise" + exercise.exercise_id).find('.collapse_video').attr("src", getEmbedUrl(exercise.media_url) + "?enablejsapi=1&autoplay=0&showinfo=0&controls=0&rel=0&iv_load_policy=3");

        // Title
        $('#' + "exercise" + exercise.exercise_id).find('.exercise_quickview_title').text(exercise.name);

        //Repeats amount
        $('#' + "exercise" + exercise.exercise_id).find('.exercise_quickview_amount_repeats').text(exercise.repetitions);

        //Repeats amount
        //TODO verander naar description uit database
        $('#' + "exercise" + exercise.exercise_id).find('.description_text').text("Planken is niet ingewikkeld. Voor de basisplank ga je eerst op je buik liggen.Plaats je ellebogen onder de schouders en zet je tenen in de vloer. Druk je bovenlichaam omhoog op je onderarmen en til ook je benen van de grond. Vind jehet lastig om in een keer je lijf omhoog te brengen, steun dan als tussenstap op je knieën.");

        //Set previous like/dislike
        if(exercise.rating_user == 1) {
            $('#' + "exercise" + exercise.exercise_id).find('.likeButton').css('background-color', '#BFE5BF');
        }else if(exercise.rating_user == -1){
            $('#' + "exercise" + exercise.exercise_id).find('.dislikeButton').css('background-color', '#F99C9C');
        }

        //Set previous done/not done
        if(exercise.done == 1) {
            $('#' + "exercise" + exercise.exercise_id).find('.doneButton').css('background-color', '#BFE5BF');
        }else if(exercise.done == -1){
            $('#' + "exercise" + exercise.exercise_id).find('.notDoneButton').css('background-color', '#F99C9C');
        }
        if (exercise.done == 1) {
            console.log("ID - " + exercise.exercise_id);
            addToDoneExercises(exercise.exercise_id)
        }
        console.info(done_exercises);
    });

    userInteraction();
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

// Create embed url for youtube link
function getEmbedUrl(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        console.log("URL after: " + "www.youtube.com/embed/" + match[2]);
        return "https://www.youtube.com/embed/" + match[2];
    } else {
        return 'error';
    }
}

function notifyUser(message) {
    $("#notify_container").html("<div class='treatment notify_text'>"+message+"</div>");
}

/**
 * Function that posts the complaints which the user has indicated
 */
function deleteExercise (exercise_id) {
    $.ajax({
        type: 'DELETE',
        headers: {
            'authorization':jwt
        },
        url: "http://localhost:8000" + "/exercise",
        data: {
            "exercise_id": exercise_id
        },
        dataType: 'text',
        statusCode: {
            201: function () {
                console.log(201);
            },
            401: function (error) {
                console.log(error);
            },
            400: function (error) {
                console.log(error);
            }
        },
        error: function (err) {
            console.log("Error: " + err);
        }
    });
}