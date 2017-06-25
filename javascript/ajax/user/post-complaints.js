/**
 * Ajax call for passing through complaints by a user.
 *
 * Created by maurice_2 on 18-5-2017.
 */
var jwt = sessionStorage.token;
var hostAdress = getConnection();

$(document).ready(function() {
    // alert("test1");
    userInteraction();
});

/**
 * Function for user interaction with the complaintbuttons and posting possibly indicated complaints.
 */
function userInteraction () {
    var complaint_ids = [];

    $('#neckbutton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        if (!isInComplaints(1)) {
            addToComplaints(1);
            $(this).css('background-color', '#4A90E2');
            $(this).css('border', '4px solid #1765BE');
        }else{
            removeFromComplaints(1);
            $(this).css('background-color', '#D8D8D8');
            $(this).css('border', '4px solid #D8D8D8');
        }
        return false;
    });
    $('#elbowbutton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        if (!isInComplaints(2)) {
            addToComplaints(2);
            $(this).css('background-color', '#4A90E2');
            $(this).css('border', '4px solid #1765BE');
        }else{
            removeFromComplaints(2);
            $(this).css('background-color', '#D8D8D8');
            $(this).css('border', '4px solid #D8D8D8');
        }
        return false;
    });
    $('#shoulderbutton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        if (!isInComplaints(3)) {
            addToComplaints(3);
            $(this).css('background-color', '#4A90E2');
            $(this).css('border', '4px solid #1765BE');
        }else{
            removeFromComplaints(3);
            $(this).css('background-color', '#D8D8D8');
            $(this).css('border', '4px solid #D8D8D8');
        }
        return false;
    });
    $('#wristhandbutton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        if (!isInComplaints(4)) {
            addToComplaints(4);
            $(this).css('background-color', '#4A90E2');
            $(this).css('border', '4px solid #1765BE');
        }else{
            removeFromComplaints(4);
            $(this).css('background-color', '#D8D8D8');
            $(this).css('border', '4px solid #D8D8D8');
        }
    });
    $('#backbutton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        if (!isInComplaints(5)) {
            addToComplaints(5);
            $(this).css('background-color', '#4A90E2');
            $(this).css('border', '4px solid #1765BE');
        }else{
            removeFromComplaints(5);
            $(this).css('background-color', '#D8D8D8');
            $(this).css('border', '4px solid #D8D8D8');
        }
    });
    $('#preventionbutton').off("click").on("click", function (e) {
        e.stopImmediatePropagation();
        if (!isInComplaints(6)) {
            addToComplaints(6);
            $(this).css('background-color', '#4A90E2');
            $(this).css('border', '4px solid #1765BE');
        }else{
            removeFromComplaints(6);
            $(this).css('background-color', '#D8D8D8');
            $(this).css('border', '4px solid #D8D8D8');
        }
    });
    $("#complaint-ok").submit(function (e) {
        //console.log("complaints: " + complaint_ids.length);
        e.stopImmediatePropagation();
        if (hasComplaints()) {
            // first, post the complaints of the user
            if(postComplaints()){
                // then, create a new treatment
                createTreatment();
            } else {
                //console.log("Cannot create treatment, something went wrong!");
            }
        } else {
            //console.log("Je hebt nog geen complaint aangevinkt!");
        }
    });

    /**
     * Function that checks if the given id is in the complaints list
     * @param value
     * @returns {boolean}
     */
    function isInComplaints(value) {
        return complaint_ids.indexOf(value.toString()) > -1;
    }

    /**
     * Function that adds a new complaint to the list with complaint_ids.
     * @param value
     */
    function addToComplaints(value) {
        if(!isInComplaints(value.toString())){
            complaint_ids.push(value.toString());
        }
    }

    /**
     * Function that removes a complaint from the complaints list
     * @param value
     */
    function removeFromComplaints(value) {
        if(isInComplaints(value.toString())){
            var index = complaint_ids.indexOf(value.toString());
            if (index > -1) {
                complaint_ids.splice(index, 1);
            }
        }
    }

    /**
     * Functions that checks if
     * @returns {boolean}
     */
    function hasComplaints() {
        return complaint_ids.length != 0;
    }

    /**
     * Function that posts the complaints which the user has indicated
     */
    function postComplaints () {
        var bool = false;

        $.ajax({
            type: 'POST',
            headers: {
                'authorization':jwt
            },
            url: hostAdress + "/user/complaint/add",
            async: false,
            data: {
                "complaint_ids": JSON.stringify(complaint_ids)
            },
            dataType: 'text',
            statusCode: {
                201: function () {
                    //console.log(201);
                    bool = true;
                },
                401: function (error) {
                    //console.log(error);
                },
                400: function (error) {
                    //console.log(error);
                }
            },
            error: function (err) {
                //console.log("Error: " + err);
            }
        });

        return bool;
    }

    /**
     * Function that creates the treatment for a complaint id
     */
    function createTreatment() {
        //console.log("Treatment wordt gecreëerd");

        $.ajax({
            type: 'POST',
            headers: {
                'authorization':jwt
            },
            url: hostAdress + "/treatment/add",
            success: function(){
                alert("A new treatment has been created");
                return true;
            },
            statusCode: {
                201:function(){
                    //console.log(201);
                },
                401:function(error) {
                    //console.log(401);
                },
                400: function(error){
                    //console.log(400);
                }
            }
        });
    }
    //
    // /**
    //  * Function for returning the current date.
    //  * @returns {Date}
    //  */
    // function getCurrentDate(){
    //     var currentDate = new Date();
    //     var dd = currentDate.getDate();
    //     var mm = currentDate.getMonth() + 1; // January is zero, so + 1
    //     var yyyy = currentDate.getFullYear();
    //
    //     // If the days / months are smaller than 10, we want to put a 0 before it. So for example 2017-09-09 instead of 2017-9-9
    //     if(dd < 10) {
    //         dd = '0' + dd
    //     }
    //
    //     if(mm < 10) {
    //         mm = '0' + mm
    //     }
    //
    //     currentDate = yyyy + '/' + mm + '/' + dd;
    //     return currentDate;
    // }
    //
    // /**
    //  * Function for returning the end date of a treatment. The end date is 6 weeks (42 days) after the start date.
    //  * @returns {Date}
    //  */
    // function getEndDate() {
    //     var startDate = getCurrentDate();
    //     var endDate = new Date();
    //
    //     endDate.setDate(startDate.getDate() + 42);
    //     return endDate;
    // }
}