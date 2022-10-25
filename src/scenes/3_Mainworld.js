import { KCON } from "./controllers/_Keyboard_Controller";

export default class Mainworld extends Phaser.Scene {
  	constructor() {
    	super("Mainworld");
  	}

  	create() {
		this.players = {}; // A map of all players in room
		this.player = null; // A ref to this client's player
		this.playerID = this.registry.gameRoom.sessionId; // This client's playerID (sessionId)
		this.collisiongroup = []

		this.debugrectangles = {}

		KCON.initialize(this)
		this.physics.add.collider(this.collisiongroup)

        //this.registry.gameRoom.state.on
		//this.registry.gameRoom.onA
    	this.registry.gameRoom.onStateChange((state) => {
			state.players.forEach((player, sessionId) => {
				const playerSpawned = (typeof this.players[sessionId] !== 'undefined');
				//console.log(state)
				// Update existing player
				if (playerSpawned) {
                    let sprite = this.players[sessionId]
                    sprite.setData('serverX', player.x); //Cache the data on it
                    sprite.setData('serverY', player.y);

                    //sprite.setPosition(player.x, player.y);
				}else{
			        // Initial player spawn
                    let sprite = this.physics.add.sprite(player.x, player.y, 'human');
					sprite.healthbar = this.makeBar(20, 100, 0x2ecc71);

					this.collisiongroup.push(sprite)

					this.players[sessionId] = sprite
                    sprite.setData('serverX', player.x); //update will call and error out if we don't set it asap
                    sprite.setData('serverY', player.y);

					let debugrectangle = this.add.rectangle(0, 0, sprite.width, sprite.height);
					debugrectangle.setStrokeStyle(1, 0xff0000);
					this.debugrectangles[sessionId] = debugrectangle

					if(sessionId === this.playerID){
						this.player = this.players[sessionId];
						        // remoteRef is being used for debug only
        				
       		 			
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
    makeBar(x, y,color) {
        //draw the bar
        let bar = this.add.graphics();

        //color the bar
        bar.fillStyle(color, 1);

        //fill the bar with a rectangle
        bar.fillRect(0, 0, 64, 16);
        
        //position the bar
        bar.x = x;
        bar.y = y;

        //return the bar
        return bar;
    }
    setValue(bar, percentage) {
        //scale the bar
        bar.scaleX = percentage/100;
    }
  	update(time, delta){

		this.registry.gameRoom.send('input', {
			up: KCON.MoveUP(),
			left: KCON.MoveLEFT(),
			down: KCON.MoveDOWN(),
			right: KCON.MoveRIGHT(),
			attack: KCON.attackDOWN()
		});
		/*
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
		*/
        for (let sessionId in this.players) {
			const entity = this.players[sessionId];
			const debugrectangle = this.debugrectangles[sessionId]


			//if(sessionId == this.playerID){
			//	continue
			//}
            // interpolate all player entities
            
            const { serverX, serverY } = entity.data.values;

			debugrectangle.x = serverX
			debugrectangle.y = serverY

			var smoothed_x = Phaser.Math.Linear(entity.x, serverX, 0.2);
			var smoothed_y = Phaser.Math.Linear(entity.y, serverY, 0.2);
            entity.x = smoothed_x
            entity.y = smoothed_y
			entity.healthbar.x = smoothed_x - 25
			entity.healthbar.y = smoothed_y - 38
        }
  	}

}
