
var Mods = require('/modules');
var $$ = require(Mods.styles);

var MyGame = require(Mods.game);

module.exports = function() {

	var win = Ti.UI.createWindow($$.win);
	
	var view = Ti.UI.createScrollView({
		layout:'vertical',
		contentHeight:'auto',
		showVerticalScrollIndicator:true
	});
	
	v_offset = Ti.UI.createTextField({
		value:100,
		top:20,
		right:20,
		left:20,
		backgroundColor:'white'
	});
	
	v_speed = Ti.UI.createTextField({
		value:40,
		top:20,
		right:20,
		left:20,
		backgroundColor:'white'
	});
	
	v_filter = Ti.UI.createTextField({
		value:1,
		top:20,
		right:20,
		left:20,
		backgroundColor:'white'
	});
	
	v_duration = Ti.UI.createTextField({
		value:100,
		top:20,
		right:20,
		left:20,
		backgroundColor:'white'
	});
	
	var start0 = Ti.UI.createButton({
		title:'Start unanimated',
		top:20
	});
	var start1 = Ti.UI.createButton({
		title:'Start animated',
		top:20
	});
	var start2 = Ti.UI.createButton({
		title:'Sin complete',
		top:20
	});
	var start3 = Ti.UI.createButton({
		title:'Sin right',
		top:20
	});
	var start4 = Ti.UI.createButton({
		title:'Sin complete sin right',
		top:20
	});
	var start5 = Ti.UI.createButton({
		title:'Sin left',
		top:20
	});
	var start6 = Ti.UI.createButton({
		title:'Sin complete sin left',
		top:20
	});
	
	view.add(v_offset);
	view.add(v_speed);
	view.add(v_filter);
	view.add(v_duration);
	view.add(start0);
	view.add(start1);
	view.add(start2);
	view.add(start3);
	view.add(start4);
	view.add(start5);
	view.add(start6);
	
	start0.addEventListener('click', function() {
		MyGame(0).open({opacity:1});
	});
	start1.addEventListener('click', function() {
		MyGame(1).open({opacity:1});
	});
	start2.addEventListener('click', function() {
		MyGame(2).open({opacity:1});
	});
	start3.addEventListener('click', function() {
		MyGame(3).open({opacity:1});
	});
	start4.addEventListener('click', function() {
		MyGame(4).open({opacity:1});
	});
	start5.addEventListener('click', function() {
		MyGame(5).open({opacity:1});
	});
	start6.addEventListener('click', function() {
		MyGame(6).open({opacity:1});
	});
	
	win.add(view);
	
	return win;
	
};


			switch (animate) {
				case 0:
					fish.left += (last_x * speed);
					fish.top -= (last_y * speed);
					break;
				case 1:
					fish.animate({
						left: fish.left + (last_x * speed),
						top: fish.top - (last_y * speed),
						duration:parseInt(v_duration.value)
					}, function () {
						fish.left += (last_x * speed);
						fish.top -= (last_y * speed);
					});
					break;
				case 2:
					fish.animate({
						left: fish.left + (last_x * speed),
						top: fish.top - (last_y * speed),
						duration:parseInt(v_duration.value)
					});
					break;
				case 3:
					fish.animate({
						left: fish.left + (last_x * speed),
						//top: fish.top - (last_y * speed),
						duration:parseInt(v_duration.value)
					}, function () {
						fish.left += (last_x * speed);
						fish.top -= (last_y * speed);
					});
					break;
				case 4:
					fish.animate({
						left: fish.left + (last_x * speed),
						//top: fish.top - (last_y * speed),
						duration:parseInt(v_duration.value)
					});
					break;
				case 5:
					fish.animate({
						//left: fish.left + (last_x * speed),
						top: fish.top - (last_y * speed),
						duration:parseInt(v_duration.value)
					}, function () {
						fish.left += (last_x * speed);
						fish.top -= (last_y * speed);
					});
					break;
				case 6:
					fish.animate({
						//left: fish.left + (last_x * speed),
						top: fish.top - (last_y * speed),
						duration:parseInt(v_duration.value)
					});
					break;
			}