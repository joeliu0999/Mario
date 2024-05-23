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
        console.log(self.node.name);

        if(self.tag === 6){
            this.node.destroy();
        
        }
        if(self.tag === 5){
            //hit mario mario dies
            console.log("this is not right");
        }
    }

    movement(){
        let action = cc.sequence(cc.moveBy(2,100,0),cc.moveBy(2,-100,0))
        return cc.repeatForever(action);
    }
    
}