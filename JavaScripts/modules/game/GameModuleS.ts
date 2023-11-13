/** 
 * @Author       : pengwei.shi
 * @Date         : 2022-12-02 16:23:14
 * @LastEditors  : xianjie.xia
 * @LastEditTime : 2023-03-09 11:03
 * @FilePath     : \streetparkour\JavaScripts\modules\game\GameModuleS.ts
 * @Description  : 修改描述
 */
/*
 * @Author: xianjie.xia
 * @LastEditors: xianjie.xia
 * @Date: 2022-11-01 11:36
 * @LastEditTime: 2022-11-22 13:32
 * @description: 
 */
import { GuideTarget } from "../../const/Define";
import { GameData } from "./GameData";
import { GameModuleC } from "./GameModuleC";

export class GameModuleS extends ModuleS<GameModuleC, GameData>{

    public override onStart(): void {
        super.onStart();
    }
    onPlayerEnterGame(player: mw.Player): void {
        super.onPlayerEnterGame(player);
    }
    /**
     * 获得货币
     * @param coin 数量
     */

    net_addMoney(coin: number, gem: number) {
        //console.log('add', coin);
        this.currentData.addMoney(coin, gem);
    }
    /**
     * 游戏得分
     */

    net_onScore(score) {
        if (this.currentData.maxScore < score) {
            this.currentData.setScore(score);
        }
    }
    /**
     * 完成引导
     * @param target 引导目标
     * @param guide 阶段
     */

    net_onGuide(target: GuideTarget, guide: number) {
        this.currentData.setGuide(target, guide);
    }

    /**
     * 消耗
     * @param type 类型
     * @param num 数量
     */

    public net_cost(coin: number, gem: number): boolean {
        if (this.currentData.costMoney(coin, gem)) {
            return true;
        }
        return false;
    }
}