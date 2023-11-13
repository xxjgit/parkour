/*
 * @Author: xianjie.xia
 * @LastEditors: xianjie.xia
 * @Date: 2022-10-31 14:39
 * @LastEditTime: 2022-11-25 13:38
 * @description: 
 */

import { GameState, GuideTarget, MoveType } from "../../const/Define";
import { DataManager } from "../../data/DataManager";
import { UILobby } from "../../ui/UILobby";
import { MGSCenter } from "../../untils/MGSCenter";
import { Utils } from "../../untils/Utils";
import { GuideModuleC } from "../guideModule/GuideModuleC";
import { ItemModuleC } from "../item/ItemModuleC";
import { ObstacleModuleC } from "../obstacle/ObstacleModuleC";
import { RoleModuleC } from "../role/RoleModuleC";
import { SceneModuleC } from "../scene/SceneModuleC";
import { GameData } from "./GameData";
import { GameModuleS } from "./GameModuleS";

// export namespace Modules {
//     export let userModule = ModuleService.getModule(ItemModuleC);
//     export let xxxModule = ModuleService.getModule(RoleModuleC);
// }
export class GameModuleC extends ModuleC<GameModuleS, GameData>{

    private _roleModuleC: RoleModuleC;
    private _readyTime = 0;
    //游戏初始化
    public async init() {
        DataManager.init();
        this.guideDataInit();
        this._roleModuleC = ModuleService.getModule(RoleModuleC);
        let smc = ModuleService.getModule(SceneModuleC);
        smc.init();
        await this._roleModuleC.init();

        let gmc = ModuleService.getModule(GuideModuleC);
        gmc.init();
    }

    /**
     * 引导数据更新
     */
    private guideDataInit() {
        DataManager.isGuideScene = this.data.getGuide(GuideTarget.Scene) < 1;
        DataManager.isGuideShop = this.data.getGuide(GuideTarget.Shop) < 1;
        DataManager.isGuideRole = this.data.getGuide(GuideTarget.Role) < 1;
        let looby = mw.UIService.getUI(UILobby);
        Utils.setUIVisible(false, looby.mCanvasRole, looby.mCanvasShop);
        if (!DataManager.isGuideScene) {
            Utils.setUIVisible(true, looby.mCanvasShop);
            if (!DataManager.isGuideShop) {
                Utils.setUIVisible(true, looby.mCanvasRole);
            }
        }
    }
    onUpdate(dt: number): void {
        if (DataManager.isPuase)
            return;
        else if (DataManager.isGaming)
            DataManager.gameTime += dt;
        if (this._readyTime > 0) {
            this._readyTime -= dt;
            if (this._readyTime <= 0) {
                DataManager.setState(GameState.Game)
            }
        }
    }
    /**
     * 游戏开始
     */
    public gameStart() {
        DataManager.setState(GameState.Ready)
        this._roleModuleC.gameStart();
        this._readyTime = 2;
        MGSCenter.ts_coregameplay_start();
    }
    /**
     * 暂停操作
     */
    public gamePuase() {
        this._roleModuleC.gamePuase();
        DataManager.puase();
    }
    /**
     * 复活
     */
    public relive() {
        this._roleModuleC.relive();
        DataManager.relive();
        //复活场景障碍消失
        ModuleService.getModule(ObstacleModuleC).hide();
    }
    /**
     * 重置游戏参数
     */
    public reset() {
        DataManager.init();
        this._readyTime = 0;
        this._roleModuleC.reset();
        ModuleService.getModule(SceneModuleC).reset();
        ModuleService.getModule(ObstacleModuleC).reset();
    }
    //测试的
    public test(v) {
        this._roleModuleC.test(v);
    }
    /**
     * 移动玩家
     * @param type 方式
     * @returns 
     */
    public movePlayer(type: MoveType) {
        if (!DataManager.isGaming)
            return;
        this._roleModuleC.move(type);
    }

    /**
     * 当前货币
     */
    public get curCoin(): number {
        return this.data.curCoin;
    }
    /**
     * 当前宝石
     */
    public get curGem(): number {
        return this.data.curGem;
    }
    /**
     * 当前游戏分
     */
    // public get curScore(): number {
    //     return DataManager.curScore;
    // }
    /**
     * 最高分 
     */
    public get maxScore(): number {
        return this.data.maxScore;
    }
    /**
     * 游戏结算,结算界面打开时
     */
    public gameEnd() {
        let score = DataManager.endScore;
        //this.server.onScore(score);
        if (score > this.maxScore)
            this.server.net_onScore(score);
        // this.callServerFun(this.server.onScore, score);
        this.data.addMoney(DataManager.coinNum, DataManager.gemNum);
        //this.callServerFun(this.server.addMoney, DataManager.coinNum, DataManager.gemNum);
        this.server.net_addMoney(DataManager.coinNum, DataManager.gemNum);
        this.reset();
    }

    /**
     * 完成引导
     * @param target 
     */
    public completeGuide(target: GuideTarget) {
        switch (target) {
            case GuideTarget.Scene:
                DataManager.isGuideScene = false;
                break;
            case GuideTarget.Role:
                DataManager.isGuideRole = false;
                break;
            case GuideTarget.Shop:
                DataManager.isGuideShop = false;
                break;
            default:
                break;
        }
        this.server.net_onGuide(target, 1);
    }


    /**
     * 使用道具
     * @param id 
     */
    public useItem(id: number, count: number = 1) {
        console.log('useitem:' + id);
        let ic = ModuleService.getModule(ItemModuleC);


        let prom = ic.costItem(id, count);
        if (!prom)
            return;
        prom.then((res) => {
            if (res)
                this._roleModuleC.useItem(id);
        })
    }
    /**
     * 消耗
     * @param type 类型
     * @param num 数量
     * @returns 成功
     */
    public cost(type: number, num: number): boolean {
        let c = type == 1 ? num : 0;
        let g = type == 2 ? num : 0;
        if (this.data.costMoney(c, g)) {
            // this.callServerFun(this.server.cost, c, g);
            this.server.net_cost(c, g);
            return true;
        }
        return false;
    }

    /**
     * 消耗
     * @param type 类型
     * @param num 数量
     * @returns 足够
     */
    public enough(type: number, num: number): boolean {
        let c = type == 1 ? num : 0;
        let g = type == 2 ? num : 0;
        return this.data.enough(c, g);
    }

    /**
     * 引导增加金币
     * @param num 
     */
    public guideAddMoney(num: number) {
        if (this.data.curCoin < num) {
            let coin = num - this.data.curCoin;
            this.data.addMoney(coin, 0);
            this.server.net_addMoney(coin, 0);
        }
    }
}