// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GlobalData from './GlobalData';
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    time:cc.Label =null;

    @property(cc.Label)
    score: cc.Label = null;

    private doOnce1: boolean = true;
    private doOnce2: boolean = true;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
    }

    update (dt) {
        GlobalData.time += dt;

        this.time.string = Math.floor(GlobalData.time).toString();
        this.score.string = GlobalData.score.toString();

        if(GlobalData.life == 2 && this.doOnce1){
            this.node.getChildByName("Life").getChildByName("life").destroy();
            this.doOnce1 = false;
        }
        if(GlobalData.life == 1 && this.doOnce2){
            this.node.getChildByName("Life").getChildByName("life").destroy();
            this.doOnce2 = false;
        }

    }
}
