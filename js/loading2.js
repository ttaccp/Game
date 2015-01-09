cc.LoaderScene2 = cc.Scene.extend({
    _interval : null,
    _label : null,
    _className:"LoaderScene2",
    init : function(){
        var self = this;
        var logoWidth = 160;
        var logoHeight = 200;
        var bgLayer = self._bgLayer = new cc.LayerColor(cc.color(0, 0, 0, 255));
        self.addChild(bgLayer, 0);
        var fontSize = 14, lblHeight =  -logoHeight / 2 + 100;
        
        var label = self._label = new cc.LabelTTF("0%", "Arial", fontSize);
        label.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, lblHeight)));
        label.setColor(cc.color(255, 255, 255));
        bgLayer.addChild(this._label, 10);
        return true;
    },
    onEnter: function () {
        var self = this;
        cc.Node.prototype.onEnter.call(self);
        self.schedule(self._startLoading, 0.3);
    },
    onExit: function () {
        cc.Node.prototype.onExit.call(this);
        var tmpStr = "0%";
        this._label.setString(tmpStr);
    },
    initWithResources: function (resources, cb) {
        if(cc.isString(resources))
            resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
    },
    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        cc.loader.load(res,
            function (result, count, loadedCount) {
                var percent = (++loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                self._label.setString(percent + "%");
            }, function () {
                if (self.cb)
                    self.cb();
            });
    }
});
cc.LoaderScene2.preload = function(resources, cb){
    var _cc = cc;
    if(!_cc.loaderScene2) {
        _cc.loaderScene2 = new cc.LoaderScene2();
        _cc.loaderScene2.init();
    }
    _cc.loaderScene2.initWithResources(resources, cb);
    cc.director.runScene(_cc.loaderScene2);
    return _cc.loaderScene2;
};