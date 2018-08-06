var initState = {
	init: function() {
		game.input.maxPointers = 1;
		game.renderer.renderSession.roundPixels = false;
		game.state.backgroundColor = "white";
	},
	preload: function() {
		game.load.image('loading', 'assets/loading.png');
	},
	create: function() {
		game.state.start('load');
	}
}