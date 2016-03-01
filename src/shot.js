/*
 *  shot.js
 *  2014/09/05
 *  @auther minimo  
 *  This Program is MIT license.
 */

phina.define("multi.Shot", {
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

    init: function(id, vx) {
        this.superInit();

        this.id = id || "unkwon";
        this.tweener.setUpdateType('fps');

        this.sprite = phina.display.Sprite("shot", 16, 32)
            .addChildTo(this)
            .setFrameIndex(1)
            .setScale(2.0)
            .setRotation(90);
        if (vx < 0) this.sprite.scaleX = -2;

        //当り判定設定
        this.boundingType = "circle";
        this.radius = 16;

        this.vx = vx || 8;
        this.vy = 0;

        this.time = 0;
    },

    update: function(app) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -32 || this.x > SC_W+32) {
            this.remove();
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

    setVelocity: function(x, y) {
        this.vx = x;
        this.vy = y;
    },
});
