$(document).ready(function () {
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
     for (i = 0; i < 5; i++) {
         if (i == 0) {
             $('#questions').append(
                 "<div class='questionitem'>" +
                 "<p class='question'>hoi</p>" +
                 "</div>");
         }
     }
            //     '<div class="question radio">' +
            //         '<p>' +
            //         item.name +
            //         '</p>' +
            //         '<label for="answers_quest1"><b>Wat is de ontwikkeling met betrekking tot de klacht</b></label>' +
            //         '<div id="answers_quest1">' +
            //             '<p>' +
            //             '<input type="radio" name="1" id="question_1ans_1" choice="Verdwenen" />' +
            //             '<label for="question_1ans_1">Verdwenen</label>' +
            //             '</p>' +
            //             '<p>' +
            //             '<input type="radio" name="1" id="question_1ans_2" choice="Verminderd" />' +
            //             '<label for="question_1ans_2">Verminderd</label>' +
            //             '</p>' +
            //             '<p>' +
            //             '<input type="radio" name="1" id="question_1ans_3" choice="Gelijk gebleven" />' +
            //             '<label for="question_1ans_3">Gelijk gebleven</label>' +
            //             '</p>' +
            //             '<p>' +
            //             '<input type="radio" name="1" id="question_1ans_4" choice="Erger geworden" />' +
            //             '<label for="question_1ans_4">Erger geworden</label>' +
            //             '</p>' +
            //         '</div>' +
            //     '</div>' +
            //     '<div class="question radio">'+
            //     '<label for="exampleSelect1">Pijn aangeven op een schaal van 0-10</label>' +
            //     '<select class="form-control" id="exampleSelect1">' +
            //     '<option>0</option>' +
            //     '<option>1</option>' +
            //     '<option>2</option>' +
            //     '<option>3</option>' +
            //     '<option>4</option>' +
            //     '<option>5</option>' +
            //     '<option>6</option>' +
            //     '<option>7</option>' +
            //     '<option>8</option>' +
            //     '<option>9</option>' +
            //     '<option>10</option>' +
            //     '</div>' +
            //     '<div class="question checkbox">' +
            //     '<label for="answers_quest2"><b>Aankruisen welke klachten aanwezig zijn</b></label>' +
            // '<div id="answers_quest2">' +
            //     '<p>' +
            //     '<input type="checkbox" name="2" id="question_2ans_1" choice="10" />' +
            //     '<label for="question_2ans_1">Begin van lage rugpijn na het 50e levensjaar,</label>' +
            //     '</p>' +
            //     '<p class="full-width">' +
            //     '<input type="checkbox" name="2" id="question_2ans_2" choice="15" />' +
            //     '<label for="question_2ans_2">Continue pijn onafhankelijk van houding of beweging,</label>' +
            //     '</p>' +
            //     '<p class="full-width">' +
            //     '<input type="checkbox" name="2" id="question_2ans_3" choice="20" />' +
            //     '<label for="question_2ans_3">Nachtelijke pijn,</label>' +
            //     '</p>' +
            //     '<p class="full-width">' +
            //     '<input type="checkbox" name="2" id="question_2ans_4" choice="25" />' +
            //     '<label for="question_2ans_4">Abnormale vermoeidheid,</label>' +
            //     '</p>'+
            //     '<p>' +
            //     '<input type="checkbox" name="2" id="question_2ans_1" choice="10" />' +
            //     '<label for="question_2ans_1">Kanker in de voorgeschiedenis,</label>' +
            //     '</p>' +
            //     '<p>' +
            //     '<input type="checkbox" name="2" id="question_2ans_1" choice="10" />' +
            //     '<label for="question_2ans_1">Onverklaard gewichtsverlies</label>' +
            //     '</p>' +
            //     '<p>' +
            //     '<input type="checkbox" name="2" id="question_2ans_1" choice="10" />' +
            //     '<label for="question_2ans_1">Recente breuk (minder dan 2 jaar geleden), eerdere wervelfractuur</label>' +
            //     '</p>' +
            //     '</div>' +
            //     '</div>'
            // );
        //}

        // var answer = $('<input type="radio" name="1"> 1 </input>');
        // answer.appendTo('.question');
    // }
}

function getComplaints() {
    var request = $.ajax({
        type: 'GET',
        headers: {
            'authorization': jwt
        },
        url: "http://localhost:8000/complaint/complaint-names",
        dataType: 'json',
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

