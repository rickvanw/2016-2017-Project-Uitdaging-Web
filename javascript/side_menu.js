var jwt = getToken();
var hostAdress = getConnection();

$(document).ready(function() {

    console.log("SIDEMENU");


    if(isAdministrator()){
        addToMenu("admin_exercise", "Oefeningen","fa-list");
        addToMenu("admin_add_admin", "Admin +","fa-list");
    }else{
        addToMenu("profiel", "Profiel","fa-user");
        addToMenu("evaluatie", "Evaluatie","fa-plus-square");
        addToMenu("behandelplan", "Behandelplan","fa-list");
        addToMenu("history", "Geschiedenis","fa-list");
    }

});

function addToMenu(pageName, pageTitle, image){

    var menuItem = '<li class=""><a ng-click="loadPage('+ "'" + pageName + "'" + ')">'+pageTitle+'<span style="font-size:18px;" class="pull-right hidden-xs showopacity glyphicon"><i class="fa '+image+'" aria-hidden="true"></i></span></a></li>';
    $('.navbar-nav').append(menuItem);

}
