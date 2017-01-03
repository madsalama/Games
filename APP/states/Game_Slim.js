/**
 * Created by mahmoud.ali on 12/17/2014.
 */

myTrialGame.Game_Slim = function(game){};

// ====== MAIN GAME VARIABLES =====
{
    // AVATARS
    var pixos;
    var ship;
    var creditTimer;
    // SFX
    var energyUPSFX;

    // GAME NUMBERS
    var enemyAmount = 10;
    var gameLevel = 1;  // INITIAL LEVEL
    var score = 0;

    // CONTROLS
    var cursors;    // Capture arrow events
    var space ;


    // GAME STATES
    var floating = false;
    var onPlatform = false ;

    // ENEMIES
    var enemies;  // ENEMY GROUP
    var enemyTimer;


    // var enemyRate = 1000 ;  // ENEMY SPAWN RATE in mS

    var speedMax = 400;    // SPAWNED Enemy X Speed MAX/MIN
    var speedMin = 100 ;
    var pixTrail ;

    // ENERGY CAPS
    var energyCapsules;  // ENERGY_CAPS GROUP
    var energyTimer;
    var energyRate = 1000 ;

    var energyMax = 350;
    var energyMin = 100;


    var pad;

    var buttonA;
    var buttonB;
    var buttonX;
    var buttonY;
    var buttonDPadLeft;
    var buttonDPadRight;
    var buttonDPadUp;
    var buttonDPadDown;
    var starfield;

    var music;
    var gameoverBGM;

    var dead = false ;
    var shipTrail;
    var explodeParticles;
    var float_tween;
    var explodeSFX  ;

    var levelTimer ;

    // All enemy tagNames goes here
    var possibleEnemies = ['enemy','enemy0','enemy1','enemy2','enemy3','enemy5'];
    var gun;
    var death ;
    var deathEnemy;

    var collectSFX;

}
// ================================


myTrialGame.Game_Slim.prototype = {

    preload:function(){
        this.stage.backgroundColor = '#00000';
        done = false;


        // SHOW TOP SCORE THOUGH

    },

    // GAME INITIALIZE

    create:function(){


        var viewPlusAPI = "http://app-pikdox.rhcloud.com/increaseViewCount";

        var increaseViewCount = function(){
            var req = new XMLHttpRequest();
            req.open("POST",viewPlusAPI , true);
            req.send();  // Enter Parameters here @send(*)
        };

        increaseViewCount();

        this.dummyTween = function(delay, callBack){
            var dummy = 0;
            var a = this.game.add.tween(dummy);
            a.to({ }, delay, Phaser.Easing.Linear.Out);
            a.onComplete.add(callBack, this);
            a.start();
        };

        this.restoreTint = function(){
            pixos.tint = 0xffffff;
        };

        // this.renderGroup = function(member){this.game.debug.body(member);}

        this.onetime = false ;
        this.onetime_stop = false ;
        this.moveBackwards = false ;


        var smallvel=[];
        smallvel.x = -20;
        smallvel.y = 0;

        var medvel=[] ;
        medvel.x = -100;
        medvel.y = 0;

        var bigvel = [];
        bigvel.x = -300;
        bigvel.y = 0 ;

         var starField = new ParallaxField(this.game,level,smallvel,medvel,bigvel,50);



        // INITIALIZE CONTROLLABLE ELEMENTS : THIS SHOULD NOT BE HARDWIRED !!!
        {
            pixos = new Avatar(this.game, 'pixos', 0, 0, onPlatform);

            ship = new Platform(this.game, 'platform', 0, 0);
            pixos.body.gravity.y = 3000 ;
            pixos.body.setSize(160, pixos.height, pixos.x , pixos.y);

            ship.body.immovable = false ;
            pixos.body.immovable = false ;

            ship.body.collideWorldBounds = true;

            // MOVING FG
            pixos.body.collideWorldBounds = true;

            ship.height-=50;
            ship.width-=80;

            ship.x = ship.width / 2;
            ship.y = this.world.height - 1.2 * ship.height  +10 ;
            // pixos.x = ship.x - pixos.width ;
            pixos.y = ship.y - pixos.body.height;


            // Fix this to RESIZE with RESOLUTION.
            pixos.height-=180;
            pixos.width-=160;
            ship.height-=10;
            ship.width-=100;

            this.add.existing(pixos);
            this.FG = this.add.tileSprite(0,  this.game.world.height - 48, this.game.world.width,48 ,'LAVA');
            // INITIALIZE SHIP TRAIL
            {
                // CREATE A SHIP TRAIL
                shipTrail = this.game.add.emitter(500, 500, 250);
                shipTrail.width = 1;
                shipTrail.makeParticles(['explosion'], true);
                shipTrail.setXSpeed(30, -30);
                shipTrail.setYSpeed(200, 180);
                shipTrail.setRotation(50, -50);
                shipTrail.setAlpha(1, 0.01, 800);
                shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000, Phaser.Easing.Quintic.Out);
                shipTrail.start(false, 5000, 2);
                shipTrail.on = false;

                shipTrail.forEach(function(particle) {
                    // tint every particle red
                     particle.tint = 0x000000;
                });

                this.add.existing(shipTrail);
            }

            this.add.existing(ship);

            /*
             this.game.add.tween(ship)
             .to( { x: ship.x - 15 }, 300, Phaser.Easing.Sinusoidal.None, true, 600, 2000, true)
             .loop().start();
             */

            dead = false ;
            this.game.kills = 0 ;

            pixos.down = false ;
            pixos.gotGun = false;

            cursors = this.input.keyboard.createCursorKeys();
            space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


            pixos.jelly = false ;
            pixos.comboKills = 0 ;
            pixos.comboBack = false ;

        }


        // INITIALIZE PIXOS TRAIL
        // CREATE A SHIP TRAIL
        pixTrail = this.game.add.emitter(pixos.x, pixos.y, 100);
        pixTrail.width = 10;
        pixTrail.makeParticles(['single'], true);
        pixTrail.setYSpeed(500,500);
        pixTrail.setRotation(0, 0);
        pixTrail.setAlpha(1, 0.01, 800);
        // pixTrail.setScale()

        pixTrail.setScale(0.05, 0.4, 0.05, 0.4, 1000, Phaser.Easing.Quintic.Out);

        pixTrail.start(false, 5000, 2);
        pixTrail.on = false;

        pixTrail.forEach(function(particle) {
            // tint every particle red
            // particle.tint = 0x191000;
        });

        this.add.existing(pixTrail);

        // INITIALIZE A HUD
        {


            var myHUD = new HUD(this.game, pixos);
            myHUD.createEnergyStatus();
            myHUD.createScoreStatus();
            myHUD.createLevelStatus();
            myHUD.createLivesStatus();
            myHUD.createHealthStatus();

            this.game.topScoretext = this.game.add.bitmapText(
                this.game.world.width-204, 10, '8bit', 'TOP  ' + topScore
            );
            this.game.topScoretext.visible = true  ;
            this.game.topScoretext.fontSize='15px';

            this.game.messageText = this.game.add.bitmapText(
                this.game.world.centerX-250, this.game.world.centerY-10, '8bit', 'LEVEL-UP or TOPSCORE!'
            );
            this.game.messageText.visible = false  ;
            this.game.messageText.fontSize='20px';

            this.hideText = function(){
                this.game.messageText.visible = false  ;
            };

        }

        gun = new Weapon.SingleBullet(this.game);
        death = new Weapon.EightWay(this.game);
        deathEnemy = new Weapon.EightWayEnemy(this.game);

        fixed = false;

        if (!hinted){
            hinted = true;
            this.game.messageText.setText("AVOID YOUR INNER MONSTERS");
            this.game.messageText.visible = true  ;
            this.game.messageText.tint = 0xffffff  ;
            // this.game.messageText.x -= 150 ;

            this.dummyTween(5000,this.hideText);
        }


        this.increaseLevel = function(){



            // AJAX UPDATE TOP SCORE
            var updateTopScore = "http://app-pikdox.rhcloud.com/updateTopScore?score=" + score;
            var req2 = new XMLHttpRequest();
            req2.open("POST",updateTopScore , true);

            try {
                req2.send();  // Enter Parameters here @send(*)
            } catch(exception) {
                if(exception.name == 'NetworkError'){
                    console.log('There was a network error.');
                }
            }

            level++ ;

            if (level<=10) {

                enemyRate -= 80;

                speedMax+=20;
                speedMin+=20;

                // RESTART ENEMY TIMER WITH NEW ENEMY PARAMETERS (SPAWN RATE, SPEED)
                enemyTimer.destroy();
                enemyTimer = this.game.time.create(false);
                enemyTimer.loop(enemyRate, spawnEnemy, this);
                enemyTimer.start();

                myHUD.updateText('level',level);

                if (!fixed)
                {
                    this.game.messageText.x += 200;
                    fixed = true;
                }

                // SHOW ANOTHER LEVEL TEXT IN THE MIDDLE OF SCREEN TOO FOR 2 SECONDS
                this.game.messageText.setText("LEVEL " + level);
                this.game.messageText.visible = true  ;
                this.game.messageText.tint = 0xffffff  ;


                this.dummyTween(3000,this.hideText);

                starField.clear();
                starField = new ParallaxField(this.game,level,smallvel,medvel,bigvel,50);

            }

            if (level==5){
                // SFX GUN
                // SHOW GUN SPRITE

                gotGun = true ;

            }

            if (level==9){

                var updateWinCount = "http://app-pikdox.rhcloud.com/increaseWinCount";
                var A = new XMLHttpRequest();
                A.open("POST", updateWinCount , true);


                try {
                    A.send();
                } catch(exception) {
                    if(exception.name == 'NetworkError'){
                        console.log('There was a network error.');
                    }
                }

            }




            if (level==11){

                // Stop enemySpawn & destroy this timer
                levelTimer.destroy();
                enemyTimer.destroy();

                energyRate = 200 ;
                energyTimer.destroy();

                energyTimer = this.game.time.create(false);
                energyTimer.loop(energyRate, spawnEnergyCapsule, this);
                energyTimer.start();

                gotGun = false ;

                this.dummyTween(3000,this.showCredits);

                // Start a dummy tween then show QR code
                // ( With the timer underneath 3:00 minutes )
                // 

            }

        };

        levelTimer = this.game.time.create(false);
        levelTimer.loop(25500, this.increaseLevel, this);
        levelTimer.start();



        this.startFadeOut = function(delay) {
            this.fadeOut = this.game.add.graphics(0, 0);
            this.fadeOut.beginFill(0x00000, 1);
            this.fadeOut.drawRect(0, 0, this.game.width, this.game.height);
            this.fadeOut.alpha = 0;
            this.fadeOut.endFill();

            var s = this.game.add.tween(this.fadeOut);
            s.to({ alpha: 1 }, 500, Phaser.Easing.Linear.Out);


            this.u = function(){this.game.statusText.visible = true;};
            s.onComplete.add(this.u, this);


            this.yalla = function(){
                s.start();
            };

            this.dummyTween(delay, this.yalla);

        };
        this.collisionHandlerEnemy = function(pixos, enemy) {
            // STOMPING ENEMIES
            // If holding DOWN button

            if(level!=11)
            {
                if (!pixos.hurting) {
                    pixos.hurtTween.start();
                    enemy.body.velocity.x = 0 ;
                    pixos.getHit(1);

                }
            }
        };
        this.positionPixos = function() {

            if (   (  pixos.y + pixos.height <= this.FG.y + this.FG.height )
            ) {
                pixos.y = ship.y - pixos.height ;
                pixos.stop();
            }

        };
        pixos.tapHandler = function(key)
        {




            pixTrail.on = false;

            if(!dead && pixos.energy >= 1) {

                 if (gotGun == true)
                    gun.fire(pixos);



                if (!infiniteEnergy)
                    pixos.energy -= 1;




                if (pixos.energy < 20)
                {myHUD.warnHealth();}

                myHUD.updateText("health");

                // JUMP GHOSTING, RGB SPLIT
                // AVATAR VISUAL EFFECT
                // ADD EFFECT WHEN HITTING PLATFORM "SPARKS"

                // Create motion trail
                // motionTrail(this.game,5,'pixos',pixos.x ,pixos.y ,false, pixos.height, pixos.width, pixos);

                pixos.jelly = false;

                // Input
                pixos.jump();

                // JUMP SFX
            }

else if (!dead)
            {
                this.game.messageText.setText("NO ENERGY!");
                this.game.messageText.visible = true  ;
                this.game.messageText.tint = 0xffffff  ;
                this.dummyTween(1000,this.hideText);
            }

        };



        this.game.physics.arcade.enable(this.FG);

        this.collisionHandlerEnergy = function(pixos, energyCapsule) {


            if (!dead){

                myHUD.tweenElement('energy');
                // myHUD.tweenElement('energyText');

                pixos.tint = 0xff4500;
                this.dummyTween(150,this.restoreTint);

                this.collplay();

                if (!gotGun)
                    pixos.energy += 5;
                else
                    pixos.energy += 10;

                if (pixos.energy > 20)
                    myHUD.restoreHealtWarn();

                myHUD.updateText('health');



                energyCapsule.kill();
                // energyUPSFX.play();

                collectedItems++;
                score+= 10;
                myHUD.uptateText("SCORE " + score);
                myHUD.tweenElement('scoreText');

                if (score > topScore && !announced )
                {
                    announced = true ;
                    this.game.messageText.setText("NEW TOP SCORE!");
                    this.game.messageText.tint = 0xffa500  ;
                    this.game.messageText.visible = true  ;
                    this.dummyTween(2000,this.hideText);

                    var updateTopScore = "http://app-pikdox.rhcloud.com/updateTopScore?score=" + score;
                    var req2 = new XMLHttpRequest();
                    req2.open("POST",updateTopScore , true);

                    try {
                        req2.send();  // Enter Parameters here @send(*)
                    } catch(exception) {
                        if(exception.name == 'NetworkError'){
                            console.log('There was a network error.');
                        }
                    }
                }


                myHUD.updateText('energy');
            }



        };
        this.collisionHandlerPixosBullets = function(enemy,avatarBullet) {

        };

        this.restart = function (){


            if (lives==0)
            {

                    lives = 4;
                    level = 1;
                    collectedItems = 0;
                    score = 0;
                    enemyRate = 1000 ;

                this.game.state.start('Game_Slim',true);
            }
            else
            {

                this.game.state.start('Game_Slim',true);
            }

        };
        this.goBack = function(){
            pixos.jelly = true;
            pixos.height+=2;
        };
        this.goBack_ship = function(){
            pixos.jelly = true ;
            ship.y-=5;
        };

        this.respawn = function(){

        };

        this.die = function(){

           // starField.clear();


            // SET A TEXT TO TELL THE PLAYER OF HIS ACCOMPLISHMENT
            music.stop();


            if (lives>0)
            {
                lives--;

                // AJAX UPDATE TOP SCORE
                var updateTopScore = "http://app-pikdox.rhcloud.com/updateTopScore?score=" + score;
                var req2 = new XMLHttpRequest();
                req2.open("POST",updateTopScore , true);

                try {
                    req2.send();  // Enter Parameters here @send(*)
                } catch(exception) {
                    if(exception.name == 'NetworkError'){
                        console.log('There was a network error.');
                    }
                }
            }

            dead = true;



            if (lives==0){

                // gameoverBGM.play('',0,1,false);

            // AJAX UPDATE TOP SCORE
            var updateTopScore = "http://app-pikdox.rhcloud.com/updateTopScore?score=" + score;
            var req2 = new XMLHttpRequest();
            req2.open("POST",updateTopScore , true);

                try {
                    req2.send();  // Enter Parameters here @send(*)
                } catch(exception) {
                    if(exception.name == 'NetworkError'){
                        console.log('There was a network error.');
                    }
                }

            this.dummyTween(5000,this.restart);
            }
            else
                this.dummyTween(2000,this.restart);



            energyTimer.destroy();
            enemyTimer.destroy();

            ship.body.velocity.x = 0  ;
            shipTrail.on = false ;

            // music.pause();

            pixos.frame = 0;
            // pixos.anchor.set(0.5,0.5);

            pixos.body.gravity = 0 ;
            levelTimer.destroy();

            // Slow mo the whole thing
            enemies.callAll('slowMo');
            energyCapsules.callAll('slowMo');

            this.resume = function(){

                this.sfxplay();
                myHUD.tweenElement("lifeText");

                pixos.energy = 0 ;
                myHUD.warnHealth();
                myHUD.updateText("health");

                enemies.callAll('resumeMoving');
                energyCapsules.callAll('resumeMoving');

                if (!done)
                {
                    death.fire(pixos);
                    done = true;}
                pixos.visible = false;

                if (lives == 0){
                    this.game.statusText.visible = true  ;

                }


                if ( lives ==0 && (score > topScore) ) {
                    this.game.mess.setText("NEW TOPSCORE = " + score + "!");
                    this.game.mess.tint = '0xffa500';
                    this.game.mess.fontSize = '25px';
                    this.game.mess.visible = true;
                }

                // topScore = A.responseText;

                // PIXOS ANIMATION OF EXPLOSION

            };
            this.dummyTween(300,this.resume);

            pixos.body.collideWorldBounds = false ;
            pixos.hurtTween.loop();

            if (lives==0){this.startFadeOut(3000);
                gotGun = false ;
                speedMax = 400;    // SPAWNED Enemy X Speed MAX/MIN
                speedMin = 100 ;}


        };


        this.over = function(){

          //  starField.clear();

            // SET A TEXT TO TELL THE PLAYER OF HIS ACCOMPLISHMENT


            if (lives>0)
            {
                lives--;
            }

            dead = true;
            this.dummyTween(5000,this.restart);

            energyTimer.pause();
            enemyTimer.pause();

            ship.body.velocity.x = 0  ;
            shipTrail.on = false ;

            // music.pause();
            // gameoverBGM.play('',0,1,false);
            pixos.frame = 1;
            // pixos.anchor.set(0.5,0.5);

            pixos.body.gravity = 0 ;
            levelTimer.pause();

            // Slow mo the whole thing
            enemies.callAll('slowMo');
            energyCapsules.callAll('slowMo');

            this.resume = function(){
                enemies.callAll('resumeMoving');
                energyCapsules.callAll('resumeMoving');

                if (!done)
                {
                    death.fire(pixos);
                    done = true;}
                pixos.visible = false;

                if (lives ==0)
                    this.game.statusText.visible = true  ;

                if ( lives ==0 && (score > topScore) ) {
                    this.game.mess.setText("NEW TOPSCORE = " + score + "!");
                    this.game.mess.tint = '0xffa500';
                    this.game.mess.visible = true;
                }

                topScore = A.responseText;

                // PIXOS ANIMATION OF EXPLOSION

            };

            this.dummyTween(1,this.resume);

            pixos.body.collideWorldBounds = false ;
            pixos.hurtTween.loop();
            this.startFadeOut(3000);

        };



        this.sfxplay = function(){explodeSFX.play('',0,1,false)} ;
        this.collplay = function(){collectSFX.play('',0,1,false)} ;

        // MUSIC & SFX MANAGER
        {
            music = this.game.add.audio('BGM',1,true);
            explodeSFX = this.game.add.audio('EXPLODE', 1, true);
            collectSFX = this.game.add.audio('collect', 1, true);
            collectSFX.allowMultiple = true;
            gameoverBGM = this.game.add.audio('gameover', 1, true);
            this.entersfx2 = this.add.audio('entersfx');
            this.playBGM = function () {
                     music.play('',0,1,true);
                     music.volume-=0.05;
            };
             this.dummyTween(1,this.playBGM);
            energyUPSFX = this.add.audio('sound');
        }

        // START ENEMY SPAWN
        {
            enemies = this.add.group() ;
            enemies.enableBody = true ;
            enemies.physicsBodyType = Phaser.Physics.ARCADE ;
            enemies.setAll('outOfBoundsKill', true);
            enemies.setAll('checkWorldBounds', true);

            function spawnEnemy (LEVEL){


                        // ====== SIMPLE SPAWN AI ======

                        if (!onPlatform) {

                            var enemy = enemies.getFirstDead();

                            if (enemy == null) {

                                if (level<6)
                                    var chosenEnemy = possibleEnemies[Math.floor(Math.random() * level)];
                                else
                                    var chosenEnemy = possibleEnemies[Math.floor(Math.random() * 6)];

                                // enemyTag = choose a random element from possibleEnemies in a range according to LEVEL
                                // If LEVEL = 1 => Look through arr[0] through arr[LEVEL]

                                // var enemyTag = 'enemy2' ;

                                var enemy = new Enemy(this.game, chosenEnemy, this.world.width - 50,
                                    Math.random() * ( Math.abs(pixos.y) - pixos.y  ) +
                                    Math.abs(pixos.y), pixos, ship, floating, gameLevel);

                                // enemy.height-=50;
                                // enemy.width-=70;
                                enemy.body.immovable = false ;
                                this.game.add.existing(enemy);
                                enemies.add(enemy);

                            }

                            enemy.alive = true;


                        } // Spawn from Y around PIXOS

                        else {

                            if (gotGun){

                                var enemy = enemies.getFirstDead();

                                // Depending on stage, will add to a list of of strings [enemyTypes]
                                // Choose spriteTag randomly from the list [ possible types increase at each stage ]
                                // Effectively generating 1 new enemy every stage
                                // Pass spriteTag instead of actual hardwired tag = 'enemy'

                                if (enemy == null ) {

                                    if (level<6)
                                        var chosenEnemy = possibleEnemies[Math.floor(Math.random() * level)];
                                    else
                                        var chosenEnemy = possibleEnemies[Math.floor(Math.random() * 6)];


                                    var enemy = new Enemy(this.game, chosenEnemy, this.world.width - 50,
                                        Math.random()*(this.world.height-50)+50, pixos, ship, floating, gameLevel);

                                    // enemy.height-=50;
                                    // enemy.width-=60;

                                    enemy.body.immovable = false ;
                                    this.game.add.existing(enemy);
                                    enemies.add(enemy);
                                    // enemy.tint = '#006666';
                                }

                                enemy.alive = true;

                            }

                            else {

                                var enemy = enemies.getFirstDead();

                                // Depending on stage, will add to a list of of strings [enemyTypes]
                                // Choose spriteTag randomly from the list [ possible types increase at each stage ]
                                // Effectively generating 1 new enemy every stage
                                // Pass spriteTag instead of actual hardwired tag = 'enemy'

                                if (enemy == null ) {
                                    if (level<6)
                                        var chosenEnemy = possibleEnemies[Math.floor(Math.random() * level)];
                                    else
                                        var chosenEnemy = possibleEnemies[Math.floor(Math.random() * 6)];



                                    var enemy = new Enemy(this.game, chosenEnemy, this.world.width - 50,
                                        Math.random() * ( Math.abs(pixos.y + pixos.height) - pixos.y  ) +
                                        Math.abs(pixos.y), pixos, ship, floating, gameLevel);

                                    enemy.body.immovable = false ;
                                    this.game.add.existing(enemy);
                                    enemies.add(enemy);
                                    // enemy.tint = '#006666';
                                }

                                enemy.alive = true;

                            }



                        }           // Spawn ONLY from above his head to his toe.




                    enemy.body.velocity.x = Math.random() * (-speedMax + speedMin) - speedMin;




            }


            if (level<=10) {
                enemyTimer = this.game.time.create(false);
                enemyTimer.loop(enemyRate, spawnEnemy, this);
                enemyTimer.start();
            }

        }
        // START ITEM SPAWN
        {
            energyCapsules = this.add.group();
            energyCapsules.enableBody = true;
            energyCapsules.physicsBodyType = Phaser.Physics.ARCADE;
            energyCapsules.setAll('outOfBoundsKill', true);
            energyCapsules.setAll('checkWorldBounds', true);


            function spawnEnergyCapsule() {

                var colorSet = [
                    '1','2','3','4'
                ];


                var chosenColor = colorSet[Math.floor(Math.random() * colorSet.length)];   // Choose a color, randomly.


                // var energyCapsule = energyCapsules.getFirstDead();

                // Depending on stage, will add to a list of of strings [enemyTypes]
                // Choose spriteTag randomly from the list [ possible types increase at each stage ]
                // Effectively generating 1 new enemy every stage
                // Pass spriteTag instead of actual hardwired tag = 'enemy'

                if (1) {

                    var energyCapsule = this.game.add.sprite(Math.random()*(this.game.world.width), 0, chosenColor);
                    energyCapsule.chosenColor = chosenColor;

                    this.game.physics.arcade.enable(energyCapsule);
                    energyCapsule.anchor.setTo(0.5, 0.5);

                    energyCapsule.update = function(){
                        energyCapsule.angle-=5*level;
                        // TWEENS THEIR ALPHA
                    };

                    energyCapsule.slowMo = function(){
                        energyCapsule.body.velocity.y = 0 ;
                    };

                    energyCapsule.resumeMoving = function(){
                        energyCapsule.body.velocity.y = 400 ;
                    };

                    energyCapsule.height-=40;
                    energyCapsule.width-=48;
                    energyCapsules.add(energyCapsule);

                }
                // energyCapsule.alive = true;

                    energyCapsule.shine = this.game.add.tween(energyCapsule)
                        .to({tint:0xff0000}, 100, Phaser.Easing.Linear.In)
                        .to({tint:0xffffff}, 50, Phaser.Easing.Linear.Out)
                        .to({tint:0xffa500}, 100, Phaser.Easing.Linear.In)
                        .to({tint:0xffffff}, 50, Phaser.Easing.Linear.Out)
                        .to({tint:0x0ffff0}, 100, Phaser.Easing.Linear.In)
                        .to({tint:0xffffff}, 50, Phaser.Easing.Linear.Out)
                        .to({tint:0x00ff00}, 100, Phaser.Easing.Linear.In)
                        .to({tint:0xffffff}, 50, Phaser.Easing.Linear.Out)
                        .to({tint:0x0000ff}, 100, Phaser.Easing.Linear.In)
                        .to({tint:0xffffff}, 50, Phaser.Easing.Linear.Out)
                        .to({tint:0x00ffa5}, 100, Phaser.Easing.Linear.In)
                        .to({tint:0xffffff}, 50, Phaser.Easing.Linear.Out)
                        .to({tint:0x00ffa5}, 100, Phaser.Easing.Linear.In)
                        .to({tint:0xffffff}, 50, Phaser.Easing.Linear.Out)
                        .loop().start();

                    energyCapsule.killMe = function(){
                        energyCapsule.kill();
                    };

                    energyCapsule.disappear = function(){
                        energyCapsule.disappearTween = this.game.add.tween(energyCapsule)
                            .to({alpha:1}, 100, Phaser.Easing.Linear.In)
                            .to({alpha:0}, 100, Phaser.Easing.Linear.Out)
                            .to({alpha:1}, 100, Phaser.Easing.Linear.In)
                            .to({alpha:0}, 100, Phaser.Easing.Linear.Out)
                            .to({alpha:1}, 100, Phaser.Easing.Linear.In)
                            .to({alpha:0}, 100, Phaser.Easing.Linear.Out);

                        energyCapsule.disappearTween.onComplete.add(energyCapsule.killMe,this);
                        energyCapsule.disappearTween.start();

                    };

                    this.dummyTween(4000,energyCapsule.disappear);

                energyCapsule.body.velocity.y =  Math.random() * (speedMax - speedMin) + speedMin;
            }


            energyTimer = this.game.time.create(false);
            energyTimer.loop(energyRate, spawnEnergyCapsule, this);
            energyTimer.start();
        }


        // GAME TEXTS
        {
            this.game.bulletText = this.game.add.bitmapText(
                500, 100, '8bit', 'AWESOME');
            this.game.bulletText.visible = false  ;
            this.game.bulletText.fontSize='10px';

            // ==================================================
            this.game.statusText = this.game.add.bitmapText(
                this.game.world.centerX - 200 , this.game.world.centerY - 10 , '8bit', 'GAMEOVER'
            );
            this.game.statusText.visible = false  ;
            this.game.statusText.fontSize='50px';



                this.game.mess = this.game.add.bitmapText(
                    this.game.world.centerX - 220 , this.game.world.centerY - 50 , '8bit', ''
                );
                this.game.mess.visible = false  ;
                this.game.mess.fontSize='15px';



        }


        pixos.gravityApplied = false ;

        this.killEnemy = function(gunbull,enemy) {

            restoreTint = function(){
                enemy.tint = 0xffffff;
            };

            if (enemy.health == 0)
            {
                deathEnemy.fire(enemy,5000);
                enemy.kill();
                gunbull.kill();

                score+=100;
                myHUD.uptateText("SCORE " + score);
                myHUD.tweenElement('scoreText');

                if (score > topScore && !announced)
                {
                    announced = true;
                    this.game.messageText.setText("NEW TOP SCORE!");
                    this.game.messageText.visible = true  ;
                    this.game.messageText.tint = 0xffa500  ;
                    this.dummyTween(2000,this.hideText);

                    var updateTopScore = "http://app-pikdox.rhcloud.com/updateTopScore?score=" + score;
                    var req2 = new XMLHttpRequest();
                    req2.open("POST",updateTopScore , true);

                    try {
                        req2.send();  // Enter Parameters here @send(*)
                    } catch(exception) {
                        if(exception.name == 'NetworkError'){
                            console.log('There was a network error.');
                        }
                    }
                }
            }

            else
            {
                gunbull.kill();
                enemy.tint = 0x00ffff;
                enemy.health-=10;
                this.dummyTween(100,restoreTint);
            }


        };

        space.onDown.add(pixos.tapHandler, this);


        var index = 0 ;

        var texts = ["THE END ?","DEVELOPING & MUSIC BY PIKDOX. ",
            "HOPE YOU ENJOYED THE GAME !!!",
            "SEE YOU IN A BETTER WORLD..."];

        this.handle_E = function(){

            index++;

            if (index>=4){

                // SHOW QR1 CODE FROM SET OF CODES
                var codes = ['qr1','qr2','qr3'];
                var qr = codes[Math.floor(Math.random() * 3)];

                // show sprite
                this.qr = this.add.sprite(this.game.world.centerX, this.game.world.centerY, qr);
                this.qr.x-=(this.qr.width/2);
                this.qr.x+=25;
                this.qr.y-=this.qr.height/2;

                this.qr.alpha-=0.5;
                this.qr.height-=50;
                this.qr.width-=50;


                creditTimer.destroy();
                this.text1.setText(" ");
                this.entersfx2.play('',1,10,false);
            }

            if (index<4){
                this.text1.setText(" ");
                this.text1 = myHUD.createStreamingText(this.game.world.centerX - 400, this.game.world.centerY,texts[index]
                    ,75,20);

                this.entersfx2.play('',1,10,false);
            }



        };

        this.showCredits = function(){
            this.text1 = myHUD.createStreamingText(this.game.world.centerX - 400, this.game.world.centerY,
                texts[index] ,100,20);

            creditTimer = this.game.time.create(false);
            creditTimer.loop(4000, this.handle_E, this);
            creditTimer.start();

        };
    },

    // ==============================================
    //   INPUT, GAME-LEVEL & STATE CODE GOES HERE
    // ==============================================

    update:function(){



        // TODO: FIX TRAIL SIZE AND LOCATION TO LOOK MORE NATURAL [ DONE ]

        // alert (globalVar);

        // ONLY IF THEY ARE NOT EQUAL
        shipTrail.x = ship.x + ship.width/2 ;
        shipTrail.y = ship.y + ship.height  ;
        this.FG.tilePosition.x -= 6;

        pixTrail.x = pixos.x+pixos.width/3  ;
        pixTrail.y = pixos.y + pixos.height;


        if (onPlatform && pixos.jelly == false)
        {
            pixTrail.on = false ;
            pixos.frame = 0;

            ship.y+=5;
            pixos.height-=2;

            // Timing issue here !
            this.dummyTween(50,this.goBack);
            this.dummyTween(50,this.goBack_ship);
        }


        if (!dead)
        {
            pixos.x  = ship.x + pixos.width/1.5 - 10 ;
            pixos.body.gravity.y = 1900 ;

        }



        // COLLISIONS AND HANDLERS
        {
            onPlatform = this.physics.arcade.overlap(pixos, ship, this.positionPixos, null,this);
            pixos.hurting = this.physics.arcade.overlap(pixos, enemies, this.collisionHandlerEnemy, null, this);
            this.physics.arcade.overlap(pixos, energyCapsules, this.collisionHandlerEnergy, null, this);
            this.physics.arcade.overlap(pixos, pixos.Bullets, this.positionPixos, null,this);
            this.physics.arcade.overlap(gun, enemies, this.killEnemy, null,this);

            // this.physics.arcade.overlap(gun, daBoss, this.killBoss, null,this);
        }

        // INPUT HANDLER
        if (!dead)
        {

            if ((  cursors.left.isDown  )) {
                    this.onetime_stop = false;
                    ship.moveLeft();
                    shipTrail.on = true;
            }
            else if (( cursors.right.isDown  )) {
                this.onetime_stop = false;
                    ship.moveRight();
                    shipTrail.on = true;
            }

            else if( cursors.down.isDown
            || cursors.left.isDown && cursors.down.isDown
            || cursors.right.isDown && cursors.down.isDown ) {

                this.onetime_stop = false;
                shipTrail.on = false;



                pixos.down = true;
                ship.stopMoving();

                if (!onPlatform)
                     pixos.body.gravity.y = 30000;

            }
            else {
                if (!this.onetime_stop) {
                    shipTrail.on = false;
                    ship.stopMoving();
                    pixos.down = false;
                    this.onetime_stop = true;
                }
            }
        }

            // GAME OVER CRITERIA
            if ( pixos.lives <= 0 || pixos.health <1) {

                // CALL ONCE
                if (!this.onetime) {

                    if (lives<1){

                    }

                        this.die();
                        this.onetime = true;
                }

            }

    }

};



