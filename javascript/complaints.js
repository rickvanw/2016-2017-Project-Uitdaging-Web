/**
 * Created by larsw on 22-5-2017.
 */
var jwt = sessionStorage.token;
var exercises =[];
var hostAdress = "http://localhost:8000";


$(document).ready(function() {
    userInteraction();
});

function userInteraction () {

    $('#neckbutton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        if (!isInExercises(1)) {
            addToExercises(1);
            $(this).css('background-color', '#4A90E2');
            $(this).css('border', '4px solid #1765BE');
        }else{
            removeFromExercises(1);
            $(this).css('background-color', '#D8D8D8');
            $(this).css('border', '4px solid #D8D8D8');
        }
        return false;
    });
    $('#elbowbutton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        if (!isInExercises(2)) {
            addToExercises(2);
            $(this).css('background-color', '#4A90E2');
            $(this).css('border', '4px solid #1765BE');
        }else{
            removeFromExercises(2);
            $(this).css('background-color', '#D8D8D8');
            $(this).css('border', '4px solid #D8D8D8');
        }
        return false;
    });
    $('#shoulderbutton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        if (!isInExercises(3)) {
            addToExercises(3);
            $(this).css('background-color', '#4A90E2');
            $(this).css('border', '4px solid #1765BE');
        }else{
            removeFromExercises(3);
            $(this).css('background-color', '#D8D8D8');
            $(this).css('border', '4px solid #D8D8D8');
        }
        return false;
    });
    $('#wristhandbutton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        if (!isInExercises(4)) {
            addToExercises(4);
            $(this).css('background-color', '#4A90E2');
            $(this).css('border', '4px solid #1765BE');
        }else{
            removeFromExercises(4);
            $(this).css('background-color', '#D8D8D8');
            $(this).css('border', '4px solid #D8D8D8');
        }
    });
    $('#backbutton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        if (!isInExercises(5)) {
            addToExercises(5);
            $(this).css('background-color', '#4A90E2');
            $(this).css('border', '4px solid #1765BE');
        }else{
            removeFromExercises(5);
            $(this).css('background-color', '#D8D8D8');
            $(this).css('border', '4px solid #D8D8D8');
        }
    });
    $('#preventionbutton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        if (!isInExercises(6)) {
            addToExercises(6);
            $(this).css('background-color', '#4A90E2');
            $(this).css('border', '4px solid #1765BE');
        }else{
            removeFromExercises(6);
            $(this).css('background-color', '#D8D8D8');
            $(this).css('border', '4px solid #D8D8D8');
        }
    });
    $('#okbutton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        if (hasExercises()) {
            setExercises();
        } else {
            alert("Je hebt nog geen oefening aangevinkt!");
        }

    });

}
function  isInExercises(value) {
    return exercises.indexOf(value.toString()) > -1;
}

function addToExercises(value) {
    if(!isInExercises(value.toString())){
        exercises.push(value.toString());
    }
}

function removeFromExercises(value) {
    if(isInExercises(value.toString())){
        var index = exercises.indexOf(value.toString());
        if (index > -1) {
            exercises.splice(index, 1);
        }
    }
}
function hasExercises() {
    if (exercises.length == 0) {
        return false;
    } else {
        return true;
    }
}

function setExercises(){
    var request = $.ajax({
        type: 'POST',
        headers: {
            'authorization':jwt
        },
        data : JSON.stringify(exercises),
        url: hostAdress + "/treatment/add",
        dataType: 'text',
        statusCode: {
            201:function(){
                console.log(201, "succes!");
            },
            400:function(error) {
                console.log(400);
            },
            403: function(error){
                console.log(403, error)
            }
        },
        error: function (err) {
            alert("Error: " + err);
        }
    });

    request.done(function (data) {
        alert("Done");
    });

}
