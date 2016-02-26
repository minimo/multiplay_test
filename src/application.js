/*
 *  Application.js
 *  2015/09/09
 *  @auther minimo  
 *  This Program is MIT license.
 */

multi = {};

phina.define("multi.Application", {
    superClass: "phina.display.CanvasApp",

	_static: {
        version: "0.0.1",
        assets: {
            "preload": {
                image: {
                    "player": "assets/hiyocos.png",
                },
                sound: {
                },
                font: {
                    "azuki": "fonts/azuki.ttf",
                }
            },
            "common": {
            },
        },
    },

    _member: {
        //バックグラウンドカラー
        backgroundColor: 'rgba(0, 0, 0, 1)',
    },

    init: function() {
        this.superInit({
            query: '#world',
            width: SC_W,
            height: SC_H,
        });
        this.$extend(this._member);

        this.fps = 60;

        //設定情報の読み込み
        this.loadConfig();

        this.replaceScene(multi.SceneFlow());
    },

    update: function() {
        this.mouse.update();
        this.touch.update();
        this.touchList.update();
        this.keyboard.update();
    },

    _onLoadAssets: function() {
    },

    //設定データの保存
    saveConfig: function() {
        return this;
    },

    //設定データの読み込み
    loadConfig: function() {
        return this;
    },
});
