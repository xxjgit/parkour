/*
 * @Author: pengwei.shi
 * @Date: 2022-11-09 17:25:21
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-27 14:38:43
 * @FilePath: \streetparkour\JavaScripts\ui\UILobby.ts
 * @Description: 
 */

import { GameConfig } from "../config/GameConfig";
import { IRandomRankElement } from "../config/RandomRank";
import { SPSound } from "../const/Define";
import { DataManager } from "../data/DataManager";
import { GameModuleC } from "../modules/game/GameModuleC";
import LobbyUI_generate from "../ui-generate/LobbyUI_generate";
import { MGSCenter } from "../untils/MGSCenter";
import { Sound } from "../untils/Sound";
import { Utils } from "../untils/Utils";
import { GameUI } from "./GameUI";
import { UIRankItem } from "./UIRankItem";
import { UIRole } from "./UIRole";
import { UIShopCity } from "./UIShopCity";

export class UILobby extends LobbyUI_generate {
    /**排行数据 */
    private _rankData: { name: string, score: number }[];
    private _onShowRankList: UIRankItem[];
    private _rankUIPool: UIRankItem[];
    public rankNameCfg: IRandomRankElement[];
    public gameModule: GameModuleC;
    protected onStart(): void {
        this._rankData = [];
        this._onShowRankList = [];
        this._rankUIPool = [];
        this.rankNameCfg = GameConfig.RandomRank.getAllElement();
        this.gameModule = ModuleService.getModule(GameModuleC);
        this.initRankData();

        this.initUI();
        this.layer = mw.UILayerMiddle;
    }

    /**
     * 音效暂停与播放
     */
    private soundAction() {
        let re = Sound.instance.setSoundActive();
        if (re) {
            Utils.setUIVisible(true, this.mSoundActive);
            Utils.setUIVisible(false, this.mSoundNotActive);
        } else {
            Utils.setUIVisible(false, this.mSoundActive);
            Utils.setUIVisible(true, this.mSoundNotActive);
        }
    }

    private initUI() {
        this.mTxt_Name.text = mw.AccountService.getNickName();
        mw.AccountService.fillAvatar(this.mImg_Head_Icon);
        Utils.setUIVisible(false, this.mCanvas_Rank);
        this.mBtn_Start.onClicked.add(() => {
            this.gameModule.gameStart();
            mw.UIService.show(GameUI, true);
            mw.UIService.hide(UILobby);
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.lobbyGoButton();
            if (DataManager.isGuideScene) {
                MGSCenter.ts_tutorial_start();
            }
        });

        this.mBtn_OpenRank.onClicked.add(() => {
            Utils.setUIVisible(true, this.mCanvas_Rank);
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.mgsRank();
        });

        this.mBtn_CloseRank.onClicked.add(() => {
            Utils.setUIVisible(false, this.mCanvas_Rank);
            Sound.instance.gameSound(SPSound.PressButton);
        });

        this.mBtn_Sound.onClicked.add(() => {
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.lobbyCloseSound();
            this.soundAction();
        });

        //角色换装
        this.mBtn_OpenRoleClothes.onClicked.add(() => {
            mw.UIService.show(UIRole);
            mw.UIService.hide(UILobby);
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.mgsLobbyRole();
        });

        //商店
        this.mBtn_Shop.onClicked.add(() => {
            mw.UIService.show(UIShopCity);
            mw.UIService.hide(UILobby);
            MGSCenter.mgsLobbyShop();
            Sound.instance.gameSound(SPSound.PressButton);
        });
    }

    /**
     * 初始化排行榜数据
     */
    private initRankData() {
        let indexSet: number[] = [];
        while (indexSet.length <= 10) {
            let index = mw.MathUtil.randomInt(0, this.rankNameCfg.length);
            if (indexSet.indexOf(index) == -1) {
                indexSet.push(index);
            }
        }
        indexSet.forEach((id, index) => {
            let name = this.rankNameCfg[id].name;
            let rankData = { name: Utils.getTxt(name), score: 0 }
            if (index < 3) {
                rankData.score = mw.MathUtil.randomInt(40000, 88888);
            } else if (index >= 3 && index < 10) {
                rankData.score = mw.MathUtil.randomInt(20000, 40001);
            } else {
                rankData.score = mw.MathUtil.randomInt(0, 20001);
            }
            this._rankData.push(rankData);
        });
    }

    /**
     * 刷新排行榜ui
     */
    private onRefreshRank() {

        this.mTxt_PointNum.text = this.gameModule.maxScore.toFixed(0);
        this.mTxt_MoneyNum.text = this.gameModule.curCoin.toFixed(0);

        //加入玩家自己的分数
        let name = mw.AccountService.getNickName();
        if (this._rankData.find(i => i.name == name)) {
            this._rankData.find(i => i.name == name).score = this.gameModule.maxScore;
        } else {
            this._rankData.push({ name: mw.AccountService.getNickName(), score: this.gameModule.maxScore });
        }
        this._rankData.sort((a, b) => {
            if (a.score > b.score) return -1;
            else return 1;
        });

        let pos = mw.Vector2.zero;
        let size: mw.Vector2 = null;
        for (let i = 0; i < this._rankData.length; i++) {
            let rui = this._rankUIPool.shift();
            if (!rui) {
                rui = mw.UIService.create(UIRankItem);
            }
            if (!size) {
                size = rui.size;
            }
            rui.reset();
            this.mScrollBox.addChild(rui.uiObject);
            rui.uiObject.size = size;
            rui.uiObject.position = pos;
            rui.initData(i + 1, this._rankData[i].name, this._rankData[i].score);
            this._onShowRankList.push(rui);
            pos.y += rui.size.y + 10;
            rui.setVisible(mw.SlateVisibility.Visible);
        }
    }


    protected onHide(): void {
        this._onShowRankList.forEach((ui) => {
            ui.setVisible(false);
            this._rankUIPool.push(ui);
        });
        this._onShowRankList.length = 0;
        Utils.setUIVisible(false, this.mCanvas_Rank);
    }

    protected onShow(isShowRank: boolean = false): void {
        this.onRefreshRank();
        let name = mw.AccountService.getNickName();
        if (this._rankData.find(i => i.name == name)) {
            this.mTxt_SelfRanking.text = (this._rankData.findIndex(i => i.name == name) + 1).toFixed(0);
            this.mTxt_SelfScore.text = this._rankData.find(i => i.name == name).score.toFixed(0);
        } else {
            this.mTxt_SelfRanking.text = "0";
            this.mTxt_SelfScore.text = "0";
        }
        Sound.instance.gameBGM(SPSound.Lobby);

        if (isShowRank) {
            Utils.setUIVisible(true, this.mCanvas_Rank);
        }

    }
}