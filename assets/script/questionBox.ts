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
    mushroom: cc.Node = null;

    private questionBoxAnimation: cc.Animation;
    private isSpawned: boolean;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        this.questionBoxAnimation = this.node.getComponent(cc.Animation);
    }

    start () {

    }

    onBeginContact(contact,self,other){
        if(self.tag === 51){
            let spawn = this.muschroomSpawn();
            //this.mushroom.runAction(this.muschroomSpawn());
            let callback = cc.callFunc(this.mushroomSetUp,this)
            let sequence = cc.sequence(spawn,callback)
            //this.mushroomMovement();
            this.mushroom.runAction(sequence);
            this.node.runAction(this.questionBoxMovement());
            this.questionBoxAnimation.play("emptyQuestionBox");
            this.removeCollider();
        }
    }

    update (dt) {
        if(this.isSpawned){
            this.mushroomMovement(dt);
        }
    }


    private muschroomSpawn(){
        return cc.moveBy(1,0,19);

    }

    private mushroomSetUp(){

        let rigidBody = this.mushroom.addComponent(cc.RigidBody);
        rigidBody.type = cc.RigidBodyType.Dynamic;
        rigidBody.fixedRotation = true;
        let PhysicsCollider = this.mushroom.addComponent(cc.PhysicsBoxCollider)
        PhysicsCollider.size = new cc.Size(16,16); //default is (100,100)
        PhysicsCollider.enabled = true;
        this.mushroom.getComponent(cc.PhysicsBoxCollider).apply(); //need this else size will stay at (100,100)
        this.isSpawned = true;

        return null;
        
    }

    private mushroomMovement(dt){
        let rigidbody = this.mushroom.getComponent(cc.RigidBody)
        let velocity = rigidbody.linearVelocity;
        velocity.x = -40; //setting y component will cancel out gravity
        rigidbody.linearVelocity= velocity;
    }

    private questionBoxMovement(){
        let action = cc.sequence(cc.moveBy(0.15,0,10),cc.moveBy(0.15,0,-10));
        return action;
    }

    private removeCollider(){
        let colliders = this.node.getComponents(cc.PhysicsBoxCollider);
        for(let i=0; i<colliders.length; i++){
            if(colliders[i].tag === 51){
                colliders[i].destroy();
            }
        }
    }


}
