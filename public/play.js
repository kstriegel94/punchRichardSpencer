Crafty.init(1600,900, document.getElementById('game'));

Crafty.sprite('img/background_1.png', {background:[0,0,738,417]});
Crafty.e('2D, Canvas, DOM, background').attr({x:0,y:0});

var health = 100;
var speedX = 500;

var tick = Crafty.e('2D, Canvas, Color, DOM, Motion, square')
  .attr({x:738/2,y:360,h:40,w:20})
  .bind('EnterFrame', function(){
    if(this.x >= 650 || this.x <= 50) {
      vel.x = -vel.x;
    }

    //if phone acceleration
      //stop tick
      //if not missed, pause and do animation
  })
  .color('green');

var vel = tick.velocity();
vel.x = speedX;

// window.addEventListener('deviceorientation', onWindowDeviceOrientation, false);
//
// function onWindowDeviceOrientation(event) {
//   if (event.beta) {
//     console.log('orientation moved');
//   }
// }

window.ondevicemotion = function(event) {
  console.log('device in motion');

  var accelerationX = event.accelerationIncludingGravity.x;
  var accelerationY = event.accelerationIncludingGravity.y;
  var accelerationZ = event.accelerationIncludingGravity.z;

  console.log('accX: ' + accelerationX);
  console.log('accY: ' + accelerationY);
  console.log('accZ: ' + accelerationZ);
}

//check hits
//miss -0
//good -5
//solid -10
//awesome -15

//if health at 80, 60, 40, 20, dead

//if health is below or equal to 0, win
