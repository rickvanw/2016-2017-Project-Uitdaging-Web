var jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ1YmVuYXNzaW5rQGhvdG1haWwuY29tIiwidXNlcl9pZCI6NCwicm9sZV9pZCI6MCwiaWF0IjoxNDk1MzkzNTYwLCJleHAiOjE1MjY5Mjk1NjB9.4UMl25J0i7C4d5METeHxY-4FYrf9ez0B0RkkijuoaCc";
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
        url: "http://localhost:8000" + "/treatment/add",
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

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}

