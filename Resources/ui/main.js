
var Mods = require('/modules');
var $$ = require(Mods.styles);

var MyGame = require(Mods.game);

module.exports = function() {
	
	var win = Ti.UI.createWindow($$.win);
	win.backgroundImage = 'ui/images/bg.jpg';
	
	var view = Ti.UI.createView({
		backgroundColor:'#5FFF'
	});
	
	win.add(view);
	
	var startButton = Ti.UI.createButton({
		title:'Start',
		left:20,
		bottom:20,
		backgroundImage:'none',
		color:'yellow',
		font:{fontFamily:'Noteworthy', fontSize:40, fontWeight:'bold'}
	});
	
	win.add(startButton);
	
	var you = Ti.UI.createImageView({
		image:'ui/images/you.png',
		right:0,
		top:10
	});
	win.add(you);
	
	startButton.addEventListener('click', function() {
		MyGame().open({opacity:1});
	});
	
	return win;
	
}
