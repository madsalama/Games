
function Avatar(game,spriteTag,x,y, onPlatform) {

    // Initialize Player
    Phaser.Sprite.call(this,game,x,y,spriteTag); // Calls SPRITE constructor ONLY
    game.physics.arcade.enable(this);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;


    // Bullet Group
    this.Bullets = game.add.group();
    this.Bullets.enableBody = true;
    this.Bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.Bullets.setAll('outOfBoundsKill', true);
    this.Bullets.setAll('checkWorldBounds', true);


    this.explode = this.game.add.audio('EXPLODE',0.3);
    this.animations.add('blink', [0,1]);

    this.animations.add('move',[2,3,4,5,6,7]);
	this.animations.add('moveGun',[8,9,10,11,12,13]);
	
    this.health = 1 ;

    this.energy = 50 ;

    this.lives = 3 ;
    this.game = game ;
    this.onPlatform = onPlatform;

    this.called = false ;




    this.explosion = this.game.add.sprite(this.x, this.y, 'explosion');
    this.explosion.visible = false ;
    this.explosion.animations.add('boom');

    this.hurtTween = game.add.tween(this)
        .to({tint: 0xff2500, hurting: true}, 100, Phaser.Easing.Linear.In)

        .to({tint: 0xFFFFFF}, 200, Phaser.Easing.Linear.Out)
        .to({tint: 0x004C4C}, 400, Phaser.Easing.Linear.In)

        .to({tint: 0xFFFFFF}, 200, Phaser.Easing.Linear.Out)
        .to({tint: 0xE59400}, 400, Phaser.Easing.Linear.In)

        .to({tint: 0xFFFFFF}, 200, Phaser.Easing.Linear.Out);
        var velx = (this.body.velocity.x);
        var vely = (this.body.velocity.y);
}

Avatar.prototype = Object.create(Phaser.Sprite.prototype);              // SUPER
Avatar.prototype.constructor = Avatar;


Avatar.prototype.dummyTween = function(delay, callBack){

    var a = this.game.add.tween(this.fadeOut);
    a.to({ }, delay, Phaser.Easing.Linear.Out);
    a.onComplete.add(callBack, this);
    a.start();

};


// MOTION
{
    Avatar.prototype.jump = function (){
        this.body.velocity.y = -600 ;

        if (!gotGun && !onPlatform )
            pixos.animations.play('move', 200, true);
        else if (!onPlatform)
            pixos.animations.play('moveGun', 200, true);

    };
    Avatar.prototype.moveRight = function () {

        // Ease until speed final = 500 ;

         this.body.velocity.x = +500;

    };
    Avatar.prototype.moveLeft = function () {


        this.body.velocity.x = -500;
    };
    Avatar.prototype.moveUp = function () {
        this.body.velocity.y = -500;
    };
    Avatar.prototype.moveDown = function () {
        this.body.velocity.y = +1000;
    };
    Avatar.prototype.stop = function () {

        // Need Slippery motion before stopping
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        // this.animations.stop('move');
		this.animations.stop('moveGun');
		
        this.animations.play('blink', 10);

    };


    Avatar.prototype.electrify = function ()
    {
        // TODO: Show electrify animations overlaid on pixos
    };


}


// ACTION
Avatar.prototype.shootBullet = function (type) {


};

// INTERACTION
Avatar.prototype.getHit = function(amount){

this.health-=amount;

};


Avatar.prototype.healthUP = function(amount){

    // this.health += amount;
    // tween or tint red a little bit
    // play hit sound

};

Avatar.prototype.energyUP = function(amount){

    this.energy += amount;
    // tween or tint red a little bit
    // play energy sound

};

Avatar.prototype.explode = function(){

    // Explode Animation

    // this.kill();

    // explosion.tint = ;
    this.explosion.x = this.x ;
    this.explosion.y = this.y ;

    this.explosion.height-=130;
    this.explosion.width-=130;

    this.explosion.anchor.setTo(0.5, 0.5);

    this.explosion.visible = true ;
    this.explosion.play('boom', 15, false, true);


};

// UPDATE
Avatar.prototype.update = function(){




};




