/**
 * Ajax request for sending an evaluation-form filled in by a employee.
 *
 * Author: maurice_2.
 * Date: 09-06-2017.
 */
var jwt = sessionStorage.token;

$(document).ready(function () {

    $("#submit-evaluationform").submit(function () {
        saveEvaluationData();
    });

    // capture(); // Screenshot with HTML2canvas
});

/**
 * Function for saving the data from the evaluation form
 */
function saveEvaluationData(){
    var formData = { answers: [] };
    var questions = $("#questions").find('.question');
    var checkedAns;

    for(i = 0; i < questions.length; i++){
        var answer = {};
        var currQuestion = questions[i];
        var questType = currQuestion.classList[1]; // get question type, e.g.

        switch (questType) {
            case "checkbox": // if checkbox, get all selected values
                checkedAns = $(currQuestion).find('input[type=checkbox]:checked');
                answer.checkbox = [];
                for(i = 0; i < checkedAns.length; i++){
                    answer.checkbox.push($(checkedAns[i]).attr('choice').trim());
                }
                break;
            case "radio": // if radio, get the selected value when not undefined
                checkedAns = $(currQuestion).find('input[type=radio]:checked');
                if(checkedAns != undefined) {
                    answer.radio = checkedAns.attr('choice').trim();
                }
                break;
        }

        formData.answers.push(answer);
    }

    console.log(formData);

    postEvaluation(formData);
}

/**
 * Ajax call for posting form data
 * @param formData
 */
function postEvaluation(formData) {
    console.log("formdata.answers: " + JSON.stringify(formData.answers));
    $.ajax({
        type: 'POST',
        headers: {
            'authorization': jwt
        },
        url: "http://localhost:8000" + "/evaluation/add",
        data: {
            "answers": JSON.stringify(formData.answers)
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