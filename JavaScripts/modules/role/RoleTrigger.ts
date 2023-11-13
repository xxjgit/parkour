/** 
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2022-11-22 09:44
 * @LastEditTime : 2023-01-05 18:02
 * @description  : 
 */
@Component
export default class RoleTrigger extends mw.Script {

    //宿主
    // private _host: RoleCtrl;
    // /**
    //  * 初始化
    //  * @param ctrl 角色
    //  */
    // public init(ctrl: RoleCtrl) {
    //     this._host = ctrl;
    // }
    protected onStart(): void {
        console.log('onStart')
        if (mw.SystemUtil.isClient()) {
            let trigger = this.gameObject as mw.Trigger;
            trigger.onEnter.add(this.onEnter);
            //trigger.onLeave.add(this.onLeave)
        }
    }

    private onEnter = (other: mw.GameObject) => {
        console.log('onEnter')
        // return;
        // let tag = other.name;
        // if (!tag)
        //     return;
        // let type = BlockType.None;
        // if (tag == 'pass') {
        //     //隐藏通过点
        //     other.setVisibility(mw.PropertyStatus.Off, true);
        //     other.setCollision(mw.CollisionStatus.Off);
        //     return;
        // }
        // else if (tag == 'block1') {
        //     type = BlockType.Stop;
        // }
        // else if (tag == 'block2') {
        //     type = BlockType.Pass;
        // }
        // else if (tag == 'board') {
        //     type = BlockType.Board;
        // }
        // else if (tag == 'block') {
        //     type = BlockType.Block;
        // }
        // else if (tag == 'block0') {
        //     type = BlockType.StepBlock;
        // }
        // else if (tag == 'border') {
        //     type = BlockType.Border;
        // }
        // else if (tag == 'step') {
        //     type = BlockType.Step;
        // }
        // else if (tag.indexOf('coin') >= 0 && other.visible) {
        //     other.setVisibility(mw.PropertyStatus.Off, true);
        //     other.setCollision(mw.CollisionStatus.Off);
        //     type = BlockType.Coin;
        //     Sound.instance.gameSound(SPSound.Coin);
        // }
        // else if (tag.indexOf('gem') >= 0 && other.visible) {
        //     other.setVisibility(mw.PropertyStatus.Off, true);
        //     other.setCollision(mw.CollisionStatus.Off);
        //     type = BlockType.Gem;
        //     Sound.instance.gameSound(SPSound.GetGem);
        // }
        // else if (tag.indexOf('item') >= 0 && other.visible) {
        //     other.setVisibility(mw.PropertyStatus.Off, true);
        //     other.setCollision(mw.CollisionStatus.Off);
        //     let id = 0;
        //     type = BlockType.Item;
        //     if (tag == 'item2')
        //         id = 2;
        //     else if (tag == 'item3')
        //         id = 3;
        //     else if (tag == 'item5')
        //         id = 5;
        //     else
        //         console.log(tag)
        //     this._host.useItem(id);
        //     DataManager.onItem(id, false);
        //     Sound.instance.gameSound(SPSound.GetItem);
        // }
        // this._host.onTrigger(type, other.worldTransform.position, other.guid);
    }
    protected onDestroy(): void {
        //this._host = null;
    }
}
