Crafty.defineScene('Start', function() {
  Crafty.sprite('img/title-screen.png', {title:[0,0,1920,1080]});
  Crafty.e('2D, Canvas, DOM, Mouse, title')
    .attr({x:0, y:0})
    .bind('Click', function() {
      Crafty.enterScene('Play');
    });
});
