
var Mods = require('/modules');
var $$ = require(Mods.styles);

module.exports = function() {
	
	var size = 30;
	
	var fish = Ti.UI.createView({
		//backgroundColor:'blue',
		backgroundImage:'ui/images/player_0.png',
		top:Ti.Platform.displayCaps.platformHeight / 2 - size / 2,
		left:Ti.Platform.displayCaps.platformWidth / 2 - size / 2,
		width:size,
		height:size
	});
	
	var lastTime = new Date().getTime();
	var now = new Date().getTime();
	var last_x = 0;
	var last_y = 0;
	var top = 0;
	var left = 0;
	var offset = 10;
	var filter = 1;
	var speed = 100;
	
	Ti.Accelerometer.addEventListener('update', function(e) {
		
		now = new Date().getTime();
		
		if (lastTime + offset < now) {
			
			last_x = e.x * filter + last_x * (1 - filter);
			last_y = e.y * filter + last_y * (1 - filter);
			
			top = fish.top - (last_x * speed);
			left = fish.left - (last_y * speed);
			
			if (top > Ti.Platform.displayCaps.platformHeight - fish.width) {
				top = Ti.Platform.displayCaps.platformHeight - fish.width;
			}
			if (top <= 0) {
				top = 0;
			}
			
			if (left >= Ti.Platform.displayCaps.platformWidth - fish.width) {
				left = Ti.Platform.displayCaps.platformWidth - fish.width;
			}
			if (left <= 0) {
				left = 0;
			}
			
			if (left > fish.left) {
				fish.backgroundImage = 'ui/images/player_0.png';
			} else {
				fish.backgroundImage = 'ui/images/player_1.png';
			}
			
			fish.animate({
				top: top, //fish.top - (last_x * speed),
				left: left, //fish.left - (last_y * speed),
				duration:200
			}, function () {
				//fish.top -= (last_x * speed);
				//fish.left -= (last_y * speed);
				fish.top = top;
				fish.left = left;
			});
			
			lastTime = now;
			
			//label1.text = fish.top - (last_x * speed);
			//label2.text = fish.left - (last_y * speed);
			
		}
		
	});
	
	return fish;
	
}
