/**
 * Created by rickv on 18-5-2017.
 */
$(document).ready(function() {

    $('.left_arrow').click(function(event){
        alert("previous");
    });
    $('.right_arrow').click(function(event){
        alert("next");
    });


    var disabled = 0;

    $('#doneButton').click(function(event){
        disabled = 1;
        return false;
    });

    $('#notdoneButton').click(function(event){
        disabled = 0;
    });

    $('#likeButton').click(function(event){
        if (disabled==0) {
            alert("Geef eerst aan dat je de oefening gedaan hebt");
            return false;
        }else{

        }
    });

    $('#dislikeButton').click(function(event){
        if (disabled==0) {
            alert("Geef eerst aan of je de oefening gedaan hebt");
            return false;
        }else{

        }
    });

});

function fillNames(names) {
    document.getElementById('nekbutton').textContent = names[0];
    document.getElementById('').textContent = names[0];



}

