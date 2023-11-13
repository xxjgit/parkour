/*
 * @Author: pengwei.shi
 * @Date: 2022-11-18 15:47:15
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-27 14:40:37
 * @FilePath: \streetparkour\JavaScripts\ui\UIRole.ts
 * @Description: 角色换装功能的ui
 */

import { GameConfig } from "../config/GameConfig";
import { IRoleElement } from "../config/Role";
import { PriceType, SPSound, SPUIEvent } from "../const/Define";
import { DataManager } from "../data/DataManager";
import { GameModuleC } from "../modules/game/GameModuleC";
import { GuideModuleC } from "../modules/guideModule/GuideModuleC";
import { RoleModuleC } from "../modules/role/RoleModuleC";
import RoleUI_generate from "../ui-generate/RoleUI_generate";
import { MGSCenter } from "../untils/MGSCenter";
import { Sound } from "../untils/Sound";
import { Utils } from "../untils/Utils";
import { GameUI } from "./GameUI";
import { UILobby } from "./UILobby";
import { UIRoleHead } from "./UIRoleHead";
import { UIShopCity } from "./UIShopCity";

export class UIRole extends RoleUI_generate {

    private _roleData: IRoleElement[];
    /**在界面中玩家最终选择装备的ID */
    public finalEquipID: number
    /**当前显示的服装id */
    public curClothesIDInPage: number = 1;

    public guideRole: { headUI: mw.Widget, buyUI: mw.Widget };
    protected onStart(): void {
        this.layer = mw.UILayerMiddle;
        this._roleData = [];
        this._roleData = GameConfig.Role.getAllElement();
        this.curClothesIDInPage = 1;
        Event.addLocalListener(SPUIEvent.SelectIcon, (id: number) => {
            this.curClothesIDInPage = id;
            this.refreshUIByID(id);
            Sound.instance.gameSound(SPSound.PressButton);
        });
        this.initUI();
    }

    private initUI() {
        Utils.setUIVisible(false, this.mCanvasBuy, this.mCanvasEquip);

        let distanceY = 20;
        let loc = mw.Vector2.zero;
        let preSize: mw.Vector2 = null;
        for (let data of this._roleData) {
            let ui = mw.UIService.create(UIRoleHead);
            if (!preSize) {
                preSize = ui.uiObject.size;
            }
            this.mCanvasContent.addChild(ui.uiObject);
            ui.uiObject.position = loc;
            ui.initUI(data.id, data.Icon);
            loc.y += preSize.y;
            loc.y += distanceY;

            if (data.id == 2) {
                this.guideRole = { headUI: ui.mBtn_Select, buyUI: this.mBtn_Buy };
            }
        }

        this.mBtn_Return.onClicked.add(() => {
            mw.UIService.show(UILobby);
            mw.UIService.hide(UIRole);
            Sound.instance.gameSound(SPSound.PressButton);
        });

        //购买
        this.mBtn_Buy.onClicked.add(this.buyRole);

        //装备
        this.mBtn_Equip.onClicked.add(() => {
            this.finalEquipID = this.curClothesIDInPage;
            this.refreshUIByID(this.curClothesIDInPage);
            Sound.instance.gameSound(SPSound.PressButton);
        });

        //直接开始游戏
        this.mBtn_Continue.onClicked.add(() => {
            ModuleService.getModule(GameModuleC).gameStart();
            mw.UIService.show(GameUI, true);
            mw.UIService.hide(UIRole);
            Sound.instance.gameSound(SPSound.PressButton);
        });

        //回到大厅
        this.mBtn_BackHome.onClicked.add(() => {
            mw.UIService.show(UILobby);
            mw.UIService.hide(UIRole);
            Sound.instance.gameSound(SPSound.PressButton);
        });

        //跳转到商店
        this.mBtn_Shop.onClicked.add(() => {
            mw.UIService.show(UIShopCity);
            mw.UIService.hide(UIRole);
            Sound.instance.gameSound(SPSound.PressButton);
        });
    }

    /**
     * 购买角色
     */
    private buyRole = () => {
        let role = this._roleData.find(i => i.id == this.curClothesIDInPage);
        let roleModule = ModuleService.getModule(RoleModuleC);
        let gameModule = ModuleService.getModule(GameModuleC);
        if (gameModule.enough(role.CurrencyType, role.Cost)) {
            if (roleModule.refreshClothesData(role.id)) {
                gameModule.cost(role.CurrencyType, role.Cost);
                this.finalEquipID = this.curClothesIDInPage;
                this.refreshUIByID(this.curClothesIDInPage);
                Sound.instance.gameSound(SPSound.BuyRole);
            }
        }
    }

    /**
     * 通过索引刷新界面
     * @param index 
     */
    private refreshUIByID(id: number) {

        Utils.setUIVisible(false, this.mCanvasBuy, this.mCanvasEquip, this.mCanvasEquipped, this.mIcon_Coins, this.mIcon_Diamonds);

        Event.dispatchToLocal(SPUIEvent.SelectRole, this.curClothesIDInPage);

        let data = this._roleData.find(i => i.id == id);
        this.mImg_Role.imageGuid = data.Verticaldraw;
        this.mTxt_Name.text = Utils.getTxt(data.Name);
        this.mTxt_Des.text = Utils.getTxt(data.Desc);
        let gmc = ModuleService.getModule(GameModuleC);
        this.mTxt_Money.text = gmc.curCoin.toString();
        this.mTxt_Diamonds.text = gmc.curGem.toString();

        this.mTxt_price.text = data.Cost.toFixed(0);
        if (data.CurrencyType == PriceType.Coin) {
            Utils.setUIVisible(true, this.mIcon_Coins);
        } else {
            Utils.setUIVisible(true, this.mIcon_Diamonds);
        }

        let playerData = ModuleService.getModule(RoleModuleC).roleData;
        let resultIndex = playerData.clothesIDs.indexOf(data.id);
        if (resultIndex == -1) {
            //玩家未购买
            Utils.setUIVisible(true, this.mCanvasBuy);
        } else if (data.id == this.finalEquipID) {
            //玩家已装备
            Utils.setUIVisible(true, this.mCanvasEquipped);
        } else {
            Utils.setUIVisible(true, this.mCanvasEquip);
        }

    }

    protected onShow(): void {
        MGSCenter.ts_task(2);
        this.finalEquipID = ModuleService.getModule(RoleModuleC).roleData.equipID;
        this.refreshUIByID(this.curClothesIDInPage);

        let gmc = ModuleService.getModule(GuideModuleC);
        if (DataManager.isGuideRole && gmc.currentGuideIsNull) {
            let time = setTimeout(() => {
                gmc.triggerGuide(8);
                clearTimeout(time);
            }, 100);
        }

    }


    protected onHide(): void {
        if (ModuleService.getModule(RoleModuleC).roleData.equipID != this.finalEquipID) {
            ModuleService.getModule(RoleModuleC).refreashEquipData(this.finalEquipID);
        }
    }
}