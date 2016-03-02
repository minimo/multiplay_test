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
        this.players = this.firebase.child("players");

        this.player = multi.Player("You")
            .addChildTo(this)
            .setPosition(SC_W*0.2, SC_H*0.5);

        this.id = this.players.push({
            type: "player",
            name: "test",
            age: 0,
        });
        this.key = this.id.key();

        var that = this;
        this.firebase.child("players").on("child_added", function(snap) {
            var key = snap.key();
            if (that.key != key) {
                var val = snap.val();
                if (val.type == "player") {
                    var e = multi.Player("").addChildTo(that);
                    e.enemy = true;
                    e.setStatus(e);
                    that.enemies[key] = e;
                }
                if (val.type == "shot") {
                }
            }
        });
        this.firebase.child("players").on("child_changed", function(snap) {
            var key = snap.key();
            if (that.key != key) {
                var val = snap.val();
                if (val.type == "player") {
                    var e = that.enemies[key];
                    if (e) {
                        e.setStatus(val);
                    }
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

        this.enemies = [];

        this.time = 0;
    },
    
    update: function(app) {
        //プレイヤー操作
        var p  = this.player;
        var kb = app.keyboard;
        if (kb.getKey("left")) {
            p.vx = -5;
            p.sprite.scaleX = 2;
        }
        if (kb.getKey("right")) {
            p.vx = 5;
            p.sprite.scaleX = -2;
        }
        if (kb.getKey("up") && !p.jump) {
            p.vy = -20;
            p.jump = true;
        }
        if (kb.getKeyDown("space")) {
            var param = {
                x: p.x,
                y: p.y,
            }
            this.enterShot();
        }

        var obj = {
            x: p.x,
            y: p.y,
            scaleX: p.sprite.scaleX,
            age: this.time,
        };
        this.id.update(obj);
        this.time++;
    },

    enterShot: function(param) {
        param = param.$safe({
            x: SC_W*0.5,
            y: SC_H*0.5,
            vx: 1,
            vy: 0,
        });
        var s = multi.Shot().addChildTo(this)
            .setPosition(param.x, param.y)
            .setVelocity(param.vx, param.vx);

        s.id = this.shots.push({
            type: "shot",
            id: this.key,
            age: 0,
            x: param.x,
            y: param.y,
        });
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
