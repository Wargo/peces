/*
(function() {
	
	var Mods = require('/modules');
	
	var Main = require(Mods.game);
	
	new Main().open();
	
})();
*/


var Mods = require('/modules');
var $$ = require(Mods.styles);

var Box2D = require('ti.box2d');
//var MyFish = require(Mods.fish);
//var MyEnemy = require(Mods.enemy);
var loadEnemy = require(Mods.enemy);

	
	var win = Ti.UI.createWindow($$.win);
	
	var view = Ti.UI.createView();
	
	win.add(view);
	win.open();
	
	var world = Box2D.createWorld(view);
	
	var size = 30;
	
	var fish = Ti.UI.createView({
		backgroundImage:'ui/images/player_0.png',
		top:Ti.Platform.displayCaps.platformHeight / 2 - size / 2,
		left:Ti.Platform.displayCaps.platformWidth / 2 - size / 2,
		width:size,
		height:size,
	});
	var player = world.addBody(fish, {
		radius: 15,
		density: 12.0,
		friction: 0.3,
		restitution: 0.4,
		type: "dynamic"
	});
	player._size = size;
	player.fixedRotation = true;
	
	var level = 0;
	
	var interval = setInterval(function() {
		
		level = Math.floor(Math.random() * 3);
		loadEnemy(level)
		
	}, 2000);
	
	var wall1 = world.addBody(Ti.UI.createView({
		backgroundColor:'transparent',
		width:1,
		left:0
	}), {
		density:12.0,
		friction:0.3,
		restitution:0.4,
		type:'static'
	});
	var wall2 = world.addBody(Ti.UI.createView({
		backgroundColor:'transparent',
		height:1,
		bottom:0
	}), {
		density:12.0,
		friction:0.3,
		restitution:0.4,
		type:'static'
	});
	var wall3 = world.addBody(Ti.UI.createView({
		backgroundColor:'transparent',
		height:1,
		top:0
	}), {
		density:12.0,
		friction:0.3,
		restitution:0.4,
		type:'static'
	});
	var wall4 = world.addBody(Ti.UI.createView({
		backgroundColor:'transparent',
		width:1,
		right:0
	}), {
		density:12.0,
		friction:0.3,
		restitution:0.4,
		type:'static'
	});
	wall1._isWall = wall2._isWall = wall3._isWall = wall4._isWall = true;
	
	world.addEventListener("collision", function(e) {
		Ti.API.info('collision');
		if ((e.a._isWall || e.b._isWall) && e.phase == "begin") {
			if (e.a != player && e.b != player) {
				if (e.a._isWall) {
					world.destroyBody(e.b);
				} else {
					world.destroyBody(e.a);
				}
			}
			return;
		}
		if ((e.a == player || e.b == player) && e.phase == "begin") {
			if (e.a._size > e.b._size) {
				if (e.a == player) {
					world.destroyBody(e.b);
				} else {
					alert('Has perdido');
				}
			} else {
				if (e.b == player) {
					world.destroyBody(e.a);
				} else {
					alert('Has perdido');
				}
			}
			Ti.Media.vibrate();
		}
	});
	
	Ti.Accelerometer.addEventListener('update', function(e) {
		if (e.y > 0) {
			fish.backgroundImage = 'ui/images/player_1.png';
		} else {
			fish.backgroundImage = 'ui/images/player_0.png';
		}
		player.applyLinearImpulse([e.y * -150, e.x * 150], [0, 0]);
	});
	
	world.setGravity(0, 0);
	
	world.start();