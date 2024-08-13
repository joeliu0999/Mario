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
    loginButton: cc.Node = null;

    @property(cc.Node)
    label: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.loginButton.on("click",()=>{

            var usersRef = firebase.database().ref('Users');
            const query = usersRef.orderByChild('username').equalTo(this.usernameBox.string);
            query.once('value',(snapshot)=>{
                if(snapshot.exists()){
                    //turn it into array to extract the ID
                    let uniqueID = Object.keys(snapshot.val())[0];
                    if(this.passwordBox.string == snapshot.val()[uniqueID].password){
                        cc.director.loadScene('first');
                        return;
                    }
                }
                this.label.getComponent(cc.Label).string = "incorrect password or username";
            })
        })

    }

    start () {

    }

    // update (dt) {}
}
