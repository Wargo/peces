
var Mods = require('/modules');
var $$ = require(Mods.styles);

module.exports = function(args) {
	var level = args.level;
	var fish = args.fish;
	var lose_function = args.cb_lose;
	var eat_function = args.cb_eat;
	
	var size = 15 + level * 10;
	var speed = 5 + level * 2;
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
	
	var random = Math.floor((Math.random() * (320 - size)));
	
	var enemy = Ti.UI.createView({
		width:size,
		height:size,
		top:random,
		left:-1 * size,
		backgroundColor:color
	});
	
	move(enemy.left);
	
	function move(left) {
		
		if (enemy.left > fish.left - 20 && enemy.left < fish.left + 20 && enemy.top > fish.top - 20 && enemy.top < fish.top + 20) {
			
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
				duration:50
			}, function() {
				enemy.left = left + speed;
				if (enemy.left > Ti.Platform.displayCaps.platformWidth) {
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
