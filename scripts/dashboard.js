$(document).ready(function(){

    $("#createco-btn").click(function (){
       
        $(".generalstats-wrapper").css({"opacity": "0.5"});
        $(".stats-wrapper").css({"opacity": "0.5"});
        $("#cc").fadeIn(200);
        $('.submit-org-btn').click(function(){
            var company = $("#company_name").val();
            $("#cc").hide();
            $(".addorg-wrapper").fadeIn();
            $(".popup").append(`<p>${company} has been added to database, go to the Admin Panel to add users`);
            $(".continue").click(function(){
                window.location = "/dashboard"
            });


            
    
        });
        
    });
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic-avatar').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
    

    $(".file-upload").on('change', function(){
        readURL(this);
    });
    
    $(".upload-button").on('click', function() {
       $(".file-upload").click();
    });


    
});

