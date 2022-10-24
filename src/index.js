import './main.css';
import Phaser, {Game} from 'phaser';

import Preload_my_shit_up_fam from './scenes/1_Preload';
import Starto from './scenes/2_Start';
import Mainworld from './scenes/3_Mainworld';

const canvas = document.getElementById('game-canvas');

const config = {
	type: Phaser.WEBGL,
	width: 800,
	height: 600,
	canvas,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { 						
				x: 0,
				y: 0 
			},
			debug: true
		}
	},
	scene: [
		Preload_my_shit_up_fam,
		Starto,
		Mainworld
	]
};

const game = new Game(config);