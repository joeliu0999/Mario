// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    private coinAnimation: cc.Animation = null;
    private coinSound:cc.AudioSource = null;
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.coinAnimation = this.node.getComponent(cc.Animation);
        this.coinSound = this.getComponent(cc.AudioSource);
    }

    start () {

    }

    onBeginContact(contact,self,other){
        if(other.node.name === "Mario"){
            this.coinSound.play();
            this.node.getComponent(cc.Animation).play("collectCoin");
            //call backfunction (no parenthses) need bind else "this" will refers to the window
            this.coinAnimation.on("finished",this.removeSprite.bind(this));
        }
    }
    //status will be auto pass in by call back
    private removeSprite(status){
        if(status==="finished"){
            this.scheduleOnce(()=>{this.node.destroy()},this.coinSound.clip.duration)
        }
    }

    // update (dt) {}
}
