// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    private Up: boolean = false;
    private Left: boolean = false;
    private Right: boolean = false;
    private isDead: boolean = false;
    private onGround: boolean = false;
    private rigidBody: cc.RigidBody = null;

    private animation: cc.Animation =null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
        this.rigidBody = this.getComponent(cc.RigidBody);
        this.animation = this.getComponent(cc.Animation);
    }

    start () {
        
    }

    update (dt) {
        this.playerMovement(dt);
        //this.playAnimation();
    }

    onBeginContact(contact, self, other){
        console.log(other.node.tag);
        if(other.node.name === "ground" || other.node.name === "sTube" || other.node.name === "tube" || other.node.name === "brick"){
            this.onGround = true;
        }

        if(other.node.name === "void" || other.tag === 5 || other.tag === 7){
            this.isDead = true;
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
            this.node.position=cc.v3(-400,50,0);
            this.isDead = false;
        }
        if(this.Up && this.onGround){
            this.onGround = false;
            velocity.y = 150 //jump
            this.animation.play("jump");
        }

        if(this.Left){
            velocity.x = -100;
            this.node.scaleX = -1;
            //always run the jump animation if not on the gournd
            if (!this.animation.getAnimationState("run").isPlaying && this.onGround) {
                this.animation.play("run");
            }
        }
        else if(this.Right){
            velocity.x = 100;
            this.node.scaleX = 1;
            if (!this.animation.getAnimationState("run").isPlaying && this.onGround) {
                this.animation.play("run");
            }
        }
        else{
            velocity.x = 0;
            //prevent from immediately stopping the jump motion when neither left nor right is pressed 
            if (!this.animation.getAnimationState("jump").isPlaying) {
                if(this.onGround){
                    this.animation.play("idle");
                }
                //this.animation.stop();
            }
        }

        this.rigidBody.linearVelocity = velocity;
        //can't use node.x bc by pass physics manager
        //can't directly set linearVelocity.x or y becuase it is a getter
    }

    private playAnimation(){
        if(this.Up){
            if (!this.animation.getAnimationState("run").isPlaying) {
                this.animation.play("run");
            }
        }
        if(this.Left){
            if (!this.animation.getAnimationState("run").isPlaying) {
                this.animation.play("run");
            }
        }
        else if(this.Right){
            if (!this.animation.getAnimationState("run").isPlaying) {
                this.animation.play("run");
            }
        }
    }

}