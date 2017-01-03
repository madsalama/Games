/**
 * Created by mahmoud.ali on 12/17/2014.
 */

function Enemy(game,spriteTag,x,y,player, platform, floating) {

    this.player = player ;
    this.platform = platform;
    this.floating = floating ;
    this.game = game ;
    this.spriteTag = spriteTag ;
    this.done = false ;

    this.health = 0 ;

    var enemy = this ;  // Set scope !

    this.done = false ;
    Phaser.Sprite.call(this,game,x,y,spriteTag);    // "Enemy" IS-A "Sprite"
                                                    // & must inherit all its properties
    game.physics.arcade.enable(this);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.anchor.setTo(0.5, 0.5);

switch (spriteTag) {
    case 'enemy':
        this.height-=45;
        this.width-=60;
        this.body.setSize(this.body.width-40, this.body.height );
        break;

    case 'enemy0':
        this.height-=10;
        this.width-=50;
        this.body.setSize(this.body.width-60, this.body.height);
        break;

    case 'enemy1':
        this.height-=80;
        this.width-=80;
        this.body.setSize(this.body.width - 80, this.body.height - 50);
        break;

    case 'enemy2':
        this.height-=120;
        this.width-=120;
        this.body.setSize(this.body.width - 100, this.body.height - 100);
        break;

    case 'enemy3':
        this.height-=20;
        this.width-=20;
        this.body.setSize(this.body.width-70, this.body.height-30);
        break;


    case 'enemy5':
        this.height-=80;
        this.width-=80;
        // this.body.setSize(this.width, this.height, this.x , this.y);
        this.body.setSize(this.body.width - 100, this.body.height - 50);
        break;
}

    this.animations.add('move');
    this.animations.play('move', 10 ,true);


    if (spriteTag == 'enemy'){
        this.game.time.events.repeat(1000, 2000,
            function() {
                enemy.body.velocity.y = 20*Math.sin(this.game.time.now);
            }, this);
    }




}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);      // new Sprite


Enemy.prototype.slowMo = function(){
  this.body.velocity.x = 0 ;
};

Enemy.prototype.resumeMoving = function(){
    this.body.velocity.x = -400 ;
};

Enemy.prototype.restoreTint = function(){

    // alert ("tint restored");
};

Enemy.prototype.update= function(){

    var dist = distance(this.x,this.y,this.player.x,this.player.y);

    if ( dist < (300 + 10*level) && !this.done && level > 6 )
    {
        this.body.velocity.x -= 500;

        if (pixos.y + (pixos.height/2) < this.y)
         this.body.velocity.y -= 100;

        else
            this.body.velocity.y += 100;

        this.done = true ;

    }

};

