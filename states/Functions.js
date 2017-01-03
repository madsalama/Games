
// ANIMATION =

// create N instances of the sprite
// each instance is layed upon a straight line between (original location & final location)
// each instance is gradually has less alpha than the other one ( significantly less alpha - ghosting effect )
// Then they all move towards ( behind ) new location of the sprite and then destruct.

var mySpriteList = [];

function motionTrail(game, trails, spriteTag, x, y , loop, height, width, sprite  ){


    var i ;
    // Creates a list of sprites with slightly gradient alpha
    // And adds a time-shifted tween to each one of them.


    for (i = 0; i < trails; i++) {
        mySpriteList[i] = game.add.sprite(x, y, spriteTag );

        mySpriteList[i].height = height ;
        mySpriteList[i].width = width ;
        mySpriteList[i].alpha = 0.1;
        game.physics.arcade.enable(mySpriteList[i]);

        if (i!=0)
            mySpriteList[i].alpha = i-0.5;


        var tween = game.add.tween(mySpriteList[i])
            .to({y: mySpriteList[i].y + 100, x:sprite.x  },
            300 - 10*i , Phaser.Easing.Linear.In)
            .to({y: mySpriteList[i].y -100, x:sprite.x },
            300 - 10*i, Phaser.Easing.Linear.Out)
            .start();

        var sp = mySpriteList[i];


        tween.onComplete.add(
            function spKILL(){
                sp.kill();
            }
    );

    }

    {






    }

    var score = 5000 ;
    // INCREASE VIEW COUNT "SEE HOW MANY PEOPLE ACTUALLY GOT PASSED THE LOADING SCREEN"
    var updateSAPI = "http://127.0.0.1:1337/updateTopScore?score="+score;
    // var params = JSON.stringify({ score: 5000 });

    function updateTopScore(){
        var req = new XMLHttpRequest();
        req.open("GET",updateSAPI , true);
        req.send();  // Enter Parameters here @send(*)
    }
    updateTopScore();


}
















