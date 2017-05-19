/**
 * Created by rickv on 18-5-2017.
 */


$(document).ready(function() {

    getExercises();

    $('.left_arrow').click(function(event){
        alert("previous");
    });
    $('.right_arrow').click(function(event){
        alert("next");
    });

    var disabled = 0;

    $('.doneButton').click(function(event){
        disabled=this.id.substr(this.id.length - 1);
        return false;
    });

    $('.notdoneButton').click(function(event){
        disabled = 0;
    });

    $('.likeButton').click(function(event){
        if (disabled != this.id.substr(this.id.length - 1)) {
            alert("Geef eerst aan dat je de oefening gedaan hebt");
            return false;
        }else{

        }
    });

    $('.dislikeButton').click(function(event){
        if (disabled != this.id.substr(this.id.length - 1)) {
            alert("Geef eerst aan dat je de oefening gedaan hebt");
            return false;
        }else{

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

    i=0;
    data.forEach(function(exercise) {
        i++;
        //Set all the right unique id's
        $("#all_exercises_container").append(text);
        $("#collapse0").attr("id", "collapse" + i);
        $("#link01").attr({href: "#collapse" + i, id: ""});
        $("#link02").attr({href: "#collapse" + i, id: ""});
        $("#doneButton0").attr("id", "doneButton" + i);
        $("#notDoneButton0").attr("id", "notDoneButton" + i);
        $("#likeButton0").attr("id", "likeButton" + i);
        $("#dislikeButton0").attr("id", "dislikeButton" + i);
        $("#exercise0").attr("id", "exercise" + i);

        // Fill the exercises

        //Quickview image
        $('#' + "exercise" + i).find('.quickview_image').attr("src", "img/" + exercise.image_url + ".jpg");

        //Expanded image
        $('#' + "exercise" + i).find('.collapse_image').attr("src", "img/" + exercise.image_url + ".jpg");

        // Title
        $('#' + "exercise" + i).find('.exercise_quickview_title').text(exercise.name);

        //Repeats amount
        $('#' + "exercise" + i).find('.exercise_quickview_amount_repeats').text(exercise.repetitions);

        //Repeats amount
        $('#' + "exercise" + i).find('.description_text').text(exercise.description);
    });
}

