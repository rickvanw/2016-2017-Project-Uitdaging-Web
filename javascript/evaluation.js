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

}

function showQuestions(data) {
    data.forEach(function(evaluation) {
        $("#questions").append()
    });
}

function getQuestions() {
    var request = $.ajax({
        type: 'GET',
        headers: {
            'authorization': jwt
        },
        data: JSON.stringify(exercises),
        url: "http://localhost:8000" + "/evaluation/evaluation",
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

