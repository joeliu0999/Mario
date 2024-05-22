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

    @property
    text: string = 'hello';

    private playerSpeed: number = null;
    private Up: boolean = false;
    private Left: boolean = false;
    private Right: boolean = false;
    private isDead: boolean = false;
    private onGround: boolean = false;
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    }

    start () {
 
    }

    update (dt) {
        this.playerMovement(dt);
    }

    onBeginContact(contact, self, other){
        console.log(self.node.name);
        console.log(other.node.name);

        if(other.node.name === "ground"){
            this.onGround = true;
            console.log("detected");
        }

    }

    private onKeyDown(event){
        if(event.keyCode==cc.macro.KEY.w){
            this.Up = true;
            console.log("up");
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
            console.log("undone up");
        }
        else if (event.keyCode ==cc.macro.KEY.a){
            this.Left = false;
            this.playerSpeed = 0;
        }
        else if (event.keyCode == cc.macro.KEY.d){
            this.Right = false;
            this.playerSpeed = 0;
        }
    }

    private playerMovement(dt){
        if(this.Up && this.onGround){
            this.onGround = false;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,200); //jump
        }
        else if(this.Left){
            this.playerSpeed = -200;
            this.node.scaleX = -2;
        }
        else if(this.Right){
            this.playerSpeed = 200;
            this.node.scaleX = 2;
        }

        this.node.x += this.playerSpeed*dt;
    }

}