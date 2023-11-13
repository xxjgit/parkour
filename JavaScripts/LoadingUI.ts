
import { GuideModuleView } from "../JavaScripts/ui/GuideModuleView";
import { AnimRes, EffectRes } from "./const/Define";
import { GameModuleC } from "./modules/game/GameModuleC";
import LoadingUI_generate from "./ui-generate/LoadingUI_generate";
import { GameUI } from "./ui/GameUI";
import { UIGameOver } from "./ui/UIGameOver";
import { UIGuide } from "./ui/UIGuide";
import { UILobby } from "./ui/UILobby";
import { UIPause } from "./ui/UIPause";
import { UIRelive } from "./ui/UIRelive";
import { UIRole } from "./ui/UIRole";
import { UIShopCity } from "./ui/UIShopCity";
import { MGSCenter } from "./untils/MGSCenter";

/** 
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2022-11-28 11:27
 * @LastEditTime : 2022-12-05 14:44
 * @description  : 加载页面
 */

export default class LoadingUI extends LoadingUI_generate {
    private _loadMax = 0;
    private _loadRate = 0.01;
    private _curPro = 0;
    private _wait = 0;
    private _list = [];

    private _loadNum = 0;
    private _maxNum = 0;
    private _resTime = 0;
    protected onStart(): void {
        this.layer = mw.UILayerTop;
        this._curPro = 0.01;
        this._wait = 0;
        this._loadMax = 0;
        this.showBar();
        this._list.push('2CC6A6874088E0328EDECA8434F7F284');
        for (let v in AnimRes) {
            this._list.push(AnimRes[v])
        }
        // for (let asset of GameConfig.Assets.getAllElement()) {
        //     this._list.push(asset.PrefabsGuid);
        // }
        for (let v in EffectRes) {
            this._list.push(EffectRes[v])
        }
        this._maxNum = this._list.length;
        this.canUpdate = true;
        this.layer = mw.UILayerSystem;
    }
    public setPro(pro?) {
        //console.log(pro);
        if (this._loadMax < pro)
            this._loadMax = pro * 0.5;
        this._loadMax = this._loadMax > 0.5 ? 0.5 : this._loadMax;
        if (pro > 1) {
            this._loadRate *= 0.5;
            this.enterGame();
            this.loadRes();
        }

        //console.log('hideLoad')
    }
    loadRes() {
        if (this._loadNum >= this._maxNum) {
            // console.log('done')
            this._resTime = 0;
        }
        else {
            let res = this._list.pop();
            //console.log(res);
            this._resTime = 3;
            // mw.AssetUtil.loadAsset(res)
            mw.AssetUtil.asyncDownloadAsset(res).then(() => {
                // console.log(res + ' done')
                this.resDone();
            })
        }
    }
    resDone() {
        this._loadNum++;
        this._loadMax = 0.5 + (this._loadNum / this._maxNum) * 0.5;
        if (this._loadMax > 1)
            this._loadMax = 1;
        this.loadRes();
    }
    showBar() {
        let pro = Math.floor(this._curPro * 100);
        this.txtBar.text = (pro + "%")
        this.barLoad.currentValue = (this._curPro);
    }

    protected onUpdate(dt: number): void {
        if (this._wait > 1)
            return;
        if (this._resTime > 0) {
            this._resTime -= dt;
            if (this._resTime <= 0)
                this.resDone();
        }
        if (this._curPro < this._loadMax) {
            this._curPro += this._loadRate;
            if (this._curPro >= this._loadMax) {
                this._curPro = this._loadMax;
            }
            this.showBar();
        }
        else if (this._curPro >= 1) {
            this._wait += this._loadRate * 5;
            if (this._wait > 1) {
                //this.uiObject.visibility = mw.SlateVisibility.Collapsed;
                //console.log('LoadingUI')
                //mw.UIService.show(UILobby);
                mw.UIService.hide(LoadingUI);
            }
        }
    }
    // private async loadDone() {
    //     for (let v in EffectRes) {
    //         let res = EffectRes[v];
    //         await mw.AssetUtil.asyncDownloadAsset(res);
    //         //console.log(res, Date.now())
    //     }

    //     // let i = 0;
    //     // for (let v in AnimRes) {
    //     //     i++;
    //     //     let res = AnimRes[v];
    //     //     if (i > 4) {
    //     //         await MWCore.AsyncAssetDownload(res);
    //     //         console.log(res, Date.now())
    //     //     }
    //     // }
    //     this.enterGame();
    // }
    /**
 * 加载完成，进入游戏
 */
    private enterGame() {
        MGSCenter.ts_game_start();
        mw.UIService.getUI(GuideModuleView);
        mw.UIService.show(UILobby);
        mw.UIService.getUI(GameUI);
        mw.UIService.getUI(UIGameOver);
        mw.UIService.getUI(UIPause);
        mw.UIService.getUI(UIShopCity);
        mw.UIService.getUI(UIRole);
        mw.UIService.getUI(UIRelive);
        mw.UIService.getUI(UIGuide);

        //手动初始化
        ModuleService.getModule(GameModuleC).init();
    }

}