
// Original code by Rich Davey, thanks man !!

var Bullet = function (game, key) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;


    this.anchor.set(0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.tracking = false;
    this.scaleSpeed = 0;



};
Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;
Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {


    gx = gx || 0;
    gy = gy || 0;

    this.reset(x, y);
    this.scale.set(1);

    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

    this.angle = angle;

    this.body.gravity.set(gx, gy);

    this.height-=35;
    this.width-=35;
    this.tint = 0xffa500;
};
Bullet.prototype.update = function () {


      // this.angle+= 25;

    if (this.tracking)
    {
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }

    if (this.scaleSpeed > 0)
    {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
    }

};



var Partic = function (game, key) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
    this.anchor.set(0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.tracking = false;
    this.scaleSpeed = 0;

};
Partic.prototype = Object.create(Phaser.Sprite.prototype);
Partic.prototype.constructor = Partic;
Partic.prototype.fire = function (x, y, angle, speed, gx, gy) {


    gx = gx || 0;
    gy = gy || 0;

    this.reset(x, y);
    this.scale.set(1);

    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

    this.angle = angle;

    this.body.gravity.set(gx, gy);

    this.height-=30;
    this.width-=30;
};
Partic.prototype.update = function (){

    if (this.tracking)
    {
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }

    if (this.scaleSpeed > 0)
    {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
    }

};


var Weapon = {};

Weapon.SingleBullet = function (game) {

    Phaser.Group.call(this, game, game.world, 'Single Bullet', true, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 1500;
    this.fireRate = 100;

    this.setAll('outOfBoundsKill', true);
    this.setAll('checkWorldBounds', true);

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'myBullet'), true);
    }

    return this;

};
Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;
Weapon.SingleBullet.prototype.fire = function (source) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 10;
    var y = source.y + 10;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;

};


Weapon.EightWay = function (game) {

    Phaser.Group.call(this, game, game.world, 'Eight Way', true, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;

    this.setAll('outOfBoundsKill', true);
    this.setAll('checkWorldBounds', true);

    for (var i = 0; i < 96; i++)
    {
        this.add(new Partic(game, 'orange'), true);
    }

    return this;

};
Weapon.EightWay.prototype = Object.create(Phaser.Group.prototype);
Weapon.EightWay.prototype.constructor = Weapon.EightWay;
Weapon.EightWay.prototype.fire = function (source,gy) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 16;
    var y = source.y + 10;

    gy = gy || 0 ;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 45, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 135, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 180, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 225, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 315, this.bulletSpeed, 0, gy);



    this.nextFire = this.game.time.time + this.fireRate;

};


Weapon.EightWayEnemy = function (game) {

    Phaser.Group.call(this, game, game.world, 'Eight Way', true, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;

    this.setAll('outOfBoundsKill', true);
    this.setAll('checkWorldBounds', true);

    for (var i = 0; i < 96; i++)
    {
        this.add(new Partic(game, 'explosion'), true);

    }

    return this;

};
Weapon.EightWayEnemy.prototype = Object.create(Phaser.Group.prototype);
Weapon.EightWayEnemy.prototype.constructor = Weapon.EightWay;
Weapon.EightWayEnemy.prototype.fire = function (source,gy) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 16;
    var y = source.y + 10;

    gy = gy || 0 ;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 45, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 135, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 180, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 225, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 315, this.bulletSpeed, 0, gy);



    this.nextFire = this.game.time.time + this.fireRate;

};


Weapon.EightWaySelfDeath = function (game) {

    Phaser.Group.call(this, game, game.world, 'Eight Way', true, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;

    this.setAll('outOfBoundsKill', true);
    this.setAll('checkWorldBounds', true);

    for (var i = 0; i < 96; i++)
    {
        this.add(new Bullet(game, 'cyan'), true);
    }

    return this;

};
Weapon.EightWaySelfDeath.prototype = Object.create(Phaser.Group.prototype);
Weapon.EightWaySelfDeath.prototype.constructor = Weapon.EightWay;
Weapon.EightWaySelfDeath.prototype.fire = function (source,gy) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 16;
    var y = source.y + 10;

    gy = gy || 0 ;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 45, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 135, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 180, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 225, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 0, gy);
    this.getFirstExists(false).fire(x, y, 315, this.bulletSpeed, 0, gy);



    this.nextFire = this.game.time.time + this.fireRate;

};

