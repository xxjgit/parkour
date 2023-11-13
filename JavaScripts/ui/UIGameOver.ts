/*
 * @Author: pengwei.shi
 * @Date: 2022-11-10 19:16:18
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-27 13:45:10
 * @FilePath: \streetparkour\JavaScripts\ui\UIGameOver.ts
 * @Description: 
 */
import { SPSound } from "../const/Define";
import { DataManager } from "../data/DataManager";
import { GameModuleC } from "../modules/game/GameModuleC";
import { GuideModuleC } from "../modules/guideModule/GuideModuleC";
import GameEndUI_generate from "../ui-generate/GameEndUI_generate";
import { MGSCenter } from "../untils/MGSCenter";
import { Sound } from "../untils/Sound";
import { Utils } from "../untils/Utils";
import { GameUI } from "./GameUI";
import { UILobby } from "./UILobby";
import { UIRole } from "./UIRole";
import { UIShopCity } from "./UIShopCity";

export class UIGameOver extends GameEndUI_generate {
    private _gameModule: GameModuleC;

    /**显示动画 */
    private _delay = 0.5;
    private _coin = 0;
    private _maxCoin = 0;
    private _maxScore = 0;
    private _score = 0;
    private _lastScore = 0;
    protected onStart(): void {
        this._gameModule = ModuleService.getModule(GameModuleC);

        //调用接口继续游戏
        this.mBtn_Continue.onClicked.add(() => {
            this._gameModule.gameStart();
            mw.UIService.show(GameUI, true);
            mw.UIService.hide(UIGameOver);
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.gameContine();
        });

        //回到大厅
        this.mBtn_BackHome.onClicked.add(() => {
            mw.UIService.show(UILobby, true);
            mw.UIService.hide(UIGameOver);
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.backLobby();
        });

        //跳转到角色界面逻辑
        this.mBtn_Role.onClicked.add(() => {
            mw.UIService.show(UIRole);
            mw.UIService.hide(UIGameOver);
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.mgsGameOverRole();
        });

        //跳转到商店
        this.mBtn_Shop.onClicked.add(() => {
            mw.UIService.show(UIShopCity);
            mw.UIService.hide(UIGameOver);
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.mgsGameOverShop();
        });

        this.canUpdate = true;
    }
    protected onShow(): void {
        this.mgsGameOver();
        this.mgsRefreshRecord();

        this._delay = 0.5;
        this.tipNew.visibility = mw.SlateVisibility.Collapsed;
        this._lastScore = this._gameModule.maxScore;
        this.mTxt_PointNum.text = this._lastScore.toFixed(0);
        this.mTxt_MoneyNum.text = this._gameModule.curCoin.toFixed(0);
        this._coin = 0;
        this._maxCoin = DataManager.coinNum;
        this._maxScore = DataManager.endScore;
        this._score = DataManager.curScore;
        this.mTxt_overCoin.text = '0';
        this.mTxt_overScore.text = this._score.toFixed(0);
        this._gameModule.gameEnd();
        Sound.instance.gameSound(SPSound.GameOver);

        if (DataManager.isGuideShop) {
            MGSCenter.ts_action_firstdo(1);
            Utils.setUIVisible(false, this.mCanvasRole);
            mw.UIService.getUI(GameUI).guideButtonAction(1);
            let time = setTimeout(() => {
                ModuleService.getModule(GuideModuleC).triggerGuide(3);
                clearTimeout(time);
            }, 100);
        }

        if (DataManager.isGuideRole && !DataManager.isGuideShop) {
            MGSCenter.ts_action_firstdo(4);
            let time = setTimeout(() => {
                ModuleService.getModule(GuideModuleC).triggerGuide(5);
                clearTimeout(time);
            }, 100);
        }
    }
    protected onUpdate(dt: number): void {
        this._delay -= dt;
        if (this._delay > 0)
            return;
        if (this._coin < this._maxCoin) {
            this._coin += this._maxCoin * dt;
            if (this._coin >= this._maxCoin) {
                this._coin = this._maxCoin;
                this.mTxt_MoneyNum.text = this._gameModule.curCoin.toFixed(0);
            }
            this.mTxt_overCoin.text = this._coin.toFixed(0);
        }
        if (this._score < this._maxScore) {
            this._score += this._maxCoin * dt * 12;
            if (this._score >= this._maxScore) {
                this._score = this._maxScore;
                this.mTxt_PointNum.text = this._gameModule.maxScore.toFixed(0);
                if (this._score > this._lastScore) {
                    this.tipNew.visibility = (mw.SlateVisibility.Visible)
                    Sound.instance.gameSound(SPSound.OverMaxScore);

                }
            }
            this.mTxt_overScore.text = this._score.toFixed(0);
        }
    }

    /**
     * 游戏结束埋点
     */
    private mgsGameOver() {
        DataManager.gameRound += 1;
        MGSCenter.ts_game_result(DataManager.gameTime, DataManager.gameRound);
        MGSCenter.ts_game_over_one(DataManager.endScore, DataManager.coinNum);

        //被动使用
        let sheild = DataManager.gameItems.get(2);
        let flyNum = DataManager.gameItems.get(3)?.pick || 0;
        let doubleCoin = DataManager.gameItems.get(5)?.pick || 0;
        MGSCenter.ts_game_over_three(DataManager.gemNum, sheild?.pick || 0, flyNum, doubleCoin, sheild?.use || 0, DataManager.reliveNum);

        //主动使用
        let activeFly = DataManager.gameItems.get(3)?.use || 0;
        let activeDoubleCoin = DataManager.gameItems.get(5)?.use || 0;
        MGSCenter.ts_action_pick(activeFly, activeDoubleCoin);

        //生成的道具和吃到的道具比值
        let getItems: number = 0;
        for (let [k, v] of DataManager.gameItems) {
            getItems += v.pick;
        }
        let ratio = getItems / DataManager.totalItems;
        MGSCenter.ts_game_over(ratio);
        // console.log(`生成的总道具 ${DataManager.totalItems}, 吃到的道具 ${getItems}`);
    }

    /**
     * 刷新记录
     */
    private mgsRefreshRecord() {
        let gameModule = ModuleService.getModule(GameModuleC);
        if (gameModule.maxScore < DataManager.endScore) {
            DataManager.roundWave += 1;
            MGSCenter.ts_game_over_two(DataManager.roundWave);
        }
    }
}