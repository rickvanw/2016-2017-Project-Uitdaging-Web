var jwt = getToken();
var hostAdress = getConnection();

var currentPage = 1;
var amountOfPages;
var editingExerciseNr = 0;

var resetTitle;
var resetDescription;
var resetRepeats;
var resetMediaUrl;

$('.day_text').text("Pagina 0/0");
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
        currentPage++;
        getExercises(currentPage);
        $('.day_text').text("Pagina " + currentPage + "/" + amountOfPages);
        if(currentPage>1){
            $('.left_arrow').css('visibility', 'visible');
        }
        if(currentPage==amountOfPages){
            $('.right_arrow').css('visibility', 'hidden');
        }
        editingExerciseNr = 0;
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
        editingExerciseNr = 0;
    });

    $('.editButton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        var buttonExerciseId = this.id.split("editButton")[1];
        var thisExercise = $('#' + "exercise" + buttonExerciseId);

        if(editingExerciseNr == 0) {
            disableCollapsing();
            editingExerciseNr = buttonExerciseId;
            setLocalExerciseContent(thisExercise);
            exerciseEditable(thisExercise, true);

            $('.saveButton').off("click").on("click", function (e) {
                e.stopImmediatePropagation();
                editingExerciseNr = 0;

                //TODO ajax call met alle nieuwe informatie
                var name = thisExercise.find('.exercise_quickview_title').text();
                var description = thisExercise.find('.description_text').text();
                var repetitions = thisExercise.find('.exercise_quickview_amount_repeats').text();
                var media_url = thisExercise.find('.video_url_input').val();

                changeExercise(thisExercise, buttonExerciseId, name, description, repetitions, media_url);

                loadNewMediaUrl(thisExercise);
                exerciseEditable(thisExercise, false);
                enableCollapsing();
                return false;
            });

            // Disallow enter
            $("p[contenteditable]").keypress(function (evt) {

                var keycode = evt.charCode || evt.keyCode;
                if (keycode  == 13) { //Enter key's keycode
                    return false;
                }
            });

        }else if(editingExerciseNr == buttonExerciseId){
            // Cancel edit
            editingExerciseNr = 0;
            enableCollapsing();
            exerciseEditable(thisExercise, false);
            resetFromLocalExerciseContent(thisExercise);
        }

        return false;
    });

    $('.deleteButton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();

        var buttonExerciseId = this.id.split("deleteButton")[1];

        var confirmWindow = confirm("Weet u zeker dat u deze oefening wilt verwijderen?");
        if (confirmWindow == true) {
            deleteExercise(buttonExerciseId);

        }

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

        if((amountOfExercises % 10) > 0){
            pages++;
        }

        amountOfPages = pages;
        $('.day_text').text("Pagina " + currentPage + "/" + amountOfPages);
    });
}

function changeExercise(thisExercise, exercise_id, name, description, repetitions, media_url) {

    var request = $.ajax({
        type: 'POST',
        headers: {
            'authorization':jwt
        },
        url: hostAdress + "/exercise",
        data: {"exercise_id": exercise_id, "name":name, "description":description, "repetitions": repetitions, "media_url": media_url},
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
            resetFromLocalExerciseContent(thisExercise);
            notifyUser("Kon de wijziging(en) niet doorvoeren, neem contact op met uw systeembeheerder");
            console.log("Error rating the exercise: " + err.message);
        }
    });

    request.done(function (data) {
        console.log("DONE");
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

        //Set all the right unique id's
        $("#all_exercises_container").append(text);
        $("#collapse0").attr("id", "collapse" + exercise.exercise_id);
        $("#link01").attr({href: "#collapse" + exercise.exercise_id, id: ""});
        $("#link02").attr({href: "#collapse" + exercise.exercise_id, id: ""});
        $("#editButton0").attr("id", "editButton" + exercise.exercise_id);
        $("#deleteButton0").attr("id", "deleteButton" + exercise.exercise_id);
        $("#exercise0").attr("id", "exercise" + exercise.exercise_id);
        $("#video0").attr("id", "video" + exercise.exercise_id);

        // Fill the exercises

        //Quickview image
        var currentExercise = $('#' + "exercise" + exercise.exercise_id);

        currentExercise.find('.quickview_image').attr("src", "img/" + exercise.image_url + ".jpg");

        //Expanded image
        currentExercise.find('.collapse_image').attr("src", "img/" + exercise.image_url + ".jpg");

        //Expanded video
        currentExercise.find('.collapse_video').attr("src", getEmbedUrl(exercise.media_url) + "?enablejsapi=1&autoplay=0&showinfo=0&controls=0&rel=0&iv_load_policy=3");
        currentExercise.find('.collapse_video').attr("value", exercise.media_url);

        // Title
        currentExercise.find('.exercise_quickview_title').text(exercise.name);

        //Repeats amount
        currentExercise.find('.exercise_quickview_amount_repeats').text(exercise.repetitions);

        //Repeats amount
        //TODO verander naar description uit database
        if(exercise.description == ""){
            currentExercise.find('.description_text').text("Planken is niet ingewikkeld. Voor de basisplank ga je eerst op je buik liggen.Plaats je ellebogen onder de schouders en zet je tenen in de vloer. Druk je bovenlichaam omhoog op je onderarmen en til ook je benen van de grond. Vind je het lastig om in een keer je lijf omhoog te brengen, steun dan als tussenstap op je knieën.");
        }else{
            currentExercise.find('.description_text').text(exercise.description);
        }

        //Like / dislike amount
        currentExercise.find('.admin_exercise.likes').text("Likes: "+ exercise.likes);
        currentExercise.find('.admin_exercise.dislikes').text("Dislikes: " +exercise.dislikes);

        //Done / notdone amount
        currentExercise.find('.admin_exercise.done').text("Gedaan: " +exercise.done);
        currentExercise.find('.admin_exercise.notdone').text("Niet gedaan: " +exercise.notdone);

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
        return "https://www.youtube.com/embed/" + match[2];
    } else {
        return 'error';
    }
}

function notifyUser(message) {
    $("#notify_container").html("<div class='admin_exercise notify_text'>"+message+"</div>");
}

/**
 * Function that posts the complaints which the user has indicated
 */
function deleteExercise (exercise_id) {
    var request = $.ajax({
        type: 'DELETE',
        headers: {
            'authorization':jwt
        },
        url: hostAdress + "/exercise",
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
            console.log(err);
        }
        });

        request.done(function (data) {
            console.log("DONE");
            clearExercises();
            getExercises(currentPage);
    });
}

function exerciseEditable(thisExercise, editable){
    thisExercise.find('.exercise_quickview_title').attr("contenteditable", editable);
    thisExercise.find('.description_text').attr("contenteditable", editable);
    thisExercise.find('.exercise_quickview_amount_repeats').attr("contenteditable", editable);

    if(editable){
        thisExercise.find('.editButtonImage').attr("src", "img/close.png");
        thisExercise.find('.exercise_button_container.left').prepend(
            "<button type='button' id='saveButton' class='btn btn-default admin_exercise exercise_button saveButton'>" +
            "<img src='img/save.png' class='img-responsive'>" +
            "</button>");
        thisExercise.find('.video_responsive').css("display", "none");
        thisExercise.find('.video_in_collapse').prepend(
            "<div class='form-group row admin_exercise video_url_input_container'>" +
            "<label for='url-input' class='col-2 col-form-label'>Youtube video link</label>"+
            "<div class='col-10'>" +
            "<input class='form-control admin_exercise video_url_input' type='url' value='" + thisExercise.find('.collapse_video').attr('value') + "' id='url-input'>" +
            "</div>"+
            "</div>"
        );

        $('.video_url_input').off("click").on("click", function (e) {
            e.stopImmediatePropagation();
            return false;

        });
    }else{
        thisExercise.find('.editButtonImage').attr("src", "img/edit.png");
        thisExercise.find('.video_responsive').css("display", "block");
        thisExercise.find('.saveButton').remove();
        thisExercise.find('.video_url_input_container').remove();
    }
}

function setLocalExerciseContent(thisExercise){
    resetTitle = thisExercise.find('.exercise_quickview_title').text();
    resetDescription = thisExercise.find('.description_text').text();
    resetRepeats = thisExercise.find('.exercise_quickview_amount_repeats').text();
    resetMediaUrl = thisExercise.find('.collapse_video').attr("src");
}

function resetFromLocalExerciseContent(thisExercise){
    thisExercise.find('.exercise_quickview_title').text(resetTitle);
    thisExercise.find('.description_text').text(resetDescription);
    thisExercise.find('.exercise_quickview_amount_repeats').text(resetRepeats);
}

function disableCollapsing() {
    $('.link_collapse').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        return false;

    });
}

function enableCollapsing() {
    $('.link_collapse').unbind();
}

function loadNewMediaUrl(thisExercise) {
    var newLink = thisExercise.find('.video_url_input').val();
    //Expanded video
    thisExercise.find('.collapse_video').attr("src", getEmbedUrl(newLink) + "?enablejsapi=1&autoplay=0&showinfo=0&controls=0&rel=0&iv_load_policy=3");
    thisExercise.find('.collapse_video').attr("value", newLink);

}

// Create embed url for youtube link
function getEmbedUrl(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return "https://www.youtube.com/embed/" + match[2];
    } else {
        return 'error';
    }
}
