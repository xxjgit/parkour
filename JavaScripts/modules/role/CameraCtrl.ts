import { Const } from "../../const/Const";
import { DataManager } from "../../data/DataManager";
import RoleCtrl from "./RoleCtrl";

/*
 * @Author: xianjie.xia
 * @LastEditors: xianjie.xia
 * @Date: 2022-10-25 10:08
 * @LastEditTime: 2022-11-24 16:32
 * @description: 相机控制
 */

export default class CameraCtrl {

    /**
     * 相机的目标点
     */
    private _dest = new mw.Vector(0, 0, 0);
    /**
     * 旋转
     */
    private _rotation = new mw.Rotation(0, 0, 0);
    /**
     * 相机节点
     */
    private _root: mw.GameObject;
    /**
     *  锁定的目标
     * */
    private _targetCtrl: RoleCtrl;
    /**
     * 初始化完成否
     */
    private _bInited = false;

    /**
     * 相机跟随移动距离间隔  %
     */
    private _delta = 0.1;
    /**
     * 初始化
     * @param obj 相机锁定节点
     * @param ctrl 角色控制器
     */
    public init(obj: mw.GameObject, ctrl: RoleCtrl): void {
        this._root = obj;
        //let char = Player.localPlayer.character;
        Camera.currentCamera.parent = (obj);
        this._targetCtrl = ctrl;
        if (!this._targetCtrl)
            console.log('playerctrl is null')
        this._bInited = true;
        this.reset();
    }
    /**
     * 重置
     */
    public reset() {
        let pos = this._targetCtrl.destPos;
        this._rotation.z = -90;
        this._dest.y = Const.BASE_POS + 50;
        this._dest.x = pos.x + 20;
        this._dest.z = pos.z - 100;
        this._root.worldTransform.rotation = this._rotation;
        this._root.worldTransform.position = this._dest;
    }
    /**
     * 帧更新
     * @param dt 
     * @param rate 
     * @returns 
     */
    public onUpdate(dt: number, rate: number): void {
        if (!this._bInited)
            return;
        let pos = this._targetCtrl.destPos;
        this._dest.x = pos.x;
        if (DataManager.isReady) {
            let dz = pos.z - this._dest.z;
            if (Math.abs(dz) > 1)
                this._dest.z += dz * this._delta * rate * 1.5
            else
                this._dest.z = pos.z;

            let dy = pos.y - this._dest.y;
            if (Math.abs(dy) > 1)
                this._dest.y += dy * this._delta * rate
            else
                this._dest.y = pos.y;

            if (this._rotation.z < 0)
                this._rotation.z += rate * 0.2 + Math.abs(this._rotation.z) * 0.05 * rate;
            else
                this._rotation.z = 0;
            this._root.worldTransform.rotation = this._rotation;
            this._root.worldTransform.position = this._dest;
        }
        else if (DataManager.isGaming || DataManager.isEnd) {
            this._dest.y = pos.y;
            //this._rotation.y = 0;
            this._rotation.z = 0;
            let pz = pos.z;
            if (this._targetCtrl.isFly) {
                //this._dest.x -= 100;
                //this._rotation.y = 10;
                pz -= 50;
            }
            let dz = pz - this._dest.z;
            if (dz < 0 || this._targetCtrl.isOnLand)
                this._dest.z += dz * this._delta * rate;
            else if (this._targetCtrl.isFollow)
                this._dest.z += dz * this._delta * rate;
            this._root.worldTransform.position = this._dest;
            this._root.worldTransform.rotation = this._rotation;
        }

    }
}

