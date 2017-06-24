var jwt = getToken();
var hostAdress = getConnection();

$(document).ready(function () {
    userInteraction();
});

function userInteraction() {
    //getQuestions();
    getComplaints();

    $("#submit-evaluationform").submit(function () {
        saveEvaluationData();
    });
}

function showQuestions(data) {
    var count = 0;
    console.log("DATA IN SHOWQUESTIONS: " + data);
    data.forEach(function(complaint) {
        count++;
        var html = '';
        if (complaint.name != "Prevention") {
            html +=
                '<p><b>' + complaint.name + '</b></p>' +
                '<div class="question radio">' +
                '<label for="answers_quest' + count + '"><b>Wat is de ontwikkeling met betrekking tot de klacht</b></label>' +
                '<div id="answers_quest' + count + '">' +
                '<p>' +
                '<input type="radio" name="' + count + '" id="question_' + count + 'ans_1" choice="Verdwenen" />' +
                '<label for="question_' + count + 'ans_1">Verdwenen</label>' +
                '</p>' +
                '<p>' +
                '<input type="radio" name="' + count + '" id="question_' + count + 'ans_2" choice="Verminderd" />' +
                '<label for="question_' + count + 'ans_2">Verminderd</label>' +
                '</p>' +
                '<p>' +
                '<input type="radio" name="' + count + '" id="question_' + count + 'ans_3" choice="Gelijk gebleven" />' +
                '<label for="question_' + count + 'ans_3">Gelijk gebleven</label>' +
                '</p>' +
                '<p>' +
                '<input type="radio" name="' + count + '" id="question_' + count + 'ans_4" choice="Erger geworden" />' +
                '<label for="question_' + count + 'ans_4">Erger geworden</label>' +
                '</p>' +
                '</div>' +
                '</div>';

            count++;

            html +=
                '<div class="question w-select">' +
                '<label for="answers_quest' + count + '"><b>Pijn aangeven op een schaal van 0-10</b></label><br>' +
                '<select id="answers_quest' + count + '">' +
                '<p>' +
                '<option name="' + count + '" id="question_' + count + 'ans_1" choice="0">' +
                '<label for="question_' + count + 'ans_1">0</label></option>' +
                '</p>' +
                '<p>' +
                '<option name="' + count + '" id="question_' + count + 'ans_2" choice="1">' +
                '<label for="question_' + count + 'ans_2">1</label></option>' +
                '</p>' +
                '<p>' +
                '<option name="' + count + '" id="question_' + count + 'ans_3" choice="2">' +
                '<label for="question_' + count + 'ans_3">2</label></option>' +
                '</p>' +
                '<p>' +
                '<option name="' + count + '" id="question_' + count + 'ans_4" choice="3">' +
                '<label for="question_' + count + 'ans_4">3</label></option>' +
                '</p>' +
                '<p>' +
                '<option name="' + count + '" id="question_' + count + 'ans_5" choice="4">' +
                '<label for="question_' + count + 'ans_5">4</label></option>' +
                '</p>' +
                '<p>' +
                '<option name="' + count + '" id="question_' + count + 'ans_6" choice="5">' +
                '<label for="question_' + count + 'ans_6">5</label></option>' +
                '</p>' +
                '<p>' +
                '<option name="' + count + '" id="question_' + count + 'ans_7" choice="6">' +
                '<label for="question_' + count + 'ans_7">6</label></option>' +
                '</p>' +
                '<p>' +
                '<option name="' + count + '" id="question_' + count + 'ans_8" choice="7">' +
                '<label for="question_' + count + 'ans_8">7</label></option>' +
                '</p>' +
                '<p>' +
                '<option name="' + count + '" id="question_' + count + 'ans_9" choice="8">' +
                '<label for="question_' + count + 'ans_9">8</label></option>' +
                '</p>' +
                '<p>' +
                '<option name="' + count + '" id="question_' + count + 'ans_10" choice="9">' +
                '<label for="question_' + count + 'ans_10">9</label></option>' +
                '</p>' +
                '<p>' +
                '<option name="' + count + '" id="question_' + count + 'ans_11" choice="10">' +
                '<label for="question_' + count + 'ans_11">10</label></option>' +
                '</p>' +
                '</select>' +
                '</div>';
            if(complaint.name == "Back"){
                count++;
                html += '<div class="question checkbox">' +
                    '<label for="answers_quest' + count + '_back"><b>Aankruisen welke klachten aanwezig zijn</b></label>' +
                    '<div id="answers_quest' + count + '_back">' +
                    '<p>' +
                    '<input type="checkbox" name="' + count + '" id="question_' + count + 'ans_1" choice="Begin van lage rugpijn na het 50e levensjaar" />' +
                    '<label for="question_' + count + 'ans_1">Begin van lage rugpijn na het 50e levensjaar,</label>' +
                    '</p>' +
                    '<p class="full-width">' +
                    '<input type="checkbox" name="' + count + '" id="question_' + count + 'ans_2" choice="Continue pijn onafhankelijk van houding of beweging" />' +
                    '<label for="question_' + count + 'ans_2">Continue pijn onafhankelijk van houding of beweging,</label>' +
                    '</p>' +
                    '<p class="full-width">' +
                    '<input type="checkbox" name="' + count + '" id="question_' + count + 'ans_3" choice="Nachtelijke pijn" />' +
                    '<label for="question_' + count + 'ans_3">Nachtelijke pijn,</label>' +
                    '</p>' +
                    '<p class="full-width">' +
                    '<input type="checkbox" name="' + count + '" id="question_' + count + 'ans_4" choice="Abnormale vermoeidheid" />' +
                    '<label for="question_' + count + 'ans_4">Abnormale vermoeidheid,</label>' +
                    '</p>' +
                    '<p>' +
                    '<input type="checkbox" name="' + count + '" id="question_' + count + 'ans_5" choice="Kanker in de voorgeschiedenis" />' +
                    '<label for="question_' + count + 'ans_5">Kanker in de voorgeschiedenis,</label>' +
                    '</p>' +
                    '<p>' +
                    '<input type="checkbox" name="' + count + '" id="question_' + count + 'ans_6" choice="Onverklaard gewichtsverlies" />' +
                    '<label for="question_' + count + 'ans_6">Onverklaard gewichtsverlies,</label>' +
                    '</p>' +
                    '<p>' +
                    '<input type="checkbox" name="' + count + '" id="question_' + count + 'ans_7" choice="Recente breuk (minder dan 2 jaar geleden), eerdere wervelfractuur" />' +
                    '<label for="question_' + count + 'ans_7">Recente breuk (minder dan 2 jaar geleden), eerdere wervelfractuur</label>' +
                    '</p>' +
                    '</div>' +
                    '</div>';
            } else {
                count++;
                html += '<div class="question checkbox">' +
                    '<label for="answers_quest' + count + '"><b>Aankruisen welke klachten aanwezig zijn</b></label>' +
                    '<div id="answers_quest' + count + '">' +
                    '<p>' +
                    '<input type="checkbox" name="' + count + '" id="question_' + count + 'ans_1" choice="Abnormale vermoeidheid" />' +
                    '<label for="question_' + count + 'ans_1">Abnormale vermoeidheid,</label>' +
                    '</p>' +
                    '<p class="full-width">' +
                    '<input type="checkbox" name="' + count + '" id="question_' + count + 'ans_2" choice="Ongewild gewichtsverlies" />' +
                    '<label for="question_' + count + 'ans_2">Ongewild gewichtsverlies,</label>' +
                    '</p>' +
                    '<p class="full-width">' +
                    '<input type="checkbox" name="' + count + '" id="question_' + count + 'ans_3" choice="Koorts" />' +
                    '<label for="question_' + count + 'ans_3">Koorts,</label>' +
                    '</p>' +
                    '<p class="full-width">' +
                    '<input type="checkbox" name="' + count + '" id="question_' + count + 'ans_4" choice="Nachtzweten" />' +
                    '<label for="question_' + count + 'ans_4">Nachtzweten,</label>' +
                    '</p>' +
                    '<p>' +
                    '<input type="checkbox" name="' + count + '" id="question_' + count + 'ans_5" choice="Pijn die niet beïnvloedbaar is door houding of beweging" />' +
                    '<label for="question_' + count + 'ans_5">Pijn die niet beïnvloedbaar is door houding of beweging,</label>' +
                    '</p>' +
                    '<p>' +
                    '<input type="checkbox" name="' + count + '" id="question_' + count + 'ans_6" choice="Neuropathische pijn" />' +
                    '<label for="question_' + count + 'ans_6">Neuropathische pijn,</label>' +
                    '</p>' +
                    '<p>' +
                    '<input type="checkbox" name="' + count + '" id="question_' + count + 'ans_7" choice="Neurologische symptomen (krachtverlies, uitvalsverschijnselen)" />' +
                    '<label for="question_' + count + 'ans_7">Neurologische symptomen (krachtverlies, uitvalsverschijnselen),</label>' +
                    '</p>' +
                    '<p>' +
                    '<input type="checkbox" name="' + count + '" id="question_' + count + 'ans_8" choice="Een recent trauma" />' +
                    '<label for="question_' + count + 'ans_8">Een recent trauma,</label>' +
                    '</p>' +
                    '<p>' +
                    '<input type="checkbox" name="' + count + '" id="question_' + count + 'ans_9" choice="Tekenen van een ontstekingsproces" />' +
                    '<label for="question_' + count + 'ans_9">Tekenen van een ontstekingsproces</label>' +
                    '</p>' +
                    '</div>' +
                    '</div>';
            }
            $('#questions').append(html);
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

/**
 * Function for saving the data from the evaluation form
 */
function saveEvaluationData(){
    var formData = { questions: [], answers: [] };
    var questions = $("#questions").find('.question');
    var checkedAns;

    for(i = 0; i < questions.length; i++){
        console.log("Questions.length: " + questions.length);
        var answer = {};
        var currQuestion = questions[i];
        var question = currQuestion.children[0].innerText;
        var questType = currQuestion.classList[1]; // get question type, e.g.

        console.log(answer);
        console.log(currQuestion);
        console.log("question: " + question);
        console.log("questType: " + questType);

        switch (questType) {
            case "checkbox": // if checkbox, get all selected values
                checkedAns = $(currQuestion).find('input[type=checkbox]:checked');
                console.log("Amount of checked checkboxes: " + checkedAns.length);
                answer.checkbox = [];
                for(j = 0; j < checkedAns.length; j++){
                    // if(checkedAns[j].attr('choice') != undefined) {
                    answer.checkbox.push($(checkedAns[j]).attr('choice').trim());
                    // }
                }
                break;
            case "radio": // if radio, get the selected value when not undefined
                checkedAns = $(currQuestion).find('input[type=radio]:checked');
                console.log("checkedAns: " + checkedAns);
                if(checkedAns.attr('choice') != undefined) {
                    answer.radio = checkedAns.attr('choice').trim();
                }
                break;
            case "w-select": // if select, get all selected values
                checkedAns = $(currQuestion).find('option:selected');
                console.log("checkedAns: " + checkedAns);
                if(checkedAns.attr('choice') != undefined) {
                    answer.selected = checkedAns.attr('choice').trim();
                }
                break;
        }

        formData.questions.push(question);
        formData.answers.push(answer);
    }

    postEvaluation(questions, formData);
}

/**
 * Ajax call for posting form data
 * @param questions
 * @param formData
 */
function postEvaluation(questions, formData) {
    console.log("formdata.questions: " + JSON.stringify(formData.questions));
    console.log("formdata.answers: " + JSON.stringify(formData.answers));
    $.ajax({
        type: 'POST',
        headers: {
            'authorization': jwt
        },
        url: hostAdress + "/evaluation/add",
        data: {
            "questions": JSON.stringify(formData.questions),
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


