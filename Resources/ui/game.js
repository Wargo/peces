
var Mods = require('/modules');
var $$ = require(Mods.styles);

var MyFish = require(Mods.fish);
var MyEnemy = require(Mods.enemy);

module.exports = function() {
	
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
	
	points = Ti.UI.createLabel({
		bottom:5,
		left:5,
		color:'white',
		text:0
	});
	
	win.add(points);
	
	var fish = new MyFish();
	
	win.add(fish);
	
	function loseFunction() {
		alert('Has perdido!');
		win.close();
	}
	
	function eatFunction(level) {
		var currentpoints = parseInt(points.text) + 1;
		if (currentpoints == 10) {
			fish.width = parseInt(fish.width) + 10;
			fish.height = parseInt(fish.height) + 10;
			points.text = 0;
		} else {
			points.text = currentpoints;
		}
		
	}
	
	var interval = setInterval(function() {
		
		var random = Math.floor(Math.random() * 5);
		
		var enemy = new MyEnemy({
			level:random,
			fish:fish,
			cb_lose:loseFunction,
			cb_eat:eatFunction
		});
		
		win.add(enemy);
		
	}, 2000);
	
	win.addEventListener('close', function() {
		clearInterval(interval);
	});
	
	return win;
	
}
