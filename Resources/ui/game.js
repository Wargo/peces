
var Mods = require('/modules');
var $$ = require(Mods.styles);

var MyFish = require(Mods.fish);
var MyEnemy = require(Mods.enemy);

module.exports = function(animate) {
	
	var win = Ti.UI.createWindow($$.win);
	win.opacity = 0;
	
	var close = Ti.UI.createButton({
		title:'cerrar',
		top:5,right:5
	});
	win.add(close);
	close.addEventListener('click', function() {
		win.close();
	});
	
	var fish = new MyFish();
	
	win.add(fish);
	
	function loseFunction() {
		alert('Has perdido!');
		win.close();
	}
	
	var interval = setInterval(function() {
		
		var random = Math.floor(Math.random() * 2);
		
		var enemy = new MyEnemy(random, fish, loseFunction);
		
		win.add(enemy);
		
	}, 2000);
	
	win.addEventListener('close', function() {
		clearInterval(interval);
	});
	
	return win;
	
}
