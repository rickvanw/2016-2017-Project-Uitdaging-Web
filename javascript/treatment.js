/**
 * Created by rickv on 18-5-2017.
 */
placeExercises();

$(document).ready(function() {


    $('.left_arrow').click(function(event){
        alert("previous");
    });
    $('.right_arrow').click(function(event){
        alert("next");
    });

    var disabled = 0;

    $('.doneButton').click(function(event){
        disabled=this.id.substr(this.id.length - 1);
        return false;
    });

    $('.notdoneButton').click(function(event){
        disabled = 0;
    });

    $('.likeButton').click(function(event){
        if (disabled != this.id.substr(this.id.length - 1)) {
            alert("Geef eerst aan dat je de oefening gedaan hebt");
            return false;
        }else{

        }
    });

    $('.dislikeButton').click(function(event){
        if (disabled != this.id.substr(this.id.length - 1)) {
            alert("Geef eerst aan dat je de oefening gedaan hebt");
            return false;
        }else{

        }
    });

});

function placeExercises() {

        var text = $("#template_exercise").html();
        for (i = 1; i < 5; i++) {

            //Set all the right unique id's
            $("#all_exercises_container").append(text);
            $("#collapse0").attr("id","collapse"+i);
            $("#link01").attr({href:"#collapse"+i, id:""});
            $("#link02").attr({href:"#collapse"+i, id:""});
            $("#doneButton0").attr("id","doneButton"+i);
            $("#notDoneButton0").attr("id","notDoneButton"+i);
            $("#likeButton0").attr("id","likeButton"+i);
            $("#dislikeButton0").attr("id","dislikeButton"+i);
            $("#exercise0").attr("id","exercise"+i);

            // Fill the exercises

            //Quickview image
            $('#' + "exercise"+i).find('.quickview_image').attr("src","img/exercise"+i + ".jpg");

            //Expanded image
            $('#' + "exercise"+i).find('.collapse_image').attr("src","img/exercise"+i + ".jpg");

            // Title
            $('#' + "exercise"+i).find('.exercise_quickview_title').text("Exercise name"+i);

            //Repeats amount
            $('#' + "exercise"+i).find('.exercise_quickview_amount_repeats').text(i);


            var description = "Planken is niet ingewikkeld. Voor de basisplank ga je eerst op je buik liggen.Plaats je ellebogen onder de schouders en zet je tenen in de vloer. Druk je bovenlichaam omhoog op je onderarmen en til ook je benen van de grond. Vind jehet lastig om in een keer je lijf omhoog te brengen, steun dan als tussenstap op je knieën.";

            //Repeats amount
            $('#' + "exercise"+i).find('.description_text').text(description+i);

        }


}

