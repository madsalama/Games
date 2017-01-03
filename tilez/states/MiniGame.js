/**
 * Created by mahmoud.ali on 1/13/2015.
 */

// FIX THE SOUND DESIGN.
// THIS IS A MOBILE GAME.
var gridGroup;

myTrialGame.MiniGame = function(game) {
};

{

    // How to not hard-wire this?
    // Generate as many colors as needed - within a color set
    // (or just increase color set with more assets/colors)

    var colorSet = [
        'red', 'blue', 'green', 'cyan', 'orange', 'pink', 'purple'
    ];

    var currentColor = 0;
    var generatedColors = [];
    var generatedTiles = [];

    var tileCount = 0;
    var spawned = false;

    var gameTimer;
    var gridRate = 1000;


    var index = 0;
    var number ;
    var level ;
}

var shipTrail  ;
var flag = false;
var space ;

myTrialGame.MiniGame.prototype = {

    create: function() {



        this.dummyTween = function(delay, callBack){
            var a = this.game.add.tween(this.pixos);
            a.to({ }, delay, Phaser.Easing.Linear.Out);
            a.onComplete.add(callBack, this);
            a.start();
        };


        // Background Filter

        // Debugging TEXT
        {
            this.game.comboText = this.game.add.bitmapText(
                500, 10, '8bit', 'AWESOME'
            );
            this.game.comboText.fontSize = '12px'

        }

        // Create GRID group
        {



        }

        this.shuffle = function(array){
            var m=array.length, t, i;

            // While there remain elements to shuffle…
            while (m) {

                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }

            return array;
        };
        this.calculateNumberOccurence = function(array,element){

            var number = 0 ;
            var i ;

                for (i=0; i<array.length; i++) {
                    if (array[i] == element){
                        number++;
                    }
                }

                return number ;
        };


        this.respawnGrid = function(cols,rows,rectWidth,xSpacing, ySpacing){     // x,y of upper left corner

            // change currentColor at Random.

            gridGroup = this.add.group();
            gridGroup.enableBody = true;
            gridGroup.physicsBodyType = Phaser.Physics.ARCADE;
            gridGroup.setAll('outOfBoundsKill', true);
            gridGroup.setAll('checkWorldBounds', true);

            // Slide whole GROUP to the LEFT.
            // New GROUP is generated and to be swiped from LEFT to RIGHT.

            // GRID MOVE

            var myX = 0;
            var myY ;
            tileCount = 0  ;
            generatedColors = []  ;
            generatedTiles = []  ;
            index = 0;

            for (var i = 0; i < cols; i++)
            {                                  // Cols = Y's
                myY = 0 ;

                for (var j = 0; j < rows; j++)
                {        // Cols = X's
                    var chosenColor = colorSet[Math.floor(Math.random() * colorSet.length)];   // Choose a color, randomly.

                    if (! (generatedColors.indexOf(chosenColor) >-1)){
                        generatedColors.push(chosenColor);
                    }

                    generatedTiles.push(chosenColor);

                    var tile = gridGroup.create(myX,
                        myY, chosenColor);                                                 // Create Tile, add it to group.
                    tile.tileColor = chosenColor;
                    tile.width = rectWidth;
                    tile.height = rectWidth;
                    gridGroup.add(tile);
                    myY+=rectWidth+ySpacing;


                }
                myX+=rectWidth+xSpacing ;
            }

            gridGroup.setAll('inputEnabled',true);
            gridGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.tileHandler);

            // Center the group in the middle of screen
            gridGroup.x = this.game.world.width/2 - gridGroup.width/2 ;
            gridGroup.y = this.game.world.height/2 - gridGroup.height/2 ;

            gridGroup.width-= 100;
            gridGroup.height-= 100;

            this.width = gridGroup.width;
            this.height = gridGroup.height;

            spawned = true ;


            this.shuffle(generatedColors);

            currentColor = generatedColors[0];

            number = this.calculateNumberOccurence(generatedTiles,currentColor);




            // Count number of all generated tiles ?


            for (i=0;i<generatedTiles.length;i++){
                    tileCount++ ;
            }

            console.log("===========================================" );
            console.log("ColorsGenerated = " + generatedColors );
            console.log("Current Color = " + currentColor );
            console.log("Generated Tiles = " + generatedTiles );
            console.log("TileCount = " + tileCount );
            console.log("NUMBER = " + number );
            console.log("===========================================" );

        } ;
        this.tileHandler = function(tile){

            if (tile.tileColor == currentColor ) {

                tile.kill();

                tileCount-- ;
                number-- ;

                console.log("============== TILE HANDLER ==============" );
                console.log("ColorsGenerated = " + generatedColors );
                console.log("Current Color = " + currentColor );
                console.log("Generated Tiles = " + generatedTiles );
                console.log("TileCount = " + tileCount );
                console.log("NUMBER = " + number );
                console.log("===========================================" );

            }
            else
            {
                // ERROR ANIMATE
                // TWEEN THE WHOLE GROUP
                var s = this.game.add.tween(gridGroup);
                s.to( { x: gridGroup.x - 15 }, 300, Phaser.Easing.Sinusoidal.None, true, 600, 2000, true)
                    .start();

            }
        };

        this.respawnGrid(2,2,100,5,5);

    },

    update: function() {

        // ============= ADD IN TILE HANDLER ======================
        // Set emitter location = tile center location
        // Set emitter initial size = tile size
        // Set emitter color(tint) = tile color
        // Set emitter = off after timeout post touch (400mS)
        // =========================================================


        this.game.comboText.setText('CurrentColor ' + currentColor);

        // THIS IS CALLED EVERYTIME THE NUMBER OF TILES WITH CURRENT COLOR == ZERO
        // TO CHANGE CURRENT COLOR
        if (number == 0 && spawned) {
            index++;
            currentColor = generatedColors[index];
            number = this.calculateNumberOccurence(generatedTiles, currentColor);

            console.log("============== NUMBER = 0 =================");
            console.log("ColorsGenerated = " + generatedColors);
            console.log("Current Color = " + currentColor);
            console.log("Generated Tiles = " + generatedTiles);
            console.log("TileCount = " + tileCount);
            console.log("NUMBER = " + number);
            console.log("===========================================");

        }

        // if (shipTrail.on && flag==false)
        // shipTrail.on = false ;

        //  space.onDown.add(this.spaceHandler, this);

        // Problem ( Screen sizes )
        // Problem ( A color that does not exist )      [FIXED]
        // Problem : Algorithm (  Increase tile count with each level  )
        // Problem : Timer : How many tilePads you pass before timer runs out !


        // && ( TIME COUNT SINCE RESPAWN < TIMERMAX FOR THIS SCREEN )
        if (tileCount == 0 && spawned) {

            // Do destroy animation

            // Start dummy tween
            // gridGroup.destroy(true,true); // FUCKING DESTROY THE OLD GRID

            // var direction = [-2000,2000];

            // gridGroup.setAll('body.velocity.x', direction[Math.floor(Math.random() * direction.length)]);
            // gridGroup.setAll('body.gravity.y', 4000);

            spawned = false;

            // Randomize the parameters within range ( increase SIZE with number of respawns )
            this.h = function () {
                this.respawnGrid(5, 5, 100, 5, 5);
                spawned = true;
            };


            this.dummyTween(2000, this.h);


        }

        // Game is infinite time as long as you don't click on wrong tiles for 3 times
        // Else Gameover and respawn
        // Change currentColor with each respawn
        // Respawn if all tiles of currentColor is pressed.


        // Increase level = Grid dimensions.
        // If WRONG color selected BREAK timer -> GAMEOVER !
        // ELSE -> Remove it in animation, sound till timer is OVER !

        // ============================= PATTERN IDEA = DONE(ish) =======================================
        //  AT EACH BOARD ( TIMED ) THERE IS A PATTERN OF COLORS YOU NEED TO TAP ON.
        //  FIRST COLOR = RED (Number of red tiles overlaid "Nr"), TAP ON RED, TAP ON ALL RED TILES , THEY WILL FALL.
        //  SECOND COLOR = YELLOW, TAP ON YELLOW, TAP ON ALL YELLOW TILES, THEY WILL FALL.
        //  THEN YOU GET THE NEXT BOARD ( PATTERN WILL BE LONGER, GRID GETS MORE COMPLEX )
        // ===============================================================================================


        // =============================================================================
        //               TODO : THE REST OF THE GAME - ANDROID BIG RELEASE
        // =============================================================================

        // MATCH 3 : IF THERE IS ANY MATCHING 3 TILES ( HORIZONTAL, VERTICAL, DIAGONAL )
        // ( MODIFY "GENERATE" SO THAT "MATCHES" MIGHT OCCUR MORE OFTEN )
        // {
        // EFFECT IF ONE OF THEM IS TAPPED -
        // THE GRID WON'T COLLAPSE THOUGH -
        // }

        // YOU STILL NEED TO FINISH EACH TILE GRID IN TIME  ( IMPLEMENT TIMER )

        // YOU STILL NEED THE GRID SWIPE ANIMATION TO WORK FLAWLESSLY ( PROBLEM, HAVING ONE VARIABLE,
        // MAYBE STORE IT IN TEMP TILL ANIMATION IS DONE? )

        // GAME IS UNLIMITED ( PROCEDURAL GENERATION LIMIT ?  )
        // MAYBE TOPS AT CERTAIN MxN ( SCREEN SIZES ? )
        // WHY CONTINUE TAPPING ? ( WHAT WILL CLOSE THE FEEDBACK LOOP !?)

        // PROCEDURAL GENERATION ELEMENTS
            // GRID DIMENSIONS ( MxN )
            // NUMBER OF COLORS, COLORS GENERATED
            // TIME FOR EACH GRID ( DESIGN TIME - GRID COMPLEXITY ALGORITHM )


        // AFTER GOING FULLY 3D IN UNITY = ( POLISH )
        // DISINTEGRATION EFFECT ( EX : TILE IS CUBE, TAP ON CUBE, CREATES MULTIPLE SMALLER ROTATING,
        // SCALING DOWN, GETTING TRANSPARENT AND  FALLING CUBES )

        // GYRO EFFECT THAT CAN BE TURNED OFF  = CUBES ROTATE WITH DEVICE ORIENTATION
        // - ALSO LIGHTS MAYBE ( 3D SHADE EFFECT )
        // - THRESHOLD IS A MUST -- OR ELSE BECOMES ANNOYING IF TOO SENSITIVE .


        // ===============================================================================

    }

};




