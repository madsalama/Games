/**
 * Created by mahmoud.ali on 1/24/2015.
 */

myTrialGame.Splash = function(game) {
};

var filter;

myTrialGame.Splash.prototype = {

    create: function() {



        // API must have a level of security ( AUTHENTICATION+AUTHORIZATION )
        // INCREASE VIEW COUNT "SEE HOW MANY PEOPLE ACTUALLY GOT PAST THE LOADING SCREEN"

        var viewPlusAPI = "http://app-pikdox.rhcloud.com/increaseViewCount";
        var increaseWinCount = "http://app-pikdox.rhcloud.com/increaseWinCount";
        var updateTopScore = "http://app-pikdox.rhcloud.com/updateTopScore?score="+score;

        var increaseViewCount = function(){
            var req = new XMLHttpRequest();
            req.open("POST",viewPlusAPI , true);
            req.send();  // Enter Parameters here @send(*)
        };



        // Dummy Tween
        this.dummyTween = function(delay, callBack){
            var a = this.game.add.tween(this.fadeOut);
            a.to({ }, delay, Phaser.Easing.Linear.Out);
            a.onComplete.add(callBack, this);
            a.start();
        };

        this.SFX = this.add.audio('retrodox');
        this.SFX.volume -= 0.5;

        // Create Sprite 1
        this.splashBG = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'BG');
        this.splashBG.anchor.setTo(0.5);

        // Create Text Sprite
        this.splashText = this.add.sprite(this.game.world.centerX+25, this.game.world.centerY + 85, 'text');
        this.splashText.anchor.setTo(0.5);
        this.splashText.alpha = 0 ;
        this.splashText.visible = true ;
        // this.splashText.tint = 0xffae19 ;

        this.game.energyText = this.game.add.bitmapText(
            500, 100, '8bit', '>PIKDOX<'
        );
        // this.game.energyText.tint = 0xffae19 ;
            this.game.energyText.fontSize = '18px';
            this.game.energyText.x = this.splashText.x - 70;
            this.game.energyText.y = this.splashText.y - 10 ;

        // Create Sprite 2
        this.splashFG = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'FG');
        this.splashFG.anchor.setTo(0.5);

        this.changeState = function(){
            this.state.start('MainMenu');
        };

        this.changeBGColor2 = function(){
            this.stage.backgroundColor = '#001919';        // Dark Cyan
        };

        this.changeBGColor4 = function(){
            this.stage.backgroundColor = '#151515';
        };

        this.changeBGColor1 = function(){
            this.dummyTween(1,this.changeBGColor4);
        };
        this.startFadeOut = function()
        {

            this.fadeOut = this.game.add.graphics(0, 0);
            this.fadeOut.beginFill(0x00000, 1);
            this.fadeOut.drawRect(0, 0, this.game.width, this.game.height);
            this.fadeOut.alpha = 0;
            this.fadeOut.endFill();
            var s = this.game.add.tween(this.fadeOut);
            s.to({ alpha: 1 }, 650, Phaser.Easing.Linear.Out);

            s.onComplete.add(this.changeState, this);

            this.yalla = function(){
                s.start();
            };

            this.dummyTween(3000, this.yalla);

        };

        this.animate = function() {

            this.SFX.play();

            this.splashBG.disappearTween = this.game.add.tween(this.splashBG)
                .to({x: this.splashBG.x, y: this.splashBG.y}, 393, Phaser.Easing.Linear.In)
                .to({x: this.splashBG.x - 50, y: this.splashBG.y + 50}, 70, Phaser.Easing.Circular.Out)
                .start();

            // this.splashBG.disappearTween.onComplete.add(this.changeBGColor1,this);

            this.splashFG.disappearTween = this.game.add.tween(this.splashFG)
                .to({x: this.splashFG.x, y: this.splashFG.y}, 1700, Phaser.Easing.Linear.In)
                .to({x: this.splashFG.x + 30, y: this.splashFG.y - 30}, 70, Phaser.Easing.Circular.Out)
                .start();

            // this.splashFG.disappearTween.onComplete.add(this.changeBGColor2,this);

            this.splashText.appearTween = this.game.add.tween(this.splashText)
                .to({alpha:0}, 1800, Phaser.Easing.Linear.In)
                .to({alpha:1}, 300, Phaser.Easing.Linear.Out) ;

            this.splashText.appearTween.onComplete.add( this.startFadeOut, this);
            this.splashText.appearTween.start();

        };

        this.dummyTween(2000, this.animate);
    },

    update: function(){

    }


};
