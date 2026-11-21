$(document).ready(function(){
    $(".pinpad-container").append(' <div class="number" id="seven"><p class="int" id="seven">7</p></div>');
    $(".pinpad-container").append(' <div class="number" id="eight"><p class="int" id="eight">8</p></div>');
    $(".pinpad-container").append(' <div class="number" id="nine"><p class="int" id="nine">9</p></div>');
    $(".pinpad-container").append(' <div class="number" id="four"><p class="int" id="four">4</p></div>');
    $(".pinpad-container").append(' <div class="number" id="five"><p class="int" id="five">5</p></div>');
    $(".pinpad-container").append(' <div class="number" id="six"><p class="int" id="six">6</p></div>');
    $(".pinpad-container").append(' <div class="number" id="one"><p class="int" id="one">1</p></div>');
    $(".pinpad-container").append(' <div class="number" id="two"><p class="int" id="two">2</p></div>');
    $(".pinpad-container").append(' <div class="number" id="three"><p class="int" id="three">3</p></div>');
    $(".pinpad-container").append(' <div class="number" id="star"><p class="int" id="*">*</p></div>');
    $(".pinpad-container").append(' <div class="number" id="zero"><p class="int" id="zero">0</p></div>');
    $(".pinpad-container").append(' <div class="number" id="del"><p class="int" id="del">DEL</p></div>');
    
    
    $("#seven").click(function (){
      var input = $(".passcode");
      input.val(input.val() + '7');
      var myLength = $("input").val().length;
      console.log(myLength);
      if (myLength === 4){
        $("#clocksubmit").trigger('click')
      }
    });
    $("#eight").click(function (){
      var input = $(".passcode");
      input.val(input.val() + '8');
      var myLength = $("input").val().length;
      console.log(myLength);
      if (myLength === 4){
          $("#clocksubmit").trigger('click')
      }
  });
  $("#nine").click(function (){
      var input = $(".passcode");
      input.val(input.val() + '9');
      var myLength = $("input").val().length;
      console.log(myLength);
      if (myLength === 4){
          $("#clocksubmit").trigger('click')
      }
  });
  $("#four").click(function (){
      var input = $(".passcode");
      input.val(input.val() + '4');
      var myLength = $("input").val().length;
      console.log(myLength);
      if (myLength === 4){
          $("#clocksubmit").trigger('click')
      }
  });
  $("#five").click(function (){
      var input = $(".passcode");
      input.val(input.val() + '5');
      var myLength = $("input").val().length;
      console.log(myLength);
      if (myLength === 4){
          $("#clocksubmit").trigger('click')
      }
  });
  $("#six").click(function (){
      var input = $(".passcode");
      input.val(input.val() + '6');
      var myLength = $("input").val().length;
      console.log(myLength);
      if (myLength === 4){
          $("#clocksubmit").trigger('click')
      }
  });
  $("#one").click(function (){
      var input = $(".passcode");
      input.val(input.val() + '1');
      var myLength = $("input").val().length;
      console.log(myLength);
      if (myLength === 4){
          $("#clocksubmit").trigger('click')
      }
  });
  $("#two").click(function (){
      var input = $(".passcode");
      input.val(input.val() + '2');
      var myLength = $("input").val().length;
      console.log(myLength);
      if (myLength === 4){
          $("#clocksubmit").trigger('click')
      }
  });
  $("#three").click(function (){
      var input = $(".passcode");
      input.val(input.val() + '3');
      var myLength = $("input").val().length;
      console.log(myLength);
      if (myLength === 4){
          $("#clocksubmit").trigger('click')
      }
  });
  $("#star").click(function (){
      var input = $(".passcode");
      input.val(input.val() + '*');
      var myLength = $("input").val().length;
      console.log(myLength);
      if (myLength === 4){
          $("#clocksubmit").trigger('click')
      }
  });
  $("#zero").click(function (){
      var input = $(".passcode");
      input.val(input.val() + '0');
      var myLength = $("input").val().length;
      console.log(myLength);
      if (myLength === 4){
          $("#clocksubmit").trigger('click')
      }
  });
  $("#del").click(function (){
    var txt = $('#pass');
    txt.val(txt.val().slice(0, -1));      
  });


  

  });