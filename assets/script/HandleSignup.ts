// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
declare const firebase:any;
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    usernameBox: cc.EditBox = null;
    @property(cc.EditBox)
    passwordBox: cc.EditBox = null;

    @property(cc.Node)
    signUpButton: cc.Node = null;

    @property(cc.Node)
    label: cc.Node = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.signUpButton.on("click",()=>{
            console.log("add data to fb");

            var usersRef = firebase.database().ref('Users');
            const query = usersRef.orderByChild('username').equalTo(this.usernameBox.string);
            query.once('value',(snapshot)=>{
                if(snapshot.exists()){
                    this.label.getComponent(cc.Label).string = "username already exist";
                    return;
                }
                var userData = {
                    username: this.usernameBox.string,
                    password: this.passwordBox.string
                };
                usersRef.push(userData);
                cc.director.loadScene('first');
            })
        })

    }

    start () {

    }

    // update (dt) {}
}
