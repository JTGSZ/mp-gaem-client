import { Client } from "colyseus.js";

export default class Starto extends Phaser.Scene {
	constructor() {
		super("Startup");
	}
	
	preload() {
		// Load any assets here from your assets directory
		
	}

	create() {
		this.add.text(10, 10, "Click to join.", {
		color: '#FFF',
		fontFamily: 'monospace',
		fontSize: 18
		}).setOrigin(0, 0);

		this.registry.gameClient = new Client('ws://localhost:2567');

		this.input.on('pointerdown', async () => {
		const room = await this.registry.gameClient.joinOrCreate("my_room");
		this.registry.gameRoom = room;

		this.scene.start('Mainworld');
		});
	}
}