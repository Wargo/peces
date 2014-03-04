
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
		right:20,
		bottom:20,
		backgroundImage:'none',
		color:'yellow',
		font:{fontFamily:'Noteworthy', fontSize:40, fontWeight:'bold'},
		opacity:0
	});
	win.add(startButton);
	
	var you = Ti.UI.createImageView({
		image:'ui/images/you.png',
		left:10,
		top:10,
		opacity:0,
		height:300,
		width:264
	});
	win.add(you);
	
	var enemies = Ti.UI.createImageView({
		image:'ui/images/enemies.png',
		height:230,
		width:198,
		right:10,
		top:10,
		opacity:0
	});
	win.add(enemies);
	
	startButton.addEventListener('click', function() {
		MyGame().open({opacity:1});
	});
	
	setTimeout(function() {
		you.animate({opacity:1});
	}, 1000);
	setTimeout(function() {
		enemies.animate({opacity:1});
	}, 3000);
	setTimeout(function() {
		startButton.animate({opacity:1});
	}, 5000);
	
	return win;
	
};