import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';

import { Const } from "../../const/Const";
import { AnimRes, BlockType, EffectRes, MGSEvent, MoveType, SPSound } from "../../const/Define";
import { DataManager } from "../../data/DataManager";
import { MGSCenter } from "../../untils/MGSCenter";
import { SharePool } from "../../untils/Pool";
import { Sound } from "../../untils/Sound";
import { Utils } from "../../untils/Utils";
import { RoleItem } from "./RoleItem";
//import RoleTrigger from "./RoleTrigger";



/** 
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2022-11-28 13:24
 * @LastEditTime : 2022-11-28 18:55
 * @description  : 角色控制
 */
export default class RoleCtrl extends RoleItem {

    /**
     * 需要缓动到的目标点
     */
    private _destY = 0;
    private _destZ = 0;
    /**
     * 当前速度，基础速度,加速度,最大速度
     */
    private _speed = 10;
    private _speedY = 25;
    private _baseSpeed = 10;
    private _accSpeed = 0.2;
    private _maxSpeed = 20;
    /**
     * 加速距离
     */
    private _accDis = 10000;

    /**
     * 角色目标点
     */
    private _dest = new mw.Vector(0, 0, 0);
    /**
     * 角色旋转
     */
    private _rotation = new mw.Rotation(0, 0, 0);

    /**
     * 跳跃时长
     */
    private _jumpTime = 0;
    /**
     * 掉落计时，用于加速度
     */
    private _dropTime = 0;
    /**
     * 下滑时长
     */
    private _downTime = 0;
    /**
     * 死亡计时
     */
    private _dieTime = 0;

    /**
     * 快速下落
     */
    private _fastDrop = false;
    /**
     * 眩晕时长
     */
    private _vertigoTime = 0;
    /**
     * 是否着陆了
     */
    private _isLand = false;

    //射线检测
    private _tempPos = new mw.Vector(0, 0, 0);
    private _lineDest = new mw.Vector(0, 0, 0);

    /**
     * 眩晕特效
     */
    private _vertigoEf: mw.Effect;
    //金币特效
    private _coinEf: mw.Effect;

    /**
     * 初始化完成否
     */
    private _bInited = false;

    /**
     * 上台阶时间
     */
    private _stepTime = 0;
    //允许镜头高度跟随
    public isFollow = false;

    private _dieAnim: mw.Animation;
    /**
     * 初始化
     * @param obj 角色节点
     * @param rid 角色ID
     */
    public init(obj: mw.GameObject) {
        //let trigger =  GameObject.asyncFindGameObjectById('BAC9BBE54B878D20B239B0AC3A5ED3C0');
        this._role = obj as mw.Character;
        this.reset();
        this._bInited = true;

        //给角色触发器绑脚本
        // Utils.addScript<RoleTrigger>('59D07B5F43175182FA035F8E2F856E55', trigger).then(sc => {
        //     sc.init(this);
        //     this._bInited = true;
        //     trigger.setCollision(mw.CollisionStatus.QueryOnly,true);
        // });
    }
    /**
     * 设置角色信息
     * @param speed 基础移动速度
     * @param speedY 左右移动速度
     * @param acc 加速度
     * @param accDis 加速距离
     * @param max 最大速度
     */
    public setInfo(speed: number, speedY: number, acc: number, accDis: number, max: number) {
        this._baseSpeed = speed;
        this._speedY = speedY;
        this._accSpeed = acc;
        this._accDis = accDis;
        this._maxSpeed = max;
    }
    /**
     * 测试
     * @param v 参数 
     */
    public test(v) {
        this._baseSpeed = v;
    }
    /**
     * 重置
     */
    public reset() {
        super.reset();
        this._jumpTime = 0;
        this._dropTime = 0;
        this._vertigoTime = 0;
        this._destY = Const.BASE_POS;
        this._lastAnim = '';
        this._destZ = Const.BASE_HEIGHT;
        this._dest.x = 0;
        this._dest.y = Const.BASE_POS;
        this._dest.z = Const.BASE_HEIGHT;
        this._rotation.z = 90;
        if (this._role) {
            this._role.worldTransform.position = this._dest;
            this._role.worldTransform.rotation = this._rotation;
            //this._role.setVisibility(mw.PropertyStatus.On);
            //this._role.setVisibility(true);
            this.puase();
        }
        this.vertigoEnd();
    }
    public setRole(rid: number): void {
        super.setRole(rid);
        this.puase();
    }
    public relive() {
        this.vertigoEnd();
        //this._role.setVisibility(mw.PropertyStatus.On);
        //this._role.setVisibility(true);
        this.reliveEffect();
    }
    /**
     * 暂停
     */
    public puase() {
        let anim = AnimRes.Idel;
        if (this.gender == 2)
            anim = AnimRes.Idel2;
        this.playAinm(anim, 1, 0);
        this._lastAnim = '';
    }
    /**
     * 获取角色位置
     */
    public get destPos() {
        return this._dest;
    }
    /**
     * 是否在地面上
     */
    public get isOnLand() {
        return this._isLand;
    }
    /**
     * 帧更新
     * @param dt 时间间隔
     * @param rate 帧倍率
     */
    public onUpdate(dt: number, rate: number): void {
        if (!this._bInited)
            return;
        if (DataManager.isGaming) {
            super.onUpdate(dt, rate);

            this.getSpeed();  //
            this._destZ = Const.BASE_HEIGHT;
            this.freshVertigo(dt);  //眩晕
            this.lineTrace(rate);
            //位置计算
            this.getDestXY(rate);
            this.getDestZ(rate);
            this._isLand = Math.abs(this._dest.z - this._destZ) < 1;
            //着地后重置，防止起跳碰撞（误为着地）
            if (this._isLand && this._jumpTime < 12) {
                this._dropTime = 0;
                this._jumpTime = 0;
                if (this._fastDrop) {
                    this._fastDrop = false;
                    this.down();
                }
                else if (this._downTime < 1) {
                    this.run();
                }
            }
        }
        else if (DataManager.isEnd) {
            this.lineTrace(rate);
            this.back(rate, 110);
            this.getDestZ(rate);
        }
        else if (DataManager.isReady) {
            if (this._rotation.z > 0)
                this._rotation.z -= rate * 0.2 + this._rotation.z * rate * 0.04;
            else
                this._rotation.z = 0;
            this._role.worldTransform.rotation = this._rotation;
        }
    }
    /** 
     * 操作玩家移动
     * @param type 方式
     */
    public move(type: MoveType) {
        switch (type) {
            default: return;
            case MoveType.Jump: this.jump(); return;
            case MoveType.Down:
                if (this._isLand)
                    this.down();
                else {
                    this._dropTime = 10;
                    this._jumpTime = 0;
                    this._fastDrop = true;
                }
                return;
            case MoveType.Left:
                if (this._destY > Const.BASE_POS - 200) {
                    this._destY -= Const.ROAD_WIDTH;
                    this.rtMove(true);
                }
                break;
            case MoveType.Right:
                if (this._destY < Const.BASE_POS + 200) {
                    this._destY += Const.ROAD_WIDTH;
                    this.rtMove(false);
                }
                break;
        }
    }
    /**
     * 检测到触发器
     * @param type 类型
     */
    public onTrigger(type: BlockType, pos: mw.Vector, guid: string) {
        switch (type) {
            default: return;
            case BlockType.Item:
                break;
            case BlockType.Coin:
                {
                    let num = this.isDouble ? 2 : 1;
                    DataManager.addCoin(num);
                    this.coinEffect();
                }
                break;
            case BlockType.Gem:
                {
                    //let num = this.isDouble ? 2 : 1;
                    DataManager.addGem(1);
                    this.coinEffect();
                }
                break;
            case BlockType.Stop:
                this.onCollision(guid);
                break;
            case BlockType.Pass:
                if (this._downTime > 0)
                    break;
                else
                    this.onCollision(guid);
                break;
            case BlockType.Step:
                this._stepTime = 6;
                break;
            case BlockType.StepBlock:
            case BlockType.Board:
            case BlockType.Block:
            case BlockType.Border:
                let max = type == BlockType.Board ? Const.BOAED_HEIGHT : Const.OVER_HEIGHT;
                let dz = max - this._dest.z;
                let dy = pos.y - this._dest.y;
                //正面，左右差值
                if (Math.abs(dy) < 10 && type != BlockType.Border) {
                    if (type == BlockType.StepBlock) {
                        return;
                    }
                    else if (dz > 0)
                        this.onCollision(guid);
                }
                else {
                    this.onCollision(guid);
                    if (dy > 0) {   //障碍在右边
                        if (this._dest.y > Const.BASE_POS)
                            this._destY = Const.BASE_POS;
                        else
                            this._destY = Const.BASE_POS - Const.ROAD_WIDTH;
                    }
                    else if (this._dest.y < Const.BASE_POS)
                        this._destY = Const.BASE_POS;
                    else
                        this._destY = Const.BASE_POS + Const.ROAD_WIDTH
                    // this._destY += dy < 0 ? Const.ROAD_Width : -Const.ROAD_Width;
                    // if (this._destY < Const.BASE_POS - Const.ROAD_Width)
                    //     this._destY = Const.BASE_POS - Const.ROAD_Width
                    // else if (this._destY > Const.BASE_POS + Const.ROAD_Width)
                    //     this._destY = Const.BASE_POS + Const.ROAD_Width
                }
                break;
        }
    }

    /**
     * 碰撞
     * @param guid 碰撞的道具guid
     */
    private onCollision(guid: string) {
        if (this._vertigoTime > 0 || this.isRTMove)
            this.onDie(guid);
        else
            this.vertigo();
    }
    /**
     * 速度计算
     */
    private getSpeed() {
        let n = Math.floor(DataManager.gameDis / this._accDis);
        this._speed = this._baseSpeed + n * this._accSpeed;
        if (this._speed > this._maxSpeed)
            this._speed = this._maxSpeed;
        //特效8秒，减速1秒
        if (this._vertigoTime >= 7)
            this._speed *= 0.5;
        if (this.isFly)
            this._speed = this._maxSpeed + 10;
    }
    /**
     * 左右位置计算
     */
    private getDestXY(rate: number) {
        //死亡后退，100控制后退时长
        if (this._dieTime > 100) {
            this.back(rate, 100);
        }
        else {
            let ds = this._speed * rate;
            DataManager.gameDis += ds
            this._dest.x = DataManager.gameDis;
        }
        let dy = this._dest.y - this._destY; //差值
        let my = this._speedY * rate;       //位移值
        if (Math.abs(dy) > my) {
            if (dy < 0) {
                if (this._rotation.z < Const.MOVE_ROTMAX)
                    this._rotation.z += rate * Const.MOVE_ROTZ;
                this._dest.y += my
                if (this._dest.y > this._destY)
                    this._dest.y = this._destY;
            }
            else {
                if (this._rotation.z > -Const.MOVE_ROTMAX)
                    this._rotation.z -= rate * Const.MOVE_ROTZ;
                this._dest.y -= my
                if (this._dest.y < this._destY)
                    this._dest.y = this._destY;
            }
        }
        else {
            this._dest.y = this._destY;
            this._rotation = Utils.formatRot(this._rotation);
            let rz = this._rotation.z;
            if (Math.abs(rz) > 1) {
                this._rotation.z -= rate * rz * 0.1;
            }
            else
                this._rotation.z = 0;
        }
        //左右移带旋转
        this._role.worldTransform.rotation = this._rotation;
    }
    /**
     * 后退，非引导则死亡
     * @param rate 帧倍率
     * @param max 后退时长
     */
    private back(rate: number, max: number) {
        this._dieTime -= rate;
        if (this._dieTime > max) {
            this._dest.x -= (this._dieTime - max) * rate * 0.7;
            DataManager.gameDis = this._dest.x;
        }
        else if (this._dieTime < 1 && !DataManager.isGuideScene) {
            DataManager.onEnd();
            if (this._dieAnim)
                this._dieAnim.pause();
            //this._role.visible = false;
            // this._role.setVisibility(false);
            // this._role.setVisibility(mw.PropertyStatus.Off);
        }
    }
    /**
     * 高度计算
     */
    private getDestZ(rate: number) {
        this.isFollow = false;
        if (this._jumpTime > 0) {
            this._jumpTime -= rate;
            let mz = this._jumpTime * rate * 1.9;
            this._dest.z += mz;
        }
        else {
            let dz = this._destZ - this._dest.z;
            if (dz < -1) {     //降落
                this._dropTime += rate;
                let dt = this._dropTime;
                let v = this._fastDrop ? 1.5 : 0.5;
                let z = dt * v * rate;
                this._dest.z -= z;
                if (this._dest.z < this._destZ) {
                    this._dest.z = this._destZ;
                    this._dropTime = 0;
                }
            }
            else if (dz > 1) {
                if (this.isFly)
                    this._dest.z += dz * 0.08 * rate;
                else if (dz < Const.STEP_HEIGHT)  //爬坡
                    this._dest.z = this._destZ;
                else
                    this._dest.z += dz * 0.08 * rate;
                this.isFollow = true;
            }
        }
        if (this._downTime > 0)
            this._downTime -= rate;
        this._role.worldTransform.position = this._dest;

        this._tempPos.x = this._dest.x - 20;
        this._tempPos.y = this._dest.y;
        this._tempPos.z = this._dest.z;
        this._lineDest.x = this._tempPos.x + 30;
        this._lineDest.y = this._tempPos.y;
        this._lineDest.z = this._tempPos.z - 20;
        let hits = QueryUtil.lineTrace(this._tempPos, this._lineDest, true, false);
        // for (let i = 0; i < hits.length; i++) {
        //     let hit = hits[i];
        //     let guid = hit.guid;
        //     if (!guid || guid == '92198BB8')
        //         continue;
        //     this.onEnter(hit)
        //     break;
        // }
        for (let i = 0; i < hits.length; i++) {
            let hit = hits[i];
            let guid = hit.gameObject.gameObjectId;
            if (!guid || guid == '92198BB8')
                continue;
            if (!hit.gameObject)
                continue;
            this.onEnter(hit.gameObject)
            //break;
        }
    }
    private onEnter(other: mw.GameObject) {
        //console.log('onEnter')
        let tag = other.name;
        if (!tag)
            return;
        let type = BlockType.None;
        let vis = other.getVisibility();
        if (tag == 'pass') {
            //隐藏通过点
            other.setVisibility(mw.PropertyStatus.Off, true);
            other.setCollision(mw.CollisionStatus.Off);
            return;
        }
        else if (tag == 'block1') {
            type = BlockType.Stop;
        }
        else if (tag == 'block2') {
            type = BlockType.Pass;
        }
        else if (tag == 'board') {
            type = BlockType.Board;
        }
        else if (tag == 'block') {
            type = BlockType.Block;
        }
        else if (tag == 'block0') {
            type = BlockType.StepBlock;
        }
        else if (tag == 'border') {
            type = BlockType.Border;
        }
        else if (tag == 'step') {
            type = BlockType.Step;
        }
        else if (tag.indexOf('coin') >= 0 && vis) {
            other.setVisibility(mw.PropertyStatus.Off, true);
            other.setCollision(mw.CollisionStatus.Off);
            type = BlockType.Coin;
            Sound.instance.gameSound(SPSound.Coin);
        }
        else if (tag.indexOf('gem') >= 0 && vis) {
            other.setVisibility(mw.PropertyStatus.Off, true);
            other.setCollision(mw.CollisionStatus.Off);
            type = BlockType.Gem;
            Sound.instance.gameSound(SPSound.GetGem);
        }
        else if (tag.indexOf('item') >= 0 && vis) {
            other.setVisibility(mw.PropertyStatus.Off, true);
            other.setCollision(mw.CollisionStatus.Off);
            let id = 0;
            type = BlockType.Item;
            if (tag == 'item2')
                id = 2;
            else if (tag == 'item3')
                id = 3;
            else if (tag == 'item5')
                id = 5;
            else
                console.log(tag)
            this.useItem(id);
            DataManager.onItem(id, false);
            Sound.instance.gameSound(SPSound.GetItem);
        }
        this.onTrigger(type, other.worldTransform.position, other.gameObjectId);
    }
    /**
     * 射线检测地面
     * @param rate 帧倍率
     */
    private lineTrace(rate) {
        if (this.isFly) {
            this._destZ = Const.FLY_HEIGHT
            return;
        }
        this._tempPos.x = this._dest.x;
        this._tempPos.y = this._dest.y;
        this._tempPos.z = this._dest.z;
        if (this._stepTime > 0) {
            this._stepTime -= rate
            this._tempPos.z += 100;  //坡道增加起点Z
            this._tempPos.x += this._speed;
        }
        this._lineDest.x = this._tempPos.x;
        this._lineDest.y = this._tempPos.y;
        this._lineDest.z = this._tempPos.z - 500;   //向下延长射线
        let hits = QueryUtil.lineTrace(this._tempPos, this._lineDest, true, false);
        for (let i = 0; i < hits.length; i++) {
            let hit = hits[i];
            if (!hit.gameObject)
                continue;
            let guid = hit.gameObject.gameObjectId;
            let n = hit.gameObject.name;
            //排除自身相关，有更好的办法???
            if (!guid || guid == '92198BB8')
                continue;
            if (!n || n.indexOf('coin') >= 0 || n.indexOf('gem') >= 0 || n.indexOf('item') >= 0 || n == 'pass' || n.indexOf('金币') >= 0)
                continue
            // if(hit.gameObject.worldTransform.position.z>1)
            //     console.log(n);
            let pz = hit.impactPoint.z + Const.BASE_HEIGHT;
            if (pz < this._dest.z + Const.BASE_HEIGHT)  //高度修正
                this._destZ = pz;
            break;
        }
    }
    /**
     * 是否在左右移动中
     */
    private get isRTMove() {
        // if (this._jumpTime > 0)
        //     return false;
        if (Math.abs(this._destY - this._dest.y) > 1)
            return false;
        return true;
    }
    /**
     * 死亡触发
     * @param guid 碰撞的道具GUID
     */
    private onDie(guid: string) {
        if (this.isShield) {
            this.onShield();
            return;
        }
        else if (DataManager.isGuideScene) {
            DataManager.isGuideTips = true;
            this.vertigo();
            MGSCenter.ts_tutorial_step(9);
        }
        else {
            this.vertigoEnd();
            DataManager.onDie()
            this.die();
            //死亡埋点
            Event.dispatchToLocal(MGSEvent.DIE_ITEMGUID, guid);
            Sound.instance.gameSound(SPSound.Death);
        }


        //死亡触发到结算预留表现时长
        if (DataManager.isGuideScene && !this.isRTMove) {
            //玩家在新手引导且撞墙
            this._dieTime = 0;
        } else {
            this._dieTime = 140;
        }

    }

    /**
     * 眩晕
     */
    private vertigo() {
        this._vertigoTime = Const.VERTIGO_TIME;
        if (!this._vertigoEf) {
            let effect = SharePool.getPool<mw.Effect>(EffectRes.Vertigo).spawn();
            if (!effect || !effect.obj)
                return;
            this._vertigoEf = effect.obj;
            this._role.attachToSlot(this._vertigoEf, 23);
            this._vertigoEf.localTransform.position = (new mw.Vector(0, 0, 150));
            // this._vertigoEf.localTransform.rotation = ();
            // this._vertigoEf.localTransform.scale = ();
            this._vertigoEf.loop = (true);
        }
        this._vertigoEf.play();
        this._vertigoEf.setVisibility(mw.PropertyStatus.On);
        Sound.instance.gameSound(SPSound.vertigo);
    }
    /**
     * 吃金币特效
     * @returns 
     */
    private coinEffect() {
        if (!this._coinEf) {
            let effect = SharePool.getPool<mw.Effect>(EffectRes.Coin).spawn();
            if (!effect || !effect.obj)
                return;
            this._coinEf = effect.obj;
            this._role.attachToSlot(this._coinEf, 20);
            //this._coinEf.localTransform.position = (new mw.Vector(0, 0, -20));
            // this._vertigoEf.localTransform.rotation = ();
            // this._vertigoEf.localTransform.scale = ();
            this._coinEf.loop = (false);
        }
        this._coinEf.stop();
        this._coinEf.play();
    }
    /**
     * 刷新眩晕
     * @param dt 
     */
    private freshVertigo(dt: number) {
        //眩晕特效
        if (this._vertigoTime > 0) {
            this._vertigoTime -= dt;
            if (this._vertigoTime <= 0) {
                this.vertigoEnd();
            }
        }
    }
    /**
     * 眩晕结束
     */
    private vertigoEnd() {
        this._vertigoTime = 0;
        if (this._vertigoEf) {
            this._vertigoEf.stop();
            this._vertigoEf.setVisibility(mw.PropertyStatus.On);
        }
    }
    /**
     * 跑
     * @returns 
     */
    private run() {
        if (!DataManager.isGaming)
            return;
        //速度与动画匹配
        let t = 0.9 + this._speed / 30;
        let anim = AnimRes.Run;
        if (this.isFly)
            anim = AnimRes.Fly;
        else if (this.gender == 2)
            anim = AnimRes.Run2;
        this.playAinm(anim, t, 0);
    }
    /**
     * 跳
     * @returns 
     */
    private jump() {
        if (!this._isLand)
            return;
        if (this.isFly)
            return;
        this._downTime = 0;
        this._jumpTime = 16;   //调试出的跳跃时长
        let as = [AnimRes.Jump, AnimRes.Jump2];
        let rand = Utils.random(0, as.length);
        let spd = rand == 0 ? 0.5 : 1;
        let anim = as[rand]
        this.playAinm(anim, spd, 1);
    }
    /**
     * 左右移动
     * @param left 左 
     */
    private rtMove(left: boolean) {
        this._stepTime = 0;
        this.playAinm(AnimRes.Trun, 2, 0);
    }
    /**
     * 下滑
     */
    private down() {
        if (this.isFly)
            return;
        //下滑的时间段
        this._lastAnim = '';
        this._downTime = 40; //调试出的下滑时长
        this.playAinm(AnimRes.Down, 1);
    }
    /**
     * 死亡动画
     */
    private die() {
        this._dieAnim = this.playAinm(AnimRes.Die, 1);
    }
    /**
     * 播放角色动画
     * @param anim 动画id
     * @param time 倍率
     * @param loop 循环
     * @returns 
     */
    protected playAinm(anim: string, rate: number = undefined, loop: number = 1) {
        if (anim === this._lastAnim)
            return null;
        this._lastAnim = anim;
        //PlayerManagerExtesion.rpcPlayAnimationLocally(this._role, anim, time, loop)
        let ani = PlayerManagerExtesion.loadAnimationExtesion(this._role, anim, false)
        if (ani) {
            ani.speed = rate;
            ani.loop = loop;
            ani.play();
        }
        return ani;
    }
}
