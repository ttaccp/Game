var Game = (function() {

	var _imgList = {
		ch: [] // 陈赫
	};

	var _StartScene = cc.Scene.extend({
		onEnter: function() {
			this._super();

			var size = cc.director.getWinSize();
			var author = cc.LabelTTF.create("作者QQ: 1003696235", "Arial", 12);
			author.attr({
				anchorX:  0,
				anchorY: 0,
				x: size.width - author.width,
				y: 0
			});
//			this.addChild(author);
			
			var title = new cc.LabelTTF.create('雷霆战机', '微软雅黑', 26);
			title.setPosition(size.width / 2, size.height - title.height);
			this.addChild(title);
		}
	});

	var self = {
		StartScene: _StartScene,
		tool: {
			getImgListByKey: function(key) {
				var res = _imgList[key];
				if (key && res instanceof Array) {
					res = [];
					for (var i = 0; i < 3; i++) {
						for (var j = 0; j < 4; j++) {
							res.push('img/ch/' + j + '_' + i + '.png');
						}
					}
				}
				return res;
			}
		}

	};
	return self;
})();