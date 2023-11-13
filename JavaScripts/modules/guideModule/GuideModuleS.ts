/** 
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2023-03-14 17:16
 * @LastEditTime : 2023-05-15 17:30
 * @description  : 
 */
/*
 * @Author: YuKun.Gao
 * @Date: 2022-06-27 09:56:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-01 14:47:41
 * @Description: file content
 * @FilePath: \JavaScripts\module\guideModule\GuideModuleS.ts
 */
import { GuideDataHelper } from "./GuideModelData";
import { GuideModuleC } from "./GuideModuleC";

/**
 * 新手引导服务器模块
 */
export class GuideModuleS extends ModuleS<GuideModuleC, GuideDataHelper> {


    /**
     * 设置当前执行的引导
     * @param guideId 
     */
    public net_SetCurrentRunGuide(guideId: number) {

        this.currentData.setCurGuide(guideId);

    }

    /**
     * 重置所有引导
     */
    public net_ResetAllGuide() {
        this.currentData.resetAllGuide();
    }
    /**
     * 重置指定引导
     * @param guideId 
     * @returns 
     */
    public net_ResetGuideAtGuideId(guideId: number): boolean {

        return this.currentData.resetGuideById(guideId);

    }
    /**
     * 完成引导
     * @param guideId 
     */
    public net_ComplateGuide(guideId: number) {
        //oTrace("完成引导 : " + guideId)

        // 引导是否完成

        if (this.currentData.guideIsComplate(guideId)) {
            return
        }


        // 完成引导

        this.currentData.onComplate(guideId);
    }

    /**
     * 引导是否完成
     * @param guideId 
     */
    public guideIsComplate(guideId: number, playerId: number): boolean {

        return DataCenterS.getData(playerId, GuideDataHelper).guideIsComplate(guideId);

    }

}