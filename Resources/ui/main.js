
var Mods = require('/modules');
var $$ = require(Mods.styles);

var MyGame = require(Mods.game);

module.exports = function() {
	
	var win = Ti.UI.createWindow($$.win);
	
	var startButton = Ti.UI.createButton({
		title:'Start'
	});
	
	win.add(startButton);
	
	startButton.addEventListener('click', function() {
		MyGame().open({opacity:1});
	});
	
	return win;
	
}
