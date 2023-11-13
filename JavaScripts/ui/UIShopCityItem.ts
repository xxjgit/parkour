
import { GameConfig } from "../config/GameConfig";
import { PriceType, SPUIEvent } from "../const/Define";
import { ItemModuleC } from "../modules/item/ItemModuleC";
import ShopCityItemUI_generate from "../ui-generate/ShopCityItemUI_generate";
import { Utils } from "../untils/Utils";
/** 
 * @Author       : pengwei.shi
 * @Date         : 2022-12-05 11:38:37
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2022-12-05 14:51:33
 * @FilePath     : \streetparkour\JavaScripts\ui\UIShopCityItem.ts
 * @Description  : 修改描述
 */
export class UIShopCityItem extends ShopCityItemUI_generate {
    private _propID: number;
    public get propID() {
        return this._propID;
    }
    public initUI(propID: number) {
        let data = GameConfig.Item.getElement(propID);
        this.mIcon_Prop.imageGuid = data.icon;
        this.mTxt_PropName.text = Utils.getTxt(data.name);
        this.mTxt_Price.text = data.price.toFixed(0);
        this._propID = propID;
        this.mBtn_Buy.onClicked.add(() => {
            Event.dispatchToLocal(SPUIEvent.PropPress, this._propID);
        });
        Utils.setUIVisible(false, this.mIcon_Diamonds, this.mIcon_coin);
        if (data.priceType == PriceType.Coin) {
            Utils.setUIVisible(true, this.mIcon_coin);
        } else {
            Utils.setUIVisible(true, this.mIcon_Diamonds);
        }
        this.setPropNum();
    }

    /**
     * 设置当前玩家获得该道具的数量
     * @param num 
     */
    public setPropNum() {
        let num = ModuleService.getModule(ItemModuleC).getItemCount(this._propID);
        this.mTxt_Num.text = num.toString();
    }
}