


$(document).ready(function(){
    $(".submit-btn").click(function(){
        var firstName = $("#name").val();
        var lastName = $("#lastname").val();
        $(".addemployee-wrapper").fadeIn();
        $(".popup").append(`<p>${firstName} ${lastName} has been added`);
        $(".continue").click(function(){
            window.location = "/adminpanel"
        });

     
    });
    $("#clockoutbtn").click(function () {
        $.post("/adminpanel",
           {
              name: "viSion",
              designation: "Professional gamer"
           },
           function (data, status) {
              console.log(data);
           });
     });

     
    
});

