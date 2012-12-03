
var Mods = require('/modules');
var $$ = require(Mods.styles);

var MyFish = require(Mods.fish);
var MyEnemy = require(Mods.enemy);

module.exports = function() {
	
	var win = Ti.UI.createWindow($$.win);
	win.opacity = 0;
	win.backgroundImage = 'ui/images/bg.jpg';
	
	var close = Ti.UI.createButton({
		title:'Cerrar',
		top:5,right:5,
		backgroundImage:'none'
	});
	win.add(close);
	close.addEventListener('click', function() {
		var dialog = Ti.UI.createAlertDialog({
			title:'Cerrar',
			message:'¿Seguro que deseas abandonar la partida?',
			buttonNames:['Sí', 'No'],
			cancel:1
		});
		
		dialog.show();
		
		dialog.addEventListener('click', function(e) {
			if (e.index === 0) {
				win.close();
			}
		});
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
		
		var audio = Ti.Media.createSound({
			url:'ui/sounds/rot.mp3',
			time:1
		});
		audio.play();
		
		var currentpoints = parseInt(points.text) + 1;
		if (currentpoints == 10) {
			fish.width = parseInt(fish.width) + 10;
			fish.height = parseInt(fish.height) + 10;
			points.text = 0;
			if (fish.width == 90) {
				alert('Win!');
				win.close();
			}
		} else {
			points.text = currentpoints;
		}
		
	}
	
	var interval = setInterval(function() {
		
		var random = Math.floor(Math.random() * 5);
		
		var enemy = new MyEnemy({
			level:0,
			fish:fish,
			cb_lose:loseFunction,
			cb_eat:eatFunction
		});
		
		win.add(enemy);
		
	}, 800);
	
	win.addEventListener('close', function() {
		clearInterval(interval);
	});
	
	return win;
	
}
