/**
 * Ajax call for creating a new treatment.
 *
 * Created by maurice_2 on 17-5-2017.
 */
var hostAdress = "http://178.21.112.250:8000";

$(document).ready(function(){

    $("#complaint-ok").submit(function(){
        var start_date = getCurrentDate();
        var end_date = getEndDate();

        $.ajax({
            type: 'POST',
            url: hostAdress + "/treatment/add",
            data: {
                "start_date": start_date,
                "end_date": end_date
            },
            success: function(data){
                alert("A new treatment has been created");
            },
            statusCode: {
                200:function(){
                    console.log(200, "succes!");
                },
                401:function(error) {
                    console.log(401);
                },
                400: function(error){
                    console.log(400, error)
                }
            }
        });
    });

    /**
     * Function for returning the current date.
     * @returns {Date}
     */
    function getCurrentDate(){
        var currentDate = new Date();
        var dd = currentDate.getDate();
        var mm = currentDate.getMonth() + 1; // January is zero, so + 1
        var yyyy = currentDate.getFullYear();

        // If the days / months are smaller than 10, we want to put a 0 before it. So for example 2017-09-09 instead of 2017-9-9
        if(dd < 10) {
            dd = '0' + dd
        }

        if(mm < 10) {
            mm = '0' + mm
        }

        currentDate = yyyy + '/' + mm + '/' + dd;
        return currentDate;
    }

    /**
     * Function for returning the end date of a treatment. The end date is 6 weeks (42 days) after the start date.
     * @returns {Date}
     */
    function getEndDate() {
        var startDate = getCurrentDate();
        var endDate = new Date();

        endDate.setDate(startDate.getDate() + 42);
        return endDate;
    }

});