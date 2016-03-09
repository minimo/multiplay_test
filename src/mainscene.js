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

        this.objLayer = phina.display.DisplayElement().addChildTo(this);

        this.objects = app.firebase.child("objects");
        this.id = this.objects.push({
            type: "player",
            name: "test",
            age: 0,
        });
        this.key = this.id.key();

        this.player = multi.Player("You")
            .addChildTo(this.objLayer)
            .setPosition(SC_W*0.2, SC_H*0.5);
        this.player.firebase = multi.FireBaseSender(this.id).attachTo(this.player);
/*
        var that = this;
        this.objects.on("child_added", function(snap) {
            var key = snap.key();
            if (that.key != key) {
                var val = snap.val();
                if (val.type == "player") {
                    var e = multi.Player("").addChildTo(that.objLayer);
                    e.enemy = true;
                    e.setStatus(e);
                    that.enemies[key] = e;
                }
                if (val.type == "shot" && that.key != val.id) {
                    var s = multi.Shot(val.id).addChildTo(that.objLayer);
                    s.host = false;
                    s.setStatus(e);
                    that.shots[key] = s;
                }
            }
        });
        this.objects.on("child_changed", function(snap) {
            var key = snap.key();
            if (that.key != key) {
                var val = snap.val();
                if (val.type == "player") {
                    var e = that.enemies[key];
                    if (e) {
                        e.setStatus(val);
                    }
                }
                if (val.type == "shot" && that.key != val.id) {
                    var s = that.shots[key];
                    if (s) {
                        s.setStatus(val);
                    }
                }
            }
        });
        this.objects.on("child_removed", function(snap) {
            var key = snap.key();
            if (that.key != key) {
                var val = snap.val();
                if (val.type == "player") {
                    var e = that.enemies[key];
                    if (e) {
                        e.remove();
                        delete that.enemies[key];
                    }
                }
                if (val.type == "shot" && that.key != val.id) {
                    var e = that.enemies[key];
                    if (e) {
                        e.remove();
                        delete that.enemies[key];
                    }
                }
            }
        });
*/
        this.enemies = [];
        this.shots = [];

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
                key: this.key,
                x: p.x,
                y: p.y,
                vx: -3*p.sprite.scaleX,
                vy: 0,
            }
            this.enterShot(param);
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.9;
        p.vy += 0.9;

/*
        var obj = {
            x: p.x,
            y: p.y,
            scaleX: p.sprite.scaleX,
            age: this.time,
        };
        this.id.update(obj);
*/
        this.time++;
    },

    enterShot: function(param) {
        var s = multi.Shot(param.key).addChildTo(this)
            .setPosition(param.x, param.y)
            .setVelocity(param.vx, param.vy);
        s.id = this.objects.push({
            type: "shot",
            id: param.key,
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
/*
        this.children.forEach(function(c) {
            c.remove();
        });
*/
        var len = this.children.length;
        for (var i = 0; i < len; i++) {
            var ch = this.children[i];
            ch.remove();
        }
    },
});
