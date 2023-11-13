import LoadingUI from "./LoadingUI";
import { GameConfig } from "./config/GameConfig";
import { GameData } from "./modules/game/GameData";
import { GameModuleC } from "./modules/game/GameModuleC";
import { GameModuleS } from "./modules/game/GameModuleS";
import { GuideDataHelper } from "./modules/guideModule/GuideModelData";
import { GuideModuleC } from "./modules/guideModule/GuideModuleC";
import { GuideModuleS } from "./modules/guideModule/GuideModuleS";
import { ItemData } from "./modules/item/ItemData";
import { ItemModuleC } from "./modules/item/ItemModuleC";
import { ItemModuleS } from "./modules/item/ItemModuleS";
import { ObstacleModuleC } from "./modules/obstacle/ObstacleModuleC";
import { ObstacleModuleS } from "./modules/obstacle/ObstacleModuleS";
import { RoleData } from "./modules/role/RoleData";
import { RoleModuleC } from "./modules/role/RoleModuleC";
import { RoleModuleS } from "./modules/role/RoleModuleS";
import { SceneModuleC } from "./modules/scene/SceneModuleC";
import { SceneModuleS } from "./modules/scene/SceneModuleS";
import { Utils } from "./untils/Utils";
/** 
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2022-10-31 13:16
 * @LastEditTime : 2022-11-28 18:58
 * @description  : 启动类
 */
@Component
export default class GameStart extends mw.Script {

    @mw.Property({ displayName: "是否线上存储" })
    public isOnlineSave: boolean = true;

    public onStart(): void {
        // super.onStart();
        this.useUpdate = true;
        if (mw.SystemUtil.isClient()) {
            //设置配置表语言
            GameConfig.initLanguage(Utils.getLanguage(), (key) => {
                let ele = GameConfig.Language.getElement(key);
                if (ele == null) return "unknow_" + key;
                return ele.Value;
            });
            mw.UIScript.addBehavior('lan', (ui: mw.StaleButton | mw.TextBlock) => {
                let key: string = ui.text;
                if (key) {
                    let lan = GameConfig.Language.getElement(key);
                    if (lan) {
                        ui.text = (lan.Value);
                    }
                }
            })
            mw.UIService.show(LoadingUI);
        }
        else if (this.isOnlineSave) {
            DataStorage.setTemporaryStorage(mw.SystemUtil.isPIE)
            //DataStorage.setTemporaryStorage(false)
            //console.log(mw.SystemUtil.isPIE, mw.SystemUtil.isMobile());
        }


        // DataStorage.setEvn(Global.isEditor);
        this.onRegisterModule();

    }
    private onRegisterModule(): void {
        //
        ModuleService.registerModule(GameModuleS, GameModuleC, GameData);

        //ModuleService.setClientFirstStartModule(GameModuleC);
        ModuleService.registerModule(ItemModuleS, ItemModuleC, ItemData);
        ModuleService.registerModule(RoleModuleS, RoleModuleC, RoleData);
        ModuleService.registerModule(SceneModuleS, SceneModuleC, null);
        ModuleService.registerModule(ObstacleModuleS, ObstacleModuleC, null);
        ModuleService.registerModule(GuideModuleS, GuideModuleC, GuideDataHelper);

    }
    onUpdate(dt: number): void {
        super.onUpdate(dt);
        mw.TweenUtil.TWEEN.update();
    }
    protected onClientLoading(msg: string, progress: number, completeAotoClose: boolean): void {
        // if (!this._loadingUI) {
        //     this._loadingUI = mw.UIService.create(LoadingUI);
        //     this._loadingUI.rootCanvas.slot.zOrder = 2200;
        //     this._loadingUI.setVisible(mw.SlateVisibility.Visible);
        // }
        // this._loadingUI.setProgress(progress);
        // console.log(progress)
        // if (progress >= 1) {
        //     this._loadingUI.setVisible(mw.SlateVisibility.Hidden);
        //     this.enterGame();
        // }
    }
}

