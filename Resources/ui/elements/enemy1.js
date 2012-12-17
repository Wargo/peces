
module.exports = function(level) {
	
	var size = 25 + level * 10;
	
	var randomTop = Math.floor((Math.random() * (Ti.Platform.displayCaps.platformHeight - size)));
	
	var enemy = world.addBody(Ti.UI.createView({
		backgroundColor: "red",
		width: size,
		height: size,
		left: 10,
		top: randomTop
	}), {
		density: 12.0,
		friction: 0.3,
		restitution: 0.4,
		type: "dynamic"
	});
	
	enemy._size = size;
	enemy.fixedRotation = true;
	
	enemy.setLinearVelocity([6 + level * 2, 0]);
	
}
