
var Mods = require('/modules');
var $$ = require(Mods.styles);

module.exports = function(args) {
	var level = args.level;
	var fish = args.fish;
	var lose_function = args.cb_lose;
	var eat_function = args.cb_eat;
	
	var size = 15 + level * 10;
	var speed = 4 + level * 1;
	switch (level) {
		case 0:
			var color = 'red';
			break;
		case 1:
			var color = 'purple';
			break;
		case 2:
			var color = 'green';
			break;
		case 3:
			var color = 'yellow';
			break;
		case 4:
			var color = 'orange';
			break;
	}
	
	var random = Math.floor((Math.random() * (Ti.Platform.displayCaps.platformHeight - size)));
	
	var enemy = Ti.UI.createView({
		width:size,
		height:size,
		top:random,
		left:-1 * size,
		backgroundColor:color
	});
	
	var side = Math.floor(Math.random() * 2);
	
	switch (side) {
		case 0:
			enemy.left = -1 * size;
			break;
		case 1:
			enemy.left = Ti.Platform.displayCaps.platformWidth + 1;
			speed *= -1;
			break;
	}
	
	move(enemy.left);
	
	function move(left) {
		
		if (enemy.left > fish.left - size && enemy.left < fish.left + fish.width && enemy.top > fish.top - size && enemy.top < fish.top + fish.height) {
			
			if (enemy.width < fish.width) {
				enemy.parent.remove(enemy);
				Ti.API.info('enemy down!');
				eat_function(level);
			} else {
				lose_function();
			}
			
		} else {
		
			enemy.animate({
				left: left + speed,
				duration:10
			}, function() {
				enemy.left = left + speed;
				if (enemy.left > Ti.Platform.displayCaps.platformWidth || enemy.left < -1 * size - 1) {
					enemy.parent.remove(enemy);
					Ti.API.info('enemy out');
				} else {
					move(left + speed);
				}
			});
			
		}
		
	}
	
	return enemy;
	
}
