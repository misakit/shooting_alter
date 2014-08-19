enchant();

/*
   global variable
 */
var game = null;
var player = null;

window.onload = function() {
  game = new Game(320, 320);
  game.fps = 24;
  game.preload('map0.png', 'chara7.png', 'icon0.png', 'pad.png');
  game.onload = function() {
    /*
       Map の作成
    */
    var blocks = [
      [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];
    var map = new Map(16, 16);
    map.image = game.assets['map0.png'];
    map.loadData(blocks);

    player = new Sprite(32, 32);
    player.x = 150;
    player.y = 170;
    player.frame = 27;
    player.image = game.assets['chara7.png'];
    player.addEventListener('enterframe', function(e) {
      if (game.input.up) {
        if (game.frame % 3 == 0) {
          this.frame++;
          if (this.frame == 35) {
            this.frame = 27;
          }
        };
      };
    });

    /*
       操作 Pad の作成。
     */
    var pad = new Pad();
    pad.x = 190;
    pad.y = 215;
    pad.addEventListener('enterframe', function(e) {
      pad.frame = 0;
      if (game.input.right) {
        pad.frame = 1;
        pad.rotation = 90;
      };
      if (game.input.left) {
        pad.frame = 1;
        pad.rotation = -90;
      };
      if (game.input.up) {
        pad.frame = 1;
        pad.rotation = 0;
      };
    });

    var analogPad = new APad();
    analogPad.x = 20;
    analogPad.y = 215;
    analogPad.addEventListener('enterframe', function(e) {
      if (this.isTouched) {
        player.frame = 27;
        player.x += this.vx * 4;
        player.y += this.vy * 4;
        if (game.frame % 3 == 0) {
          player.frame++;
          if (player.frame == 29) {
            player.frame = 27;
          };
        };
      };
    });

    game.rootScene.addChild(map);
    game.rootScene.addChild(player);
    game.rootScene.addChild(pad);
    game.rootScene.addChild(analogPad);
    game.rootScene.backgroundColor = 'rgb(182, 255, 255)';
  };
  game.start();
}
