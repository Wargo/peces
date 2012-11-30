
var Mods = require('/modules');
var $$ = require(Mods.styles);

module.exports = function() {
	
	var fish = Ti.UI.createView({
		backgroundColor:'blue',
		top:Ti.Platform.displayCaps.platformHeight/2 - 10,
		left:Ti.Platform.displayCaps.platformWidth/2 - 10,
		width:20,
		height:20
	});
	
	var lastTime = new Date().getTime();
	var last_x = 0;
	var last_y = 0;
	var offset = 10;
	var filter = 1;
	var speed = 100;
	
	Ti.Accelerometer.addEventListener('update', function(e) {
		
		var now = new Date().getTime();
		
		if (lastTime + offset < now) {
			
			last_x = e.x * filter + last_x * (1 - filter);
			last_y = e.y * filter + last_y * (1 - filter);
			
			fish.animate({
				top: fish.top - (last_x * speed),
				left: fish.left - (last_y * speed),
				duration:200
			}, function () {
				fish.top -= (last_x * speed);
				fish.left -= (last_y * speed);
			});
			
			lastTime = now;
			
		}
		
	});
	
	return fish;
	
}
