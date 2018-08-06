var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser-example');

game.state.add('init', initState);
game.state.add('load', loadState);
game.state.add('play', playState);

game.state.start('init');