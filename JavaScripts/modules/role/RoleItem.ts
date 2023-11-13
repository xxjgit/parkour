import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';

import { GameConfig } from "../../config/GameConfig";
import { IRoleElement } from "../../config/Role";
import { Const } from "../../const/Const";
import { EffectRes, SPSound } from "../../const/Define";
import { MGSCenter } from "../../untils/MGSCenter";
import { SharePool } from "../../untils/Pool";
import { Sound } from "../../untils/Sound";
import { ItemModuleC } from "../item/ItemModuleC";

/** 
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2022-11-23 09:58
 * @LastEditTime : 2022-11-29 17:22:51
 * @description  : 角色道具
 */
export class RoleItem {
    //默认道具
    private _addItem = 0;
    private _addTime = 0;
    //性别
    public gender = 0;
    //护盾时长
    private _shieldTime: number = 0;
    //护盾特效
    private _shieldEf: mw.Effect;

    //飞行
    private _flyTime: number = 0;
    private _flyEf: mw.Effect;

    //双倍
    private _doubleTime: number = 0;
    private _doubleEf: mw.Effect;

    //复活
    private _reliveEf: mw.Effect;
    //人形对象
    protected _role: mw.Character;
    //上一次播放的动画（也是当前在播放的动画）
    protected _lastAnim = '';

    /**
     * 护盾中
     */
    public get isShield() {
        return this._shieldTime > 0;
    }
    //飞行中
    public get isFly() {
        return this._flyTime > 0;
    }
    //双倍中
    public get isDouble() {
        return this._doubleTime > 0;
    }
    /**
     * 设置角色(换装)
     * @param rid 角色ID 
     */
    public setRole(rid: number) {
        let rc = GameConfig.Role.getElement(rid);
        if (!rc)
            return;
        this._role.displayName = '';
        this.setSkins(rc);
        this._addItem = rc.PropID;
        this._addTime = rc.TimeAdd;
        this.gender = rc.gender;
        let cfgs = GameConfig.Item.getAllElement();
        for (let v of cfgs) {
            if (v.effect && v.effect.length > 1) {
                mw.AssetUtil.asyncDownloadAsset(v.effect);
            }
        }
    }
    /**
     * 重置
     */
    public reset() {
        this._doubleTime = 0;
        this._flyTime = 0;
        this._shieldTime = 0;
        this.shieldEffect(false);
        this.flyEffect(false);
        this.doubleEffect(false);
    }
    /**
     * 帧更新
     * @param dt 间隔时间
     * @param rate 倍率
     */
    public onUpdate(dt, rate) {
        if (this._shieldTime > 0) {
            this._shieldTime -= dt;
            if (this._shieldTime <= 0)
                this.shieldEffect(false);
        }
        if (this._flyTime > 0) {
            this._flyTime -= dt;
            if (this._flyTime <= 0)
                this.flyEffect(false);
        }
        if (this._doubleTime > 0) {
            this._doubleTime -= dt;
            if (this._doubleTime <= 0)
                this.doubleEffect(false);
        }
    }
    /**
     * 使用道具
     * @param id 
     * @returns 
     */
    public useItem(id: number) {
        let cfg = GameConfig.Item.getElement(id);
        if (!cfg)
            return;
        let imc = ModuleService.getModule(ItemModuleC);
        let lv = imc.getItemLv(id);
        let add = this._addItem == id;

        let time = cfg.time[lv];
        time += add ? this._addTime : 0;
        switch (id) {
            case 1://捡到钥匙
                imc.addItem(id, 1);
                break;
            case 2: //无敌
                this._shieldTime = time;
                this.shieldEffect(true, cfg.effect);
                break;
            case 3: //飞行
                this._flyTime = time;
                this.flyEffect(true, cfg.effect);
                break;
            case 5: //双倍
                this._doubleTime = time;
                this.doubleEffect(true, cfg.effect);
                break;
        }
        MGSCenter.mgsActionUseItem(id);
        Event.dispatchToLocal(Const.ITEM_USE, id, time);
    }
    /**
     * 护盾触发
     */
    protected onShield() {
        this._shieldTime = 0;
        this.shieldEffect(false);
        this.reliveEffect();
        Event.dispatchToLocal(Const.ITEM_USE, 2, 0);
    }
    /**
     * 复活特效
     * @returns 
     */
    protected reliveEffect() {
        if (!this._reliveEf) {
            let effect = SharePool.getPool<mw.Effect>(EffectRes.Relive).spawn();
            if (!effect || !effect.obj)
                return;
            this._reliveEf = effect.obj;
            this._role.attachToSlot(this._reliveEf, 23);
            this._reliveEf.localTransform.position = (new mw.Vector(100, 0, 0));
            // this._vertigoEf.localTransform.rotation = ();
            this._reliveEf.worldTransform.scale = new mw.Vector(1.4, 1.4, 1.4);
            this._reliveEf.loop = false;
        }
        if (this._reliveEf) {
            Sound.instance.gameSound(SPSound.ReliveBomb);
            this._reliveEf.play();
        }
    }
    /**
     * 护盾特效
     * @param show 显示
     * @param res 资源
     * @returns 
     */
    private shieldEffect(show: boolean, res: string = '') {
        if (!this._shieldEf) {
            let effect = SharePool.getPool<mw.Effect>(res).spawn();
            if (!effect || !effect.obj)
                return;
            this._shieldEf = effect.obj;
            this._role.attachToSlot(this._shieldEf, 23);
            this._shieldEf.localTransform.position = (new mw.Vector(0, 0, 0));
            // this._vertigoEf.localTransform.rotation = ();
            this._shieldEf.worldTransform.scale = new mw.Vector(1, 1, 1);
            this._shieldEf.loop = true;
        }
        if (!this._shieldEf)
            return;
        if (show) {
            this._shieldEf.play();
            this._shieldEf.setVisibility(mw.PropertyStatus.On);
        }
        else {
            this._shieldEf.stop();
            this._shieldEf.setVisibility(mw.PropertyStatus.Off);
        }
    }
    /**
     * 飞行特效
     * @param show 显示
     * @param res 资源
     * @returns 
     */
    private flyEffect(show: boolean, res: string = '') {
        if (!this._flyEf) {
            let effect = SharePool.getPool<mw.Effect>(res).spawn();
            if (!effect || !effect.obj)
                return;
            this._flyEf = effect.obj;
            this._role.attachToSlot(this._flyEf, 23);
            this._flyEf.localTransform.position = (new mw.Vector(100, 0, 0));
            // this._vertigoEf.localTransform.rotation = ();
            this._flyEf.worldTransform.scale = new mw.Vector(3, 3, 3);
            this._flyEf.loop = true;
        }
        if (!this._flyEf)
            return;
        if (show) {
            this._flyEf.play();
            this._flyEf.setVisibility(mw.PropertyStatus.On);
        }
        else {
            this._flyEf.stop();
            this._flyEf.setVisibility(mw.PropertyStatus.Off);
            Event.dispatchToLocal(Const.ITEM_USE, 3, 0);
        }
    }
    /**
     * 双倍特效
     * @param show 显示
     * @param res 资源
     * @returns 
     */
    private doubleEffect(show: boolean, res: string = '') {
        if (!this._doubleEf) {
            let effect = SharePool.getPool<mw.Effect>(res).spawn();
            if (!effect || !effect.obj)
                return;
            this._doubleEf = effect.obj;
            this._role.attachToSlot(this._doubleEf, 23);
            this._doubleEf.localTransform.position = (new mw.Vector(0, 0, 80));
            // this._vertigoEf.localTransform.rotation = ();
            this._doubleEf.worldTransform.scale = new mw.Vector(1, 1, 1);
            this._doubleEf.loop = true;
        }
        if (!this._doubleEf)
            return;
        if (show) {
            this._doubleEf.play();
            this._doubleEf.setVisibility(mw.PropertyStatus.On);
        }
        else {
            Event.dispatchToLocal(Const.ITEM_USE, 5, 0);
            this._doubleEf.stop();
            this._doubleEf.setVisibility(mw.PropertyStatus.Off);
        }
    }
    /**
     * 设置皮肤
     * @param cfg 角色配置
     */
    private async setSkins(cfg: IRoleElement) {
        this._role.clearDescription();
        //this._role.clearDescription();
        // for (let i = 0; i < cfg.Skins.length; i++) {
        //     let guid = cfg.Skins[i];
        //     await mw.AssetUtil.asyncDownloadAsset(guid);
        //     this._role.description.base.wholeBody = (guid);
        // }
        //TODO 未找到
        // this._role.syncDIYDataBegin();
        // this._role.setDescription(cfg.Skins);
        this._role.setDescription(cfg.Skins);
        //(mw.HumanoidV2).setDescription(cfg.Skins);
    }
    // /**
    //  * 动画播放
    //  * @param anim 动画资源
    //  * @param rate 时长
    //  * @param loop 循环
    //  * @returns 
    //  */
    // protected playAinm(anim: string, rate: number = undefined, loop: number = 1) {
    //     if (anim === this._lastAnim)
    //         return;
    //     this._lastAnim = anim;
    //     //PlayerManagerExtesion.rpcPlayAnimationLocally(this._role, anim, time, loop)
    //     let ani = PlayerManagerExtesion.loadAnimationExtesion(this._role, anim, false)
    //     if (ani) {
    //         ani.rate = rate;
    //         ani.loop = loop;
    //         ani.play();
    //     }
    // }
}