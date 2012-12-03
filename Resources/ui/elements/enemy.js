
var Mods = require('/modules');
var $$ = require(Mods.styles);

module.exports = function(args) {
	var level = args.level;
	var fish = args.fish;
	var lose_function = args.cb_lose;
	var eat_function = args.cb_eat;
	
	var size = 25 + level * 10;
	var speed = 5 + level * 1.1;
	
	if (Ti.Platform.osname == 'ipad') {
		speed *= 2;
	}
	
	var side = Math.floor(Math.random() * 2);
	
	switch (level) {
		case 0:
			var color = 'red';
			var image = 'ui/images/enemy1_' + side + '.png';
			break;
		case 1:
			var color = 'purple';
			var image = 'ui/images/enemy2_' + side + '.png';
			break;
		case 2:
			var color = 'green';
			var image = 'ui/images/enemy3_' + side + '.png';
			break;
		case 3:
			var color = 'yellow';
			var image = 'ui/images/enemy4_' + side + '.png';
			break;
		case 4:
			var color = 'orange';
			var image = 'ui/images/enemy5_' + side + '.png';
			break;
	}
	
	var random = Math.floor((Math.random() * (Ti.Platform.displayCaps.platformHeight - size)));
	
	var enemy = Ti.UI.createView({
		width:size,
		height:size,
		top:random,
		left:-1 * size,
		//backgroundColor:color,
		backgroundImage:image
	});
	
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
		
		enemy.animate({
			left: left + speed,
			duration:10
		}, function() {
			
			enemy.left = left + speed;
			
			if (enemy.left > fish.left - size && enemy.left < fish.left + fish.width && enemy.top > fish.top - size + 5 && enemy.top < fish.top + fish.height - 5) {
				if (enemy.width < fish.width) {
					Ti.API.info('enemy down!');
					enemy.parent.remove(enemy);
					eat_function(level);
				} else {
					lose_function();
				}
			}
			
			if (enemy.left > Ti.Platform.displayCaps.platformWidth || enemy.left < -1 * size - 1) {
				enemy.parent.remove(enemy);
				Ti.API.info('enemy out');
			} else {
				move(left + speed);
			}
			
		});
		
	}
	
	return enemy;
	
}
