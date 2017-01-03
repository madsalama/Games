/**
 * Created by salama on 2/8/2016.
 */
myTrialGame.Intro = function(game){};


myTrialGame.Intro.prototype = {

    preload:function(){

    },
    create:function(){

        cutSceneWatched = true ;



        this.BGM = this.add.audio('cutscene');
        this.BGM.play('',0,1,false);
        this.BGM.volume += 3;

        this.entersfx2 = this.add.audio('entersfx');


        this.dummyTween = function(delay, callBack){
            var a = this.game.add.tween(this.fadeOut);
            a.to({ }, delay, Phaser.Easing.Linear.Out);
            a.onComplete.add(callBack, this);
            a.start();
        };
        this.startFadeOut = function(delay, fadeoutDuration) {
            this.fadeOut = this.game.add.graphics(0, 0);
            this.fadeOut.beginFill(0x00000, 1);
            this.fadeOut.drawRect(0, 0, this.game.width, this.game.height);
            this.fadeOut.alpha = 0;
            this.fadeOut.endFill();

            var s = this.game.add.tween(this.fadeOut);
            s.to({ alpha: 1 }, fadeoutDuration, Phaser.Easing.Linear.Out);
            // s.onComplete.add(this.changeState, this);
            s.start();

        };
        this.changeState = function(){
            this.game.state.start('Game_Slim',true);
            st.clear();
        } ;

        // Starfield
        {
            var smallvel=[];
            smallvel.x = 0;
            smallvel.y = 20;

            var medvel=[] ;
            medvel.x = 0;
            medvel.y = 100;

            var bigvel = [];
            bigvel.x = 0;
            bigvel.y = 300 ;
            var st = new ParallaxField(this.game,level,smallvel,medvel,bigvel,50);
        }

        var index = 1 ;
        var textArr = ["MY CONSCIOUSNESS HAS BEEN INVADED...",
                       "THERE'S NOTHING I CAN DO TO SAVE IT!",
                       "I NEED TO LIVE IN PEACE ON MY OWN NOW.",
            "THIS IS THE ONLY WAY TO SURVIVE!"];

        var thisHUD = new HUD(this,this.logo);
        var text1 = thisHUD.createStreamingText(this.game.world.centerX - 400, this.game.world.centerY,
            textArr[0] ,60,20);

        this.handle_E = function(){


            if(!busy && (index < textArr.length) ) {
                text1.setText(" ");
                text1 = thisHUD.createStreamingText(this.game.world.centerX - 400, this.game.world.centerY,textArr[index]
                    ,75,20);
                index++;

                this.entersfx2.play('',1,10,false);

            }

            // FADEOUT TO MAIN GAME STATE
            if (index>=2 && !busy ){
                this.startFadeOut(500,500);
                this.dummyTween(2000,this.changeState);
                this.entersfx2.play('',1,10,false);
            }


        };

        var enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(this.handle_E, this);

// =========
        var txtx = this.game.add.bitmapText(
            this.game.world.width-220, this.game.world.height-70, '8bit', "PRESS ENTER"
        );

        txtx.fontSize = '14px' ;

        this.changeBlinkState = function(on){

            if (!txtx.visible)
                txtx.visible = true ;
            else
                txtx.visible = false ;
        };

        // Call this function in a timely manner, neat and efficient.
        // Every 300mS
        this.blinkTimer = this.game.time.create(false);
        this.blinkTimer.loop(1000, this.changeBlinkState, this);
        this.blinkTimer.start();


    },
    update:function(){}



};
