// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import GlobalData from "./GlobalData";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    mario: cc.Node = null;

    private animation: cc.Animation = null;
    private stompAudio: cc.AudioSource = null;
    private Once: boolean = true;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        this.animation=this.getComponent(cc.Animation);
        this.stompAudio=this.getComponent(cc.AudioSource);
        
    }

    start () {
        this.node.runAction(this.movement());
    }

    update (dt) {
    }

    onBeginContact(contact, self, other){
        if(self.tag === 6 && this.Once){
            this.mario.getComponent(cc.RigidBody).linearVelocity= cc.v2(0,100);
            this.animation.play("GoombaDead");
            this.animation.on('finished',()=>this.node.destroy(),this);
            this.stompAudio.play();
            GlobalData.score +=50; //mario has 2 collider 100 score total
        }
    }

    movement(){
        let action = cc.sequence(cc.moveBy(2,100,0),cc.moveBy(2,-100,0))
        return cc.repeatForever(action);
    }
    
}
