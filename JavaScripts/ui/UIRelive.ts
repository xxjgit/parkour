/** 
 * @Author       : pengwei.shi
 * @Date         : 2022-12-02 13:52:36
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2022-12-02 15:12:11
 * @FilePath     : \streetparkour\JavaScripts\ui\UIRelive.ts
 * @Description  : 修改描述
 */

import { SPSound } from "../const/Define";
import { DataManager } from "../data/DataManager";
import { GameModuleC } from "../modules/game/GameModuleC";
import { ItemModuleC } from "../modules/item/ItemModuleC";
import ReliveUI_generate from "../ui-generate/ReliveUI_generate";
import { Sound } from "../untils/Sound";

import { UIGameOver } from "./UIGameOver";
import { UIReward } from "./UIReward";
/** 
 * @Author       : xianjie.xia
 * @LastEditors  : pengwei.shi
 * @Date         : 2022-11-22 14:56
 * @LastEditTime : 2022-11-30 09:54:33
 * @description  : 
 */
export class UIRelive extends ReliveUI_generate {
    //复活道具ID
    private _itemID: number = 1;
    //复活消耗
    private _costNum: number = 1;
    protected onStart(): void {
        let imc = ModuleService.getModule(ItemModuleC);
        this.mBtn_Yes.onClicked.add(() => {
            if (imc.costItem(this._itemID, this._costNum)) {
                ModuleService.getModule(GameModuleC).relive();
                mw.UIService.hide(UIRelive);
                DataManager.onItem(this._itemID, true);
            }
            Sound.instance.gameSound(SPSound.PressButton);
        });

        this.mBtn_No.onClicked.add(() => {
            if (!DataManager.isShowRewardUI) {
                mw.UIService.show(UIGameOver);
                mw.UIService.hide(UIRelive);
            } else {
                mw.UIService.show(UIReward);
                mw.UIService.hide(UIRelive);

            }
            Sound.instance.gameSound(SPSound.PressButton);
        });
    }
    protected onShow(...params: any[]): void {
        let imc = ModuleService.getModule(ItemModuleC);
        let num = imc.getItemCount(this._itemID);
        this.txtItem.text = num.toString();
        this._costNum = DataManager.reliveNum + 1;

        this.mBtn_Yes.enable = num >= this._costNum;
        let vis = num < this._costNum ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
        this.txtTip.visibility = vis;
        this.txtCount.text = 'x' + this._costNum;
        let color = num > 0 ? new mw.LinearColor(1, 1, 1) : new mw.LinearColor(1, 0, 0)
        this.txtCount.fontColor = color;
    }
}