Crafty.defineScene('Start', function() {

  Crafty.init(1920,1080, document.getElementById('game'));

  Crafty.audio.add('game_music', 'sounds/music.wav');
  Crafty.audio.play('game_music', -1);
  // Crafty.background('black');
  // var minNum = 0000;
  // var maxNum = 9999;
  //
  // var randomNum = Math.floor(Math.random() * (maxNum + 1) + minNum);
  // var num = prompt('Enter ' + randomNum + ' into phone: ');


  Crafty.sprite('img/title-screen.png', {title:[0,0,1920,1080]});
  Crafty.e('2D, Canvas, DOM, Mouse, title')
    .attr({x:0, y:0})
    .bind('Click', function() {
      Crafty.enterScene('Round', 1);
    });
});
