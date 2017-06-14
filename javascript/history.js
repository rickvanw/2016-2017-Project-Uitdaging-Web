var jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ1YmVuYXNzaW5rQGhvdG1haWwuY29tIiwidXNlcl9pZCI6NCwicm9sZV9pZCI6MCwiaWF0IjoxNDk1MzkzNTYwLCJleHAiOjE1MjY5Mjk1NjB9.4UMl25J0i7C4d5METeHxY-4FYrf9ez0B0RkkijuoaCc";
// var listitems = [];

$(document).ready(function () {
    userInteraction();
});

function userInteraction() {
    getBeginDate();
    // var evaluationitem = document.getElementsByClassName("evaluationitem1");
    // $(evaluationitem).onclick = function() {openEvaluation(evaluationitem)};

}

function showEvaluations(data) {
    $('#evaluation-container').append("<ul class='evaluationlist'></ul>");
    data.forEach(function (item) {
        $('.evaluationlist').append(
            "<li class='evaluationitem1' id='" + item.treatment_id +"'>"  +
                "<a href='evaluation-content.html?treatment_id=" + item.treatment_id + "' target='_blank' class='evaluationitem'> " +
                "<p class='begin'>Begindatum</p>" +
                "<p class='begindatum'>" + item.start_date + "</p>" +
                "</a>" +
            "</li>"
        );
        // listitems.add(document.getElementById("" + treatment_id.toString()));
    });

    // $('#evaluation-container').append("<ul class='evaluationlist'></ul>");
    // for (i = 0; i < 12; i++) {
    //     $('.evaluationlist').append("<li class='evaluationitem1'> " +
    //         "<a href='evaluation-content.html' target='_blank' class='evaluationitem'> " +
    //         "<p class='begin'>Begindatum</p>" +
    //         "<p class='begindatum'> hoi </p>" +
    //         "</a></li>");
    //
    // }
}

function getBeginDate() {
    var request = $.ajax({
        type: 'GET',
        headers: {
            'authorization': jwt
        },
        url: "http://localhost:8000/treatment/startdate",
        dataType: 'json',
        statusCode: {
            200: function () {
                console.log(200, "succes!");
            },
            401: function (error) {
                console.log(401);
            },
            404: function (error) {
                console.log(404, error)
            }
        },
        error: function (err) {
            alert("Error: " + err);
        }
    });
    request.done(function (data) {
        showEvaluations(data);
    });
}

// function getEvaluation() {
//     var request = $.ajax({
//         type: 'GET',
//         headers: {
//             'authorization': jwt
//         },
//         url: "http://localhost:8000" + "/evaluation/",
//         dataType: 'json',
//         statusCode: {
//             201: function () {
//                 console.log(201, "succes!");
//             },
//             400: function (error) {
//                 console.log(400);
//             },
//             403: function (error) {
//                 console.log(403, error)
//             }
//         },
//         error: function (err) {
//             alert("Error: " + err);
//         }
//     });
//     request.done(function (data) {
//         showEvaluationContent(data);
//     });
// }

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}


