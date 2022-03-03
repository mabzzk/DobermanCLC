
//Circle stuff



// CURSOR STUFF
jQuery(document).ready(function() {

  var mouseX = 0, mouseY = 0;
  var xp = 0, yp = 0;

  $(document).mousemove(function(e){
    mouseX = e.pageX - 100;
    mouseY = e.pageY - 100;
  });

  setInterval(function(){
    xp += ((mouseX - xp)/6);
    yp += ((mouseY - yp)/6);
    $("#cursorCircle").css({left: xp +'px', top: yp +'px'});
  }, 20);

});



