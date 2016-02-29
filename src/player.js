/*
 *  player.js
 *  2014/09/05
 *  @auther minimo  
 *  This Program is MIT license.
 */

phina.define("multi.Player", {
    superClass: "phina.display.DisplayElement",

    labelParam: {
        fill: "white",
        stroke: "blue",
        strokeWidth: 2,

        fontFamily: "azuki",
        align: "center",
        baseline: "middle",
        fontSize: 32,
        fontWeight: ''
    },

    init: function(name, enemy) {
        this.superInit();
        name = name || "unknown";
        this.enemy = enemy || false;

        this.tweener.setUpdateType('fps');

        this.sprite = phina.display.Sprite("player", 32, 32)
            .addChildTo(this)
            .setFrameIndex(0)
            .setScale(2.0);
        this.name = phina.display.Label({text: name}.$safe(this.labelParam))
            .addChildTo(this)
            .setPosition(0, -32);

        //当り判定設定
        this.boundingType = "circle";
        this.radius = 32;

        this.vx = 0;
        this.vy = 0;
        this.jump = false;

        this.time = 0;
    },

    update: function(app) {
        if (this.time % 5 == 0) {
            this.sprite.frameIndex += 1;
            this.sprite.frameIndex = this.sprite.frameIndex%3+1
        }

        if (this.enemy) {
            this.time++;
            return;
        }

        //操作
        var kb = app.keyboard;
        if (kb.getKey("left")) {
            this.vx = -4;
            this.sprite.scaleX = 2;
        }
        if (kb.getKey("right")) {
            this.vx = 4;
            this.sprite.scaleX = -2;
        }
        if (kb.getKey("up") && !this.jump) {
            this.vy = -20;
            this.jump = true;
        }
        if (kb.getKeyDown("space")) {
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.9;
        this.vy += 0.9;

        //移動範囲の制限
        this.x = Math.clamp(this.x, 16, SC_W-16);
        if (this.y > SC_H*0.7) {
            this.jump = false;
            this.y = SC_H*0.7;
        }

        this.time++;
    },

    damage: function() {
    },

    setStatus: function(val) {
        this.x = val.x;
        this.y = val.y;
        this.sprite.scaleX = val.scaleX;
    },
});
