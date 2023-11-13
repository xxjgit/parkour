/*
 * @Author: pengwei.shi
 * @Date: 2022-11-13 10:10:22
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-17 09:16:52
 * @FilePath: \streetparkour\JavaScripts\ui\UIGuide.ts
 * @Description: 新手引导UI 和 逻辑
 */
import { Guide } from "../const/Define";
import GuideUI_generate from "../ui-generate/GuideUI_generate";
import { Utils } from "../untils/Utils";
import { GameUI } from "./GameUI";

/**
 * 引导手指数据
 */
type GuideFingerData = { startOffset: mw.Vector2, endOffset: mw.Vector2, isScale: boolean, rot: number };

export class UIGuide extends GuideUI_generate {
    private _guideUIMap: Map<Guide, { canvas: mw.Widget, txt?: mw.TextBlock }>;
    private _lastState: Guide;

    private _curGuideButton: mw.Button;
    private _tween1: mw.Tween<mw.Vector2>;
    private _tween2: mw.Tween<mw.Vector2>;
    private _tween3: mw.Tween<mw.Vector2>;
    private fingerGuideData: GuideFingerData[];
    private fingerIndex: number;
    protected onStart(): void {
        this.layer = mw.UILayerScene;
        this._guideUIMap = new Map();
        this.initUI();
    }

    private initUI() {
        this.fingerGuideData = [];
        this._guideUIMap.set(Guide.Down, { canvas: this.mCanvas_Down, txt: this.mTxt_Down });
        this._guideUIMap.set(Guide.Left, { canvas: this.mCanvas_Left, txt: this.mTxt_Left });
        this._guideUIMap.set(Guide.Right, { canvas: this.mCanvas_Right, txt: this.mTxt_Right });
        this._guideUIMap.set(Guide.UP, { canvas: this.mCanvas_UP, txt: this.mTxt_UP });
        this._guideUIMap.set(Guide.Hand, { canvas: this.mImg_Hand, txt: null });
        this.fingerGuideData.push({ startOffset: new mw.Vector2(0, -200), endOffset: new mw.Vector2(0, -80), isScale: true, rot: 180 });
        this.fingerGuideData.push({ startOffset: new mw.Vector2(0, 200), endOffset: new mw.Vector2(0, 150), isScale: true, rot: 0 });

        for (let [k, v] of this._guideUIMap) {
            Utils.setUIVisible(false, v.canvas, v.txt);
        }
        Utils.setUIVisible(false, this.mImg_Hand, this.mTxt_SkillTips);
        this.layer = mw.UILayerTop;
    }

    /**
     * 设置当前ui的不同状态
     * @param state 
     */
    public guideState(state: Guide) {
        this._lastState = state;
        switch (state) {
            case Guide.Down:
                this.guideAction(new mw.Vector2(324, 1340), state);
                break;
            case Guide.Left:
                this.guideAction(new mw.Vector2(22, 790), state);
                break;
            case Guide.Right:
                this.guideAction(new mw.Vector2(620, 790), state);
                break;
            case Guide.UP:
                this.guideAction(new mw.Vector2(300, 200), state);
                break;
            case Guide.Hand:
                this.guideSkill();
                break;
            default:
                break;
        }
    }


    /**
     * 新手关卡技能按钮引导
     */
    private guideSkill() {
        let btn = mw.UIService.getUI(GameUI).btnItem2;
        this.fingerGuide(btn, 1);
    }

    /**
     * 引导动作
     * @param targetPos 目标位置
     * @param action 动作
     */
    private guideAction(targetPos: mw.Vector2, action: Guide) {
        let guide = this._guideUIMap.get(action);
        Utils.setUIVisible(true, guide.canvas, guide.txt);
        this.uiTween(targetPos, guide.canvas, () => {
            Utils.setUIVisible(false, guide.canvas, guide.txt);
        });
    }


    /**
     * ui动画
     * @param targetPos 目标点
     * @param ui 
     * @param completeCallBack
     * @param times 次数
     */
    private uiTween(targetPos: mw.Vector2, ui: mw.Widget, completeCallBack?: () => void, times?: number) {
        this.stopAllTween()
        let uiPrePosition = ui.position.clone();
        this._tween3 = new mw.Tween(ui.position).to(targetPos, 1000).onUpdate((v: mw.Vector2) => {
            ui.position = v;
        }).onStop(() => {
            ui.position = uiPrePosition;
            if (completeCallBack) {
                completeCallBack();
            }
        }).onComplete(() => {
            ui.position = uiPrePosition;
            if (completeCallBack) {
                completeCallBack();
            }
        }).repeat(times).start();
    }

    protected onHide(): void {
        this.stopAllTween();
    }


    /**
     * 手指引导
     * @param uiButton 引导的按钮
     * @param dataIndex 按钮对应的数据索引，
     * 0为大厅的按钮数据，
     * 1为新手引导技能的数据
     */
    public fingerGuide(uiButton: mw.Button, dataIndex: number) {
        this.fingerIndex = dataIndex;
        this._curGuideButton = uiButton;
        let data = this.fingerGuideData[dataIndex];
        let outPix = mw.Vector2.zero;
        let outViewPos = mw.Vector2.zero;
        uiButton.onClicked.add(this.endGuidAction);
        let time = setTimeout(() => {
            mw.localToViewport(uiButton.tickSpaceGeometry, mw.Vector2.zero, outPix, outViewPos);
            let startPos = data.startOffset.add(outViewPos);
            let endPos = data.endOffset.add(outViewPos);
            this.guideFingerAction(uiButton, data.isScale, startPos, endPos);
            this.mImg_Hand.renderTransformAngle = data.rot;
            Utils.setUIVisible(true, this.mImg_Hand);
            if (dataIndex == 1) {
                Utils.setUIVisible(true, this.mTxt_SkillTips);
            }
            clearTimeout(time);
        }, 1000);
    }

    /**
     * 指引技能
     */
    private guideFingerAction(ui: mw.Widget, activeScale: boolean, startPos: mw.Vector2, endPos: mw.Vector2) {
        //手指动作
        this._tween1 = new mw.Tween(startPos).to(endPos, 1000).onUpdate(v => {
            this.mImg_Hand.position = v;
        }).repeat(Infinity).onStop(() => {
            Utils.setUIVisible(false, this.mImg_Hand);
        }).onComplete(() => {
            Utils.setUIVisible(false, this.mImg_Hand);
        }).start();

        //按钮放大缩小
        if (activeScale) {
            let tarsize = new mw.Vector2(1.5, 1.5);
            this._tween2 = new mw.Tween(mw.Vector2.one).to(tarsize).onUpdate(v => {
                ui.renderScale = v;
            }).repeat(Infinity).onStop(() => {
                ui.renderScale = mw.Vector2.one;
            }).onComplete(() => {
                ui.renderScale = mw.Vector2.one;
            }).start();
        }
    }

    /**
     * 暂停当前ui的
     * tween行为
     */
    private stopAllTween() {
        if (this._tween1 && this._tween1.isPlaying()) {
            this._tween1.stop();
        }
        if (this._tween2 && this._tween2.isPlaying()) {
            this._tween2.stop();
        }
        if (this._tween3 && this._tween3.isPlaying()) {
            this._tween3.stop();
        }
    }

    /**
     * 隐藏自身解除订阅
     */
    private endGuidAction = () => {
        Utils.setUIVisible(false, this.mImg_Hand);
        this.stopAllTween();
        if (this._curGuideButton) {
            this._curGuideButton.onClicked.remove(this.endGuidAction);
        }

        //迭代可能需要
        //技能按钮，不点不关闭ui
        // if (this.fingerIndex >= this.fingerGuideData.length - 1) {
        //     this.setVisible(false);
        // }
    }
}