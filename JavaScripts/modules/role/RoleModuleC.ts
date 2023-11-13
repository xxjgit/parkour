/*
 * @Author: xianjie.xia
 * @LastEditors: pengwei.shi
 * @Date: 2022-10-31 14:39
 * @LastEditTime: 2022-11-27 13:52:14
 * @description: 
 */

import { GameConfig } from "../../config/GameConfig";
import { Const } from "../../const/Const";
import { BlockType, MoveType, SPSound } from "../../const/Define";
import { DataManager } from "../../data/DataManager";
import { MGSCenter } from "../../untils/MGSCenter";
import CameraCtrl from "./CameraCtrl";
import RoleCtrl from "./RoleCtrl";
import { RoleData } from "./RoleData";
import { RoleModuleS } from "./RoleModuleS";

export class RoleModuleC extends ModuleC<RoleModuleS, RoleData>{

    private _roleCtrl: RoleCtrl;
    private _cameraCtrl: CameraCtrl;

    public get roleData() {
        return { clothesIDs: this.data.curClothesIDs, equipID: this.data.curEquitID };
    }

    onStart(): void {
        this._roleCtrl = new RoleCtrl();
        this._cameraCtrl = new CameraCtrl();
    }
    public async init(): Promise<any> {

        return new Promise((resolve) => {
            //角色初始化
            let cfg = GameConfig.Global.getElement(101);  //角色的全局配置
            this._roleCtrl.setInfo(cfg.Value, cfg.Value1, cfg.Value2, cfg.Value3, cfg.Value4);
            GameObject.asyncFindGameObjectById('92198BB8').then(async (obj) => {
                this._roleCtrl.init(obj);
                this.freshRole();
                resolve(true);
            })
            //角色相机初始化
            GameObject.asyncFindGameObjectById('90D8BA3D').then((obj) => {
                this._cameraCtrl.init(obj, this._roleCtrl);
            })
        })
    }

    public override onUpdate(dt: number): void {
        if (DataManager.isPuase)
            return;
        let rate = dt / Const.DELAT_TIME;
        //限制帧数倍率
        if (rate > 4)
            rate = 4;
        else if (rate < 0.8)
            rate = 0.8;
        this._roleCtrl.onUpdate(dt, rate);
        this._cameraCtrl.onUpdate(dt, rate);
    }

    /**
     * 开始
     */
    public gameStart() {

    }
    /**
     * 暂停
     */
    public gamePuase() {
        this._roleCtrl.puase();
    }
    /**
     * 重置
     */
    public reset() {
        this._roleCtrl.reset();
        this._cameraCtrl.reset();
    }
    /**
     * 移动
     * @param type 方向
     */
    public move(type: MoveType) {
        this._roleCtrl.move(type);
    }
    public relive() {
        this._roleCtrl.relive();
    }
    public test(v) {
        this._roleCtrl.test(v);
    }
    /**
     * 使用道具
     * @param id 道具ID
     */
    public useItem(id: number) {
        this._roleCtrl.useItem(id);
        DataManager.onItem(id, true);
    }
    /**
     * 刷新衣服数据、购买衣服
     * @param clothesID 
     * @returns 是否购买成功
     */
    public refreshClothesData(clothesID: number): boolean {
        let index = this.data.curClothesIDs.indexOf(clothesID);
        if (index == -1) {
            //埋点
            this.mgs(clothesID);
            this.data.curClothesIDs.push(clothesID);
            //保存数据
            // this.callServerFun(this.server.saveClothesData, clothesID);
            this.server.net_saveClothesData(clothesID);
            // console.log(`购买${clothesID}`);
            this.freshRole();
            return true;
        } else {
            // console.log(`已购买${clothesID}`);
            return false;
        }
    }
    /**
     * 获取性别
     * 1=男
     * 2=女
     */
    public get gender() {
        return this._roleCtrl ? this._roleCtrl.gender : 1;
    }

    /**
     * 刷新装备数据
     * @param clothesID 
     */
    public refreashEquipData(clothesID: number) {
        //保存数据
        this.data.setCurEquitID(clothesID);
        // this.callServerFun(this.server.saveEquipData, clothesID);
        this.server.net_saveEquipData(clothesID);
        // console.log(`已装备${clothesID}`);
        this.freshRole();
    }

    private freshRole() {
        this._roleCtrl.setRole(this.data.curEquitID);
    }
    /**
     * 隐藏玩家角色
     * @param playerId 玩家ID
     */
    public net_hideRole(playerId: number) {
        // console.log('net  ', playerId);
        // let player = Player.getPlayer(playerId);
        // player.character.setVisibility(mw.PropertyStatus.Off, true);
    }
    protected onEnterScene(sceneType: number): void {
        Player.onPlayerJoin.add(this.onPlayerAdd);
        Player.localPlayer?.character?.setVisibility(mw.PropertyStatus.Off, true);
    }
    private onPlayerAdd = async (player) => {
        await player.asyncReady();
        player?.character?.setVisibility(mw.PropertyStatus.Off, true);
    }
    /**
     * 角色购买埋点
     * @param buyID 
     */
    private mgs(buyID: number) {
        if (DataManager.isGuideRole) return;
        if (this.data.curClothesIDs.length == 2) {
            MGSCenter.mgsIsFirstRoleActionBuy();
            MGSCenter.mgsRoleActionBuy(buyID);
        } else {
            MGSCenter.mgsRoleActionBuy(buyID);
        }
    }

}
