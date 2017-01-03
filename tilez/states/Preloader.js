/**
 * Created by mahmoud.ali on 9/23/2014.
 */

myTrialGame.Preloader = function(game) {
};

var distance =  function (x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
};


// POINTLESS COMMENT 

myTrialGame.Preloader.prototype = {

    preload: function() {

        // GAME ASSETS
        this.load.image('single', 'assets/single.png');
        this.load.image('platform', 'assets/SHIP.png');
        this.load.spritesheet('pixos', 'assets/spritesheet.png', 242, 250);
        this.load.spritesheet('explosion', 'assets/explosion.png', 246, 252);


        // Main Menu Assets
        this.load.image('pixos_logo', 'assets/PIXOS_LOGO.png');
        this.load.image('button', 'assets/Button.png');
        this.load.image('cursor', 'assets/Cursor.png');
        this.load.image('motions', 'assets/Motion_Logo.png');
        this.load.image('lights', 'assets/Lights_Logo.png');

        this.load.spritesheet('enemy', 'assets/fly_fly1.png', 125, 75);
        this.load.spritesheet('enemy2', 'assets/enemy2.png', 190, 200);
        this.load.spritesheet('enemy0', 'assets/enemy0.png', 147, 46);
        this.load.spritesheet('enemy1', 'assets/enemy1.png', 160, 138);
        this.load.spritesheet('enemy3', 'assets/enemy3.png', 120, 69);
        this.load.spritesheet('enemy5', 'assets/enemy5.png', 170, 161);

        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('BG', 'assets/BG.png');
        this.load.image('FG', 'assets/FG.png');
        this.load.image('text', 'assets/text.png');
        this.load.image('LAVA', 'assets/LAVA.png');


        this.load.audio('retrodox', 'assets/retrodox.ogg', true);
        this.load.audio('gameover', 'assets/gameoverBGM.ogg', true);
        this.load.audio('menuBGM', 'assets/Pixos_IntroBGM.ogg', true);
        this.load.audio('EXPLODE', 'assets/explosion.ogg', true);


        this.load.audio('startsfx', 'assets/start_sfx2.ogg', true);
        this.load.audio('charsfx', 'assets/blop.ogg', true);
        this.load.audio('entersfx', 'assets/enter.ogg', true);
        this.load.audio('cutscene', 'assets/scene.ogg', true);
        this.load.audio('BGM', 'assets/fl.ogg', true);
        this.load.audio('collect', 'assets/collectfinal.ogg', true);

        this.load.image('blue', 'assets_tiles/blue.png');
        this.load.image('cyan', 'assets_tiles/cyan.png');
        this.load.image('green', 'assets_tiles/green.png');
        this.load.image('orange', 'assets_tiles/orange.png');
        this.load.image('pink', 'assets_tiles/pink.png');
        this.load.image('purple', 'assets_tiles/purple.png');
        this.load.image('red', 'assets_tiles/red.png');



        this.load.image('1', 'assets/blue.png');
        this.load.image('2', 'assets/cyan.png');
        this.load.image('3', 'assets/orange.png');
        this.load.image('4', 'assets/purple.png');
        this.load.image('5', 'assets/rainbow.png');

        this.load.image('myBullet', 'assets/myBullet.png');

        this.load.image('cursorPass', 'assets/cursorPass.png');

        this.load.image('bullet', 'assets/bullet.png');

        this.load.image('sphere', 'assets/sphere.png');
        this.load.image('triangle', 'assets/triangle.png');



        this.load.image('qr1', 'assets/1.png');
        this.load.image('qr2', 'assets/2.png');
        this.load.image('qr3', 'assets/3.png');



        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'pixos');
        this.splash.height-=130;
        this.splash.width-=130;

        // this.load.image('energyCapsule', 'assets/EnergyCapsule.png');

        this.splash.anchor.setTo(0.5);

        this.splash.animations.add('move', [3,4,5,6]);
        this.splash.animations.play('move', 45, true);

        this.loadBG = this.add.sprite(this.splash.x, this.splash.y, 'loadBG');
        this.loadFG = this.add.sprite(this.splash.x, this.splash.y, 'loadFG');

        this.loadBG.anchor.setTo(0.5);
        this.loadFG.anchor.setTo(0.5);

        this.loadBG.centerX = this.splash.centerX;
        this.loadFG.centerX = this.splash.centerX;

        this.loadBG.y-=30;
        this.loadFG.y-=30;

        this.loadBG.x-=10;
        this.loadFG.x-=10;

        this.loadBG.width-=240;
        this.loadFG.width-=240;
        this.loadFG.tint= '0xfffff';

        this.game.loadPercent = this.game.add.bitmapText(
            this.loadBG.x-15, this.loadBG.y-4, '8bit', 'LOADING...'
        );
        this.game.loadPercent.visible = true  ;
        this.game.loadPercent.fontSize='13px';
        this.game.loadPercent.tint='0xfffff';



        this.asdas = this.add.sprite(this.splash.x, this.splash.y+10, 'a');
        this.asdas.width-=35;
        this.asdas.height-=30;

        this.asdas.anchor.setTo(0.5);
        this.asdas.y+=100;
        this.asdas.x-=13;

        this.asdas.update = function(){
            this.angle+=15;
        };


    },

    loadUpdate: function() {
        this.game.loadPercent.setText(this.game.load.progress + "%");
    },

    create: function() {

        this.asdas.kill();

         //  this.state.start('intro',true);
         //  this.state.start('Game_Slim');
         //  this.state.start('MainMenu',true);

       //   this.state.start('Splash',true);

          this.state.start('minigame');
       //   this.state.start('password');

    }
};