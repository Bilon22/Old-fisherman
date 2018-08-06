var scale = width/100;
var time = 12000;
var weather = "rain";
var rotation = 1;
var caught = 0;
var distance = 0;
var tension = 0;
var rolling = false;
var phoneOn = -1;
var vein;
var bcg;
var barE;
var barS;
var rod;
var shelf;
var fish;
var button;
var smart;
var clouds = [];
var cloudsObj = [];
var bck;

function cloud(number){
	this.number = number;
	this.speed = null;
	this.type = null;
	this.color = null;
		
	this.create = function(){
		clouds[number] = game.add.sprite(Math.floor(Math.random() * width * 2), Math.floor(Math.random() * height * 0.4), 'clouds');
		clouds[number].scale.setTo(5*scale, 2*scale);
		clouds[number].smoothed = false;
		clouds[number].frame = Math.floor(Math.random() * 16);
		clouds[number].tint = 0xfbc36a;
	};
	this.recreate = function(){
		clouds[number].x = Math.floor(Math.random() * width)+ width;
		clouds[number].y = Math.floor(Math.random() * height * 0.4);
		this.speed = Math.random() * 0.5 + 0.1;
		this.type = Math.floor(Math.random() * 16);
	    this.color = null;
		clouds[number].frame = Math.floor(Math.random() * 16);
		console.log("now");
	};
	this.generate = function(){
		this.speed = Math.random() * 0.5 + 0.1;
		this.type = Math.floor(Math.random() * 16);
	    this.color = null;
		this.create();
	};
	this.move = function(){
		clouds[number].x -= this.speed;
		if(clouds[number].x < -400) this.recreate();
	}
}

console.log(scale, width);

var playState = {
	create: function() {
		game.stage.backgroundColor = 'rgb(246, 164, 98)';
		
//		sunMoon = game.add.sprite(width/2, height, 'sunMoon');
//		sunMoon.scale.setTo(scale, scale);
//		sunMoon.anchor.set(0.5);
//		sunMoon.smoothed = false;
		
		cloudsGenerate();
		
		bcg = game.add.sprite(0, height - 93*scale, 'bcg');
		bcg.scale.setTo(scale, scale);
		bcg.anchor.set(0, 0.5);
		bcg.smoothed = false;
		bcg.tint = 	0xef5656;

		rod = game.add.sprite(21*scale, height-63*scale, 'rod');
		rod.anchor.set(0, 1);
		rod.scale.setTo(scale, scale);
		rod.smoothed = false;
		rod.tint = 0xffffff * Math.random();

		vein = game.add.sprite(38*scale, height-83*scale, 'vein');
		vein.scale.setTo(1, scale*16);
		vein.smoothed = false;
		vein.tint = 0xffffff * Math.random();
		veinClose = game.add.tween(vein.scale).to( { x: 1, y:1 }, 2000, "Quart.easeOut");
		veinUp = game.add.tween(vein.scale).to( { x: 1, y:scale*16 }, 2000, "Quart.easeOut");
		
		fish = game.add.sprite(39*scale, height, 'fish');
		fish.anchor.set(0, 0.5);
		fish.scale.setTo(scale/2, scale/2);
		fish.smoothed = false;
		fish.angle = 90;
		fish.frame = 1;
		fishTake = game.add.tween(fish).to( { y: height-83*scale }, 1000, "Quart.easeOut");
		fishOut = game.add.tween(fish).to( { x: - width, angle: 1080 }, 3000, "Quart.easeOut");
		
		fishShow = game.add.tween(fish).to( { x: width*0.5, y: height*0.5, angle: 0 }, 1500, "Quart.easeOut");

		shelf = game.add.sprite(0, height, 'shelf');
		shelf.anchor.set(0, 1);
		shelf.scale.setTo(scale, scale);
		shelf.smoothed = false;
		
		game.input.onDown.add(function() {
			rolling = true;
		});
		game.input.onUp.add(function() {
			rolling = false;
		});
		
		night = game.add.sprite(0, 0, 'night');
		night.scale.setTo(scale, scale);
		night.smoothed = false;
		night.alpha = 0;
		goNight = game.add.tween(night).to( { alpha: 0.7 }, 5000, "Quart.easeOut");
		goDay = game.add.tween(night).to( { alpha: 0 }, 5000, "Quart.easeOut");
		
		guiCreate();
		smartCreate();
	},
	update: function(){
		if(caught == 0) fishing();
		if(caught == 1) fishRun();
		if(caught == 2) fightWithFish();
		if(caught == 3) breakVein();
		if(caught == 4) takingOut();
		if(caught == 5) retire();
		cloudsGo();
		timeChange();
	}
}