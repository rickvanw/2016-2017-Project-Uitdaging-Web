var jwt = getToken();
var hostAdress = getConnection();

$(document).ready(function () {
    userInteraction();
});

function userInteraction() {
    getEvaluationId();
    getBeginDate();
}

function showEvaluations(data) {
    $('#evaluation-container').append("<ul class='evaluationlist'></ul>");
    data.forEach(function (item, index) {
        if (index <= evaluationIds.size()) {
            $('.evaluationlist').append(
                "<li class='evaluationitem1' id='" + item.treatment_id + "'>" +
                "<a href='evaluation-content.html?treatment_id=" + item.treatment_id + "' target='_blank' class='evaluationitem'> " +
                "<p class='begin'>Begindatum</p>" +
                "<p class='begindatum'>" + item.start_date + "</p>" +
                "</a>" +
                "</li>"
            );
        }
    });

    //Testing list
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

function addEvaluationId(data) {
    data.forEach(function (item) {
        evaluationIds.add(item);
    });
}

function getBeginDate() {
    var request = $.ajax({
        type: 'GET',
        headers: {
            'authorization': jwt
        },
        url: hostAdress + "/treatment/startdate",
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
        showEvaluations(data);
    });

}

function getEvaluationId() {
    var request = $.ajax({
        type: 'GET',
        headers: {
            'authorization': jwt
        },
        url: "http://localhost:8000/evaluation/evaluationid",
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
        addEvaluationId(data);
    });
}

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}


