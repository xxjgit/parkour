
import { GameConfig } from "../config/GameConfig";
import { Const } from "../const/Const";
import { MoveType, SPSound } from "../const/Define";
import { DataManager } from "../data/DataManager";
import { GameModuleC } from "../modules/game/GameModuleC";
import { ItemModuleC } from "../modules/item/ItemModuleC";
import { ObstacleModuleC } from "../modules/obstacle/ObstacleModuleC";
import GameUI_generate from "../ui-generate/GameUI_generate";
import UseItem_generate from "../ui-generate/UseItem_generate";
import { MGSCenter } from "../untils/MGSCenter";
import { Sound } from "../untils/Sound";
import { UIPause } from "./UIPause";

/** 
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2022-11-27 14:14
 * @LastEditTime : 2022-11-28 18:56
 * @description  : 
 */
export class GameUI extends GameUI_generate {

    //按下
    private isPress = false;
    //游戏中心
    private _gameModuleC: GameModuleC;
    private _isInited = false;

    //信息刷新间隔
    private _freshDt = 0.5;
    //上局最高分
    private _lastMax = 0;
    private _tipTag = false;
    //道具使用提示
    private _useItem: UseItem[];

    private _tempV2: mw.Vector2;
    //道具按钮隐藏时长
    private _hideTime: number = 10;

    /**处于开始引导的时候， 无法左右移动 */
    public isStartGuide: boolean = false;

    protected onStart(): void {
        this.initUI();
        this._gameModuleC = ModuleService.getModule(GameModuleC);
        this.canUpdate = true;
    }

    /**
     * 当前UI初始化
     * @returns 
     */
    private initUI() {
        if (this._isInited)
            return;
        this.btnPuase.onClicked.add(() => {
            this._gameModuleC.gamePuase();
            mw.UIService.show(UIPause);
            mw.UIService.hide(GameUI);
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.gamePause();
        });
        let cfg2 = GameConfig.Item.getElement(2);
        this.btnItem2.normalImageGuid = cfg2.icon;
        this.btnItem2.onClicked.add(() => {
            this._gameModuleC.useItem(2);
            this.freshItem();
            Sound.instance.gameSound(SPSound.PressButton);
        });

        let cfg3 = GameConfig.Item.getElement(3);
        this.btnItem3.normalImageGuid = cfg3.icon;
        this.btnItem3.onClicked.add(() => {
            this._gameModuleC.useItem(3);
            this.freshItem();
            Sound.instance.gameSound(SPSound.PressButton);
        });

        let cfg5 = GameConfig.Item.getElement(5);
        this.btnItem5.normalImageGuid = cfg5.icon;
        this.btnItem5.onClicked.add(() => {
            this._gameModuleC.useItem(5);
            this.freshItem();
            Sound.instance.gameSound(SPSound.PressButton);
        });
        //滑动
        this.touchMove.onJoyStickDown.add(() => {
            this.isPress = true;
        })
        this.touchMove.onInputDir.add(this.doMove);
        this._useItem = [];
        this._tempV2 = new mw.Vector2(0, 400);
        Event.addLocalListener(Const.ITEM_USE, this.onItemUse)
        Event.addLocalListener(Const.ITEM_ADD, this.freshItem)
        this._isInited = true;

        this.layer = mw.UILayerSystem;
    }
    /**
     * 道具使用被通知显示
     * @param id ID
     * @param time 时间
     * @returns 
     */
    private onItemUse = (id, time) => {
        let cfg = GameConfig.Item.getElement(id);
        if (!cfg)
            return;
        // console.log(id, time)
        let item = this.getItem(id);
        item.setInfo(id, cfg.icon, time);
        this.freshUse();
        if (id == 2) {
            if (time <= 0)//护盾触发
                ModuleService.getModule(ObstacleModuleC).hide();
        }
        else if (id == 3) {
            let omc = ModuleService.getModule(ObstacleModuleC)
            if (time > 0) //飞行触发
                omc.setSkyCoinsLevelPos(DataManager.gameDis + 1800, Const.FLY_HEIGHT - 50);
            else {
                omc.hideSkyCoins();
                omc.hide(1500);
            }
        }
        else if (id == 5) {
            let vis = time > 0 ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
            this.doubleTip.visibility = vis;
        }
    }

    /**
     * 获取一个道具使用提示组件
     * @param id 道具ID
     * @returns 
     */
    private getItem(id) {
        //优先找相同的刷新
        for (let v of this._useItem) {
            if (v.itemId == id)
                return v;
        }
        //找一个空闲的
        for (let v of this._useItem) {
            if (v.itemTime <= 0)
                return v;
        }
        //创建新的
        let item = mw.UIService.create(UseItem);
        this.itemNode.addChild(item.uiObject);
        this._useItem.push(item);
        return item;
    }
    /**
     * 移动操作
     * @param dir 
     */
    private doMove = (dir) => {
        let absx = Math.abs(dir.x);
        let absy = Math.abs(dir.y);
        if (absx + absy > 0.1 && this.isPress) {
            let type = MoveType.None;
            if (absx > absy) {
                type = dir.x > 0 ? MoveType.Right : MoveType.Left;
            }
            else {
                type = dir.y > 0 ? MoveType.Jump : MoveType.Down;
            }

            switch (type) {
                case MoveType.Right:
                    if (this.isStartGuide) type = MoveType.None;
                    Sound.instance.gameSound(SPSound.Move);
                    break;
                case MoveType.Left:
                    if (this.isStartGuide) type = MoveType.None;
                    Sound.instance.gameSound(SPSound.Move);
                    break;
                case MoveType.Jump:
                    Sound.instance.gameSound(SPSound.Jump);
                    break;
                case MoveType.Down:
                    Sound.instance.gameSound(SPSound.Down);
                    break;
                default:
                    break;
            }
            this._gameModuleC.movePlayer(type);
            this.isPress = false;
        }
    }

    protected onShow(game: boolean): void {
        if (game) {    //只有新开游戏才执行
            this.freshInfo();
            this.freshItem();
            this._lastMax = this._gameModuleC.maxScore;
            this._tipTag = false;
            this._hideTime = 10;
            this.doubleTip.visibility = mw.SlateVisibility.Collapsed;
            this.scoreTip.visibility = mw.SlateVisibility.Collapsed;
            if (!DataManager.isGuideScene) {
                this.btnItem3.visibility = mw.SlateVisibility.Visible;
                this.btnItem5.visibility = mw.SlateVisibility.Visible;
            }
            Sound.instance.gameBGM(SPSound.Game);
            this._useItem.forEach(item => {
                item.reset();
            });
        }
    }

    public guideButtonAction(type: number) {
        // console.log(`-------------zhixing      ${type}`);
        switch (type) {
            case 1:
                this.btnItem2.visibility = mw.SlateVisibility.Visible;
                this.btnItem3.visibility = mw.SlateVisibility.Visible;
                this.btnItem5.visibility = mw.SlateVisibility.Visible;
                this.freshItem();
                break;
            case 2:
                this.btnItem2.visibility = mw.SlateVisibility.Visible;
                this.freshItem();
                break;
            case 3:
                this.btnItem2.visibility = mw.SlateVisibility.Hidden;
                this.btnItem3.visibility = mw.SlateVisibility.Hidden;
                this.btnItem5.visibility = mw.SlateVisibility.Hidden;
                break;
            default:
                break;
        }
    }
    protected onUpdate(dt: number): void {
        if (DataManager.isGaming || DataManager.isEnd) {
            if (dt > 3) {
                this._gameModuleC.gamePuase();
                mw.UIService.show(UIPause);
                mw.UIService.hide(GameUI);
                return;
            }
            this._freshDt += dt;
            if (this._freshDt > 0.5)
                this.freshInfo();
            this._useItem.forEach(item => {
                if (item.onUpdate(dt))
                    this.freshUse();
            })
            if (this._hideTime > 0) {
                this._hideTime -= dt;
                if (this._hideTime <= 0) {
                    this.btnItem3.visibility = mw.SlateVisibility.Collapsed;
                    this.btnItem5.visibility = mw.SlateVisibility.Collapsed;
                }
            }
        }
    }
    /**
     * 刷新信息显示
     */
    private freshInfo() {
        this.txtCoin.text = DataManager.coinNum.toString();
        this.txtScore.text = DataManager.curScore.toString();
        if (!this._tipTag && this._lastMax > 1000 && DataManager.endScore > this._lastMax) {
            this._tipTag = true;
            this.scoreTip.visibility = mw.SlateVisibility.Visible;
            setTimeout(() => {
                this.scoreTip.visibility = mw.SlateVisibility.Collapsed;
            }, 5000);
            //
        }
    }
    /**
     * 刷新道具显示
     */
    private freshItem = () => {
        let imc = ModuleService.getModule(ItemModuleC);
        let num2 = imc.getItemCount(2);
        this.txtItem2.text = 'x' + num2;

        let num3 = imc.getItemCount(3);
        this.txtItem3.text = 'x' + num3;

        let num5 = imc.getItemCount(5);
        this.txtItem5.text = 'x' + num5;
    }
    /**
     * 刷新使用
     */
    private freshUse() {
        let idx = 0;
        for (let v of this._useItem) {
            if (v.itemTime <= 0)
                continue;
            this._tempV2.x = 100 + idx * 200;
            v.setPos(this._tempV2);
            idx++;
        }
    }
}


class UseItem extends UseItem_generate {
    public itemTime: number = 0;
    public itemId: number = 0;
    /**
     * 设置信息
     * @param icon 图标
     * @param time 时间
     * @param pos 坐标
     */
    public setInfo(id: number, icon: string, time: number) {
        this.itemId = id;
        this.icon.imageGuid = icon;
        this.itemTime = time;
        this.time.text = time.toFixed(1);
        this.fresh();
    }
    /**
     * 重置
     */
    public reset() {
        this.itemId = 0;
        this.itemTime = 0;
        this.fresh();
    }
    /**
     * 设置位置
     * @param pos 坐标
     */
    public setPos(pos: mw.Vector2) {
        this.uiObject.position = pos;
    }
    /**
     * 刷新时间
     * @param dt 
     * @returns 
     */
    public onUpdate(dt: number): boolean {
        if (this.itemTime > 0) {
            this.itemTime -= dt;
            this.time.text = this.itemTime.toFixed(1);
            if (this.itemTime <= 0) {
                this.fresh();
                return true;
            }
        }
        return false;
    }
    /**
     * 刷新显示
     */
    private fresh() {
        let vis = this.itemTime > 0 ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
        this.uiObject.visibility = vis;
    }
}