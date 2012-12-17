
var Mods = require('/modules');
var $$ = require(Mods.styles);

module.exports = function(args) {
	
	var level = args.level;
	var fish = args.fish;
	var lose_function = args.cb_lose;
	var eat_function = args.cb_eat;
	
	var totalWidth = Ti.Platform.displayCaps.platformWidth;
	
	var parentWin = args.win;
	
	var size = 25 + level * 10;
	var speed = 2 + level * 0.5;
	speed *= 1000;
	
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
	
	parentWin.addEventListener('close', function() {
		parentWin.remove(enemy);
		enemy = null;
	});
	
	switch (side) {
		case 0:
			enemy.left = -1 * size;
			var end = totalWidth + 1;
			break;
		case 1:
			enemy.left = totalWidth + 1;
			speed *= -1;
			var end = -1 * size;
			break;
	}
	
	//move(enemy.left);
	
	enemy.animate({left:end, duration:5000, curve:Ti.UI.ANIMATION_CURVE_LINEAR}, function() {
		parentWin.remove(enemy);
		enemy = null;
		Ti.API.info('enemy out');
	});
	
	var interval = setInterval(function() {
		//Ti.API.info(enemy.animatedCenterPoint);
		Ti.API.info(JSON.stringify(enemy.rect));
	}, 100);
	
	function move(left) {
		
		if (enemy === null) {
			return;
		}
		
		enemy.animate({
			left: left + speed,
			duration:10000
		}, function() {
			
			if (enemy === null) {
				return;
			}
			
			enemy._left = left + speed;
			
			if (enemy._left > fish.left - size && enemy._left < fish.left + fish.width && enemy.top > fish.top - size + 5 && enemy.top < fish.top + fish.height - 5) {
				if (enemy.width < fish.width) {
					Ti.API.info('enemy down!');
					//enemy.parent.remove(enemy);
					parentWin.remove(enemy);
					eat_function(level);
				} else {
					lose_function();
				}
				return;
			}
			
			if (enemy._left > totalWidth || enemy._left < -1 * size - 5) {
				//enemy.parent.remove(enemy);
				args.win.remove(enemy);
				Ti.API.info('enemy out');
			} else {
				//setTimeout(function() {
					move(left + speed);
				//}, 10);
			}
			
		});
		
	}
	
	return enemy;
	
}
