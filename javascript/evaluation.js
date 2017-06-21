var jwt = getToken();
var hostAdress = getConnection();

$(document).ready(function () {
    userInteraction();
});

function userInteraction() {
    //getQuestions();
    getComplaints();
}

function showQuestions(data) {

    console.log("DATA IN SHOWQUESTIONS: " + data);
    // $('#questions').append("henkietenkie");

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
        data.forEach(function(complaint) {
            var html = '';
            if (complaint.name != "Prevention") {
                html +=
                    '<p><b>' + complaint.name + '</b></p>' +
                    '<label for="answers_quest1"><b>Wat is de ontwikkeling met betrekking tot de klacht</b></label>' +
                    '<div id="answers_quest1">' +
                    '<p>' +
                    '<input type="radio" name="1" id="question_1ans_1" choice="Verdwenen" />' +
                    '<label for="question_1ans_1">Verdwenen</label>' +
                    '</p>' +
                    '<p>' +
                    '<input type="radio" name="1" id="question_1ans_2" choice="Verminderd" />' +
                    '<label for="question_1ans_2">Verminderd</label>' +
                    '</p>' +
                    '<p>' +
                    '<input type="radio" name="1" id="question_1ans_3" choice="Gelijk gebleven" />' +
                    '<label for="question_1ans_3">Gelijk gebleven</label>' +
                    '</p>' +
                    '<p>' +
                    '<input type="radio" name="1" id="question_1ans_4" choice="Erger geworden" />' +
                    '<label for="question_1ans_4">Erger geworden</label>' +
                    '</p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="question radio">' +
                    '<label for="answers_quest2"><b>Pijn aangeven op een schaal van 0-10</b></label>' +
                    '<select class="form-control" id="answers_quest2">' +
                    '<option>0</option>' +
                    '<option>1</option>' +
                    '<option>2</option>' +
                    '<option>3</option>' +
                    '<option>4</option>' +
                    '<option>5</option>' +
                    '<option>6</option>' +
                    '<option>7</option>' +
                    '<option>8</option>' +
                    '<option>9</option>' +
                    '<option>10</option>' +
                    '</select>' +
                    '</div>';
                if(complaint.name == "Back"){
                    html += '<div class="question checkbox">' +
                        '<label for="answers_quest3_back"><b>Aankruisen welke klachten aanwezig zijn</b></label>' +
                        '<div id="answers_quest3_back">' +
                        '<p>' +
                        '<input type="checkbox" name="2" id="question_3ans_1" choice="10" />' +
                        '<label for="question_3ans_1">Begin van lage rugpijn na het 50e levensjaar,</label>' +
                        '</p>' +
                        '<p class="full-width">' +
                        '<input type="checkbox" name="2" id="question_3ans_2" choice="15" />' +
                        '<label for="question_3ans_2">Continue pijn onafhankelijk van houding of beweging,</label>' +
                        '</p>' +
                        '<p class="full-width">' +
                        '<input type="checkbox" name="2" id="question_3ans_3" choice="20" />' +
                        '<label for="question_3ans_3">Nachtelijke pijn,</label>' +
                        '</p>' +
                        '<p class="full-width">' +
                        '<input type="checkbox" name="2" id="question_3ans_4" choice="25" />' +
                        '<label for="question_3ans_4">Abnormale vermoeidheid,</label>' +
                        '</p>' +
                        '<p>' +
                        '<input type="checkbox" name="2" id="question_3ans_5" choice="10" />' +
                        '<label for="question_3ans_1">Kanker in de voorgeschiedenis,</label>' +
                        '</p>' +
                        '<p>' +
                        '<input type="checkbox" name="2" id="question_3ans_6" choice="10" />' +
                        '<label for="question_3ans_1">Onverklaard gewichtsverlies,</label>' +
                        '</p>' +
                        '<p>' +
                        '<input type="checkbox" name="2" id="question_3ans_7" choice="10" />' +
                        '<label for="question_3ans_1">Recente breuk (minder dan 2 jaar geleden), eerdere wervelfractuur</label>' +
                        '</p>' +
                        '</div>' +
                        '</div>';
                } else {
                    html += '<div class="question checkbox">' +
                        '<label for="answers_quest3"><b>Aankruisen welke klachten aanwezig zijn</b></label>' +
                        '<div id="answers_quest3">' +
                        '<p>' +
                        '<input type="checkbox" name="2" id="question_3ans_1" choice="10" />' +
                        '<label for="question_3ans_1">Abnormale vermoeidheid,</label>' +
                        '</p>' +
                        '<p class="full-width">' +
                        '<input type="checkbox" name="2" id="question_3ans_2" choice="15" />' +
                        '<label for="question_3ans_2">Ongewild gewichtsverlies,</label>' +
                        '</p>' +
                        '<p class="full-width">' +
                        '<input type="checkbox" name="2" id="question_3ans_3" choice="20" />' +
                        '<label for="question_3ans_3">Koorts,</label>' +
                        '</p>' +
                        '<p class="full-width">' +
                        '<input type="checkbox" name="2" id="question_3ans_4" choice="25" />' +
                        '<label for="question_3ans_4">Nachtzweten,</label>' +
                        '</p>' +
                        '<p>' +
                        '<input type="checkbox" name="2" id="question_3ans_5" choice="10" />' +
                        '<label for="question_3ans_1">Pijn die niet beïnvloedbaar is door houding of beweging,</label>' +
                        '</p>' +
                        '<p>' +
                        '<input type="checkbox" name="2" id="question_3ans_6" choice="10" />' +
                        '<label for="question_3ans_1">Neuropathische pijn,</label>' +
                        '</p>' +
                        '<p>' +
                        '<input type="checkbox" name="2" id="question_3ans_7" choice="10" />' +
                        '<label for="question_3ans_1">Neurologische symptomen (krachtverlies, uitvalsverschijnselen),</label>' +
                        '</p>' +
                        '<p>' +
                        '<input type="checkbox" name="2" id="question_3ans_8" choice="10" />' +
                        '<label for="question_3ans_1">Een recent trauma,</label>' +
                        '</p>' +
                        '<p>' +
                        '<input type="checkbox" name="2" id="question_3ans_9" choice="10" />' +
                        '<label for="question_3ans_1">Tekenen van een ontstekingsproces</label>' +
                        '</p>' +
                        '</div>' +
                        '</div>';
                    }
                $('#questions').append('<div class="question radio">' + html);
            }
        });
}

function getComplaints() {
    console.log("get complaints");
    var request = $.ajax({
        type: 'GET',
        headers: {
            'authorization': jwt
        },
        url: hostAdress + "/complaints",
        dataType: 'json',
        statusCode: {
            200: function () {
                console.log(200);
            },
            400: function (error) {
                console.log(400);
            },
            403: function (error) {
                console.log(403)
            },
            404: function (err) {
                console.log(404);
            }
        },
        error: function (err) {
            alert("Error: " + err);
        }
    });

    request.done(function (data) {
        console.log("TEst: show questions");
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

