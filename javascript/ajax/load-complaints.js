/**
 * Created by maurice_2 on 17-5-2017.
 */
$(document).ready(function() {

    var request = $.ajax({
        type: 'GET',
        url: API_URL + "/complaints",
        dataType: 'json',
        headers: {'Authorization': localStorage.getItem('token')}
    });

    request.done(function (data) {
        //
    });

});