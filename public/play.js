Crafty.init(1920,1080, document.getElementById('game'));

Crafty.sprite('img/RSpunch_out_1.png', {RS_1:[0,0,1920,1080]});
Crafty.sprite('img/RSpunch_out_2.png', {RS_2:[0,0,1920,1080]});
Crafty.sprite('img/RSPunch_out_bar.png', {RS_bar:[0,0,1920,1080]});
Crafty.sprite('img/RSpunch_out_curser.png', {RS_curser:[0,0,88,120]});

Crafty.e('2D, Canvas, DOM, RS_1').attr({x:0,y:0});
Crafty.e('2D, Canvas, DOM, RS_bar').attr({x:0,y:0,z:1});
//Crafty.e('2D, Canvas, DOM, RS_curser').attr({x:920, y:940});

var health = 100;
var speedX = 500;

var tick = Crafty.e('2D, Canvas, Color, DOM, Motion, RS_curser')
  .attr({x:920,y:940,z:2})
  .bind('EnterFrame', function(){
    if(this.x >= 1580 || this.x <= 250) {
      vel.x = -vel.x;
    }

    if(health <= 0) {
      console.log('won game');
      Crafty.pause();
    }




    //if phone acceleration
      //stop tick
      //if not missed, pause and do animation
  })
  .bind('KeyDown', function(e){
    console.log('mouse clicked');

    if(this.x < 400 && this.x > 350) {
      health-=15;
      console.log('great hit');
      console.log('health: ' + health);
    }
  });

var vel = tick.velocity();
vel.x = speedX;

var text_x = Crafty.e('2D, Canvas, DOM, Text')
  .attr({x:100, y:100})
  .textColor('red')
  .textFont({size: '75px'});
var text_y = Crafty.e('2D, Canvas, DOM, Text')
  .attr({x:100, y:300})
  .textColor('red')
  .textFont({size: '75px'});
var text_z = Crafty.e('2D, Canvas, DOM, Text')
  .attr({x:100, y:500})
  .textColor('red')
  .textFont({size: '75px'});
var highest_x = Crafty.e('2D, Canvas, DOM, Text')
  .attr({x:100, y:800})
  .textColor('red')
  .textFont({size: '75px'});

window.addEventListener('devicemotion', handleMotionEvent, true);

var curr_max = 0;

function handleMotionEvent(event) {



    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;

    // Do something awesome.
    console.log('accX: ' + x);
    console.log('accY: ' + y);
    console.log('accZ: ' + z);

    text_x.text('accX: ' + x);
    text_y.text('accY: ' + y);
    text_z.text('accZ: ' + z);

    if(x > curr_max) {
    curr_max = x;
    highest_x.text('max x: ' + curr_max);
  }
}


//  function(event) {
//   if(event) {
//       console.log('listening for devicemotion');
//   Crafty.e('2D, DOM, Text')
//     .attr({x:100, y:100})
//     .textFont({size: '100px'})
//     .text("EVENT LISTENER");
//   }
// });
//
// window.ondevicemotion = function(event) {
//
//   var accelerationX = event.accelerationIncludingGravity.x;
//   var accelerationY = event.accelerationIncludingGravity.y;
//   var accelerationZ = event.accelerationIncludingGravity.z;
//
//   console.log('accX: ' + accelerationX);
//   console.log('accY: ' + accelerationY);
//   console.log('accZ: ' + accelerationZ);
// }

//check hits
//miss -0
//good -5
//solid -10
//awesome -15

//if health at 80, 60, 40, 20, dead

//if health is below or equal to 0, win
