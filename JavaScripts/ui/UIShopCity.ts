
import { GameConfig } from "../config/GameConfig";
import { IItemElement } from "../config/Item";
import { SPSound, SPUIEvent } from "../const/Define";
import { DataManager } from "../data/DataManager";
import { GameModuleC } from "../modules/game/GameModuleC";
import { GuideModuleC } from "../modules/guideModule/GuideModuleC";
import { ItemModuleC } from "../modules/item/ItemModuleC";
import ShopCityUI_generate from "../ui-generate/ShopCityUI_generate";
import { MGSCenter } from "../untils/MGSCenter";
import { Sound } from "../untils/Sound";
import { UILobby } from "./UILobby";
import { UIShopCityItem } from "./UIShopCityItem";
import { UISkill } from "./UISkill";
/** 
 * @Author       : pengwei.shi
 * @Date         : 2022-12-02 13:52:36
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2022-12-05 10:33:02
 * @FilePath     : \streetparkour\JavaScripts\ui\UIShopCity.ts
 * @Description  : 商城ui
 */
export class UIShopCity extends ShopCityUI_generate {

    private _propMap: UIShopCityItem[];
    private _propCfg: IItemElement[];
    private _gameModule: GameModuleC;
    private _itemModule: ItemModuleC;

    private _skillMap: UISkill[];

    public get getItem(): UIShopCityItem {
        return this._propMap[0];
    }

    public guideItem: mw.Widget;

    public onStart() {
        this.layer = mw.UILayerMiddle;
        this._propCfg = [];
        this._propCfg = GameConfig.Item.getAllElement();
        this._gameModule = ModuleService.getModule(GameModuleC);
        this._itemModule = ModuleService.getModule(ItemModuleC);

        this.mBtn_BackLobby.onClicked.add(() => {
            mw.UIService.show(UILobby);
            mw.UIService.hide(UIShopCity);
            Sound.instance.gameSound(SPSound.PressButton);
        });

        let pos: mw.Vector2 = mw.Vector2.zero;

        //初始化道具模块
        this._propMap = [];
        this.initPropCanvas(pos);
        Event.addLocalListener(SPUIEvent.PropPress, this.buyProp);

        //初始化技能模块
        this._skillMap = [];
        this.initSkillsCanvas(pos);
        Event.addLocalListener(SPUIEvent.SkillLvUp, this.upSkillLevel);

        this.refreshUINum();
    }


    /**
     * 初始化道具界面
     */
    private initPropCanvas(pos: mw.Vector2) {
        /**行距 */
        let propRow: number = 90;
        /**列距 */
        let propColumn: number = 90;
        /**一行显示几个商品 */
        let propRowNum: number = 2;
        let propSize: mw.Vector2;
        let propPos: mw.Vector2 = pos;

        for (let prop of this._propCfg) {
            if (prop.type > 0) {
                let ui = mw.UIService.create(UIShopCityItem);
                ui.initUI(prop.id);
                this._propMap.push(ui);
            }
        }

        if (!this._propMap[0]) {
            console.warn(`道具商城数量为0`);
            return;
        }
        propSize = this._propMap[0].rootCanvas.size;
        let t = 0;
        propPos.x = propRow;
        for (let propUI of this._propMap) {
            t += 1;
            this.mScrollBox.addChild(propUI.uiObject);
            propUI.uiObject.position = propPos;
            propPos.x += propSize.x;
            propPos.x += propRow;
            //换行
            if (t >= propRowNum) {
                t = 0;
                propPos.y += propSize.y;
                propPos.y += propColumn;
                propPos.x = propRow;
            }
        }
        propPos.x = 0;
        this.guideItem = this._propMap[0].mBtn_Buy;
    }


    /**
     * 购买道具
     * @param propID 
     */
    private buyProp = (propID: number) => {
        let data = this._propCfg.find(i => i.id == propID);
        if (this._gameModule.enough(data.priceType, data.price)) {
            this._gameModule.cost(data.priceType, data.price);
            this._itemModule.addItem(propID, 1, true);
            //更新界面数量
            let ui = this._propMap.find(i => i.propID == propID);
            ui.setPropNum();
            this.refreshUINum();

            Sound.instance.gameSound(SPSound.BuyRole);
        }
    }


    /**
     * 初始化技能界面
     */
    private initSkillsCanvas(pos: mw.Vector2) {
        /**技能列距 */
        let skillColumn: number = 20;
        /**技能子级等级的行距 */
        let skillLvItemRow: number = 18;
        let skillPos: mw.Vector2 = pos;
        let preSize: mw.Vector2 = null;
        skillPos.x = 0;
        for (let prop of this._propCfg) {
            if (prop.type > 1) {
                let ui = mw.UIService.create(UISkill);
                if (!preSize) {
                    preSize = ui.uiObject.size;
                }
                this.mScrollBox.addChild(ui.uiObject);
                ui.uiObject.position = skillPos;
                ui.uiObject.size = preSize;

                //初始化技能ui
                let lv = this._itemModule.getItemLv(prop.id);
                ui.initUI(prop.id, lv, skillLvItemRow);

                this._skillMap.push(ui);
                skillPos.y += preSize.y;
                skillPos.y += skillColumn;
            }
        }
    }


    /**
     * 技能升级
     * @param id 
     */
    private upSkillLevel = (id: number) => {
        let skillUI = this._skillMap.find(i => i.skillID == id);
        if (skillUI) {
            if (this._itemModule.upItem(id)) {
                let lv = this._itemModule.getItemLv(id);
                skillUI.refreshSkillLevelUI(lv);
                this.refreshUINum();
            }
        }
    }

    /**
     * 刷新道具、货币数量
     */
    private refreshUINum() {
        this.mTxt_Shield.text = this._itemModule.getItemCount(2).toString();
        this.mTxt_Rebirth.text = this._itemModule.getItemCount(1).toString();
        this.mTxt_Coin.text = this._gameModule.curCoin.toString();
        this.mTxt_Diamonds.text = this._gameModule.curGem.toString();
    }


    protected onShow(): void {
        MGSCenter.ts_task(1);
        this.mScrollBox.scrollOffset = 0;
        //每次打开都需要刷新
        this.refreshUINum();
        this._propMap.forEach(item => {
            item.setPropNum();
        });

        let gmc = ModuleService.getModule(GuideModuleC);
        if (DataManager.isGuideShop && gmc.currentGuideIsNull) {
            let time = setTimeout(() => {
                gmc.triggerGuide(10);
                clearTimeout(time);
            }, 100);
        }
    }
}