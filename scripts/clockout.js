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
             console.log(a)
             document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
             
};



$(document).ready(function(){
    $("#btn").click(function(){
        
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
        });

        $("#eight").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '8');
        });
        $("#nine").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '9');
        });
        $("#four").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '4');
        });
        $("#five").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '5');
        });
        $("#six").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '6');
        });
        $("#one").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '1');
        });
        $("#two").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '2');
        });
        $("#three").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '3');
        });
        $("#star").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '*');
        });
        $("#zero").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '0');
        });
        $("#hashtag").click(function (){
            var input = $(".passcode");
            input.val(input.val() + '#');
        });
        var serverTime = new Date();

        function updateTime() {
            /// Increment serverTime by 1 second and update the html for '#time'
            serverTime = new Date(serverTime.getTime() + 1000);
            $('.Time').html(serverTime.toLocaleTimeString());
            // [], {hour: '2-digit', minute: '2-digit'}) goes inside the top
        }
        
        $(function() {
            updateTime();
            setInterval(updateTime, 1000);
        });



        
        // window.location = "/";






    });
  });