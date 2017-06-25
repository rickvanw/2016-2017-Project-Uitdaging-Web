var jwt = getToken();
var hostAdress = getConnection();

$(document).ready(function () {
    userInteraction();
});

function userInteraction() {
    getBeginDate();
}

/**
 * Function that shows the list of evaluations a user has
 * @param data
 */
function showEvaluations(data) {
    $('#evaluation-container').append("<ul class='evaluationlist'></ul>");
    data.forEach(function (evaluations, index) {
        var currentDate = getRightDate(new Date());
        var startDate = getRightDate(evaluations.start_date);
        var endDate = getRightDate(evaluations.end_date);
        // if(data.length == 1 && compareTime(endDate, currentDate) || data.length == 0){
        //     $('.evaluationlist').append("<p id='noevals'>Er zijn nog geen voltooide evaluaties om te bekijken, voltooi eerst een behandelplan voor zes weken.</p>");
        // } else if(data.length >= 1 && compareTime(currentDate, endDate)){
            $('.evaluationlist').append(
                "<li class='evaluationitem1' id='" + evaluations.treatment_id + "'>" +
                "<a href='evaluationcontent.html?treatment_id=" + evaluations.treatment_id + "' target='_blank' class='evaluationitem'> " +
                "<p class='begin'>Begindatum</p>" +
                "<p class='begindatum'>" + startDate + "</p>" +
                "</a>" +
                "</li>"
            );
        // }
    });
}

/**
 * Function returns true if time1 is later than time2
 * @param time1
 * @param time2
 * @returns {boolean}
 */
function compareTime(time1, time2) {
    return (time1) > (time2);
}

/**
 * Gets a date to be the right format
 * @param date
 * @returns {string|*}
 */
function getRightDate(date){
    date = new Date(date);
    var y = date.getFullYear();
    var m =  date.getMonth();
    var d = date.getDate();
    m += 1;
    date = "" + y + "-" + m + "-" + d;
    return date;
}

/**
 * Ajax call for getting treatment data
 */
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
            notifyUser("Kon geen evaluaties ophalen, neem contact op met uw systeembeheerder");
        }
    });

    request.done(function (data) {
        showEvaluations(data);
    });

}

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}


