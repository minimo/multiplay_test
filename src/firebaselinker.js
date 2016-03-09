/*
 *  FireBaseLinker.js
 *  2014/09/05
 *  @auther minimo  
 *  This Program is MIT license.
 */


phina.define("multi.FireBaseReceiver", {
    superClass: "phina.accessory.Accessory",

    init: function(firebase) {
        this.superInit();
        this.firebase = firebase;

        //firebaseと情報を同期
        this.firebase.on('child_changed', function(snap) {
            if (snap.key() === this.key) {
                var v = snap.val();
                this.target.x = v.x;
                this.target.y = v.y;
            }
        }.bind(this));
    },
});

phina.define("multi.FireBaseSender", {
    superClass: "phina.accessory.Accessory",

    data: null,

    init: function(firebase) {
        this.superInit();
        this.firebase = firebase;
    },

    update: function() {
        this.firebase.update({
            x: this.target.x,
            y: this.target.y,
        });
    },

    setSendData: function(data) {
        this.data = data || {};
    },

    remove: function() {
        this.target.detach(this);
        this.target = null;
        this.firebase.remove();
    },
});
