
import { ItemData } from "./ItemData";
import { ItemModuleC } from "./ItemModuleC";

/** 
 * @Author       : pengwei.shi
 * @Date         : 2022-11-29 16:54:09
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2022-12-13 11:26:59
 * @FilePath     : \streetparkour\JavaScripts\modules\item\ItemModuleS.ts
 * @Description  : 修改描述
 */
export class ItemModuleS extends ModuleS<ItemModuleC, ItemData>{

    /**
     * 添加道具
     * @param id 
     * @param count 
     */

    net_addItem(id: number, count: number, isShop: boolean = false, isGuideBuy: boolean = false) {
        this.currentData.addItem(id, count, isShop, isGuideBuy);
    }
    /**
     * 消耗道具
     * @param id 
     * @param count 
     * @returns 
     */

    net_costItem(id: number, count: number) {
        return this.currentData.costItem(id, count);
    }
    /**
     * 道具升级
     * @param id 道具ID
     * @param lv 等级
     * @param ut 升级类型
     * @param uc 升级花费
     */

    net_upItem(id: number, lv: number, ut: number, uc: number) {
        // let gms = ModuleService.getModule(GameModuleS);
        // let c = ut == 1 ? uc : 0;
        // let g = ut == 2 ? uc : 0;
        this.currentData.upItem(id, lv);
        // if (gms.cost(c, g)) {
        // }
    }
}