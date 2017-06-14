/**
 * Created by larsw on 7-6-2017.
 */
$(document).ready(function() {
    userInteraction();
});

function userInteraction () {
    openEvaluation();
    $('#neckbutton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        $(this).css('background-color', '#4A90E2');
        var vraag1 = document.getElementById('vraag1');
        $(vraag1).style.display = 'block';
    });

}

function openEvaluation(){
    var treatment_id = getURLParameter("treatment_id");
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function getEvaluation() {
    var request = $.ajax({
        type: 'GET',
        headers: {
            'authorization': jwt
        },
        url: "http://localhost:8000" + "/treatment/exercises-day",
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
            notifyUser("Kon geen evaluaties ophalen, neem contact op met uw systeembeheerder");
            console.log("Error getting evaluations: " + err.message);
        }
    });
}

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}
