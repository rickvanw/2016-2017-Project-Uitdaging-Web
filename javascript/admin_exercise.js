/**
 * Created by rickv on 18-5-2017.
 */

//TODO remove temporary jwt token, replace with logged in user
var jwt = sessionStorage.token;
var done_exercises =[];
var currentPage = 1;
var amountOfPages;
var hostAdress = "http://localhost:8000";
getAmountOfExercises();

// Get first page of exercises (first time)
getExercises(currentPage);

$(document).ready(function() {
    userInteraction();
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
        $('.day_text').text("Pagina " + currentPage + "/" + amountOfPages);
        if(currentPage>1){
            $('.left_arrow').css('visibility', 'visible');
        }
        if(currentPage==amountOfPages){
            $('.right_arrow').css('visibility', 'hidden');
        }
    });
    $('.left_arrow').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        clearExercises();
        currentPage--;
        getExercises(currentPage);
        $('.day_text').text("Pagina " + currentPage + "/" + amountOfPages);

        if(currentPage==1){
            $('.left_arrow').css('visibility', 'hidden');
        }
        if(currentPage<amountOfPages){
            $('.right_arrow').css('visibility', 'visible');
        }
    });

    $('.notDoneButton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();

        var buttonExerciseId=this.id.split("notDoneButton")[1];

        $('#' + "exercise" + buttonExerciseId).find('.exercise_quickview_title').attr("contenteditable", "true");
        $('#' + "exercise" + buttonExerciseId).find('.description_text').attr("contenteditable", "true");

        return false;
    });

    $('.likeButton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();

        return false;
    });

}

function getAmountOfExercises(){
    var request = $.ajax({
        type: 'GET',
        headers: {
            'authorization':jwt
        },
        url: hostAdress + "/exercise/rows",
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
            console.log("Error getting amount of exercises: " + err.message);
        }
    });

    request.done(function (data) {
        var amountOfExercises = data[0]["count(*)"];
        var pages =  amountOfExercises.toString()[0];

        console.log("Modulus: "+ pages);
        if((amountOfExercises % 10) > 0){
            pages++;
        }
        console.log("Pages: "+ pages);

        amountOfPages = pages;
        $('.day_text').text("Pagina " + currentPage + "/" + amountOfPages);
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
        $("#notDoneButton0").attr("id", "notDoneButton" + exercise.exercise_id);
        $("#likeButton0").attr("id", "likeButton" + exercise.exercise_id);
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
    });

    userInteraction();
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