/*
 *  player.js
 *  2014/09/05
 *  @auther minimo  
 *  This Program is MIT license.
 */

phina.define("pbr.Player", {
    superClass: "phina.display.DisplayElement",

    init: function() {
        this.superInit();

        this.tweener.setUpdateType('fps');

        this.sprite = phina.display.Sprite("player", 48, 48)
            .addChildTo(this)
            .setFrameIndex(0);

        //当り判定設定
        this.boundingType = "circle";
        this.radius = 32;

        this.time = 0;
        return this;
    },

    update: function(app) {
        if (this.control) {
            var kb = app.keyboard;

            //移動
            if (kb.getKeyDown("left")) this.vx = -4;
            if (kb.getKeyDown("right")) this.vx = -4;

            //ジャンプ
            if (kb.getKeyDown("space")) {
                this.vy += 10;
            }

            //移動範囲の制限
            this.x = Math.clamp(this.x, 16, SC_W-16);
            this.y = Math.clamp(this.y, 16, SC_H-16);
        }
        this.time++;
    },

    damage: function() {
    },
});
