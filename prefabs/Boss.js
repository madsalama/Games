
// BOSS IS-A *Group* of *4x sprites* each have *health*.
// BOSS *Group* behaves according to a simple AI.

function Boss(game, player) {


    Phaser.Group.call(this, game, game.world, 'BOSS', true, true, Phaser.Physics.ARCADE);
    this.setAll('outOfBoundsKill', true);
    this.setAll('checkWorldBounds', true);
    this.anchor.setTo(0.5, 0.5);

    this.player = player ;
    this.game = game ;

    // Create THREE enemies
    // Add each to the "ENEMY" group
    //

}

Boss.prototype.constructor = Boss;

Boss.prototype.update= function(){

    // AI = ROTATES TO EXPOSE BLUE (AS LITTLE AS POSSIBLE)

};

