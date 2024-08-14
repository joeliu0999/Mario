// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
declare const firebase: any;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        const userRef = firebase.database().ref("Users")
        //orderBychild gives ascending order
        //quering is async function
        const query = userRef.orderByChild('score').limitToLast(5);
        var items = [];
        var formatted = [];
        query.once('value',(snapshot)=>{
            snapshot.forEach(element => {
                items.push(element.val());
                
            });
            items.reverse();
            console.log(items); 

            //result from limitToLast.. doesnt contain unique key. Only data
            formatted = items.map((element)=>{
                let tempList = []
                tempList.push(element.username);
                tempList.push(element.score);
                tempList.push(element.time);
                return tempList;
            })

            console.log(formatted);
    
            for(let i=0;i<5;i++){
                let stats = this.node.getChildByName("user"+String(i+1)).children;
    
                //stats[0] is the rank node
                stats[1].getComponent(cc.Label).string = formatted[i][0];
                stats[2].getComponent(cc.Label).string = formatted[i][1];
                stats[3].getComponent(cc.Label).string = formatted[i][2]+"s";
    
            }
        })

    }
}
