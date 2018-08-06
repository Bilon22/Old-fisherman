var width = screen.width;
var height = screen.height;

var scale = width/100;


console.log(scale, width);

var loadState = {
	preload: function() {
		loading = game.add.sprite(0, 0, 'loading');
		loading.scale.setTo(scale, scale);
		loading.smoothed = false;
		
		game.load.image('shelf', 'assets/shelf2.png');
		game.load.image('sunMoon', 'assets/sunMoon.png');
		game.load.image('night', 'assets/night.png');
		game.load.image('bcg', 'assets/bcg.png');
		game.load.spritesheet('bar', 'assets/barSheet.png', 70, 13, 12);
		game.load.spritesheet('icon', 'assets/icons.png', 11, 14, 15);
		game.load.spritesheet('smartIcons', 'assets/phone/icons.png', 25, 25, 16);
		game.load.spritesheet('fish', 'assets/fish.png', 49, 49, 7);
		game.load.spritesheet('button', 'assets/button.png', 13, 13, 4);
		game.load.spritesheet('clouds', 'assets/clouds.png', 25, 15, 16);
		game.load.image('rod', 'assets/rod.png');
//		game.load.image('fish', 'assets/fish.png');
		game.load.image('vein', 'assets/vein.png');
		game.load.image('popup', 'assets/popup.png');

		//smartphone
		game.load.image('smartScreen', 'assets/phone/startScreen.png');
		game.load.image('smart', 'assets/phone/smart.png');
	},
	create: function() {
		game.state.start('play');
	}
}