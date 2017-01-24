Crafty.init(1920,1080, document.getElementById('game'));

Crafty.sprite('img/RSpunch_out_1.png', {RS_1:[0,0,1920,1080]});
Crafty.sprite('img/RSpunch_out_2.png', {RS_2:[0,0,1920,1080]});
Crafty.sprite('img/RSpunch_out_3.png', {RS_3:[0,0,1920,1080]});
Crafty.sprite('img/RSpunch_out_4.png', {RS_4:[0,0,1920,1080]});
Crafty.sprite('img/RSpunch_out_5.png', {RS_5:[0,0,1920,1080]});

Crafty.sprite(1920,1080, 'img/power_hit.png',
  {power_hit1:[0,0],
    power_hit2:[1,0],
    power_hit3:[2,0],
    power_hit4:[3,0],
    power_hit5:[4,0]});
Crafty.sprite(1920,1080, 'img/medium_hit.png',
  {medium_hit1:[0,0],
    medium_hit2:[1,0],
    medium_hit3:[2,0],
    medium_hit4:[3,0],
    medium_hit5:[4,0]});
Crafty.sprite(1920,1080, 'img/miss_hit.png',
  {miss_hit1:[0,0],
    miss_hit2:[1,0],
    miss_hit3:[2,0],
    miss_hit4:[3,0],
    miss_hit5:[4,0]});

Crafty.sprite(1920,1080, 'img/miss_text.png',
  {miss_text1:[0,0],
    miss_text2:[1,0],
    miss_text3:[2,0],
    miss_text4:[3,0]});
Crafty.sprite(1920,1080, 'img/hit_text.png',
  {hit_text1:[0,0],
    hit_text2:[1,0],
    hit_text3:[2,0],
    hit_text4:[3,0]});
Crafty.sprite(1920,1080, 'img/power_hit_text.png',
  {powerh_text1:[0,0],
    powerh_text2:[1,0],
    powerh_text3:[2,0],
    powerh_text4:[3,0]});

var miss_text = Crafty.e('2D, DOM, SpriteAnimation, miss_text1')
  .attr({x: 0, y:0, z:100, alpha:0})
  .reel('missText', 250, [[0,0], [1,0], [2,0], [3,0]])
  .bind('FrameChange', function() {
    if(this.reelPosition() === 2) {
      this.pauseAnimation();
      this.timeout(function() {
        this.resumeAnimation();
      }, 750);
    }
  })
  .bind('StartAnimation', function() {
    this.alpha = 1;
  })
  .bind('AnimationEnd', function() {
    this.alpha = 0;
  });
var hit_text = Crafty.e('2D, DOM, SpriteAnimation, hit_text1')
  .attr({x: 0, y:0, z:100, alpha:0})
  .reel('hitText', 250, [[0,0], [1,0], [2,0], [3,0]])
  .bind('FrameChange', function() {
    if(this.reelPosition() === 2) {
      this.pauseAnimation();
      this.timeout(function() {
        this.resumeAnimation();
      }, 750);
    }
  })
  .bind('StartAnimation', function() {
    this.alpha = 1;
  })
  .bind('AnimationEnd', function() {
    this.alpha = 0;
  });
var powerh_text = Crafty.e('2D, DOM, SpriteAnimation, powerh_text1')
  .attr({x: 0, y:0, z:100, alpha:0})
  .reel('powerhText', 250, [[0,0], [1,0], [2,0], [3,0]])
  .bind('FrameChange', function() {
    if(this.reelPosition() === 2) {
      this.pauseAnimation();
      this.timeout(function() {
        this.resumeAnimation();
      }, 750);
    }
  })
  .bind('StartAnimation', function() {
    this.alpha = 1;
  })
  .bind('AnimationEnd', function() {
    this.alpha = 0;
  });

var power_hit = Crafty.e('2D, DOM, SpriteAnimation, power_hit1')
  .attr({x: 0, y:0, z:100, alpha:0})
  .reel('powerHit', 500, [[0,0], [1,0], [2,0], [3,0], [4,0]])
  .bind('StartAnimation', function() {
    this.alpha = 1;
  })
  .bind('AnimationEnd', function() {
    this.alpha = 0;
    powerh_text.animate('powerhText');
  })
  .bind('FrameChange', function() {
    if(this.reelPosition() === 2) {
      check_health();
    }
  });
var medium_hit = Crafty.e('2D, DOM, SpriteAnimation, medium_hit1')
  .attr({x: 0, y:0, z:100, alpha:0})
  .reel('mediumHit', 500, [[0,0], [1,0], [2,0], [3,0], [4,0]])
  .bind('StartAnimation', function() {
    this.alpha = 1;
  })
  .bind('AnimationEnd', function() {
    this.alpha = 0;
    hit_text.animate('hitText');
  })
  .bind('FrameChange', function() {
    if(this.reelPosition() === 2) {
      check_health();
    }
  });
var miss_hit = Crafty.e('2D, DOM, SpriteAnimation, miss_hit1')
  .attr({x: 0, y:0, z:100, alpha:0})
  .reel('missHit', 500, [[0,0], [1,0], [2,0], [3,0], [4,0]])
  .bind('StartAnimation', function() {
    this.alpha = 1;
  })
  .bind('AnimationEnd', function() {
    this.alpha = 0;
    miss_text.animate('missText');
  })
  .bind('FrameChange', function() {
    if(this.reelPosition() === 2) {
      check_health();
    }
  });

Crafty.sprite('img/RSpunch_out_bar.png', {RS_bar:[0,0,1920,1080]});
Crafty.sprite('img/RSpunch_out_curser.png', {RS_curser:[0,0,88,120]});
Crafty.e('2D, Canvas, DOM, RS_bar').attr({x:0,y:0,z:50});

var curr_background = Crafty.e('2D, Canvas, DOM, RS_1').attr({x:0,y:0});

var health = 100;
var speedX = 1000;

var tick = Crafty.e('2D, Canvas, Color, DOM, Motion, RS_curser')
  .attr({x:915,y:940,z:51})
  .bind('EnterFrame', function(){
    if(this.x >= 1580 || this.x <= 250) {
      vel.x = -vel.x;
    }
    //if phone acceleration
      //stop tick
      //if not missed, pause and do animation
  })
  .bind('KeyDown', function(e){
    console.log('mouse clicked');

    //power_hit.animate('powerHit');
    check_tick();

    //if(this.x < 400 && this.x > 350) {
      //health-=10;
      console.log('health: ' + health);
    //}
  });

function check_tick() {
  mid_tick = tick.x + 44;
  if(mid_tick < 565 || mid_tick > 1265) {
    console.log('miss');
    miss_hit.animate('missHit');
  }
  else if(mid_tick < 765 || mid_tick > 1065) {
    console.log('hit');
    health -= 10;
    medium_hit.animate('mediumHit');
  }
  else if(mid_tick > 765 && mid_tick < 1065) {
    console.log('super hit!');
    health -= 20;
    power_hit.animate('powerHit');
  }
}

function check_health() {
  if(health <= 0) {
    //console.log('won game');
    curr_background.destroy();
    curr_background = Crafty.e('2D, Canvas, DOM, RS_5');
    //Crafty.pause();
  }
  else if(health <= 20) {
    curr_background.destroy();
    curr_background = Crafty.e('2D, Canvas, DOM, RS_4');
  }
  else if(health <= 50) {
    curr_background.destroy();
    curr_background = Crafty.e('2D, Canvas, DOM, RS_3');
  }
  else if(health <= 80) {
    curr_background.destroy();
    curr_background = Crafty.e('2D, Canvas, DOM, RS_2');
  }
}

var vel = tick.velocity();
vel.x = speedX;

var text_x = Crafty.e('2D, Canvas, DOM, Text')
  .attr({x:100, y:100, z:20})
  .textColor('red')
  .textFont({size: '75px'});
var text_y = Crafty.e('2D, Canvas, DOM, Text')
  .attr({x:100, y:300, z:20})
  .textColor('red')
  .textFont({size: '75px'});
var text_z = Crafty.e('2D, Canvas, DOM, Text')
  .attr({x:100, y:500, z:20})
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
