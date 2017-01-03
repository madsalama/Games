/**
 * Created by mahmoud.ali on 12/18/2014.
 */



// SCORE TEXT
// HOW MANY COLLECTED ITEMS
// HOW FAR I AM FROM BOSS



function HUD(game, player) {

    this.game = game;
    this.pixos = player;
    this.group = game.add.group();
    this.group.enableBody = true;
    this.group.physicsBodyType = Phaser.Physics.ARCADE;
    this.group.setAll('outOfBoundsKill', true);
    this.group.setAll('checkWorldBounds', true);
    var energy = 0 ;

    // this.game.liveText.fontSize = '15px';
    // this.game.liveText.x = energy.x - 4 ;
    // this.game.liveText.y = energy.y + energy.height / 2 + 10;

}

HUD.prototype.constructor = HUD;


HUD.prototype.dummyTween = function(delay, callBack){
    var dummy = 0;
    var a = this.game.add.tween(dummy);
    a.to({ }, delay, Phaser.Easing.Linear.Out);
    a.onComplete.add(callBack, this);
    a.start();
};

HUD.prototype.restoreTint = function(){
    this.game.livesText.tint = 0xffffff;
};

HUD.prototype.createEnergyStatus = function(){
    // Energy status
    {
        // 3 ENERGY LEVELS ( 3 SPRITES )
        energy = this.game.add.sprite(50, 50, '5');
        energy.anchor.setTo(0.5, 0.5);

        energy.angle+= 30;

        energy.height -= 85;
        energy.width -= 80;

        this.game.energyText = this.game.add.bitmapText(
            500, 100, '8bit', '' + collectedItems
        );

        this.game.energyText.fontSize = '15px';
        this.game.energyText.x = energy.x - 4 ;
        this.game.energyText.y = energy.y + energy.height / 2 + 10;
    }
};
HUD.prototype.createScoreStatus = function(){    // Score
    {
        this.game.scoreText = this.game.add.bitmapText(
            this.game.world.width-200,30, '8bit', "SCORE " + score);
        this.game.scoreText.visible = true  ;
        this.game.scoreText.fontSize='15px';
    }};
HUD.prototype.createLevelStatus = function(){    // Score
    {
        this.game.levelText = this.game.add.bitmapText(
            this.game.world.width-200,50, '8bit', 'LEVEL ' +level+"-10");
        this.game.levelText.visible = true  ;
        this.game.levelText.fontSize='15px';
    }};
HUD.prototype.createLivesStatus = function(){
    // Energy status
    {

        this.game.livesText = this.game.add.bitmapText(
            this.game.world.width-200,70, '8bit', 'LIVES  ' +lives);
        this.game.livesText.visible = true  ;
        this.game.livesText.fontSize='15px';


        // this.game.liveText.fontSize = '15px';
        // this.game.liveText.x = energy.x - 4 ;
        // this.game.liveText.y = energy.y + energy.height / 2 + 10;
    }
};

HUD.prototype.createHealthStatus = function(){
    this.game.healthText = this.game.add.bitmapText(
        100,50, '8bit', 'ENERGY ' + pixos.energy);
    this.game.healthText.visible = true  ;
    this.game.healthText.fontSize='15px';

};

HUD.prototype.warnHealth = function(){
    this.game.healthText.tint = 0xff0000;
};

HUD.prototype.restoreHealtWarn = function(){
    this.game.healthText.tint = 0xffffff;
};

HUD.prototype.tweenElement = function(element){

    if (element == 'energy'){

        this.game.add.tween(energy)
            .to( {y: energy.y+10}, 50, Phaser.Easing.Linear.In)
            .to( { y: energy.y}, 50, Phaser.Easing.Linear.In)

            .to( {x: 50, y: 50}, 50, Phaser.Easing.Linear.Out)
            .start();

    }

    else if (element == 'energyText'){

        this.game.add.tween(this.game.healthText)
            .to( {x: this.game.healthText.x-3, y: this.game.healthText.y+3}, 50, Phaser.Easing.Linear.In)
            .to( {x: this.game.healthText.x+3, y: this.game.healthText.y}, 50, Phaser.Easing.Linear.In)
            .to( {x: 100, y: 50}, 50 + energy.height / 2 + 10, Phaser.Easing.Linear.Out)
            .start();
    }

    else if (element == 'scoreText'){

    }

    else if (element == 'lifeText'){
        this.game.add.tween(this.game.livesText)
            .to( {x: this.game.livesText.x-10, y: this.game.livesText.y+30}, 50, Phaser.Easing.Linear.In)
            .to( {x: this.game.livesText.x+10, y: this.game.livesText.y}, 50, Phaser.Easing.Linear.In)
            .to( {x: this.game.livesText.x, y: this.game.livesText.y}, 50 + energy.height / 2 + 10, Phaser.Easing.Linear.Out)
            .start();

        this.game.livesText.setText("LIVES  "+lives);

        this.game.livesText.tint = 0xff0000;
        this.dummyTween(150,this.restoreTint);

    }







};






HUD.prototype.updateText = function(text){

// Check which text of the HUD, update value.
// To be called on change ONLY in main game.
    if (text=='score'){
        this.game.scoreText.setText('SCORE ' + score) ;
    }

    else if (text == 'energy') {
        this.game.energyText.setText('' + collectedItems)
    }

    if (text == 'level')
        this.game.levelText.setText("LEVEL "+ level + "-10") ;

    if (text == 'health')
    {
        this.game.healthText.setText("ENERGY "+ pixos.energy ) ;

    }




};

HUD.prototype.createStreamingText = function(x,y, string, speed,size){

    var index = 0;
    var localString = "";

    this.charsfx = this.game.add.audio('charsfx');

    size = size || '15px' ;

    var text = this.game.streamingText = this.game.add.bitmapText(
        x, y, '8bit', ""
    );

    this.game.streamingText.fontSize = size ;

    this.game.streamingTimer = this.game.time.create(false);
    busy = true ;
    this.game.streamingTimer
        .loop(speed, function(){
        // Append character at current position to text


            if (!(string.charAt(index) === " " ) && cutSceneWatched )
                this.charsfx.play('',1,15,false);

            localString= localString.concat(string.charAt(index));
            this.game.streamingText.setText(localString);
            index++;

            if (index == string.length)
            {
                this.game.streamingTimer.destroy();
                busy = false ;
            }

            // DESTROY TIMER

    }, this);
    this.game.streamingTimer.start();

    return text ;
};



HUD.prototype.update = function(){

    // shake elements/ animate with action

};

HUD.prototype.addText = function(name,x,y,text,font){

    this.game.name = this.game.add.bitmapText(
        x, y, font, text
    );
    this.game.name.visible = true  ;
    this.game.name.fontSize = '20px';

};

HUD.prototype.uptateText = function(text) {
    // var n = ''+name ;
    this.game.scoreText.setText(text) ;
};



/**
 *
 *
 * // TERRIBLE IDEA ( WILL GO TOO FAST AND WILL NOT MAKE REQUIRED EFFECT !!! )
 *  for (i=0;i<string.length;i++) {
 *  this.game.talkText.appendText(String[i])
 *  }
 *
 * //
 *
 *
 *  var String = "HERE IS A GAME THAT I MADE BECAUSE I WAS BORED AT WORK"
 *
 * Timer... each 100mS time....
 * append text, increment index counter
 * But if index counter == length
 * STOP timer !
 *
 *
 *
 *
 *
 * **/




