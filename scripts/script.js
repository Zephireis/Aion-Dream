
var code =[]


var totalSeconds = 0;
function countTimer() {
           ++totalSeconds;
           var hour = Math.floor(totalSeconds /3600); // converts into hours
           var minute = Math.floor((totalSeconds - hour*3600)/60); // converts into minuets
           var seconds = totalSeconds - (hour*3600 + minute*60); // converts into seconds
           if(hour < 10)
             hour = "0"+hour;
           if(minute < 10)
             minute = "0"+minute;
           if(seconds < 10)
             seconds = "0"+seconds;
             a = hour + ":" + minute + ":" + seconds
            //  console.log(a)
            //  document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
             
};





$(document).ready(function(){
    // $("#pass").on("input", function() {
    //     $("#count").text(this.value.length);
    // });
    $("#btn").click(function(){
        
        var timerVar = setInterval(countTimer, 1000); //calling the countTimer function and in intervals
        $(".container").hide();
        $(".container2").fadeIn();
        $(".container2").append(' <div class="number" id="seven"><p class="int" id="seven">7</p></div>');
        $(".container2").append(' <div class="number" id="eight"><p class="int" id="eight">8</p></div>');
        $(".container2").append(' <div class="number" id="nine"><p class="int" id="nine">9</p></div>');
        $(".container2").append(' <div class="number" id="four"><p class="int" id="four">4</p></div>');
        $(".container2").append(' <div class="number" id="five"><p class="int" id="five">5</p></div>');
        $(".container2").append(' <div class="number" id="six"><p class="int" id="six">6</p></div>');
        $(".container2").append(' <div class="number" id="one"><p class="int" id="one">1</p></div>');
        $(".container2").append(' <div class="number" id="two"><p class="int" id="two">2</p></div>');
        $(".container2").append(' <div class="number" id="three"><p class="int" id="three">3</p></div>');
        $(".container2").append(' <div class="number" id="star"><p class="int" id="*">*</p></div>');
        $(".container2").append(' <div class="number" id="zero"><p class="int" id="zero">0</p></div>');
        $(".container2").append(' <div class="number" id="hastag"><p class="int" id="hashtag">#</p></div>');

        $("#seven").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '7');
            var myLength = $("input").val().length;
            console.log(myLength);
            if (myLength === 4){
                $(".confirm-clock").fadeIn();
                $("form").hide();
                $(".number").hide();
                $(".time-wrapper").hide();
               
                
                
            }
        });

        $("#eight").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '8');
            var myLength = $("input").val().length;
            console.log(myLength);
            if (myLength === 4){
                $(".confirm-clock").fadeIn();
                $("form").hide();
                $(".number").hide();
                $(".time-wrapper").hide();
                $("#fuck").trigger('click')
            }
        });
        $("#nine").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '9');
            var myLength = $("input").val().length;
            console.log(myLength);
            if (myLength === 4){
                $(".confirm-clock").fadeIn();
                $("form").hide();
                $(".number").hide();
                $(".time-wrapper").hide();
                $("#fuck").trigger('click')
            }
        });
        $("#four").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '4');
            var myLength = $("input").val().length;
            console.log(myLength);
            if (myLength === 4){
                $(".confirm-clock").fadeIn();
                $("form").hide();
                $(".number").hide();
                $(".time-wrapper").hide();
                $("#fuck").trigger('click')
            }
        });
        $("#five").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '5');
            var myLength = $("input").val().length;
            console.log(myLength);
            if (myLength === 4){
                $(".confirm-clock").fadeIn();
                $("form").hide();
                $(".number").hide();
                $(".time-wrapper").hide();
                $("#fuck").trigger('click')
            }
        });
        $("#six").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '6');
            var myLength = $("input").val().length;
            console.log(myLength);
            if (myLength === 4){
                $(".confirm-clock").fadeIn();
                $("form").hide();
                $(".number").hide();
                $(".time-wrapper").hide();
                $("#fuck").trigger('click')
            }
        });
        $("#one").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '1');
            var myLength = $("input").val().length;
            console.log(myLength);
            if (myLength === 4){
                $(".confirm-clock").fadeIn();
                $("form").hide();
                $(".number").hide();
                $(".time-wrapper").hide();
                $("#fuck").trigger('click')
            }
        });
        $("#two").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '2');
            var myLength = $("input").val().length;
            console.log(myLength);
            if (myLength === 4){
                $(".confirm-clock").fadeIn();
                $("form").hide();
                $(".number").hide();
                $(".time-wrapper").hide();
                $("#fuck").trigger('click')
            }
        });
        $("#three").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '3');
            var myLength = $("input").val().length;
            console.log(myLength);
            if (myLength === 4){
                $(".confirm-clock").fadeIn();
                $("form").hide();
                $(".number").hide();
                $(".time-wrapper").hide();
                $("#fuck").trigger('click')
            }
        });
        $("#star").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '*');
            var myLength = $("input").val().length;
            console.log(myLength);
            if (myLength === 4){
                $(".confirm-clock").fadeIn();
                $("form").hide();
                $(".number").hide();
                $(".time-wrapper").hide();
                $("#fuck").trigger('click')
            }
        });
        $("#zero").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '0');
            var myLength = $("input").val().length;
            console.log(myLength);
            if (myLength === 4){
                $(".confirm-clock").fadeIn();
                $("form").hide();
                $(".number").hide();
                $(".time-wrapper").hide();
                $("#fuck").trigger('click')
            }
        });
        $("#hashtag").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '#');
            var myLength = $("input").val().length;
            console.log(myLength);
            if (myLength === 4){
                $(".confirm-clock").fadeIn();
                $("form").hide();
                $(".number").hide();
                $(".time-wrapper").hide();
                $("#fuck").trigger('click')
            }
        });

        $("#confirm-btn").click(function (){
            window.location.href='http://localhost:3000/homebase';
       
        });

        
        // var isAlert =  isAlert ;
    
        // if (isAlert === true) {
        //   var alertTitle = "<%= alertTitle %>";
  
        //   console.log(alertTitle);
        //   alert(alertTitle);
        // }
          
        // $('#').keydown(function(){
        //     var vallenth=$(this).val().length;
        //     if(vallenth==9){
        //         alert('l');
        //         $('#Form').submit();
        //     }
        //     });

        // var  = inputNum = $( "#pass" ).val();
        // console.log(inputNum)
        // var telVal = $("#pass").val();
        // if(telVal.length !=4) {
        //     console.log(telVal)
        //     alert("yeah")
        //     $("#pass").submit;
        //     hasError = true;
        // }
        // var input = $("#pass");
        // if(input == 3){
        //     console.log(input)
        // }
        // $(function(){
        //     var d = new Date();
        //        // dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
        //          // Saturday, June 9th, 2007, 5:46:21 PM  
        //     $('.Time').html(''+d.toLocaleTimeString());
        //     });
        


            var serverTime = new Date();
            confirmedTime= new Date(serverTime.getTime() + 1000);
            $('.confirm-time').html(confirmedTime.toLocaleTimeString());

            function updateTime() {
                /// Increment serverTime by 1 second and update the html for '#time'
                serverTime = new Date(serverTime.getTime() + 1000);
                confirmedTime = new Date(serverTime.getTime() + 1000);
                $('.Time').html(serverTime.toLocaleTimeString());
                
                
                // [], {hour: '2-digit', minute: '2-digit'}) goes inside the top
            }
            
            $(function() {
                updateTime();
                setInterval(updateTime, 1000);
            });

    

        
    });


  });




  