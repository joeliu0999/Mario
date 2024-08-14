// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import GlobalData from "./GlobalData";
const {ccclass, property} = cc._decorator;
declare const firebase: any;
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    time: cc.Node = null;


    start () {
        this.getComponent(cc.Label).string = GlobalData.score.toString();
        console.log(this.time);
        this.time.getComponent(cc.Label).string = Math.floor(GlobalData.time).toString()+"s";

        
        var userRef = firebase.database().ref('Users');
        const query = userRef.orderByChild('username').equalTo(GlobalData.usernameG)
        query.once('value',(snapshot)=>{
            let uniqueID = Object.keys(snapshot.val())[0];
            if(!snapshot.val()[uniqueID].score || snapshot.val()[uniqueID].score<GlobalData.score){
                const idRef = userRef.child(uniqueID);
                idRef.update({
                    score: GlobalData.score,
                    time: Math.floor(GlobalData.time)
                })

            }
        })

    }
}
