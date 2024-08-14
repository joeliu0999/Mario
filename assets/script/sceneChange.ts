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

    @property
    scene: string = "";

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(cc.director.getScene().name == "Leaderboard" && GlobalData.usernameG != ""){
            this.node.on("click",()=>{cc.director.loadScene("startScreen_S")})
        }
        this.node.on("click",()=>{cc.director.loadScene(this.scene)},this);
    }
}
