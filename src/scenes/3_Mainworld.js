import { KCON } from "./controllers/_Keyboard_Controller";

export default class Mainworld extends Phaser.Scene {
  	constructor() {
    	super("Mainworld");
  	}

  	create() {
		this.players = {}; // A map of all players in room
		this.player = null; // A ref to this client's player
		this.playerID = this.registry.gameRoom.sessionId; // This client's playerID (sessionId)

		KCON.initialize(this)

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
                    sprite.setData('serverX', player.x); //update will call and error out if we don't set it asap
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

		this.registry.gameRoom.send('input', {
			up: KCON.MoveUP(),
			left: KCON.MoveLEFT(),
			down: KCON.MoveDOWN(),
			right: KCON.MoveRIGHT()
		});
		let velocity = 2

		if (KCON.MoveLEFT()) {
			this.player.x -= velocity;

		} else if (KCON.MoveRIGHT()) {
			this.player.x += velocity;
		}

		if (KCON.MoveUP()) {
			this.player.y -= velocity;

		} else if (KCON.MoveDOWN()) {
			this.player.y += velocity;
		}

        for (let sessionId in this.players) {

			if(sessionId == this.playerID){
				continue
			}
            // interpolate all player entities
            const entity = this.players[sessionId];
            const { serverX, serverY } = entity.data.values;

            entity.x = Phaser.Math.Linear(entity.x, serverX, 0.2);
            entity.y = Phaser.Math.Linear(entity.y, serverY, 0.2);
        }
  	}

}
