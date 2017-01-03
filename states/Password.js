
// "Enter-Password"

var input;
myTrialGame.Password = function(game){};
myTrialGame.Password.prototype = {

    create: function() {


        this.entersfx2 = this.add.audio('entersfx');
        this.startsfx1 = this.add.audio('startsfx');

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
            new ParallaxField(this.game,level,smallvel,medvel,bigvel,50);
        }

        var i = 0 ;
        this.stage.backgroundColor = '#00000';

        var currentCursor = 'cursor1';
        var tints = [0x04c4c,0xff0000,0xffa500];        // CYAN, RED, ORANGE

        var cursors = this.add.group() ;
        cursors.enableBody = true ;
        cursors.physicsBodyType = Phaser.Physics.ARCADE ;
        cursors.x +=100;
        var old =  cursors.x;

        var tween = this.game.add.tween(cursors)
            .to( {x: +10, y: 0}, 100, Phaser.Easing.Linear.In)
            .to( {x: old, y: 0}, 100, Phaser.Easing.Linear.Out);


        // cursors = this.cursor1, this.cursor2,...
        {
            this.cursor1 = this.add.sprite(this.game.world.centerX - 400, this.game.world.centerY, 'cursorPass');
            this.cursor1.height-=140;
            this.cursor1.width-=200;
            cursors.add(this.cursor1);

            this.cursor2 = this.add.sprite(this.cursor1.x + 200, this.cursor1.y , 'cursorPass');
            this.cursor2.height = this.cursor1.height;
            this.cursor2.width = this.cursor1.width;
            this.cursor2.alpha = 0.3;
            cursors.add(this.cursor2);

            this.cursor3 = this.add.sprite(this.cursor1.x + 400  , this.cursor1.y , 'cursorPass');
            this.cursor3.height = this.cursor1.height;
            this.cursor3.width = this.cursor1.width;
            this.cursor3.alpha = 0.3;
            cursors.add(this.cursor3);
        }




        var myHUD = new HUD(this.game);
        myHUD.addText(enter,this.game.world.centerX, this.game.world.centerY - 100 ,"ENTER CODE",'8bit');

        this.handle_L = function(){
            if (currentCursor == 'cursor2')
            {

                currentCursor = 'cursor1';
                this.cursor1.alpha = 1;
                this.cursor2.alpha = 0.3;
                this.cursor3.alpha = 0.3;
            }
            else if (currentCursor == 'cursor3')
            {

                currentCursor = 'cursor2';
                this.cursor1.alpha = 0.3;
                this.cursor2.alpha = 1;
                this.cursor3.alpha = 0.3;
            }

        };
        this.handle_R = function(){

            if (currentCursor == 'cursor2')
            {

                currentCursor = 'cursor3';
                this.cursor1.alpha = 0.3;
                this.cursor2.alpha = 0.3;
                this.cursor3.alpha = 1;
            }
            else if (currentCursor == 'cursor1')
            {

                currentCursor = 'cursor2';
                this.cursor1.alpha = 0.3;
                this.cursor2.alpha = 1;
                this.cursor3.alpha = 0.3;
            }

        };
        this.handle_S = function(){

            this.entersfx2.play('',1,20,false);

            // Rotate between possible tints
            eval('this.'+currentCursor).tint = tints[i];

            if (i==2)
            {
                i=0;
            }
            else {i++;}

        };
        this.handle_E = function(){


            if ( currentCursor == 'cursor2'
                && this.cursor1.tint == 0xff0000
                && this.cursor2.tint == 0xffa500 && this.cursor3.tint == 0xff0000) {
                this.entersfx2.play('',0,20,false);
                lives = 10;

                this.state.start('Game_Slim', true);
            }

            else if (currentCursor == 'cursor3' &&
                this.cursor1.tint == 0xff0000 &&
                this.cursor2.tint == 0x04c4c &&
                this.cursor3.tint == 0xffa500
            ){

                this.entersfx2.play('',0,20,false);
                    gotGun = true ;
                    enemyRate = 500;
                this.state.start('Game_Slim', true);

            }

            else if (
                currentCursor == 'cursor3' &&
                this.cursor1.tint == 0x04c4c &&
                this.cursor2.tint == 0xffa500 &&
                this.cursor3.tint == 0xffa500
            ){

                this.entersfx2.play('',0,20,false);
                lives = 6;

                this.state.start('Game_Slim', true);

            }

            else if (
                currentCursor == 'cursor3' &&
                this.cursor1.tint == 0xff0000 &&
                this.cursor2.tint == 0xffa500 &&
                this.cursor3.tint == 0xffa500
            ){
                infiniteEnergy = false;
                this.entersfx2.play('',0,20,false);

                this.state.start('Game_Slim', true);
            }

            // CHECK POSITION OF CURSOR + TINTS OF THE THREE CURSORS
            // IF MATCHING THE PATTERN, GO TO FINAL STAGE (SET LEVEL=6)-> TO BOSS -> TO ENDING ! <3

            else
                tween.start();
        };

        // KEYS
        {
            var curs = this.game.input.keyboard.createCursorKeys();
            var space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            var enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

            enter.onDown.add(this.handle_E, this);
            curs.left.onDown.add(this.handle_L, this);
            curs.right.onDown.add(this.handle_R, this);
            space.onDown.add(this.handle_S, this);

        }

    },

    update: function(){

    // INPUT(moveCursor, handleKeyStroke, handleEnter)
    //  input.onDown.add(moveCursor, this);

    }

};

