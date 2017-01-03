/**
 * Created by salama on 12/27/2015.
 */

function ParallaxField(game, level,velSmall, velMed, velBig,rate) {

    this.game = game;

    this.velSmall = velSmall;
    this.velMed = velMed;
    this.velBig = velBig;

    this.level = level ;
    this.rate = rate ;

    this.stars = this.game.add.group();
    this.stars.enableBody = true;
    this.stars.physicsBodyType = Phaser.Physics.ARCADE;
    this.stars.setAll('outOfBoundsKill', true);
    this.stars.setAll('checkWorldBounds', true);

    this.possibleSizes = ['big','med','small'];
    this.colorSet = ['red', 'blue', 'green', 'cyan', 'orange', 'pink', 'purple'];

    this.timer = this.game.time.create(false);
    this.timer.loop(rate, this.generateStar, this);
    this.timer.start();

    this.dummyTween = function(delay, callBack){
        var dummy = 0;
        var a = this.game.add.tween(dummy);
        a.to({ }, delay, Phaser.Easing.Linear.Out);
        a.onComplete.add(callBack, this);
        a.start();
    };

}



// ParallaxField.prototype = Object.create(Phaser.Sprite.prototype);              // SUPER
ParallaxField.prototype.constructor = ParallaxField;

ParallaxField.prototype.generateStar = function() {

    // Create a timer to keep generating stars (From Pool)

    var star = this.stars.getFirstDead();

    if (star == null) {

        var chosenSize = this.possibleSizes[Math.floor(Math.random() * this.possibleSizes.length)];

         this.color = 'red';


        switch (level){
            case 0:
                this.color = this.colorSet[Math.floor(Math.random() * this.colorSet.length)];
                break;
            case 1:
                this.color = 'cyan';
                break;
            case 2:
                this.color = 'orange';
                break;
            case 3:
                this.color = 'blue';
                break;
            case 4:
                this.color = 'red';
                break;
            case 5:
                this.color = 'orange';
                break;
            case 6:
                this.color = 'blue';
                break;

        }

        var star = this.game.add.sprite(Math.random()*(this.game.world.width)+100,
            Math.random()*(this.game.world.height) , this.color);

        this.game.physics.arcade.enable(star);
        star.anchor.setTo(0.5, 0.5);
        star.dest = function(){
            star.kill();
        };


        this.dummyTween(15000, star.dest);




        switch (chosenSize) {
            case 'small':
                star.height = 2;
                star.width  = 2;
                star.body.velocity.x =  this.velSmall.x  ; // -20;
                star.body.velocity.y =  this.velSmall.y  ; // -20;
                break;
            case 'med':
                star.body.velocity.x =  this.velMed.x ; // -100;
                star.body.velocity.y =  this.velMed.y ; // -100;
                star.height = 4;
                star.width  = 4;
                break;
            case 'big':
                star.body.velocity.x =  this.velBig.x;  //;-300;
                star.body.velocity.y =  this.velBig.y;  //;-300;
                star.height = 7;
                star.width  = 7;
                break;
            }

        star.stop = function(){
            star.body.velocity.x = 0 ;
            star.body.velocity.y = 0 ;
        };

        star.resume = function(){
            star.body.velocity.x = this.velBig.x ;
            star.body.velocity.y = this.velBig.y ;
        };



        // this.stars.body.immovable = false ;
        this.game.add.existing(star);
        this.stars.add(star);

    }

    star.alive = true;

};


ParallaxField.prototype.clear = function(){
    this.timer.destroy();
    this.stars.destroy();
};



ParallaxField.prototype.pauseAll = function(){
        this.stars.callAll('stop');
        this.timer.destroy();
};

ParallaxField.prototype.resumeAll = function(){
    this.stars.callAll('resume');
    this.timer = this.game.time.create(false);
    this.timer.loop(this.rate, this.generateStar, this);
    this.timer.start();
};




