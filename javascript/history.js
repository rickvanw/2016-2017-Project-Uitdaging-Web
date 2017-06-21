var jwt = getToken();
var hostAdress = getConnection();
var evaluations= [];

$(document).ready(function() {
    for(i = 0; i<evaluations.length; i++){
        getEvaluation();
    }
    showEvaluations();

    $(".evaluationitem").click(function() {

    });
});

function showEvaluations(){
    for(i = 0; i<evaluations.length; i++){
        if(i==0){
            $('.evaluationitem').css('display', 'inline');
        }else{
            var div =  $('.evaluationitem').clone();
            div.css('display', 'inline');
        }
    }
}

function getEvaluation() {
    var request = $.ajax({
        type: 'GET',
        headers: {
            'authorization': jwt
        },
        data: JSON.stringify(exercises),
        url: hostAdress + "/treatment/add",
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
        alert("Done");
    });
}

