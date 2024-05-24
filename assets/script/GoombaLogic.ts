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
    mario: cc.Node = null;

    private animation: cc.Animation = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        this.animation=this.getComponent(cc.Animation);
        
    }

    start () {
        this.node.runAction(this.movement());
    }

    update (dt) {
    }

    onBeginContact(contact, self, other){
        if(self.tag === 6){
            this.animation.play("GoombaDead");
            this.animation.on('finished',()=>this.node.destroy(),this);
        
        }
        if(self.tag === 5){
            //hit mario mario dies
        }
    }

    movement(){
        let action = cc.sequence(cc.moveBy(2,100,0),cc.moveBy(2,-100,0))
        return cc.repeatForever(action);
    }
    
}
