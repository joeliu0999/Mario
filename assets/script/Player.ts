// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Node)
    mushroom: cc.Node = null;

    private Up: boolean = false;
    private Left: boolean = false;
    private Right: boolean = false;
    private isDead: boolean = false;
    private onGround: boolean = false;
    private rigidBody: cc.RigidBody = null;

    private jumpAudio: cc.AudioSource = null;
    private deathAudio: cc.AudioSource = null;
    private poswerDownAudio: cc.AudioSource = null;
    
    

    private animation: cc.Animation =null;
    private isBig: boolean =false;
    private turnBig: boolean = false;
    private turnSmall: boolean =false;
    private hitWall: boolean = false;
    private rebornTime: number = 3;
    private life: number = 3;
    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
        this.rigidBody = this.getComponent(cc.RigidBody);
        this.animation = this.getComponent(cc.Animation);
        let audio = this.getComponents(cc.AudioSource);
        this.jumpAudio = audio[0];
        this.deathAudio = audio [1];
        this.poswerDownAudio = audio [2];
        //this.turnBig=true;
    }

    start () {
        
    }

    update (dt) {
        this.playerMovement(dt);
        this.checkSizeBig();
        this.checkSizeSmall();
    }

    onBeginContact(contact, self, other){
        this.hitWall = true;
        if(this.onGround){
            this.hitWall = false;
        }
        if(other.node.name === "ground" || other.node.name === "sTube" || other.node.name === "tube" || other.node.name === "brick"){
            
            if(self.tag === 1){
                this.onGround = true;
            }
        }
        if(other.node.name === "ivy"){
            this.onGround = true;
        }

        if(other.node.name === "void" || other.tag === 5 || other.tag === 7){
            if(this.isBig){
                this.reborn();
                this.scheduleOnce(()=>{this.turnSmall = true},this.rebornTime);
                this.poswerDownAudio.play();
            }
            else{
                this.isDead = true;
            }
            
        }
        if(other.node.name === "mushroom"){
            this.mushroom.destroy();
            this.turnBig = true;
        }
        if(other.node.name === "flag"){
            cc.director.loadScene("youWin");
        }

    }

    private onKeyDown(event){
        if(event.keyCode==cc.macro.KEY.w){
            this.Up = true;
        }
        else if (event.keyCode ==cc.macro.KEY.a){
            this.Left = true;
        }
        else if(event.keyCode == cc.macro.KEY.d){
            this.Right = true;
        }
    }

    private onKeyUp(event){
        if(event.keyCode==cc.macro.KEY.w){
            this.Up = false;
        }
        else if (event.keyCode ==cc.macro.KEY.a){
            this.Left = false;
        }
        else if (event.keyCode == cc.macro.KEY.d){
            this.Right = false;
        }
    }

    private playerMovement(dt){
        let velocity = this.rigidBody.linearVelocity;

        if(this.isDead){
            this.life-=1;
            if(this.life==0){
                cc.director.loadScene("GameOver");
            }

            this.node.position=cc.v3(-400,50,0);
            this.isDead = false;
            this.deathAudio.play();
        }
        if(this.Up && this.onGround){
            this.onGround = false;
            velocity.y = 150 //jump
            if(!this.isBig){
                this.animation.play("jump");
            }
            else{
                this.animation.play("bigJump");
            }
            this.jumpAudio.play();

        }

        if(this.Left){
            velocity.x = -100;
            this.node.scaleX = -1;
            //always run the jump animation if not on the gournd
            if (!this.animation.getAnimationState("run").isPlaying && !this.animation.getAnimationState("bigRun").isPlaying && this.onGround) {
                if(!this.isBig){
                    this.animation.play("run");
                }
                else{
                    this.animation.play("bigRun");
                }
            }
        }
        else if(this.Right){
            velocity.x = 100;
            this.node.scaleX = 1;
            if (!this.animation.getAnimationState("run").isPlaying && !this.animation.getAnimationState("bigRun").isPlaying && this.onGround) {
                if(!this.isBig){
                    this.animation.play("run");
                }
                else{
                    console.log("big");
                    this.animation.play("bigRun");
                }
            }
        }
        else{
            velocity.x = 0;
            //prevent from immediately stopping the jump motion when neither left nor right is pressed 
            if (!this.animation.getAnimationState("jump").isPlaying && !this.animation.getAnimationState("bigJump").isPlaying) {
                if(this.onGround){
                    if(!this.isBig){
                        this.animation.play("idle");
                    }
                    else{
                        this.animation.play("bigIdle");
                    }
                }
                //this.animation.stop();
            }
        }

        this.rigidBody.linearVelocity = velocity;
        //can't use node.x bc by pass physics manager
        //can't directly set linearVelocity.x or y becuase it is a getter
    }

    private CheckChangeSize(){
        
    }

    private checkSizeBig(){
        if(this.turnBig === true){
            console.log("test");
            let physicsBoxCollider = this.node.getComponents(cc.PhysicsBoxCollider);
            for(let i=0;i<physicsBoxCollider.length;i++){
                if(physicsBoxCollider[i].tag === 10){
                    physicsBoxCollider[i].size = new cc.Size(16,27);
                    physicsBoxCollider[i].apply();
                }
                else{
                    physicsBoxCollider[i].tag = 1;
                    physicsBoxCollider[i].size = new cc.Size(16,21);
                    physicsBoxCollider[i].offset = cc.v2(0,-3);
                    physicsBoxCollider[i].apply();
                }
            }
            this.isBig=true;
            this.turnBig =false;
        }
    }
    private checkSizeSmall(){
        if(this.turnSmall === true){
            let physicsBoxCollider = this.node.getComponents(cc.PhysicsBoxCollider);
            for(let i=0;i<physicsBoxCollider.length;i++){
                if(physicsBoxCollider[i].tag === 10){
                    physicsBoxCollider[i].size = new cc.Size(16,16);
                    physicsBoxCollider[i].apply();
                }
                else{
                    physicsBoxCollider[i].tag = 1;
                    physicsBoxCollider[i].size = new cc.Size(1,10);
                    physicsBoxCollider[i].offset = cc.v2(0,-3);
                    physicsBoxCollider[i].apply();
                }
            }
            this.isBig=false;
            this.turnSmall = false;
        }
    }

    private reborn(){
        let sequence = cc.sequence (cc.hide(),cc.delayTime(0.1),cc.show())
            this.schedule(()=>{this.node.runAction(sequence)},0.2,10);
    }
}