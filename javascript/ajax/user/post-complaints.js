/**
 * Ajax call for passing through complaints by a user.
 *
 * Created by maurice_2 on 18-5-2017.
 */
$(document).ready(function() {
    var complaint_ids = [];

    $("#complaint-ok").submit(function () {
        var user_id = localStorage.getItem('user_id');

        alert("User_id: " + user_id);
        alert("Complaint_id length: " + complaint_ids.length);

        for(i = 0; i < complaint_ids; i++) {
            $.ajax({
                type: 'POST',
                url: "http://localhost:8000" + "/complaint/add",
                data: {
                    "user_id": user_id,
                    "complaint_id": complaint_ids[i]
                },
                success: function (data) {
                    console.log("Klacht met complaint_id " + data.complaint_id + "toegevoegd aan user met user_id " + data.user_id);
                },
                statusCode: {
                    200: function () {
                        console.log(200, "succes!");
                    },
                    401: function (error) {
                        console.log(401);
                    },
                    400: function (error) {
                        console.log(400, error)
                    }
                }
            });
        }
    });

    /**
     * Function for passing through a complaint id
     * @param id
     */
    function passThroughId(id){
        complaint_ids[id - 1] = id;
    }
});