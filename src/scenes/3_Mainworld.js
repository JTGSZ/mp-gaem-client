export default class Mainworld extends Phaser.Scene {
  	constructor() {
    	super("Mainworld");
  	}

  	create() {
		this.players = {}; // A map of all players in room
		this.player = null; // A ref to this client's player
		this.playerID = this.registry.gameRoom.sessionId; // This client's playerID (sessionId)

		this.keys = this.input.keyboard.addKeys({
			up: 'W',
			down: 'S',
			left: 'A',
			right: 'D'
		});
        this.registry.gameRoom.state.on
    	this.registry.gameRoom.onStateChange((state) => {
			state.players.forEach((player, sessionId) => {
				const playerSpawned = (typeof this.players[sessionId] !== 'undefined');

				// Update existing player
				if (playerSpawned) {
                    let sprite = this.players[sessionId]
                    sprite.setData('serverX', player.x); //Cache the data on it
                    sprite.setData('serverY', player.y);
                    //sprite.setPosition(player.x, player.y);
				}else{
			        // Initial player spawn
                    let sprite = this.add.sprite(player.x, player.y, 'human');
					this.players[sessionId] = sprite
                    sprite.setData('serverX', player.x); //Cache the data on it
                    sprite.setData('serverY', player.y);

					if(sessionId === this.playerID){
						this.player = this.players[sessionId];
						//this.cameras.main.startFollow(this.player);
					}
				}
      		});

			// Remove any players who have left
			Object.keys(this.players).forEach((key) => {
				if (typeof state.players.get(key) === 'undefined') {
					this.players[key].destroy();
					delete this.players[key];
				}
			});
    	});

    // Zoom the camera out
    this.cameras.main.setZoom(1);
  	}

  	update(time, delta){
		const {up, left, down, right} = this.keys;

		this.registry.gameRoom.send('input', {
			up: up.isDown,
			left: left.isDown,
			down: down.isDown,
			right: right.isDown
		});
        for (let sessionId in this.players) {
            // interpolate all player entities
            const entity = this.players[sessionId];
            const { serverX, serverY } = entity.data.values;

            entity.x = Phaser.Math.Linear(entity.x, serverX, 0.2);
            entity.y = Phaser.Math.Linear(entity.y, serverY, 0.2);
        }
  	}

}
