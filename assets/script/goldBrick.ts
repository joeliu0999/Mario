// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    coin: cc.Node = null;

    private coinAnimation: cc.Animation = null;
    private goldBlockAnimation: cc.Animation = null;
    private audioSource: cc.AudioSource = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.coinAnimation = this.coin.getComponent(cc.Animation);
        this.goldBlockAnimation = this.node.getComponent(cc.Animation);
        this.coin.runAction(cc.hide()); //only show when brick is hit
        this.audioSource = this.coin.getComponent(cc.AudioSource);
    }

    start () {
        this.goldBlockAnimation.play("goldBlock")
    }

    onBeginContact(contact, self, other){
        console.log(self.tag);
        if (self.tag === 41){
            this.coin.runAction(cc.show());
            this.node.runAction(this.goldBlockMovement());
            this.coinAnimation.play("coin");
            this.coin.runAction(this.coinMovement());
            this.goldBlockAnimation.stop("goldBlock");
            this.goldBlockAnimation.play("turnBrick");
            this.audioSource.play();
            this.removeCollider();
        }


    }
    // update (dt) {}

    private coinMovement(){
        let action = cc.sequence(cc.moveBy(0.5,0,30),cc.moveBy(0.5,0,-40));
        let newAction = cc.spawn(action,cc.fadeOut(1.5));
        return newAction;
    }

    private goldBlockMovement(){
        let action = cc.sequence(cc.moveBy(0.15,0,10),cc.moveBy(0.15,0,-10));
        return action;
    }

    //remove the collider which triggers to animations
    private removeCollider(){
        let colliders = this.node.getComponents(cc.PhysicsBoxCollider);
        for(let i=0; i<colliders.length; i++){
            if(colliders[i].tag === 41){
                colliders[i].destroy();
            }
        }
    }
}
