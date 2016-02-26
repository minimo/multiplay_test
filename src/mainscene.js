/*
 *  MainScene.js
 *  2015/09/08
 *  @auther minimo  
 *  This Program is MIT license.
 */

phina.define("multi.MainScene", {
    superClass: "phina.display.DisplayScene",

    init: function() {
        this.superInit();

        this.firebase = new Firebase("https://shining-torch-6870.firebaseio.com/");
        this.firebase.child("players").on("child_added", this.addPlayer);

        this.firebase.child("players").set({
            "testplayer": {
                ID: 1,
                name: "test",
                age: 0,
            },
        });
        this.firebase.child("players").set({
            "testplayer2": {
                ID: 1,
                name: "test2",
                age: 0,
            },
        });


        this.player = multi.Player()
            .addChildTo(this)
            .setPosition(SC_W*0.2, SC_H*0.5);
            
        this.time = 0;
    },
    
    update: function(app) {
        var msg = "time = "+this.time;
//        this.firebase.child('players').child("testplayer").update({ID: 0, name:"test", age: msg});
        this.time++;
    },

    addPlayer: function(e) {
    },

    //タッチorクリック開始処理
    onpointstart: function(e) {
    },

    //タッチorクリック移動処理
    onpointmove: function(e) {
    },

    //タッチorクリック終了処理
    onpointend: function(e) {
    },
});
