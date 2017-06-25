var jwt = getToken();
var hostAdress = getConnection();

$(document).ready(function () {
    console.log(jwt);
    console.log("hoihoihoih");
    userInteraction();
});

function userInteraction () {
    console.log("hoihoieshofisehoifhseoifhesi");
    getEvaluation();
    // $('#neckbutton').off("click").on("click", function (e) {
    //     e.stopImmediatePropagation();
    //     $(this).css('background-color', '#4A90E2');
    //     var vraag1 = document.getElementById('vraag1');
    //     $(vraag1).style.display = 'block';
    // });
}

function openEvaluation(data){
    $('#evaluationform').append("<ul id='evaluationlist'></ul>");
    var treatment_id = getURLParameter("treatment_id");
    data.forEach(function (question) {
            $('#evaluationlist').append(
                "<li class='evaluationitem'>" +
                "<p class='question'>" + question.answer + "</p>" +
                // "<p class='answer'>" + item.answer + "</p>" +
                "</a>" +
                "</li>"
            );
            // $('.evaluationlist').append(
            //     "<li class='evaluationitem' id='" + complaint.treatment_id + "'>" +
            //     "<p class='question'>" + item.question + "</p>" +
            //     "<p class='answer'>" + item.answer + "</p>" +
            //     "</a>" +
            //     "</li>"
            // );
    });

}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function getEvaluation() {
    console.log("zit in getEvaluation");
    var request = $.ajax({
        type: 'GET',
        headers: {
            'authorization': jwt
        },
        url: hostAdress + "/treatment/evaluation-answers",
        dataType: 'json',
        statusCode: {
            200: function () {
                console.log(200, "succes!");
            },
            400: function (error) {
                console.log(400);
            },
            403: function (error) {
                console.log(403)
            },
            404: function (error) {
                console.log(404)
            }
        },
        error: function (err) {
            notifyUser("Kon geen evaluaties ophalen, neem contact op met uw systeembeheerder");
            console.log("Error getting evaluations: " + err.message);
        }
    });

    request.done(function (data) {
        openEvaluation(data);
    });
}

// function getComplaints() {
//     var request = $.ajax({
//         type: 'GET',
//         headers: {
//             'authorization': jwt
//         },
//         url: "http://localhost:8000/complaint/complaint-names",
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
//         openEvaluation(data);
//     });
// }

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}
