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
    character: cc.Node = null;

    private originalYPosition:number =0;
    private diff:number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.diff = this.node.x-this.character.x;
        this.originalYPosition = this.node.y;
    }

    start () {

    }

    update (dt) {
        this.node.x = this.character.x+this.diff;

        if(this.character.y>-75){
            this.node.y = this.originalYPosition+this.character.y+75;
        }
    }
}
