
import { Const } from "../const/Const";
import { SPSound } from "../const/Define";
import { DataManager } from "../data/DataManager";
import { GameModuleC } from "../modules/game/GameModuleC";
import PauseUI_generate from "../ui-generate/PauseUI_generate";
import { Sound } from "../untils/Sound";
import { GameUI } from "./GameUI";
import { GuideModuleView } from "./GuideModuleView";
import { UIGameOver } from "./UIGameOver";

/** 
 * @Author       : pengwei.shi
 * @Date         : 2022-11-29 16:54:09
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2022-12-12 19:54:18
 * @FilePath     : \streetparkour\JavaScripts\ui\UIPause.ts
 * @Description  : 暂停界面
 */
export class UIPause extends PauseUI_generate {
    protected onStart(): void {
        this.mBtn_Yes.onClicked.add(() => {
            if (DataManager.isGuideScene) {
                Event.dispatchToLocal(Const.COMPLETE_GUIDE_SCENE, true);
            }
            mw.UIService.show(UIGameOver);
            mw.UIService.hide(UIPause);
            Sound.instance.gameSound(SPSound.PressButton);
            if (DataManager.isShowRewardUI) {
                DataManager.isShowRewardUI = false;
            }

        });

        this.mBtn_No.onClicked.add(() => {
            ModuleService.getModule(GameModuleC).gamePuase();
            mw.UIService.show(GameUI);
            mw.UIService.hide(UIPause);
            Sound.instance.gameSound(SPSound.PressButton);
            if (DataManager.isGuideScene) {
                mw.UIService.show(GuideModuleView);
            }
        });
    }

    public onShow() {
        if (DataManager.isGuideScene) {
            mw.UIService.hide(GuideModuleView);
        }
    }
}