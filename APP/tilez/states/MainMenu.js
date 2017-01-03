/**
 * Created by mahmoud.ali on 2/23/2015.
 */

myTrialGame.MainMenu = function(game) {
};

var sprite;
var cursors;
var enter;
var itemTimer;
var items;
var clicked;
var enabled;



var smallvel=[];
smallvel.x = 50;
smallvel.y = 50;

var medvel=[] ;
medvel.x = 100;
medvel.y = 100;

var bigvel = [];
bigvel.x = 150;
bigvel.y = 150 ;

// Create blinking code ( All the time )

// START GAME
// PASSWORD

//  PASSCODE SCENE = 3 IMAGES OF DIFFERENT ENEMIES

var onDown;

myTrialGame.MainMenu.prototype = {


    preload: function(){

        this.stage.backgroundColor = '#00000';

        this.dummyTween = function(delay, callBack){
            var a = this.game.add.tween(this.fadeOut);
            a.to({ }, delay, Phaser.Easing.Linear.Out);
            a.onComplete.add(callBack, this);
            a.start();
        };

        var handleStart = function(){
            this.entersfx2.play('',1,20,false);
            if  (this.cursorPosition=='down')
            {this.cursorButton.y-=70;
                this.cursorPosition="up" ;}
        };
        var handlePass = function(){

            this.entersfx2.play('',1,20,false);

            if  (this.cursorPosition=='up')
            {this.cursorButton.y+=70;
            this.cursorPosition="down" ;

            }

        };



        this.game.nameText = this.game.add.bitmapText(
            this.game.world.centerX-90, this.game.world.centerY+200, '8bit', '© PIKDOX 2016'
        );
        this.game.nameText.visible = true  ;
        this.game.nameText.fontSize='15px';



        this.cursorPosition="up" ;
        this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 100 , 'pixos_logo');
        this.logo.tint = 0xff0000;
        this.motions1 = this.add.sprite(this.game.world.centerX, - 50 , 'motions');
        // this.motions1.blendMode = PIXI.blendModes.HARD_LIGHT;
        this.motions1.anchor.setTo(0.5);
        this.motions1.alpha = 0.2 ;
        // this.motions1.tint = 0xff0000;

        // this.lights = this.add.sprite(this.game.world.centerX-60, this.game.world.centerY - 100 , 'lights');
        // this.lights.blendMode = PIXI.blendModes.LIGHTEN;

        onDown = function (sprite, pointer) {
            state = this.cursorPosition ;
            if (state == 'up' && enabled ) {



                if (!clicked) {
                    this.startFadeOut(2000,500);
                    this.SFX.stop();

                    this.startsfx1.volume -= 5;
                    this.startsfx1.play('',0,1,false);


                    clicked = true;
                    // this.dummyTween(2000, this.game.state.start('Game_Slim'));
                }
                // this.game.state.start('Game_Slim');
                // If you are gonna play sound,
                // dummyTween to delay before :P
            }
            else if (enabled)
            {
                this.SFX.stop();
                this.game.state.start('password',true);
            }
        };

        this.startButton = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'button');
        this.startButton.height-=10;
        this.startButton.width+=20;
        this.startButton.inputEnabled = true ;
        this.startButton.input.useHandCursor = true;
        this.startButton.events.onInputOver.add(handleStart, this);
        this.startButton.events.onInputDown.add(onDown, this);

        this.passwordButton = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 70, 'button');
        this.passwordButton.height-=10;
        this.passwordButton.width+=20;
        this.passwordButton.inputEnabled = true ;
        this.passwordButton.input.useHandCursor = true;
        this.passwordButton.events.onInputOver.add(handlePass, this);
        this.passwordButton.events.onInputDown.add(onDown, this);

        this.cursorButton = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'cursor');
        this.cursorButton.height-=10;
        this.cursorButton.width+=20;
        this.cursorButton.tint = 0xffae19 ;


        this.groupbuttons = this.game.add.group();
        this.groupbuttons.add(this.startButton);
        this.groupbuttons.add(this.passwordButton);
        this.groupbuttons.add(this.cursorButton);

        this.groupbuttons.y+=50;

        this.logo.anchor.setTo(0.5);
        this.startButton.anchor.setTo(0.5);
        this.passwordButton.anchor.setTo(0.5);
        this.cursorButton.anchor.setTo(0.5);

        // this.lights.anchor.setTo(0.5);

        this.cursorUpPosition = this.cursorButton.y ;

        this.game.startGame = this.game.add.bitmapText(
            this.game.world.centerX-65, this.startButton.y+35, '8bit', 'GAMESTART'
        );
        this.game.startGame.visible = true  ;
        this.game.startGame.fontSize='15px';
        this.game.startGame.tint = 0x262626 ;

        this.game.continue = this.game.add.bitmapText(
            this.game.world.centerX-50, this.startButton.y+105, '8bit', 'PASSCODE'
        );
        this.game.continue.visible = true  ;
        this.game.continue.fontSize='15px';
        this.game.continue.tint = 0x262626 ;

        this.SFX = this.add.audio('menuBGM');


        this.startsfx1 = this.add.audio('startsfx');
        this.entersfx2 = this.add.audio('entersfx');

    },

    create: function() {

        this.changeBlinkState = function(on){

            if (!this.cursorButton.visible || on)
                this.cursorButton.visible = true ;
            else
                this.cursorButton.visible = false ;
        };

        // Call this function in a timely manner, neat and efficient.
        // Every 300mS
        this.blinkTimer = this.game.time.create(false);
        this.blinkTimer.loop(400, this.changeBlinkState, this);
        this.blinkTimer.start();

        cursors = this.input.keyboard.createCursorKeys();
        enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.game.physics.arcade.enable(this.motions1);
        this.game.physics.arcade.enable(this.logo);

        // this.motions.physicsBodyType = Phaser.Physics.ARCADE ;
        this.motions1.enableBody = true ;
        this.logo.enableBody = true ;

        // Dummy Tween ( wait and then callBack )

        this.changeState = function(state){

            if (!cutSceneWatched)
            {
                this.game.state.start('intro',true);
            }
            else
            this.game.state.start('Game_Slim',true);

        };

        // Wait then Fade out !
        this.startFadeOut = function(delay, fadeoutDuration)
        {
            this.fadeOut = this.game.add.graphics(0, 0);
            this.fadeOut.beginFill(0x00000, 1);
            this.fadeOut.drawRect(0, 0, this.game.width, this.game.height);
            this.fadeOut.alpha = 0;
            this.fadeOut.endFill();

            var s = this.game.add.tween(this.fadeOut);
            s.to({ alpha: 1 }, fadeoutDuration, Phaser.Easing.Linear.Out);
            // s.onComplete.add(this.changeState, this);
            s.start();

            this.yalla = function(){
                this.changeState();
            };

            this.dummyTween(delay, this.yalla);
        };


        // Add BG, TITLE ( moving )
        // Add button sprites ( wobble + SFX when input )

        this.motions1.body.velocity.y = 350 ;

        clicked = false ;
        enabled = false ;

        enter.onDown.add(onDown, this);

        new ParallaxField(this.game,1,smallvel,medvel,bigvel,50);



        // HANDLE ERROR IF NO RESPONSE (SERVER DOWN)
        // AJAX QUERY TOP SCORE

        var getTopScoremnURL = function(){
            var getTopScore = "http://app-pikdox.rhcloud.com/getTopScore";
            var A = new XMLHttpRequest();
            A.open("POST", getTopScore , false);


            try {
                A.send();
            } catch(exception) {
                if(exception.name == 'NetworkError'){
                    console.log('There was a network error.');
                }
            }


            topScore = A.responseText;
        };

        getTopScoremnURL();


    },

    update: function(){

        if (this.motions1.world.y > this.logo.world.y) {
            var number = this.motions1.world.y - this.logo.world.y;
            this.motions1.y-=number;
            this.motions1.body.velocity.y = 0 ;
            this.logo.tint = 0xffffff;

            var thisHUD = new HUD(this,this.logo);
            thisHUD.createStreamingText(this.logo.x-this.logo.width/2+60, this.logo.y+this.logo.height/2,
                "THE FINAL WAVE OF CHAOS!",100);
            // Play SFX too
            this.SFX.play();

            enabled = true ;
        }


        if (cursors.up.isDown && !(this.cursorButton.y == this.cursorUpPosition)){

            this.cursorPosition="up" ;
            this.changeBlinkState(true);
            console.log("this.cursorPosition = "+this.cursorPosition);
            this.cursorButton.y-=70;
            this.entersfx2.play('',1,20,false);
        }
        if (cursors.down.isDown && !(this.cursorButton.y==this.cursorUpPosition+70)){
            this.cursorPosition="down" ;
            this.changeBlinkState(true);
            console.log("this.cursorPosition = "+this.cursorPosition);
            this.cursorButton.y+=70;
            this.entersfx2.play('',1,20,false);
        }



    }

};
