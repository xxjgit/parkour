/*
 * @Author: YuKun.Gao
 * @Date: 2022-06-27 10:36:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-01 14:41:49
 * @Description: file content
 * @FilePath: \JavaScripts\module\guideModule\GuideInfo.ts
 */


import { Const } from "../../const/Const";
import { GuideModuleView } from "../../ui/GuideModuleView";
import { GuideContent } from "./GuideContent";

/**
 * 引导缓动动画数据
 */
export type UIData = {
    uiId: number,
    /**需要显示的ui，默认控制名称带有Canvas的进行缓动 */
    uiName?: string[],
    /**ui的默认位置 */
    oriPos?: mw.Vector2,
    isEnableTween?: boolean,
    /**ui缓动的开始位置 */
    startPos?: mw.Vector2,
    /**ui缓动的结束位置 */
    endPos?: mw.Vector2,
    /**缩放 */
    scale?: number,
    /**锁定的ui */
    lockUI?: mw.Widget
};

/**
 * 引导信息
 */

enum GuideState {

    /**
     * 拉取任务
     * */
    Pull,

    /**
     * 等待完成UI
     */
    WaitUI,

    /**
     * 等待到达世界坐标
     */
    WaitToPos,

    /**
     * 等待完成自定义条件
     */
    ConditionRes,

    /**
     * 执行自定义函数
     */
    RunFunc,

    /**
     * 完成
     */
    Complate,

}

/**
 * 引导任务阶段
 */
export class GuideTaskStage {

    /**
     * 任务类型
     */
    public type: GuideState;

    /**
     * UI关联组件
     */
    public uiWidget: mw.Widget = null;

    /**
     * 默认刷新dt
     */
    public refrashDt: number = GuideContent.ConstRefrashUITime;

    /**
     * 当前刷新UI的dt
     */
    public curReFrashDt: number = 0;

    /**
     * 需要引导到达的位置
     */
    public toWorldPos: mw.Vector = null;

    /**
     * UI完成需要检测的条件
     */
    public uiCheckCondition: () => boolean = null;

    /**
     * 完成需要检测的条件
     */
    public checkCondition: Array<() => boolean> = [];

    /**
     * 引导UI时的提示语言
     */
    public tips: string = "";

    /**
     * 需要执行的自定义函数
     */
    public runFuncs: Array<() => void> = [];

    /**提示ui的id */
    public uiTipsID: number = 0;

    /**手指的指向 */
    public handDir: number = 1;

    public isShowMask: boolean = true;

    public copy(): GuideTaskStage {
        let condition: mw.Widget | mw.Vector | Array<() => boolean> = null;
        switch (this.type) {
            case GuideState.WaitUI:
                condition = this.uiWidget;
                break;
            case GuideState.WaitToPos:
                condition = this.toWorldPos;
                break;
            case GuideState.ConditionRes:
                condition = this.checkCondition;
                break;
        }

        let res = GuideTaskStage.newGuideTaskStage(this.type, condition, this.uiTipsID, this.runFuncs, this.uiCheckCondition, this.handDir, this.isShowMask)
        res.tips = this.tips;
        return res;
    }

    /**
     * 创建引导任务阶段
     * @param type 类型
     * @param condition 条件
     */
    public static newGuideTaskStage(type: GuideState,
        condition: mw.Widget | mw.Vector | Array<() => boolean>, uiTipsID: number = 0,
        runFuncs: Array<() => void> = [],
        uiConditionRes: () => boolean = null, handDir: number = 1, isShowMask: boolean = true) {

        let guideTaskStage = new GuideTaskStage();
        guideTaskStage.type = type;
        guideTaskStage.uiTipsID = uiTipsID;
        guideTaskStage.handDir = handDir;
        guideTaskStage.isShowMask = isShowMask;
        switch (type) {
            case GuideState.WaitUI:
                if (condition instanceof mw.Widget) {
                    guideTaskStage.uiWidget = condition;
                }
                guideTaskStage.uiCheckCondition = uiConditionRes;
                break;
            case GuideState.WaitToPos:
                if (condition instanceof mw.Vector)
                    guideTaskStage.toWorldPos = condition;

                guideTaskStage.uiCheckCondition = uiConditionRes;
                break;
            case GuideState.ConditionRes:
                if (condition instanceof Array)
                    guideTaskStage.checkCondition = condition;
                break;
            case GuideState.RunFunc:
                guideTaskStage.runFuncs = runFuncs;
                break;
        }

        return guideTaskStage;

    }

}

/**
 * 引导信息
 */
export class GuideInfo {

    /**
     * ui缓动动画数据
     */
    private uiTweenMap: UIData[];

    /**
     * 引导阶段
     */
    public guideStage: number = 0;

    /**
     * 引导列表
     */
    private taskStage: Array<GuideTaskStage> = [];

    /**
     * 源引导列表
     */
    private srcStage: Array<GuideTaskStage> = [];

    /**
     * 当前引导状态
     */
    private curState: GuideState = GuideState.Pull;

    /**
     * 引导完成后的通知
     */
    private complateNotify: mw.Action1<number> = null;

    /**
     * 每100毫秒刷新下UI
     */
    private refrashUITime: number = 0.1;

    constructor(complateNotify: mw.Action1<number>) {
        this.complateNotify = complateNotify;
        this.uiTweenMap = [];
    }


    /**
         * 添加引导ui上tween动画的数据
         * 分别是名称、开始位置、结束位置
         * 
         * 需要优先于所有引导添加
         * @param params 
         */
    public addUiData(...params: UIData[]) {
        params.forEach((e) => {
            this.uiTweenMap.push(e);
        });
    }
    /**
     * 关联引导UI - 过滤按钮 - 自定义通过条件
     * @param widget 
     * @param condition 
     * @returns 
     */
    public addBindUIByCondition(widget: mw.Widget, condition: () => boolean): GuideInfo {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitUI, widget, null, [], condition);
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }

    /**
     * 关联引导UI - 过滤按钮 - 自定义通过条件 - 带提示
     * @param widget 
     * @param condition 
     * @returns 
     */
    public addBindUIAndTipsByCondition(widget: mw.Widget, tips: string, condition: () => boolean): GuideInfo {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitUI, widget, null, [], condition);
        stage.tips = tips;
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }

    /**
     * 关联引导UI - 按顺序压入
     * @param widget 
     * @returns 
     */
    //TODO:这位置可以加一个callback 做埋点等
    public addBindUI(...widgets: { ui: mw.Widget, handDir?: number, isShowMask?: boolean }[]): GuideInfo {
        widgets.forEach((v, i, arrs) => {
            let dir = v.handDir ? v.handDir : 1;
            let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitUI, v.ui, 0, null, null, dir, v.isShowMask);
            this.taskStage.push(stage);
            this.srcStage.push(stage.copy());
        });
        return this;
    }

    public addBindUIAndCallBack(...widgets: { ui: mw.Widget, condition: () => boolean, handDir?: number, isShowMask?: boolean }[]): GuideInfo {
        widgets.forEach((v, i, arrs) => {
            let dir = v.handDir ? v.handDir : 1;
            let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitUI, v.ui, 0, null, v.condition, dir, v.isShowMask);
            this.taskStage.push(stage);
            this.srcStage.push(stage.copy());
        });
        return this;
    }

    /**
     * 关联引导UI 可以带Tips
     * @param widget 
     * @param tips 
     * @returns 
     */
    public addBindUIAndTips(widget: mw.Widget, tips: string): GuideInfo {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitUI, widget);
        stage.tips = tips;
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }

    /**
     * 关联引导UI - 按顺序压入 - 跟随UI刷新
     * @param widget 
     * @returns 
     */
    public addBindUIAlawaysRefrash(...widgets: mw.Widget[]): GuideInfo {
        widgets.forEach((v, i, arrs) => {
            let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitUI, v);
            stage.refrashDt = 0;
            stage.curReFrashDt = 0;
            this.taskStage.push(stage);
            this.srcStage.push(stage.copy());

        })
        return this;
    }

    /**
     * 关联世界坐标 - 按顺序压入
     * @param poslist 
     * @returns 
     */
    public addBindWorldPosAndUI(uiId: number, pos: mw.Vector): GuideInfo {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitToPos, pos, uiId);
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }

    /**
     * 关联世界坐标 - 自定义通过条件 - 按顺序压入
     * @param poslist 
     * @param uiID 
     * @param callback 
     * @returns 
     */
    public addBindWorldPosByConditionAndUI(posx: number, uiID: number, callback: () => boolean): GuideInfo {
        let pos = new mw.Vector(posx, Const.BASE_POS, 80);
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitToPos, pos, uiID, [], callback);
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }

    /**
    * 关联世界坐标 - 按顺序压入
    * @param poslist 
    * @returns 
    */
    public addBindWorldPos(...poslist: mw.Vector[]): GuideInfo {
        poslist.forEach((v, i, arrs) => {
            let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitToPos, v);
            this.taskStage.push(stage);
            this.srcStage.push(stage.copy());
        })
        return this;
    }

    /**
     * 关联世界坐标 - 自定义通过条件 - 按顺序压入
     * @param poslist 
     * @param callback 
     * @returns 
     */
    public addBindWorldPosByCondition(poslist: mw.Vector, callback: () => boolean): GuideInfo {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitToPos, poslist, null, [], callback);
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }

    /**
     * 添加一个引导完成条件 - 按顺序压入
     * @param condition 
     * @returns 
     */
    public addCondition(...condition: (() => boolean)[]): GuideInfo {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.ConditionRes, condition);
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }

    /**
     * 添加一个自定义执行函数
     * @param func 
     */
    public addRunFunc(...funcs: (() => void)[]): GuideInfo {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.RunFunc, null, null, funcs);
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }

    /**
     * 重置所有引导阶段
     */
    public resetAllStage() {
        this.curState = GuideState.Pull;
        this.refrashUITime = 0.1;
        this.taskStage = [];
        for (let i = 0; i < this.srcStage.length; ++i) {
            this.taskStage.push(this.srcStage[i].copy());
        }
    }

    /**
     * 获取当前引导任务
     */
    public getCurTask(): GuideTaskStage {

        if (this.taskStage.length <= 0) return null;

        return this.taskStage[0];

    }

    /**
     * 执行处理
     */
    public handle(dt: number) {

        /**
         * 当前状态是拉取任务
         */
        if (this.curState == GuideState.Pull) {
            this.pullTask();
            return;
        }

        if (this.curState == GuideState.WaitUI) {
            this.taskStage[0].curReFrashDt -= dt;
            if (this.taskStage[0].curReFrashDt <= 0) {
                let first = this.taskStage[0].uiWidget;
                this.beginUITask(first);
                let stage = this.taskStage[0];
                if (stage.uiCheckCondition && stage.uiCheckCondition()) {
                    mw.UIService.getUI(GuideModuleView).hideAllItem();
                    this.onUITaskCallback();
                    return;
                }
            }
            return;
        }

        /** 
         * 验证是否到达目标点
         */
        if (this.curState == GuideState.WaitToPos) {
            mw.UIService.getUI(GuideModuleView).setGuideArrowTargetPos(this.taskStage[0].toWorldPos, null, true);
            return;
        }

        /**
         * 验证是否完成自定义条件
         */
        if (this.curState == GuideState.ConditionRes) {
            if (this.checkCondition()) {
                this.curState = GuideState.Pull;
                this.taskStage.shift();
            }
            return;
        }

    }

    /**
     * 拉取任务
     */
    private pullTask() {

        let task: GuideTaskStage = null;

        //当前是否还有任务
        if (this.taskStage.length > 0) {



            //获取最前面的任务
            task = this.taskStage[0];

            //拉取UI任务
            if (task.type == GuideState.WaitUI) {
                let stage = this.taskStage[0];
                let first = this.taskStage[0].uiWidget;
                this.beginUITask(first);
                return;
            } else {
                mw.UIService.getUI(GuideModuleView).showMask(false);
            }

            //拉取目标点任务
            if (task.type == GuideState.WaitToPos) {
                let toPos = this.taskStage[0].toWorldPos;
                let id = this.taskStage[0].uiTipsID;
                let data = this.uiTweenMap.find(i => i.uiId == id);
                if (data) {
                    this.beginToWorldPosTask(toPos, data);
                } else {
                    this.beginToWorldPosTask(toPos);
                }
                return;
            }

            //拉取自定义判断条件
            if (task.type == GuideState.ConditionRes) {
                this.curState = GuideState.ConditionRes;
                return;
            }

            //拉取自定义运行函数
            if (task.type == GuideState.RunFunc) {
                // oTrace("执行自定义函数")
                this.taskStage.shift();
                this.curState = GuideState.Pull;
                try {
                    task.runFuncs.forEach((v, i, arrs) => {
                        v();
                    })
                } catch (ex) {
                    console.log(ex.stack);
                }
                return;
            }

        }

        //拉取不到任务 - 完成引导
        this.curState = GuideState.Complate;
        mw.UIService.getUI(GuideModuleView).showMask(false);
        if (this.complateNotify) {
            this.complateNotify.call(this.guideStage);
        }

    }

    /**
     * 检测并且完成引导
     */
    public checkCondition(): boolean {
        let res = true;
        this.taskStage[0].checkCondition.forEach(v => {
            if (!v()) res = false;
        })
        return res;
    }

    /**
     * UI任务触发完成后的回调
     */
    private onUITaskCallback() {

        this.curState = GuideState.Pull;
        this.taskStage.shift();

    }

    /**
     * 引导到目标地点后的回调
     */
    private onWorldToPosTaskCallback(): boolean {

        //oTrace("回调到达目标点")

        let stage = this.taskStage[0];
        if (stage.uiCheckCondition != null) {
            let res = stage.uiCheckCondition();
            if (!res) {
                return false;
            }
        }

        this.curState = GuideState.Pull;
        this.taskStage.shift();

        return true;

    }

    /**
     * 开始UI引导
     * @param widget 要引导点击的目标UI对象或区域
     */
    private beginUITask(widget: mw.Widget) {

        this.taskStage[0].curReFrashDt = this.taskStage[0].refrashDt;
        let dir = this.taskStage[0].handDir;
        let isShowMask = this.taskStage[0].isShowMask;
        this.curState = GuideState.WaitUI;
        mw.UIService.getUI(GuideModuleView).lockMWUIWidget(widget, this.onUITaskCallback.bind(this),
            this.taskStage[0].tips, this.taskStage[0].uiCheckCondition == null, isShowMask, dir);

    }

    /**
     * 开始到目标点引导
     * @param toPos 目标点
     */
    private beginToWorldPosTask(toPos: mw.Vector, uiData?: UIData) {
        this.curState = GuideState.WaitToPos;
        mw.UIService.getUI(GuideModuleView).showMask(false);
        mw.UIService.show(GuideModuleView);
        mw.UIService.getUI(GuideModuleView).setGuideArrowTargetPos(toPos, this.onWorldToPosTaskCallback.bind(this), false, uiData);
    }

}