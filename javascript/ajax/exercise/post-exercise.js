/**
 * Ajax request for sending an exercise created by an admin.
 *
 * Author: maurice_2.
 * Date: 09-06-2017.
 */
var jwt = sessionStorage.token;

$(document).ready(function () {

    $("#submit_form").submit(function () {
        alert("test");
        saveExercise();
    });

});

/**
 * Function for creating a new exercise and saving it to the db
 */
function saveExercise(){

    var name = $('input[name="exercise_name"]').val();
    var description = $('input[name="exercise_description"]').val();
    var media_url = $('input[name="exercise_link"]').val();
    var image_url = $('input[name="exercise_img"]').val();
    var repetitions = $('input[name="exercise_repetitions"]').val();

    console.log(name);

    $.ajax({
        type: 'POST',
        headers: {
            "authorization" : jwt
        },
        url: "http://localhost:8000" + "/exercise",
        data: {
            "exercise_name": name,
            "description": description,
            "media_url": media_url,
            "image_url": image_url,
            "repetitions": repetitions
        },
        dataType: 'text',
        success: function (data) {
            console.log("exercise posted");
            console.log(data);
            location.replace("index.html");
        },
        statusCode: {
            200: function () {
                console.log(200);
            },
            401: function (error) {
                console.log(401);
            },
            400: function (error) {
                console.log(400, error)
            }
        },
        error: function (err) {
            console.log("Error posting exercise");
        }
    });
}
