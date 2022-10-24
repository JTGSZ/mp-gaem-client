var KCON = {
    KeyW: null,
    KeyA: null,
    KeyS: null,
    KeyD: null,

    KeyX: null,

    KeyUP: null,
    KeyDOWN: null,
    KeyLEFT: null,
    KeyRIGHT: null,

    initialize(passed_scene){
        this.KeyW = passed_scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.KeyA = passed_scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.KeyS = passed_scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.KeyD = passed_scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        this.KeyUP = passed_scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.KeyDOWN = passed_scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.KeyLEFT = passed_scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.KeyRIGHT = passed_scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.KeyX = passed_scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    },
    MoveUP(){
        if(this.KeyUP.isDown || this.KeyW.isDown){
            return true
        }
    },
    MoveDOWN(){
        if(this.KeyDOWN.isDown || this.KeyS.isDown){
            return true
        }
    },
    MoveLEFT(){
        if(this.KeyLEFT.isDown || this.KeyA.isDown){
            return true
        }
    },
    MoveRIGHT(){
        if(this.KeyRIGHT.isDown || this.KeyD.isDown){
            return true
        }
    },
    attackDOWN(){
        if(this.KeyX.isDown) {
            return true
        }
    },
}

export default { KCON }
export { KCON }