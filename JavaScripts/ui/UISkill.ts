/** 
 * @Author       : pengwei.shi
 * @Date         : 2022-12-02 13:52:36
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-01-12 15:18:32
 * @FilePath     : \streetparkour\JavaScripts\ui\UISkill.ts
 * @Description  : 修改描述
 */
/*
 * @Author: pengwei.shi
 * @Date: 2022-11-22 17:47:45
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-28 10:27:37
 * @FilePath: \streetparkour\JavaScripts\ui\UISkill.ts
 * @Description: 
 */
import { GameConfig } from "../config/GameConfig";
import { IItemElement } from "../config/Item";
import { PriceType, SPUIEvent } from "../const/Define";
import SkillItemUI_generate from "../ui-generate/SkillItemUI_generate";
import SkillUI_generate from "../ui-generate/SkillUI_generate";
import { Utils } from "../untils/Utils";

class UISkillItem extends SkillItemUI_generate {
    public setActiveTime(time: number) {
        this.mTxt_ActiveTime.text = time.toString();
    }
}


export class UISkill extends SkillUI_generate {
    private _skillID: number;
    /**道具每个等级的持续生效时间 */
    private _activeTimeList: number[];
    /**道具持续生效时间的下标、可以看作等级 */
    private _curLvIndex: number;
    /**记录前一个技能等级ui */
    private _preLevelItemUI: UISkillItem;
    private _row: number;
    private _pos: mw.Vector2;
    private _itemCfg: IItemElement;
    public get skillID() {
        return this._skillID;
    }
    /**
     * 初始化技能ui界面
     * @param id 
     * @param currentLv 当前等级
     * @param row 行距 
     */
    public initUI(id: number, currentLv: number, row: number) {
        this._itemCfg = GameConfig.Item.getElement(id);
        this._row = row;
        this._skillID = id;
        this._curLvIndex = -1;
        this.mTxt_Des.text = Utils.getTxt(this._itemCfg.desc);
        this.mTxt_Name.text = Utils.getTxt(this._itemCfg.name);
        this._pos = mw.Vector2.zero;
        this.mImg_Icon.imageGuid = this._itemCfg.icon;
        this._activeTimeList = this._itemCfg.time.concat();

        //添加等级ui、设置每个等级的技能持续时间
        this.addSkillLevelItem(currentLv);

        this.mBtn_LvUp.onClicked.add(() => {
            Event.dispatchToLocal(SPUIEvent.SkillLvUp, this._skillID);
        });
        this.refreshSkillLevelUI(currentLv);
    }

    /**
     * 刷新当前等级ui
     * @param lv 
     */
    public refreshSkillLevelUI(lv: number) {
        if (lv > this._curLvIndex) {
            this.addSkillLevelItem(lv);
        }
        this.refreshPriceTypeUI(lv);
    }

    /**
     * 添加等级ui
     * @param lv 
     */
    private addSkillLevelItem(lv: number) {
        let preSizeX: number = 0;
        for (let i = this._curLvIndex + 1; i <= lv; i++) {
            let ui = mw.UIService.create(UISkillItem);
            let preSlot = ui.uiObject;
            preSizeX = preSlot.size.x;
            this.mLevelContent.addChild(ui.uiObject);
            preSlot.position = this._pos;
            this._pos.x += this._row;
            this._pos.x += preSizeX;
            ui.setActiveTime(this._activeTimeList[i]);

            //前一个技能等级ui变暗
            if (this._preLevelItemUI) {
                this._preLevelItemUI.uiObject.renderOpacity = 0.5;
            }
            this._preLevelItemUI = ui;
        }
        this._curLvIndex = lv;
    }


    private refreshPriceTypeUI(lv: number) {
        Utils.setUIVisible(false, this.mIcon_Diamonds, this.mIcon_coin);
        if (this._itemCfg.upType[lv] == PriceType.Coin) {
            Utils.setUIVisible(true, this.mIcon_coin);
        } else if (this._itemCfg.upType[lv] == PriceType.Diamonds) {
            Utils.setUIVisible(true, this.mIcon_Diamonds);
        }
        if (this._itemCfg.upCost[lv]) {
            this.mTxt_Price.text = this._itemCfg.upCost[lv].toString();
        } else {
            this.mIcon_Diamonds.visibility = mw.SlateVisibility.Collapsed;
            this.mIcon_coin.visibility = mw.SlateVisibility.Collapsed;
            this.mTxt_Price.text = Utils.getTxt(`UI_Tips_1`);
        }
    }
}