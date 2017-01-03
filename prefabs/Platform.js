/**
 * Created by mahmoud.ali on 12/17/2014.
 */

function Platform(game,spriteTag,x,y) {
    // Initialize Player
    this.game = game;
    Phaser.Sprite.call(this,game,x,y,spriteTag);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;


    game.physics.arcade.enable(this);


}

Platform.prototype = Object.create(Phaser.Sprite.prototype);
Platform.prototype.constructor = Platform;

Platform.prototype.update= function(){

};
Platform.prototype.moveRight = function () {
        this.body.velocity.x = +1000; };
Platform.prototype.moveLeft = function () {
        this.body.velocity.x = -1200;



};
Platform.prototype.stopMoving = function () {
    this.body.velocity.x = 0;
};





