/**
 * Created by rickv on 1-6-2017.
 */
var jwt = getToken();
var hostAdress = getConnection();

$(document).ready(function() {

    initializeNotification();
    getTreatment();
});

function getTreatment(){
    var request = $.ajax({
        type: 'GET',
        headers: {
            'authorization':jwt
        },
        url: hostAdress + "/treatment/to-evaluate",
        dataType: 'json',
        statusCode: {
            200:function(){
                console.log(200, "succes!");
            },
            401:function(error) {
                console.log(401);
            },
            404: function(error){
                console.log(404, error)
            }
        },
        error: function (err) {
            console.log("Error getting treatment: " + err.message);
        }
    });

    request.done(function (data) {
        if(data == ""){
            console.log("No treatment to be evaluated");
        }else{
            //TODO niet als error terugkomt
            console.log("Treatment to be evaluated");
            enableNotifcation();
        }
    });
}

function enableNotifcation(){
    $('.header.notify_icon').mouseover(function() {
        $(this).css("color","darkred");
    }).mouseout(function() {
        $(this).css("color","red");
    }).css('color', 'red').attr(
        "data-content", "<div class='cursor_pointer' onclick='notifyPopupClick()'>U heeft een behandelplan voltooid!<br />Klik hier om de evaluatie in te vullen</div>"
    );
}

function initializeNotification(){
    $('.header.notify_icon').popover({
        trigger: 'focus'
    });

    $('.header.notify_icon').mouseover(function() {
        $(this).css("color","deepskyblue");

    }).mouseout(function() {
        $(this).css("color","white");
    }).css('color', 'white').attr(
        "data-content", "<div class='cursor_default'> U heeft momenteel geen notificaties </div>"
    ).attr(
        "title", "<div class='cursor_default'>Notificaties</div>"
    );
}

function notifyPopupClick() {
    // TODO Go to evaluations
    alert("test");
}


