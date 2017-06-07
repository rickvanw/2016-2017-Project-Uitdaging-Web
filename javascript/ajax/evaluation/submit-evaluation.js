/**
 * Ajax request for sending an evaluation-form filled in by a employee.
 *
 * Author: maurice_2.
 * Date: 31-5-2017.
 */

var jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ1YmVuYXNzaW5rQGhvdG1haWwuY29tIiwidXNlcl9pZCI6NCwicm9sZV9pZCI6MCwiaWF0IjoxNDk1MzkzNTYwLCJleHAiOjE1MjY5Mjk1NjB9.4UMl25J0i7C4d5METeHxY-4FYrf9ez0B0RkkijuoaCc";

$(document).ready(function () {
    capture();
});

function capture() {
    var element = $("#html-content-holder"); // global variable
    var image_url = "";

    // SHOW SCREENSHOT
    $("#btn-Preview-Image").on('click', function () {
        html2canvas(element, {
            onrendered: function (canvas) {
//                    $("#previewImage").append(canvas);
                image_url = canvas.toDataURL("image/png");
                window.open(image_url);
                alert("image_url: " + image_url);

                $.ajax({
                    type: 'POST',
                    headers: {
                        'authorization':jwt
                    },
                    url: "http://localhost:8000" + "/evaluation/add",
                    // async: false,
                    data: {
                        "image_url": JSON.stringify(image_url)
                    },
                    dataType: 'text',
                    statusCode: {
                        201: function () {
                            alert(201);
                        },
                        401: function (error) {
                            alert(error);
                        },
                        400: function (error) {
                            alert(error);
                        }
                    },
                    error: function (err) {
                        alert("Error: " + err);
                    }
                });

            }
        });
    });
}