import LoadingUI from "../../LoadingUI";
import { IAssetsElement } from "../../config/Assets";
import { GameConfig } from "../../config/GameConfig";
import { ILevelElement } from "../../config/Level";
import { Const } from "../../const/Const";
import { MGSEvent, ResourceType } from "../../const/Define";
import { DataManager } from "../../data/DataManager";
import { MGSCenter } from "../../untils/MGSCenter";
import { Obstacle } from "./Obstacle";
import { ObstacleModuleS } from "./ObstacleModuleS";

type logicData = { id: number, rGuid: string, rType: ResourceType, lenght: number };

/*
 * @Author: pengwei.shi
 * @Date: 2022-11-07 09:14:51
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-13 11:17:11
 * @FilePath: \streetparkour\JavaScripts\modules\obstacle\ObstacleModuleC.ts
 * @Description: 
 */
export class ObstacleModuleC extends ModuleC<ObstacleModuleS, null> {
    /**前方多远生成 */
    private _aheadCreateLen: number;
    /**障碍物的道路 */
    private _tracks: mw.Vector[];
    /**随机障碍数据 ,资源id, 资源类型、权重值*/
    private _randomObstacleData: { nameID: number, ResourceType: ResourceType, weight: number[] }[];
    private _allWeight: number[];

    /**障碍数据 */
    private _obstacleData: Map<number, { rGuid: string, rType: ResourceType, lenght: number }>;
    /**障碍池子 */
    private _obstacleMap: Map<number, Obstacle[]>;
    /**记录一个可以通过的障碍索引 */
    private _canPassObstacleIndex: number;
    /**正在使用的障碍物组 */
    private _onUsageObstacle: Obstacle[];
    /**障碍已占据的关卡长度 */
    private _obstaclesSpwanDis: number;
    public cfgAssets: IAssetsElement[];
    public cfgLevels: ILevelElement[];
    /**关卡数据 */
    private _levelData: { spawnPos: number, ObstacleGroupID: number }[];
    /**关卡数据索引 */
    private _levelDataIndex: number;
    /**初始生成关卡的位置、在玩家前方多少距离生成 */
    private _initSpawnObstaclePos: number = 0;

    //埋点数据
    /**随机关卡个数 */
    private _mgsRandomLevelCount: number = 0;

    /**分针执行队列 */
    private _logicQueue: { obj: Obstacle, pos: mw.Vector }[];

    private _obstacleWeight: ObstacleWeight;

    private _skyCoinsID: number;
    private _skyCoins: Obstacle;
    private logicTempData: number[];
    private logicList: Obstacle[];
    private flagID: number = null;

    /**加载相关 */
    private _loadUi: LoadingUI;
    private _loadNum = 0;
    private _loadMax = 0;
    private _initing = false;
    public onAwake(): void {
        this._randomObstacleData = [];
        this._onUsageObstacle = [];
        this.logicTempData = [];
        this._logicQueue = [];
        this._allWeight = [];
        this._levelData = [];
        this.logicList = [];
        this.cfgAssets = GameConfig.Assets.getAllElement();
        this.cfgLevels = GameConfig.Level.getAllElement();
        this._obstaclesSpwanDis = GameConfig.Global.getElement(103).Value;
        DataManager.carSpeed = GameConfig.Global.getElement(105).Value;

        //死亡埋点
        Event.addLocalListener(MGSEvent.DIE_ITEMGUID, (guid: string) => {
            MGSCenter.ts_action_dead(guid, this._mgsRandomLevelCount);
        });
    }

    public onStart() {

        this._obstacleWeight = new ObstacleWeight();
        this._tracks = [new mw.Vector(0, Const.BASE_POS, 0), new mw.Vector(0, Const.BASE_POS - Const.ROAD_WIDTH, 0), new mw.Vector(0, Const.BASE_POS + Const.ROAD_WIDTH, 0)];

        //关卡数据
        this._levelDataIndex = 0;
        this.initLevelData();
        this.initRadomObstalceData();
        this._initSpawnObstaclePos = GameConfig.Global.getElement(104).Value;
        this.initPoolData(this.cfgAssets, 4);
    }

    /**
     * 初始化关卡数据
     * @param cfgData 
     */
    private initLevelData() {
        this._levelData.length = 0;
        let levelID = mw.MathUtil.randomInt(0, this.cfgLevels.length);
        let ogid = this.cfgLevels[levelID].ObstacleGroupID;
        let sp = this.cfgLevels[levelID].SpawnPos;
        for (let i = 0; i < ogid.length; i++) {
            this._levelData.push({ spawnPos: sp[i], ObstacleGroupID: ogid[i] });
        }
    }

    /**
     * 初始化池数据
     * @param cfgs 
     * @param initLength 默认生成的数量
     */
    private initPoolData(cfgs: IAssetsElement[], initLength: number) {
        this._obstacleMap = new Map();
        this._obstacleData = new Map();
        cfgs.forEach((cfg) => {
            if (cfg.Groupid != 1) {
                this._obstacleData.set(cfg.NameID, { rGuid: cfg.PrefabsGuid, rType: cfg.ResourceGroup, lenght: cfg.Lenght });
                //寻找天空金币的id
                if (cfg.ResourceGroup == ResourceType.SkyCoins) {
                    this._skyCoinsID = cfg.NameID;
                    console.log
                }
            }
        });

        /**将障碍数据加入分针生成队列 */
        for (let [k, v] of this._obstacleData) {
            let size = initLength;
            //如果是障碍物组、天空金币关卡则只可以生成两个
            if (v.rType == ResourceType.CantRandomAndCanPass || v.rType == ResourceType.SkyCoins) size = 2;
            for (let i = 0; i < size; i++) {
                this.logicTempData.push(k)
            }
        }
        this._loadUi = mw.UIService.getUI(LoadingUI);
        this._loadNum = 0;
        this._loadMax = this.logicTempData.length;
    }

    /**
     * 动态加载障碍
     * @returns 
     */
    private async loadAssetInPool(dt: number) {
        if (this.logicTempData.length < 1)
            return;
        this._initing = true;
        let id = this.logicTempData.pop();
        if (id != 0) {
            let ob = new Obstacle(id);
            await ob.init();
            this._loadNum++;
            this._loadUi.setPro(this._loadNum / this._loadMax);
            this._initing = false;
            if (!this.flagID) {
                this.flagID = id;
            }

            if (this.flagID != id) {
                this._obstacleMap.set(this.flagID, this.logicList);
                this.logicList = [];
                this.flagID = id;
            }
            this.logicList.push(ob);
            //最后一个
            if (this.logicTempData.length < 1) {
                this._obstacleMap.set(this.flagID, this.logicList);
                this.logicList.length = 0;
                this._initing = true;
                this._loadUi.setPro(2);
                this.checkHaveRookieScene();
            }
        }
        else
            this._initing = false;
    }

    /**
     * 初始化随机数据
     */
    private initRadomObstalceData() {
        GameConfig.Assets.getAllElement().forEach(cfg => {
            if (cfg.Groupid == 2) {
                this._randomObstacleData.push({ nameID: cfg.NameID, ResourceType: cfg.ResourceGroup, weight: cfg.Ratio });
            }
        });
        for (let i = 0; i < this._randomObstacleData.length; i++) {
            if (this._randomObstacleData[i].ResourceType == 1) {
                this._canPassObstacleIndex = i;
            }
            for (let j = 0; j < this._randomObstacleData[i].weight.length; j++) {
                this._allWeight[j] || this._allWeight.push(0);
                this._allWeight[j] += this._randomObstacleData[i].weight[j];
            }
        }
    }

    /**
     * 设置天空金币关卡的位置
     * @param posX 
     * @param posZ 
     */
    public setSkyCoinsLevelPos(posX: number, posZ: number) {
        let re = this._obstacleMap.get(this._skyCoinsID);
        if (re && re[0]) {
            let pos = this._tracks[0].clone();
            pos.x = posX;
            pos.z = posZ;
            this._skyCoins = re.pop();
            this._skyCoins.setLocation(pos);
            this._onUsageObstacle.push(this._skyCoins);
        }
    }

    /**
     * 隐藏飞行金币
     */
    public hideSkyCoins() {
        if (this._skyCoins)
            this._skyCoins.resetPos();
    }

    /**
     * 通过id组获取障碍组
     * @param ids 
     * @returns 
     */
    public getObstacleByID(ids: number[]) {
        let objs: Obstacle[] = [];
        for (let id of ids) {
            if (!this._obstacleMap.has(id)) {
                console.log(`未找到id为: ${id}的对象列表`);
                continue;
            }
            let objList = this._obstacleMap.get(id);
            let obj = objList.pop();
            if (obj) {
                objs.push(obj);
            } else {
                obj = new Obstacle(id);
                obj.init();
                objList.push(obj);
            }
        }
        return objs;
    }


    /**
     * 将障碍放回池内
     * @param obj 
     * @returns 
     */
    public putbackObstacleToPool(obj: Obstacle) {
        //检查对象是否存在于map内
        if (!this._obstacleMap.has(obj.id)) return;
        let objList = this._obstacleMap.get(obj.id);
        //对象已存在表中、直接返回
        if (objList.indexOf(obj) != -1) return;
        obj.resetPos();
        objList.push(obj);
    }

    /**
     * 复活隐藏
     */
    public hide(dis: number = 1000) {
        for (let i = 0; i < this._onUsageObstacle.length; i++) {
            let ob = this._onUsageObstacle[i];
            ob.setHide(dis);
        }
    }

    /**查看是否有新手关卡 */
    private checkHaveRookieScene() {
        if (DataManager.isGuideScene) {
            this._obstaclesSpwanDis += GameConfig.Assets.getElement(1).Lenght;
        }
    }

    /**
     * 通过关卡定点距离生成障碍物组
     * @param spawnPoint 
     * @returns 返回id
     */
    private getLevelDataByDistance(spawnPoint: number) {
        if (!this._levelData[this._levelDataIndex]) return 0;
        if (spawnPoint >= this._levelData[this._levelDataIndex].spawnPos) {
            return this._levelData[this._levelDataIndex++].ObstacleGroupID;
        }
        else {
            return 0;
        }
    }

    /**重置 */
    public reset() {
        this._obstaclesSpwanDis = GameConfig.Global.getElement(103).Value;
        this._aheadCreateLen = 0;
        this._mgsRandomLevelCount = 0;
        this._levelDataIndex = 0;
        for (let i of this._onUsageObstacle) {
            this.putbackObstacleToPool(i)
        }
        for (let i of this._tracks) {
            i.x = 0;
        }
        this._onUsageObstacle.length = 0;
        this._logicQueue.forEach((data) => {
            if (data.obj) {
                this.putbackObstacleToPool(data.obj);
            }
        });
        this._logicQueue.length = 0;
        this.checkHaveRookieScene();
        this._obstacleWeight.onReset();
        this.initLevelData();
    }

    public onUpdate(dt: number): void {
        if (!this._initing)
            this.loadAssetInPool(dt);
        if (!DataManager.isGaming && !DataManager.isReady)
            return;
        this._aheadCreateLen = DataManager.gameDis + this._initSpawnObstaclePos;
        this.createObstatecleInScene();
        this.checkObstaclePutbackPool();
        if (this._logicQueue.length > 0) {
            if (this._logicQueue[0] && this._logicQueue[0].obj) {
                this._logicQueue[0].obj.setLocation(this._logicQueue[0].pos);
                this._onUsageObstacle.push(this._logicQueue[0].obj);
            }
            this._logicQueue.shift();
        }
        this._onUsageObstacle.forEach(ob => {
            ob.onUpdate(dt);
        });
        this._obstacleWeight.onUpdate();
    }

    /**
     * 回收到障碍池中
     */
    private checkObstaclePutbackPool() {
        for (let i = 0; i < this._onUsageObstacle.length; i++) {
            if (!this._onUsageObstacle[i].active) {
                let t = this._onUsageObstacle[i];
                this._onUsageObstacle.splice(i, 1);
                this.putbackObstacleToPool(t);
            }
        }
    }

    /**
     * 在关卡内创建障碍
     */
    private createObstatecleInScene() {
        if (this._logicQueue.length <= 0 && this._obstaclesSpwanDis < this._aheadCreateLen) {
            let resultID = this.getLevelDataByDistance(this._obstaclesSpwanDis);
            let objs: Obstacle[];
            if (resultID) {
                objs = this.getObstacleByID([resultID]);
            } else {
                objs = this.randomObstacle();
            }

            //统计道具
            objs.forEach(e => {
                if (e.isItem) {
                    // console.error(`生成道具id：${e.id}`);
                    DataManager.totalItems += 1;
                }
            });

            this.setObstacleRandomPositon(objs);
            //加上障碍间隔
            this._obstaclesSpwanDis += GameConfig.Global.getElement(102).Value;
            this._mgsRandomLevelCount++;
        }
    }

    /**
     * 随机障碍
     */
    private randomObstacle() {
        let obIds = this.getRandomObstacleID();
        let objs = this.getObstacleByID(obIds);
        return objs;
    }

    /**
     * 随机获取三个障碍物id
     * 其中一个必定是可以通过的
     */
    private getRandomObstacleID() {
        //在这一段跑道不可以通过的障碍个数
        let cantPassCount = 0;
        let obIds: number[] = [];
        let obData: { nameID: number, ResourceType: ResourceType };
        for (let i = 0; i < 3; i++) {
            if (cantPassCount >= 2) {
                obData = this.getRandomObstacleData(true);
            }
            else {
                obData = this.getRandomObstacleData();
            }
            if (obData.ResourceType == ResourceType.CanRandomAndCantPass || obData.ResourceType == ResourceType.CanRamdomAndCantPassPos) {
                cantPassCount++;
            }
            obIds.push(obData.nameID);
        }
        return obIds;
    }

    /**
     * 随机获取障碍物数据
     * @param isPass 是否指定通过
     * @returns 
     */
    private getRandomObstacleData(isPass: boolean = false) {
        let weight = 0;
        let random = 0;
        if (isPass) {
            for (let i = 0; i < 10; i++) {
                random = mw.MathUtil.randomInt(0, this._allWeight[this._obstacleWeight.weightIndex]);
                weight = 0;
                for (let i of this._randomObstacleData) {
                    weight += i.weight[this._obstacleWeight.weightIndex];
                    if (weight > random && i.ResourceType == ResourceType.CanRandomAndCanPass) {
                        return { nameID: i.nameID, ResourceType: i.ResourceType };
                    }
                }
            }
            // console.log(`调用了低保方法`);
            //保证有一条道路是可通过的
            return this._randomObstacleData[this._canPassObstacleIndex];
        } else {
            random = mw.MathUtil.randomInt(0, this._allWeight[this._obstacleWeight.weightIndex]);
            for (let i of this._randomObstacleData) {
                weight += i.weight[this._obstacleWeight.weightIndex];
                if (weight > random) {
                    return { nameID: i.nameID, ResourceType: i.ResourceType };;
                }
            }
            // console.log(`未找到、随机值：${random}，权重：${weight}`);
        }
    }

    /**
     * 给障碍组随机位置
     * 包括障碍组和障碍组合
     * @param objs 
     */
    private setObstacleRandomPositon(objs: Obstacle[]) {
        this._logicQueue.push({ obj: null, pos: null });
        for (let i of this._tracks) {
            i.x = this._obstaclesSpwanDis;
        }
        for (let i = 0; i < objs.length; i++) {
            switch (objs[i].resourceType) {
                case ResourceType.CanRamdomAndCantPassPos:
                    this._tracks[i].x += mw.MathUtil.randomInt(100, 151);
                    break;
                case ResourceType.CanRandomAndCanPass:
                    this._tracks[i].x += mw.MathUtil.randomInt(100, 701);
                    break;
                case ResourceType.CanRandomAndCantPass:
                    this._tracks[i].x += mw.MathUtil.randomInt(100, 701);
                    break;
                default:
                    break;
            }
            this._logicQueue.push({ obj: objs[i], pos: this._tracks[i] });
            let obLen = this._tracks[i].x + objs[i].getObLenght;

            //更新每段障碍生成的起始位置
            if (this._obstaclesSpwanDis < obLen) {
                this._obstaclesSpwanDis = obLen;
            }
        }
        this._logicQueue.push({ obj: null, pos: null });
    }

}



/**
 * 障碍权重管理类
 * 负责到指定位置切换权重组
 */
class ObstacleWeight {
    private _weightIndex: number = 0;
    /**障碍权重下标切换条件 */
    private _weightCutCodition: number[];
    private _index: number = 0;

    public get weightIndex() {
        return this._weightIndex;
    }
    public constructor() {
        this._weightIndex = 0;
        this._index = 0;
        this._weightCutCodition = GameConfig.Global.getElement(106).Value5;
    }

    public onUpdate() {
        if (!this._weightCutCodition[this._index]) {
            return;
        }
        if (DataManager.gameDis > this._weightCutCodition[this._index]) {
            this._weightIndex++;
            this._index++;
        }
    }

    public onReset() {
        this._index = 0;
        this._weightIndex = 0;
    }
}