import { GameState } from "../const/Define";
import { GameUI } from "../ui/GameUI";
import { UIRelive } from "../ui/UIRelive";
import { MGSCenter } from "../untils/MGSCenter";

/**
 * @Author       : xianjie.xia
 * @LastEditors  : pengwei.shi
 * @Date         : 2022-11-04 11:25
 * @LastEditTime : 2022-11-27 15:02:12
 * @description  : 游戏中数据
 */
export class DataManager {
    /**
     * 游戏状态
     */
    public static gameState: GameState = GameState.None;
    /**
     * 游戏进行到的距离位置，供场景刷新
     */
    public static gameDis: number = 0;
    /**
     * 埋点使用 游戏时间
     */
    public static gameTime: number = 0;
    /**
     * 埋点使用 游戏轮数
     */
    public static gameRound: number = 0;
    /**
     * 埋点使用 刷新最高分的次数
     */
    public static roundWave: number = -1;
    /**
     * 复活次数
     */
    public static reliveNum: number = 0;
    /**
     * 游戏内获得的货币
     */
    public static coinNum: number = 0;
    public static gemNum: number = 0;
    /**
     * 是否新手关卡引导中
     */
    public static isGuideScene: boolean = true;

    /**
     * 是否需要商店引导
     */
    public static isGuideRole: boolean = true;

    /**
     * 是否需要角色界面引导
     */
    public static isGuideShop: boolean = true;

    /**
     * 所有引导是否完成
     */
    public static allGuideIsCompelete: boolean = true;

    /**
     * 首次玩游戏在结算界面前
     * 提示玩家获得奖励的ui界面
     */
    public static isShowRewardUI: boolean = false;

    /**
     * 新手撞墙提示
     */
    public static isGuideTips: boolean = false;

    //马车移动速度
    public static carSpeed = 200;
    /**
     * 上次的状态，暂停使用
     */
    private static _lastState: GameState = GameState.None;

    /**
     * 道具使用统计
     * id 道具ID
     * use 主动使用数量
     * pick 场景拾取数量
     */
    public static gameItems: Map<number, { id: number, use: number, pick: number }> = new Map();
    /**
     * 每一局生成的总道具量
     */
    public static totalItems: number = 0;
    /**
     * 游戏数据初始化
     */
    public static init() {
        this.setState(GameState.Init);
        this.gameDis = 0;
        this.reliveNum = 0;
        this.coinNum = 0;
        this.gemNum = 0;
        this.gameTime = 0;
        this.gameItems.clear();
        this.totalItems = 0;
    }

    // public static testNum = 0;
    /**
     * 是否游戏进行中
     */
    public static get isGaming() {
        return this.gameState == GameState.Game;
    }
    //准备中
    public static get isReady() {
        return this.gameState == GameState.Ready;
    }
    //暂停中
    public static get isPuase() {
        return this.gameState == GameState.Puase;
    }
    //已结束
    public static get isEnd() {
        return this.gameState == GameState.End;
    }
    /**
     * 获得金币
     * @param num 数量 
     */
    public static addCoin(num: number) {
        //50金币打点
        if (this.coinNum < 50 && this.coinNum + num >= 50)
            MGSCenter.ts_coregameplay_end();
        this.coinNum += num;
    }
    /**
     * 获得宝石
     * @param num 数量 
     */
    public static addGem(num: number) {
        this.gemNum += num;
    }
    /**
     * 当前游戏分
     */
    public static get curScore(): number {
        return Math.ceil(this.gameDis * 0.07);
    }
    /**
     * 结算分
     */
    public static get endScore(): number {
        return this.curScore + this.coinNum * 12;
    }
    /**
     * 设置游戏状态
     * @param state 状态
     */
    public static setState(state: GameState) {
        this.gameState = state;
    }
    /**
     * 暂停操作
     */
    public static puase(puase = false) {
        if (puase) {
            this._lastState = this.gameState;
            this.gameState = GameState.Puase;
        }
        if (this.gameState == GameState.Puase && !puase)
            this.gameState = this._lastState;
        else {
            this._lastState = this.gameState;
            this.gameState = GameState.Puase;
        }
    }
    /**
     * 道具触发统计
     * @param id 道具ID
     * @param use 主动使用
     */
    public static onItem(id: number, use: boolean) {
        let info = this.gameItems.get(id);
        if (!info)
            info = { id: id, use: 0, pick: 0 };
        if (use)
            info.use++;
        else
            info.pick++;
        this.gameItems.set(id, info);
    }
    /**
     * 死亡 结束游戏
     */
    public static onDie() {
        this.setState(GameState.End);

    }
    /**
     * 游戏结算
     */
    public static onEnd() {
        this.setState(GameState.Over);
        //复活
        mw.UIService.hide(GameUI);
        mw.UIService.show(UIRelive);
        // mw.UIService.show(UIGameOver)
        //console.log('结算界面')
    }
    /**
     * 复活
     */
    public static relive() {
        this.reliveNum++;
        mw.UIService.show(GameUI);
        this.setState(GameState.Game);
    }

}