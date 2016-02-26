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

        this.firebase = new Firebase("https://multiplaytest.firebaseio.com/");
        this.firebase.child("players").on("child_added", this.child_added);
        this.firebase.child("players").on("child_changed", this.child_changed);
        this.firebase.child("players").on("child_removed", this.child_removed);

        this.id = this.firebase.child("players").push({
            name: "test",
            age: 0,
        });

        this.player = multi.Player("you")
            .addChildTo(this)
            .setPosition(SC_W*0.2, SC_H*0.5);

        this.enemies = [];

        this.time = 0;
    },
    
    update: function(app) {
        var p  = this.player;
        var obj = {
            x: ~~p.x,
            y: ~~p.y,
            scaleX: p.sprite.scaleX,
            age: this.time,
        };
        this.id.update(obj);
        this.time++;
    },

    child_added: function(snap) {
        var key = snap.key();
        if (this.id.key() != key) {
            var val = snap.val();
            var e = multi.Player("enemy").addChildTo(this);
            e.setStatus(e);
            this.enemies[key] = e;
        }
    },

    child_changed: function(snap) {
        var key = snap.key();
        if (this.id.key() != key) {
            var e = this.enemies[key];
            var val = snap.val();
            e.setStatus(val);
        }
    },
    child_removed: function(snap) {
        var key = snap.key();
        if (this.id.key() != key) {
            var val = snap.val();
        }
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
