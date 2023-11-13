/*
 * @Author: YuKun.Gao
 * @Date: 2022-06-27 09:56:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-01 14:30:11
 * @Description: file content
 * @FilePath: \JavaScripts\module\guideModule\GuideModuleView.ts
 */

import { DataManager } from "../data/DataManager";
import { UIData } from "../modules/guideModule/GuideInfo";
import { GuideModuleC } from "../modules/guideModule/GuideModuleC";
import GuideModuleUI_generate from "../ui-generate/GuideModuleUI_generate";
import { ActionMgr } from "../untils/ActionMgr";
import { Utils } from "../untils/Utils";

/**
 * 新手引导UI
 */

export class GuideModuleView extends GuideModuleUI_generate {

    /**
     * 接收空间坐标
     */
    private outPixelPos: mw.Vector2 = new mw.Vector2(0, 0);
    /**
     * 用于接收视口坐标
     */
    private outViewPos: mw.Vector2 = new mw.Vector2(0, 0);

    /**
     * 当前引导绑定Target
     */
    private bindTarget: mw.Widget = null;

    /**
     * 按钮触发后的通知
     */
    private btnClickToGuide: () => void = null;

    /**
     * 按钮触发后的事件传递
     */
    private btnClickToTarget: () => void = null;

    /**
     * 到达目标点后的回调
     */
    private toTargetPosCallback: () => boolean = null;

    /**
     * 目标点
     */
    private targetPos: mw.Vector;

    /**指定的提示ui */
    private tipsUI: mw.Widget[];
    /**指定提示ui的tween动画 */
    private tipsTween: mw.Tween<{ loc: mw.Vector2, scale: number }>;
    /**判断指定提示ui是否生效，防止多次执行 */
    private tipsActive: boolean = false;

    /**游戏手指缓动动画 */
    private lockHandTween: mw.Tween<{ loc: mw.Vector2, scale: number }>;
    /**判断手指tween是否生效 */
    private activeLockTween: boolean = false;

    /**
     * 模块初始化
     */
    public onStart() {

        this.layer = mw.UILayerDialog;
        this.canUpdate = true;

        this.mLeftMask.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mLeftMask");
        });
        this.mTopMask.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mTopMask");
        });
        this.mButtomMask.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mButtomMask");
        });
        this.mRightMask.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mRightMask");
        });
        this.mBtn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mBtn");
        });

        this.mBtn.onClicked.add(() => {
            this.buttonClick();
        });

        // 设置隐藏mask
        this.showMask(false);

        // 隐藏按钮
        this.mBtn.visibility = (mw.SlateVisibility.Hidden);
        this.mBtnHand.visibility = (mw.SlateVisibility.Hidden);

        this.tipsUI = [];
    }

    /**
     * 隐藏所有的组件
     */
    public hideAllItem() {
        // 设置隐藏mask
        this.showMask(false);
        // 隐藏按钮
        Utils.setUIVisible(false, this.mTopMask, this.mBtn, this.mBtnHand);

        this.targetPos = null;

        this.resetTweenAnimation();

    }

    /**
     * mask显隐
     * @param isShow 
     */
    public showMask(isShow: boolean, isShowMask: boolean = false) {
        // 隐藏引导组件

        let state = mw.SlateVisibility.Visible;
        if (!isShow) state = mw.SlateVisibility.Hidden;

        this.mTopMask.visibility = (state);
        this.mButtomMask.visibility = (state);
        this.mLeftMask.visibility = (state);
        this.mRightMask.visibility = (state);
        if (isShow) {
            mw.UIService.show(GuideModuleView);
        }
        else {
            mw.UIService.hide(GuideModuleView);
        }

        // console.log(`sssssssssssssssssssss         ${isShow}     ${isDontHidePanel}`);
        if (!isShowMask) {
            mw.UIService.show(GuideModuleView);
            this.mTopMask.visibility = mw.SlateVisibility.Hidden;
            this.mButtomMask.visibility = mw.SlateVisibility.Hidden;
            this.mLeftMask.visibility = mw.SlateVisibility.Hidden;
            this.mRightMask.visibility = mw.SlateVisibility.Hidden;
        }
    }

    public onShow() {
        Utils.setUIVisible(false, this.mTouchMask);
    }

    /**
     * 引导button点击后的回调
     */
    private buttonClick = () => {

        // 完成当前引导
        if (this.btnClickToGuide) {
            this.btnClickToGuide();
            this.btnClickToGuide = null;
        }

        // 触发对应点击按钮事件
        if (this.btnClickToTarget) {
            this.btnClickToTarget();
            this.btnClickToTarget = null;
            this.bindTarget = null;
        }

        this.resetTweenAnimation()

        // 隐藏按钮组件
        this.mBtn.visibility = (mw.SlateVisibility.Hidden);
        this.mBtnHand.visibility = (mw.SlateVisibility.Hidden);

    }

    /**
     * 重置tween动画
     * 以及动画相关的ui
     */
    private resetTweenAnimation() {
        if (this.tipsTween && this.tipsTween.isPlaying()) {
            this.tipsTween.stop();
        }

        if (this.lockHandTween && this.lockHandTween.isPlaying()) {
            this.lockHandTween.stop();
        }

        this.tipsActive = false;
        this.activeLockTween = false;

        this.tipsUI.forEach((v) => {
            v.visibility = mw.SlateVisibility.Hidden;
        });
        this.tipsUI.length = 0;
    }

    /**
     * 设置引导到目标点
     * @param targetPos 目标点 
     * @param callback 回调
     */
    public async setGuideArrowTargetPos(targetPos: mw.Vector, callback: () => boolean, bUpdateArrow: boolean = false, uiData?: UIData) {

        // 检查玩家是否到达目标点
        let guideModuleC = ModuleService.getModule(GuideModuleC);

        if (uiData && !this.tipsActive) {
            let tweenUI: mw.Widget = null;
            uiData.uiName?.forEach((e, i) => {
                let ui = this.rootCanvas.getChildByName(e);
                ui.visibility = mw.SlateVisibility.HitTestInvisible;
                this.tipsUI.push(ui);
                if (e.indexOf(`Canvas`) >= 0) {
                    tweenUI = ui;
                }
            });

            //tween动画
            if (uiData.isEnableTween) {
                // console.log(`tweenUI名称！！！！${tweenUI.name}`);
                this.setGuideArrowTargetPosUiTip(tweenUI, uiData.startPos,
                    uiData.endPos, uiData.scale);
            }
            //锁定ui
            if (uiData.lockUI) {
                this.lockMWUIWidget(uiData.lockUI, null, null, true, false, 2);
            }
        }


        if (!bUpdateArrow) {

            //oTrace("设置到达目标点");

            // 设置到达目标点后的回调

            this.toTargetPosCallback = callback;


            // 设置目标点

            this.targetPos = targetPos;

        }
        let playerPos = DataManager.gameDis;
        if (playerPos > targetPos.x) {
            // 回调到达目标点

            if (this.toTargetPosCallback) {
                let res = this.toTargetPosCallback();
                if (!res) return;
                this.showMask(false);
                this.resetTweenAnimation()
            }

            this.toTargetPosCallback = null;
            return;
        }

    }


    private setGuideArrowTargetPosUiTip(ui: mw.Widget, startPos: mw.Vector2, endPos: mw.Vector2, scale: number) {
        if (this.tipsTween && this.tipsTween.isPlaying()) {
            this.tipsTween.stop();
        }
        let tScale = scale ? scale : 1;
        let uiScale = mw.Vector2.zero;
        this.tipsTween = new mw.Tween({ loc: startPos.clone(), scale: tScale }).to({ loc: endPos.clone(), scale: 1 }, 1000).onUpdate(v => {
            ui.position = v.loc;
            uiScale.x = v.scale;
            uiScale.y = v.scale;
            ui.renderScale = uiScale;
        }).onStop(() => {
            ui.renderScale = mw.Vector2.one;
            this.tipsUI?.forEach(e => {
                e.visibility = mw.SlateVisibility.Hidden;
            });
        }).repeat(Infinity).onComplete(() => {
            this.tipsUI.forEach((v) => {
                v.visibility = mw.SlateVisibility.Hidden;
            });
        }).onRepeat(() => {
            if (DataManager.isGuideTips && DataManager.isGuideScene) {
                ui.position = startPos.clone();
                this.tipsUI?.forEach(e => {
                    e.visibility = mw.SlateVisibility.Visible;
                });
                DataManager.isGuideTips = false;
            } else {
                this.tipsUI?.forEach(e => {
                    e.visibility = mw.SlateVisibility.Hidden;
                });
            }
        }).start();
    }


    /**
     * 锁定对象
     * @param target 
     * @param callback 
     * @param tips 
     * @param isShowBtn 需要监听自定义条件的时候才会展示
     * @param isShowMask 
     * @returns 
     */
    public lockMWUIWidget(target: mw.Widget, callback: () => void, tips: string = "", isShowBtn: boolean = true, isShowMask: boolean, handDir: number = 1) {


        if (target.tickSpaceGeometry == null || this.activeLockTween) {
            return;
        }
        // 获取target的slot信息
        let target_slot = target;


        mw.localToViewport(target.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);


        // 如果对象是一个按钮，则同时添加一个监听消息，点击覆盖区域后触发对应按钮事件


        if (this.bindTarget != target) {
            this.btnClickToGuide = callback;
            this.bindTarget = target;
            if (target instanceof mw.Button || target instanceof mw.StaleButton) {
                //技能引导、部分因gameui层级与guidemoduleview层级不同做的特殊处理
                if (target.name == `btnItem2`) {
                    let skiilButtonClick: () => void;
                    skiilButtonClick = () => {
                        this.buttonClick();
                        (target as mw.Button).onClicked.remove(skiilButtonClick);
                    }
                    (target as mw.Button).onClicked.add(skiilButtonClick);
                } else {
                    this.btnClickToTarget = () => {
                        (target as mw.Button).onClicked.broadcast();
                    }
                }
            }
        }

        if (!this.outViewPos || this.outViewPos.equals(mw.Vector2.zero)) {
            return;
        }


        const viewportSize = mw.WindowUtil.getViewportSize();;

        let targetSlotSize = target_slot.size;

        if (isShowMask) {
            this.showMask(true, isShowMask);
            let duration = 500;
            Utils.setUIVisible(true, this.mTouchMask);
            //top
            this.mTopMask.position = mw.Vector2.zero
            ActionMgr.instance.runTween({ sizeX: viewportSize.x, sizeY: 0 }, this)
                .to({ sizeX: viewportSize.x, sizeY: this.outViewPos.y }, duration)
                .onUpdate((obj) => {
                    this.mTopMask.size = new mw.Vector2(obj.sizeX, obj.sizeY)
                }).start();

            //bottom
            this.mButtomMask.position = new mw.Vector2(0, this.uiObject.size.y)
            const bottomSize = this.mButtomMask.size.clone()
            ActionMgr.instance.runTween({ sizeX: viewportSize.x, sizeY: bottomSize.y, posX: this.mButtomMask.position.x, posY: this.mButtomMask.position.y }, this)
                .to({ sizeX: viewportSize.x, sizeY: this.uiObject.size.y - this.outViewPos.y - targetSlotSize.y, posX: 0, posY: this.outViewPos.y + targetSlotSize.y }, duration)
                .onUpdate((obj) => {
                    this.mButtomMask.size = new mw.Vector2(obj.sizeX, obj.sizeY)
                    this.mButtomMask.position = new mw.Vector2(obj.posX, obj.posY)
                }).start()

            //Left
            this.mLeftMask.size = new mw.Vector2(0, this.uiObject.size.y)
            this.mLeftMask.position = new mw.Vector2(0, 0)
            ActionMgr.instance.runTween({ sizeX: 0, sizeY: this.mLeftMask.size.y, posX: 0, posY: 0 }, this)
                .to({ sizeX: this.outViewPos.x, sizeY: targetSlotSize.y, posX: 0, posY: this.outViewPos.y }, duration)
                .onUpdate((obj) => {
                    this.mLeftMask.size = new mw.Vector2(obj.sizeX, obj.sizeY)
                    this.mLeftMask.position = new mw.Vector2(obj.posX, obj.posY)
                }).start()

            //Right
            this.mRightMask.size = new mw.Vector2(0, this.uiObject.size.y)
            this.mRightMask.position = new mw.Vector2(this.uiObject.size.x, 0)
            ActionMgr.instance.runTween({ sizeX: this.mRightMask.size.x, sizeY: this.mRightMask.size.y, posX: this.mRightMask.position.x, posY: this.mRightMask.position.y }, this)
                .to({
                    sizeX: this.uiObject.size.x - this.outViewPos.x - targetSlotSize.x,
                    sizeY: targetSlotSize.y,
                    posX: this.outViewPos.x + targetSlotSize.x,
                    posY: this.outViewPos.y
                }, duration)
                .onUpdate((obj) => {
                    this.mRightMask.size = new mw.Vector2(obj.sizeX, obj.sizeY)
                    this.mRightMask.position = new mw.Vector2(obj.posX, obj.posY)
                })
                .onComplete(() => {
                    Utils.setUIVisible(true, this.mBtnHand);
                    Utils.setUIVisible(false, this.mTouchMask);
                })
                .start();
        }

        //设置手指
        this.mBtnHand.position =
            new mw.Vector2(
                this.outViewPos.x + targetSlotSize.x / 2 - this.mBtnHand.size.x / 2,
                this.outViewPos.y + targetSlotSize.y / 2
            );

        // 设置button区域

        this.mBtn.position = new mw.Vector2(this.outViewPos.x, this.outViewPos.y);
        this.mBtn.size = new mw.Vector2(target_slot.size.x, target_slot.size.y);

        if (isShowBtn)
            this.mBtn.visibility = (mw.SlateVisibility.Visible);
        else
            this.mBtn.visibility = (mw.SlateVisibility.Hidden);
        this.lockUIHandAction(target, handDir, isShowMask);
        this.activeLockTween = true;
    }

    /**
     * 指示ui的tween动画
     * @param targetUI 
     * @param dir 
     * @param isScale 
     */
    private lockUIHandAction(targetUI: mw.Widget, dir: number, isScale: boolean) {
        Utils.setUIVisible(!isScale, this.mBtnHand);
        let curPos = this.mBtnHand.position.clone();
        let start: mw.Vector2;
        let end: mw.Vector2;

        switch (dir) {
            //向下指
            case 1:
                end = curPos.clone().add(new mw.Vector2(0, -350));
                start = curPos.clone().add(new mw.Vector2(0, -250));
                this.mBtnHand.renderTransformAngle = 180;
                break;
            //向上指
            case 2:
                end = curPos.clone().add(new mw.Vector2(0, 250));
                start = curPos.clone().add(new mw.Vector2(0, 120));
                this.mBtnHand.renderTransformAngle = 0;
                break;
        }
        let prePos = this.mBtnHand.position;
        let tScale = isScale ? 1 : 1.5;
        let tRenderScale = mw.Vector2.zero;
        this.lockHandTween = new mw.Tween({ loc: end, scale: 1 }).to({ loc: start, scale: tScale }, 1000).onUpdate((v) => {
            this.mBtnHand.position = v.loc;
            tRenderScale.x = v.scale;
            tRenderScale.y = v.scale;
            targetUI.renderScale = tRenderScale;
        }).repeat(Infinity).onStop(() => {
            Utils.setUIVisible(false, this.mBtnHand);
            this.mBtnHand.position = prePos;
            this.activeLockTween = false;
            targetUI.renderScale = mw.Vector2.one;
        }).start();
    }

}