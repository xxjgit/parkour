/** 
 * @Author       : xianjie.xia
 * @LastEditors  : pengwei.shi
 * @Date         : 2022-11-23 11:22
 * @LastEditTime : 2022-12-13 11:27:40
 * @description  : 
 */

import { GameConfig } from "../../config/GameConfig";
import { SPSound } from "../../const/Define";
import { DataManager } from "../../data/DataManager";
import { MGSCenter } from "../../untils/MGSCenter";
import { Sound } from "../../untils/Sound";
import { GameModuleC } from "../game/GameModuleC";
import { ItemData } from "./ItemData";
import { ItemModuleS } from "./ItemModuleS";

export class ItemModuleC extends ModuleC<ItemModuleS, ItemData>{

    /**
     * 添加道具
     * @param id 道具ID
     * @param count 数量
     * @param isShop 是否从商店购买
     * @returns 
     */
    public addItem(id: number, count: number, isShop: boolean = false) {
        if (isShop) {
            this.mgsItemBuy(id);
        }
        this.data.addItem(id, count, isShop, DataManager.isGuideShop);
        this.server.net_addItem(id, count, isShop, DataManager.isGuideShop);
    }
    /**
     * 消耗道具
     * @param id 道具ID
     * @param count 数量
     * @returns 
     */
    public async costItem(id: number, count: number) {
        if (this.data.getItemCount(id) >= count) {
            this.data.costItem(id, count);
            return await this.server.net_costItem(id, count);
        }
        return false;
    }
    /**
     * 获取该道具的等级
     * @param id 道具ID
     * @returns 等级
     */
    public getItemLv(id: number) {
        return this.data.getItemLv(id);
    }
    /**
     * 获取该道具的数量
     * @param id 道具ID
     * @returns 数量
     */
    public getItemCount(id: number) {
        return this.data.getItemCount(id);
    }
    /**
     * 升级道具
     * @param id 道具ID
     * @returns 成功
     */
    public upItem(id: number): boolean {
        let cfg = GameConfig.Item.getElement(id);
        if (!cfg)
            return false;
        let lv = this.data.getItemLv(id);
        if (lv >= cfg.maxLv)
            return false;
        let ut = cfg.upType[lv];
        let uc = cfg.upCost[lv];
        let gm = ModuleService.getModule(GameModuleC);
        if (gm.enough(ut, uc)) {
            MGSCenter.mgsItemActionUP(id, this.data.isFirstUP);
            Sound.instance.gameSound(SPSound.UpGrade);
            gm.cost(ut, uc);
            this.data.upItem(id, lv + 1);
            //this.callServerFun(this.server.upItem, id, lv + 1, ut, uc);
            this.server.net_upItem(id, lv + 1, ut, uc);
            return true;
        }
        return false;
    }

    /**
     * 道具购买埋点
     * @param itemID 
     */
    private mgsItemBuy(itemID: number) {
        if (DataManager.isGuideShop) return;
        if (this.data.isFirstShopBuy) {
            MGSCenter.mgsIsFirstItemActionBuy();
            MGSCenter.mgsItemActionBuy(itemID);
        } else {
            MGSCenter.mgsItemActionBuy(itemID);
        }
    }
}