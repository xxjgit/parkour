import { SpawnManager, SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
import { GameConfig } from "../../config/GameConfig";
import { ResourceType } from "../../const/Define";
import { DataManager } from "../../data/DataManager";
import { MGSCenter } from "../../untils/MGSCenter";

/*
 * @Author: pengwei.shi
 * @Date: 2022-11-07 17:26:34
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-27 15:50:46
 * @FilePath: \streetparkour\JavaScripts\modules\obstacle\Obstacle.ts
 * @Description: 障碍
 */
export class Obstacle {
    public id: number
    private _obj: mw.GameObject;
    /**资源类型 */
    public resourceType: ResourceType;
    private _defaultPos: mw.Vector;
    //金币objs
    private _coinList: mw.GameObject[];
    //道具objs
    private _itemList: mw.GameObject[];
    //通过标记objs
    private _passList: mw.GameObject[];
    /**障碍位置 */
    private _obloction: number;
    /**障碍长度 */
    private _obLenght: number;
    private _autoList: mw.GameObject[];
    private _autoDis: number;
    /**障碍是否生效 */
    private _isActive: boolean;
    /**是否是道具 */
    public isItem: boolean;
    private _isReady: boolean;

    public constructor(id: number) {
        this.id = id;
        this._isReady = false;
    }
    public async init(): Promise<any> {
        let cfg = GameConfig.Assets.getAllElement().find(i => i.NameID == this.id);
        this.isItem = cfg.IsItem ? true : false;
        this._defaultPos = new mw.Vector(0, 0, -5000);
        this.resourceType = cfg.ResourceGroup;
        this._coinList = [];
        this._autoList = [];
        this._itemList = [];
        this._passList = [];
        this._obloction = 0;
        this._autoDis = 0;
        this._obLenght = cfg.Lenght ? cfg.Lenght : 0;
        this._isActive = false;
        this._obj = await SpawnManager.asyncSpawn({ guid: cfg.PrefabsGuid });
        return this._obj.asyncReady().then(readyObj => {
            let childs = readyObj.getChildren();
            //this._obj.setCollision(mw.CollisionStatus.QueryOnly,true);
            for (let child of childs) {
                let str = child.name;
                if (str === 'coins') {
                    let list = child.getChildren();
                    for (let c of list) {
                        this._coinList.push(c);
                    }
                }
                else if (str === 'items') {
                    let list = child.getChildren();
                    for (let c of list) {
                        this._coinList.push(c);
                    }
                }
                else if (str === 'pass') {
                    this._passList.push(child);
                }
                else if (str === 'auto') {
                    this._autoList.push(child);
                }
                else if (str.indexOf('block') >= 0 || str.indexOf('board') >= 0) {
                    MGSCenter.addGuid(child.gameObjectId, this.id);
                    //child.setCollision(mw.CollisionStatus.QueryOnly);
                }
            }
            this._isReady = true;
        });
    }
    public setLocation(loc: mw.Vector) {
        if (!this._isReady) return;
        this._obloction = loc.x;
        this._obj.worldTransform.position = loc;
        this._isActive = true;
    }
    /**
     * 隐藏
     */
    public setHide(dis: number) {
        if (this._obloction - DataManager.gameDis < dis)
            this.resetPos();
    }
    public onUpdate(dt: number) {
        // if (this._coinList.length > 0) {
        //     for (let obj of this._coinList) {
        //         let rot = obj.rotation;
        //         rot.z -= dt * 150;
        //         obj.rotation = rot;
        //     }
        // }
        //移动物件
        if (this._autoList.length > 0) {
            let ds = this._obloction - DataManager.gameDis
            if (ds > 0 && ds < 3000) {
                let dis = DataManager.carSpeed * dt;
                for (let obj of this._autoList) {
                    let pos = obj.worldTransform.position;
                    pos.x -= dis;
                    obj.worldTransform.position = pos;
                }
                this._autoDis += dis;
            }
        }
        //判断障碍物是否生效
        let obstacleLen = this._obloction + this._obLenght;
        //1200 为玩家距离场景x轴原点的位置
        if (DataManager.gameDis - 1200 > obstacleLen) {
            this._isActive = false;
        }
    }
    /**
     * 重置位置
     * 供对象池调用
     */
    public resetPos() {
        if (!this._isReady) return;
        this._obj.worldTransform.position = this._defaultPos;
        this._isActive = false;
        if (this._coinList.length > 0) {
            this._coinList.forEach((obj) => {
                obj.setVisibility(mw.PropertyStatus.On, true);
                obj.setCollision(mw.CollisionStatus.QueryOnly)
            });
        }
        if (this._itemList.length > 0) {
            this._itemList.forEach((obj) => {
                obj.setVisibility(mw.PropertyStatus.On, true);
                obj.setCollision(mw.CollisionStatus.QueryOnly)
            });
        }
        for (let obj of this._autoList) {
            let pos = obj.worldTransform.position;
            pos.x += this._autoDis;
            obj.worldTransform.position = pos;
        }
        for (let obj of this._passList) {
            obj.setVisibility(mw.PropertyStatus.On, true);
            obj.setCollision(mw.CollisionStatus.QueryOnly)
        }
    }

    /**获取障碍长度 */
    public get getObLenght() {
        return this._obLenght
    }

    /**获取障碍物是否生效 */
    public get active() {
        return this._isActive;
    }
}