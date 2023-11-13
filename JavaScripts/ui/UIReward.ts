

import { SPSound } from "../const/Define";
import { DataManager } from "../data/DataManager";
import RewardUI_generate from "../ui-generate/RewardUI_generate";
import { MGSCenter } from "../untils/MGSCenter";
import { Sound } from "../untils/Sound";
import { UIGameOver } from "./UIGameOver";
/** 
 * @Author       : pengwei.shi
 * @Date         : 2022-11-30 09:46:38
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2022-12-02 15:09:24
 * @FilePath     : \streetparkour\JavaScripts\ui\UIReward.ts
 * @Description  : 奖励提示ui界面
 */
export class UIReward extends RewardUI_generate {
    protected onStart(): void {
        this.mBtn_GoGameover.onClicked.add(() => {
            mw.UIService.show(UIGameOver);
            mw.UIService.hide(UIReward);
            DataManager.isShowRewardUI = false;
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.mgsActionUseItem(100);
        });
    }
}