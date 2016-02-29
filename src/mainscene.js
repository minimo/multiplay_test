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

        this.ref = this.firebase.child("players");

        this.id = this.ref.push({
            name: "test",
            age: 0,
        });
        this.key = this.id.key();

        var that = this;
        this.firebase.child("players").on("child_added", function(snap) {
            var key = snap.key();
            if (that.key != key) {
                var val = snap.val();
                var e = multi.Player("").addChildTo(that);
                e.enemy = true;
                e.setStatus(e);
                that.enemies[key] = e;
            }
        });
        this.firebase.child("players").on("child_changed", function(snap) {
            var key = snap.key();
            if (that.key != key) {
                var val = snap.val();
                var e = that.enemies[key];
                if (e) {
                    e.setStatus(val);
                }
            }
        });
        this.firebase.child("players").on("child_removed", function(snap) {
            var key = snap.key();
            if (that.key != key) {
                var val = snap.val();
                var e = that.enemies[key];
                if (e) {
                    e.remove();
                    delete that.enemies[key];
                }
            }
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

    //タッチorクリック開始処理
    onpointstart: function(e) {
    },

    //タッチorクリック移動処理
    onpointmove: function(e) {
    },

    //タッチorクリック終了処理
    onpointend: function(e) {
    },

    //終了時処理
    unload: function(e) {
        this.id.remove();
    },
});
