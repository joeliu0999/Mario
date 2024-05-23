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

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        
    }

    start () {
        this.node.runAction(this.movement());
    }

    update (dt) {
    }

    onBeginContact(contact, self, other){
        if(self.tag === 6){
            this.node.destroy();
        }
    }

    movement(){
        let action = cc.sequence(cc.moveBy(2,100,0),cc.moveBy(2,-100,0))
        return cc.repeatForever(action);
    }
    
}
