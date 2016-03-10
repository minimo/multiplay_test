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

        //オブジェクト管理レイヤ
        this.objLayer = phina.display.DisplayElement().addChildTo(this);

        //Firebase接続
        this.objects = app.firebase.child("objects");

        //プレイヤーID取得
        this.id = this.objects.push({
            type: "player",
            name: "test",
            age: 0,
            x: SC_W*0.5,
            y: SC_H*0.5,
        });
        this.key = this.id.key();
        this.player = multi.Player(this.id, "You", false)
            .addChildTo(this.objLayer)
            .setPosition(SC_W*0.2, SC_H*0.5);

        var that = this;
        this.objects.on("child_added", function(snap) {
            var key = snap.key();
            if (that.key != key) {
                var val = snap.val();
                if (val.type == "player") {
                    var id = that.objects.child(key);
                    var e = multi.Player(id, "", true).addChildTo(that.objLayer);
                    e.setStatus(e);
                }
            }
        });
        this.objects.on("child_removed", function(snap) {
            var key = snap.key();
            this.objLayer.children.forEach(function(c) {
                if (key == c.key) c.remove();
            });
        }.bind(this));

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
        var len = this.objLayer.children.length;
        for (var i = 0; i < len; i++) {
            this.objLayer.children[i].remove();
        }
    },
});
