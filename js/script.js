
//Circle stuff



// CURSOR STUFF
jQuery(document).ready(function() {

  var mouseX = 0, mouseY = 0;
  var xp = 0, yp = 0;

  $(document).mousemove(function(e){
    mouseX = e.pageX - 250;
    mouseY = e.pageY - 250;
  });

  setInterval(function(){
    xp += ((mouseX - xp)/6);
    yp += ((mouseY - yp)/6);
    $("#cursorCircle").css({left: xp +'px', top: yp +'px'});
  }, 20);

});






$(document).ready(function(){
    animateDiv();

});

function makeNewPosition(){

    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh,nw];

}



function animateDiv(){
    var newq = makeNewPosition();
    var oldqA = $('.a').offset();
    var oldqB = $('.b').offset();
    var oldqC = $('.c').offset();
    var speedA = calcSpeed([oldqA.top, oldqA.left], newq);
    var speedB = calcSpeed([oldqB.top, oldqB.left], newq);
    var speedC = calcSpeed([oldqC.top, oldqC.left], newq);

    $('.a').animate({ top: newq[0], left: newq[1] }, speedA, function(){
      animateDiv();
    });
    $('.b').animate({ top: newq[0], left: -newq[1] }, speedB, function(){
      animateDiv();
    });
  $('.c').animate({ top: newq[0], left: -newq[1] }, speedC, function(){
      animateDiv();
    });


};

function calcSpeed(prev, next) {

    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;

    var speedModifier = 0.05;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}