// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    username: cc.EditBox = null;
    @property(cc.EditBox)
    password: cc.EditBox = null;

    @property(cc.Node)
    signUpButton: cc.Node = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.signUpButton.on("click",()=>{
            console.log("add data to fb");
            console.log(this.username.string)
        })

    }

    start () {

    }

    // update (dt) {}
}
