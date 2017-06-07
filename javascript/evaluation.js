$(document).ready(function(){
    $("#improvementno").click(function() {
        $('#pain').css("display","inline");
        $('#paincount').css("display","inline");
    });
    $("#improvementyes").click(function() {
        if($('#pain').css('display') == 'inline')
        {
            $('#pain').css("display","none");
            $('#paincount').css("display","none");
        }
    });
    $("#nocomplaints").click(function() {
        if($('#pain').css('display') == 'inline')
        {
            $('#pain').css("display","none");
            $('#paincount').css("display","none");
        }
    });
});
