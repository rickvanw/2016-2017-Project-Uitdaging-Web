$(document).ready(function(){
    // var pain = document.getElementById('pain');
    // var paincount = document.getElementById('paincount');
    //
    // $("#improvementno").click(function() {
    //     $(pain).css("display","inline");
    //     $(paincount).css("display","inline");
    // });
    // $("#improvementyes").click(function() {
    //     if($(pain).css('display') == 'inline')
    //     {
    //         $(pain).css("display","none");
    //         $(paincount).css("display","none");
    //     }
    // });
    // $("#nocomplaints").click(function() {
    //     if($(pain).css('display') == 'inline')
    //     {
    //         $(pain).css("display","none");
    //         $(paincount).css("display","none");
    //     }
    // });
    userInteraction();
});

function userInteraction() {
    //getQuestions();
    showQuestions();
}

function showQuestions() {
    // $('#questions').append("<ul class='questionlist'></ul>");
    // data.forEach(function(evaluation) {
    //             $('.questionlist').append(
    //                 "<li class='questionitem'>" +
    //                 "<p class='question'>" + evaluation.question + "</p>" +
    //                 "<p class='answer'>" + evaluation.answer + "</p>" +
    //                 "</a>" +
    //                 "</li>"
    //             );
    // });
    // data.forEach(function(evaluation) {
    //     $('#submit-evaluationform').append(
    //         "<div class='questionitem'>" +
    //         "<p class='question'>" + evaluation.question + "</p>" +
    //         "</div>"
    //     );
    //      var answer = $('<input type="radio" name="radioAnswer">" + evaluation.answer + "</input>');
    //      answer.appendTo('#submit-evaluationform');
    // });
    for(i = 0; i < 5; i++) {
        $('#submit-evaluationform').append(
            "<div class='questionitem'>" +
            "<p class='question'>hoi</p>" +
            // "<p class='answer'>hoihoi</p>" +
        "</div>"
        );
        var answer = $('<input type="radio" name="radioAnswer"> Hoiii </input>');
        answer.appendTo('#submit-evaluationform');
    }
}

function getQuestions() {
    var request = $.ajax({
        type: 'GET',
        headers: {
            'authorization': jwt
        },
        data: JSON.stringify(exercises),
        url: "http://localhost:8000" + "/evaluation/evaluations",
        dataType: 'text',
        statusCode: {
            201: function () {
                console.log(201, "succes!");
            },
            400: function (error) {
                console.log(400);
            },
            403: function (error) {
                console.log(403, error)
            }
        },
        error: function (err) {
            alert("Error: " + err);
        }
    });
    request.done(function (data) {
        showQuestions(data);
    });
}

