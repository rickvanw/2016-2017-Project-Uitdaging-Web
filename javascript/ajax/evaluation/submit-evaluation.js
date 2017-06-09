/**
 * Ajax request for sending an evaluation-form filled in by a employee.
 *
 * Author: maurice_2.
 * Date: 09-06-2017.
 */
var jwt = sessionStorage.token;

$(document).ready(function () {

    $("#btn-Submit-Form").on('click', function () {
        saveEvaluationData();
    });

    // capture(); // Screenshot with HTML2canvas
});

function saveEvaluationData(){
    var formData = { answers: [] };
    var questions = $("#questions").find('.question');
    var checkedAns;

    for(i = 0; i < questions.length; i++){
        var answer = {};
        var currQuestion = questions[i];
        var questType = currQuestion.classList[1]; // get question type, e.g.

        switch (questType) {
            case "checkbox":
                checkedAns = $(currQuestion).find('input[type=checkbox]:checked');
                answer.checkbox = [];
                for(i = 0; i < checkedAns.lenght; i++){
                    var checked = $(checkedAns[i]).attr('choice').trim();
                    answer.checkbox.push(checked);
                }
                break;
            case "radio":
                checkedAns = $(currQuestion).find('input[type=radio]:checked');
                if(checkedAns != undefined) {
                    answer.radio = checkedAns.attr('choice').trim();
                }
                break;
        }

        formData.answers.push(answer);
    }

    console.log(formData.answers);

    postEvaluation(formData);
}

function postEvaluation(formData) {
    $.ajax({
        type: 'POST',
        headers: {
            'authorization': jwt
        },
        url: "http://localhost:8000" + "/evaluation/add",
        data: {
            "answers": JSON.stringify(formData)
        },
        success: function (data) {
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
            console.log("Error posting evaluation");
        }
    })
}

// function capture() {
//     var element = $("#html-content-holder"); // global variable
//     var image_url = "";
//
//     // SHOW SCREENSHOT
//     $("#btn-Preview-Image").on('click', function () {
//         html2canvas(element, {
//             onrendered: function (canvas) {
// //                    $("#previewImage").append(canvas);
//                 image_url = canvas.toDataURL("image/png");
//                 window.open(image_url);
//                 alert("image_url: " + image_url);
//
//                 $.ajax({
//                     type: 'POST',
//                     headers: {
//                         'authorization':jwt
//                     },
//                     url: "http://localhost:8000" + "/evaluation/add",
//                     // async: false,
//                     data: {
//                         "image_url": JSON.stringify(image_url)
//                     },
//                     dataType: 'text',
//                     statusCode: {
//                         201: function () {
//                             alert(201);
//                         },
//                         401: function (error) {
//                             alert(error);
//                         },
//                         400: function (error) {
//                             alert(error);
//                         }
//                     },
//                     error: function (err) {
//                         alert("Error: " + err);
//                     }
//                 });
//
//             }
//         });
//     });
// }