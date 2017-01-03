/**
 * Created by mahmoud.ali on 9/23/2014.
 */

var myTrialGame = {};

myTrialGame.Boot = function(game){};


myTrialGame.Boot.prototype = {

    preload: function(){


        /** TODO : ADD AN ANIMATED SPRITE IN THE MIDDLE OF THE SCREEN WITH LOADING TEXT **/

        this.game.load.bitmapFont('8bit', 'assets/font.png', 'assets/font.fnt');
        this.game.load.spritesheet('pixos', 'assets/spritesheet.png', 242, 250);

        this.game.load.image('loadBG', 'assets/levelMeter_BG.png');
        this.game.load.image('loadFG', 'assets/levelMeter_FG.png');

        this.load.image('shit', 'assets_tiles/bullet.png');
        this.load.image('a', 'assets/cyan.png');


        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = false; // pause game on tab change
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 270;
        this.scale.minHeight = 480;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.stage.landscape = true;                 // force portrait mode

        function enterIncorrectOrientation () { this.orientated = false; this.paused = true;}
        function leaveIncorrectOrientation () { this.orientated = true; this.paused = false;}

/*        this.scale.forceOrientation(true, false,'orientation'); //landscape, portrait, incorrectorientation image

        this.scale.enterIncorrectOrientation.add(enterIncorrectOrientation);
        this.scale.leaveIncorrectOrientation.add(leaveIncorrectOrientation);
        this.scale.setScreenSize(true);
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;*/


        this.input.addPointer();


    }
    ,
    create: function(){

        this.state.start('Preloader');
    }

};
