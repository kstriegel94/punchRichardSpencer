// var io = io.connect();
// var controller_state = {};
//
// if(window.location.href.indexOf('?id=') > 0) {
//   io.emit('controller_connect', window.location.href.split('?id=')[1]);
// }
//
// else {
// io.on('connect', function() {
// io.emit('game_connect');
//
// var qr = document.createElement('div');
//
// qr.id = "qr";
//
// document.body.appendChild(qr);
//
// var game_connected = function() {
//   var url = 'http://192.168.1.13:8585?id=' + io.id;
//   var qr_code = new QRCode("qr");
//   qr_code.makeCode(url);
//   io.removeListener('game_connected', game_connected);
// };
//
// io.on('game_connected', game_connected);
// });
// }
//
// io.on('controller_connected', function(connected) {
//   if (connected) {
//     alert('connected!');
//     qr.style.display = "none";
//
//     var controller_state = {
//       steer: 0
//     },
//     emit_updates = function() {
//       io.emit('controller_state_change', controller_state);
//     }
//     devicemotion = function(e) {
//       controller_state.steer = e.accelerationIncludingGravity.y/100;
//       emit_updates();
//     }
//
//     document.body.addEventListener('devicemotion', devicemotion, false);
//   }
//   else {
//     alert('not connected!');
//     qr.style.display = "block";
//   }
// });
//
// io.on('controller_state_change', function(state) {
//   controller_state = state;
// });

Crafty.sprite('img/RSpunch_out_1.png', {RS1_1:[0,0,1920,1080]});
Crafty.sprite('img/RSpunch_out_2.png', {RS1_2:[0,0,1920,1080]});
Crafty.sprite('img/RSpunch_out_3.png', {RS1_3:[0,0,1920,1080]});
Crafty.sprite('img/RSpunch_out_4.png', {RS1_4:[0,0,1920,1080]});
Crafty.sprite('img/RSpunch_out_5.png', {RS1_5:[0,0,1920,1080]});

Crafty.sprite('img/Mpunch_out_1.png', {RS2_1:[0,0,1920,1080]});
Crafty.sprite('img/Mpunch_out_2.png', {RS2_2:[0,0,1920,1080]});
Crafty.sprite('img/Mpunch_out_3.png', {RS2_3:[0,0,1920,1080]});
Crafty.sprite('img/Mpunch_out_4.png', {RS2_4:[0,0,1920,1080]});
Crafty.sprite('img/Mpunch_out_5.png', {RS2_5:[0,0,1920,1080]});

Crafty.sprite('img/Hpunch_out_1.png', {RS3_1:[0,0,1920,1080]});
Crafty.sprite('img/Hpunch_out_2.png', {RS3_2:[0,0,1920,1080]});
Crafty.sprite('img/Hpunch_out_3.png', {RS3_3:[0,0,1920,1080]});
Crafty.sprite('img/Hpunch_out_4.png', {RS3_4:[0,0,1920,1080]});
Crafty.sprite('img/Hpunch_out_5.png', {RS3_5:[0,0,1920,1080]});

Crafty.sprite('img/round-1.png', {round1:[0,0,1920,1080]});
Crafty.sprite('img/round-2.png', {round2:[0,0,1920,1080]});
Crafty.sprite('img/round-3.png', {round3:[0,0,1920,1080]});

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

Crafty.audio.add('miss_hit', 'sounds/miss_hit.wav');
Crafty.audio.add('med_hit', 'sounds/med_hit.wav');
Crafty.audio.add('pepe_hit', 'sounds/pepe_hit.wav');
Crafty.audio.add('round_bell', 'sounds/round_bell.wav');

Crafty.defineScene('Round', function(round_num) {
  var background = Crafty.e('2D, Canvas, DOM, round' + round_num);

  background.timeout(function() {
    Crafty.enterScene('Play', round_num);
  }, 3000);
});

Crafty.defineScene('Play', function(round_num) {

Crafty.audio.play('round_bell');

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
      Crafty.audio.play('pepe_hit');
      change_background();
      health-=20;
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
      Crafty.audio.play('med_hit');
      change_background();
      health-=10;
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
      Crafty.audio.play('miss_hit');
      change_background();
    }
  });

Crafty.sprite('img/RSpunch_out_bar.png', {RS_bar:[0,0,1920,1080]});
Crafty.sprite('img/RSpunch_out_curser.png', {RS_curser:[0,0,88,120]});
Crafty.e('2D, Canvas, DOM, RS_bar').attr({x:0,y:0,z:50});

var curr_background = Crafty.e('2D, Canvas, DOM, RS' + round_num + '_1').attr({x:0,y:0});

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
    medium_hit.animate('mediumHit');
  }
  else if(mid_tick > 800 && mid_tick < 1065) {
    console.log('super hit!');
    power_hit.animate('powerHit');
  }
}

function change_background() {
  if(health <= 0) {
    //console.log('won game');
    round_num++;
    if(round_num > 3) {
      Crafty.stop(true);
      Crafty.enterScene('Start');
    }
    else {
      Crafty.enterScene('Round', round_num);
    }
  }
  else if(health <= 20) {
    curr_background.destroy();
    curr_background = Crafty.e('2D, Canvas, DOM, RS' + round_num +'_5');
  }
  else if(health <= 40) {
    curr_background.destroy();
    curr_background = Crafty.e('2D, Canvas, DOM, RS' + round_num + '_4');
  }
  else if(health <= 60) {
    curr_background.destroy();
    curr_background = Crafty.e('2D, Canvas, DOM, RS' + round_num + '_3');
  }
  else if(health <= 80) {
    curr_background.destroy();
    curr_background = Crafty.e('2D, Canvas, DOM, RS' + round_num + '_2');
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

//window.addEventListener('devicemotion', handleMotionEvent, true);

var curr_max = 0;

// function handleMotionEvent(event) {
//
//     var x = event.accelerationIncludingGravity.x;
//     var y = event.accelerationIncludingGravity.y;
//     var z = event.accelerationIncludingGravity.z;
//
//     // Do something awesome.
//     console.log('accX: ' + x);
//     console.log('accY: ' + y);
//     console.log('accZ: ' + z);
//
//     text_x.text('accX: ' + x);
//     text_y.text('accY: ' + y);
//     text_z.text('accZ: ' + z);
//
//     if(x > 10) {
//     curr_max = x;
//     highest_x.text('max x: ' + curr_max);
//     check_tick();
//   }
// }

console.log(controller_state.accerlerate);

if (controller_state.accelerate) {
  console.log('tapped');
  check_tick();
}
});
