/*
 * @Author: YuKun.Gao
 * @Date: 2022-06-27 09:56:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-06 15:25:52
 * @Description: file content
 * @FilePath: \JavaScripts\module\guideModule\GuideModuleC.ts
 */

import { GameConfig } from "../../config/GameConfig";
import { IGuideElement } from "../../config/Guide";
import { Const } from "../../const/Const";
import { GuideTarget } from "../../const/Define";
import { DataManager } from "../../data/DataManager";
import { GameUI } from "../../ui/GameUI";
import { GuideModuleView } from "../../ui/GuideModuleView";
import { UIGameOver } from "../../ui/UIGameOver";
import { UILobby } from "../../ui/UILobby";
import { UIRole } from "../../ui/UIRole";
import { UIShopCity } from "../../ui/UIShopCity";
import { MGSCenter } from "../../untils/MGSCenter";
import { Utils } from "../../untils/Utils";
import { GameModuleC } from "../game/GameModuleC";
import { ItemModuleC } from "../item/ItemModuleC";
import { GuideInfo } from "./GuideInfo";
import { GuideDataHelper } from "./GuideModelData";
import { GuideModuleS } from "./GuideModuleS";

/**
 * 新手引导客户端模块
 */
export class GuideModuleC extends ModuleC<GuideModuleS, GuideDataHelper> {

    /**
     * 预设引导信息列表
     */
    private guideInfoList: Array<GuideInfo> = [];

    /**
     * 是否初始化
     */
    private isInit: boolean = false;

    /**
     * 当前引导Id
     */
    private curGuideIdVal: number = 0;

    /**
     * 当前正在运行的引导
     */
    private runningGuide: GuideInfo = null;

    /**
     * 阶段完成广播
     */
    public guideComplateAction: mw.Action1<number> = new mw.Action1<number>();

    /**
     * 覆盖角色GameObject
     */
    private _reSetCharGo: mw.GameObject;

    /**
     * 覆盖到达目标点距离判断 默认50 小于50则到达
     */
    private _reSetToTargetPosDistance: number = 50;

    /**
     * 引导起始点z偏移
     */
    private _arrowStartPosOffsetZ: number = 0;

    public guideCfg: IGuideElement[];
    private _gameModule: GameModuleC;

    /**当前是否有引导 */
    public get currentGuideIsNull() {
        return this.runningGuide == null;
    }

    onStart() {
        this._gameModule = ModuleService.getModule(GameModuleC);
        this.guideCfg = GameConfig.Guide.getAllElement();
        Event.addLocalListener(Const.COMPLETE_GUIDE_SCENE, (isForceStop: boolean) => {
            if (isForceStop) {
                this.forceCompleteCurrentGuide();
                //接触限制左右移动
                mw.UIService.getUI(GameUI).isStartGuide = false;
                this._gameModule.completeGuide(GuideTarget.Scene);
                console.log(`当前的引导状况！！！！！${this.currentGuideIsNull}`);
            }
        });
    }

    /**
     * 进入场景
     * @param sceneType 
     */
    public init(): void {
        //初始化引导
        if (this.isInit == false) {
            this.initGuide();
        }

        let looby = mw.UIService.getUI(UILobby);
        let shop = mw.UIService.getUI(UIShopCity);
        let gameOver = mw.UIService.getUI(UIGameOver);
        let gameUI = mw.UIService.getUI(GameUI);
        let role = mw.UIService.getUI(UIRole);

        //大厅开始按钮引导
        let guide1 = this.addGuideStageHandle(1);
        guide1.addBindUI({ ui: looby.mBtn_Start, handDir: 1, isShowMask: false }).addRunFunc(this.loobyGuideCallBack);

        //新手关卡引导的ui数据
        let guide2 = this.addGuideStageHandle(2);
        let uiLeft: string[] = [`mCanvas_Left`, `mTxt_Left`];
        let uiRight: string[] = [`mCanvas_Right`, `mTxt_Right`];
        let uiUp: string[] = [`mCanvas_UP`, `mTxt_UP`];
        let uiDown: string[] = [`mCanvas_Down`, `mTxt_Down`];
        guide2.addUiData({
            uiId: 1,
            uiName: uiLeft,
            oriPos: new mw.Vector2(640, 790),
            isEnableTween: true,
            startPos: new mw.Vector2(640, 790),
            endPos: new mw.Vector2(22, 790),
        }, {
            uiId: 2,
            uiName: uiRight,
            oriPos: new mw.Vector2(16, 790),
            isEnableTween: true,
            startPos: new mw.Vector2(16, 790),
            endPos: new mw.Vector2(620, 790),
        }, {
            uiId: 3,
            uiName: uiUp,
            oriPos: new mw.Vector2(300, 1340),
            isEnableTween: true,
            startPos: new mw.Vector2(300, 1340),
            endPos: new mw.Vector2(300, 200),
        }, {
            uiId: 4,
            uiName: uiDown,
            oriPos: new mw.Vector2(324, 180),
            isEnableTween: true,
            startPos: new mw.Vector2(324, 180),
            endPos: new mw.Vector2(324, 1340),
        }, {//技能指引
            uiId: 5,
            uiName: ["mTxt_SkillTips"],
            lockUI: mw.UIService.getUI(GameUI).btnItem2,
        });

        guide2.addBindWorldPos(new mw.Vector(1400, 1000, 80));
        this.guideCfg.forEach((e, i) => {
            guide2.addBindWorldPosByConditionAndUI(e.EndPos + 1200, e.ActionType, null).addRunFunc(() => {
                //埋点
                MGSCenter.ts_tutorial_step(i + 1);
            });

            if (i == 0) {
                guide2.addRunFunc(() => {
                    gameUI.isStartGuide = false;
                });
            }
            if (i == this.guideCfg.length - 1) {
                guide2.addRunFunc(() => {
                    DataManager.isGuideScene = false;
                    ModuleService.getModule(GameModuleC).completeGuide(GuideTarget.Scene);

                    //显示奖励提示界面
                    DataManager.isShowRewardUI = true;
                });
            }

            //倒数第二个
            if (i == this.guideCfg.length - 2) {
                guide2.addRunFunc(() => {
                    //放出第二技能按钮
                    gameUI.guideButtonAction(2);
                });
            }

            //最后一个引导
            if (i == this.guideCfg.length - 1) {
                guide2.addRunFunc(() => {
                    //正常完成场景引导回收关卡
                    Event.dispatchToLocal(Const.COMPLETE_GUIDE_SCENE, false);
                });
            }
        });


        //第一局结束界面商店引导
        let guide3 = this.addGuideStageHandle(3);
        guide3.addBindUI({ ui: gameOver.mBtn_Shop, handDir: 1 }).addRunFunc(() => {
            MGSCenter.ts_action_firstdo(2);
            this.triggerGuide(4);
        });
        let guide4 = this.addGuideStageHandle(4);
        guide4.addBindUI({ ui: shop.guideItem, handDir: 2 }).addRunFunc(() => {
            MGSCenter.ts_action_firstdo(3);
            Utils.setUIVisible(true, gameOver.mCanvasRole, looby.mCanvasShop);
            this._gameModule.completeGuide(GuideTarget.Shop);
        });

        //商店引导 直接打开商店界面
        let guide10 = this.addGuideStageHandle(10);
        guide10.addBindUI({ ui: shop.guideItem, handDir: 2 }).addRunFunc(() => {
            MGSCenter.ts_action_firstdo(3);
            Utils.setUIVisible(true, gameOver.mCanvasRole);
            this._gameModule.completeGuide(GuideTarget.Shop);
        });



        //第二局结束界面角色引导
        let guide5 = this.addGuideStageHandle(5);
        guide5.addBindUI({ ui: gameOver.mBtn_Role, handDir: 1 }).addRunFunc(() => {
            MGSCenter.ts_action_firstdo(5);
            this.triggerGuide(6);
        });
        let guide6 = this.addGuideStageHandle(6);
        guide6.addBindUI({ ui: role.guideRole.headUI }).addRunFunc(() => {
            MGSCenter.ts_action_firstdo(6);
            this.triggerGuide(7);
        });
        let guide7 = this.addGuideStageHandle(7);
        guide7.addBindUI({ ui: role.guideRole.buyUI }).addRunFunc(() => {
            MGSCenter.ts_action_firstdo(7);
            Utils.setUIVisible(true, looby.mCanvasRole);
            this._gameModule.completeGuide(GuideTarget.Role);
        });

        //角色引导 直接打开角色界面
        let guide8 = this.addGuideStageHandle(8);
        guide8.addBindUI({ ui: role.guideRole.headUI }).addRunFunc(() => {
            MGSCenter.ts_action_firstdo(6);
            this.triggerGuide(9);
        });
        let guide9 = this.addGuideStageHandle(9);
        guide9.addBindUI({ ui: role.guideRole.buyUI }).addRunFunc(() => {
            MGSCenter.ts_action_firstdo(7);
            Utils.setUIVisible(true, looby.mCanvasRole);
            this._gameModule.completeGuide(GuideTarget.Role);
        });

        if (DataManager.isGuideScene) {
            //禁止左右移动
            gameUI.isStartGuide = true;

            //隐藏技能按钮
            gameUI.guideButtonAction(3);

            //开始赠送110个金币
            ModuleService.getModule(GameModuleC).guideAddMoney(100);
        }

        let time = setTimeout(() => {
            if (DataManager.isGuideScene) {
                if (DataManager.isReady || DataManager.isGaming) {
                    this.loobyGuideCallBack();
                    this.triggerGuide(2);
                } else {
                    this.triggerGuide(1);
                }
                clearTimeout(time);
            }
        }, 3000);

        this.guideComplateAction.add((id) => {
            if (id == 1 && DataManager.isGuideScene) {
                this.triggerGuide(2);
            }
        });
    }


    private loobyGuideCallBack = () => {
        let looby = mw.UIService.getUI(UILobby);
        Utils.setUIVisible(true, looby.mCanvasShop);

        //赠送新手关卡奖励
        let imc = ModuleService.getModule(ItemModuleC);
        if (imc.getItemCount(2) < 1) {
            imc.addItem(2, 8);
            imc.addItem(3, 3);
            imc.addItem(5, 3);
            imc.addItem(1, 5);
        }

        //防止出现的按钮不会消失的情况
        mw.UIService.getUI(GuideModuleView).hideAllItem();
    }









    /**
     * 初始化引导模块
     */
    private initGuide() {

        if (this.isInit == false) this.isInit = true;

        //初始化当前阶段
        this.curGuideIdVal = this.data.getCurGuide();

        //清理掉通过的引导阶段
        // let newList = [];
        // this.guideInfoList.forEach((v) => {
        //     if (v.guideStage >= this.curGuideIdVal) {
        //         newList.push(v);
        //     }
        // })
        // this.guideInfoList = newList;

        //排序引导
        this.guideInfoList = this.guideInfoList.sort((a, b) => {
            return a.guideStage - b.guideStage;
        })

        //触发当前引导
        //TODO:考虑后这里不触发了，还是又外部去触发
        // let guideInfo = this.guideInfoList.find(e => { return e.guideStage == this.curStageVal })

        //监听引导完成
        this.guideComplateAction.add((guideId: number) => {
            console.log("GuideModuleC : 监听引导完成" + guideId);
            this.server.net_ComplateGuide(guideId);
        }, this);
    }


    /**
     * 添加引导
     * @param guideId 引导id - 不要重复
     * @return 引导信息
     */
    public addGuideStageHandle(guideId: number): GuideInfo {

        // 检测引导Id是否可用

        let canUseGuideId = true;
        this.guideInfoList.forEach(e => {
            if (e.guideStage == guideId) canUseGuideId = false;
        })
        if (!canUseGuideId) {
            console.log("repeat stage val : " + guideId);
            return null;
        }

        // 创建引导

        let guideInfo = new GuideInfo(this.guideComplateAction);
        guideInfo.guideStage = guideId;
        this.guideInfoList.push(guideInfo);
        return guideInfo;
    }

    /**
     * 触发引导
     * @param guideId 阶段id 
     */
    public triggerGuide(guideId: number): boolean {

        // 查询引导
        let guide = this.guideInfoList.find(e => e.guideStage == guideId)

        if (guide == null) {
            console.log("[GuideModuleC] : find guide info error -> stage = " + guideId + " " + this.guideInfoList.length);
            return false;
        }


        // 判断引导是否完成
        // if (this.data.guideIsComplate(guideId)) return false;


        // 执行引导

        this.runningGuide = guide;

        // 设置当前引导

        this.server.net_SetCurrentRunGuide(guideId);

        this.curGuideIdVal = guideId

        //mw.UIService.getUI(GuideModuleView).show();// getUI().show();
        mw.UIService.show(GuideModuleView);

        return true;

    }

    /**
     * Tick
     * @param dt 
     */
    onUpdate(dt: number): void {
        // 更新当前引导
        if (this.runningGuide) {
            this.runningGuide.handle(dt);
        }
    }

    /**
     * 强制关闭当前引导
     */
    private forceCompleteCurrentGuide() {
        this.runningGuide = null;
        mw.UIService.getUI(GuideModuleView).hideAllItem();
        mw.UIService.hide(GuideModuleView)
    }

}