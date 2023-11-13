import { SpawnManager,SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
﻿/*
 * @Author: pengwei.shi
 * @Date: 2022-11-04 17:07:21
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-16 09:42:14
 * @FilePath: \streetparkour\JavaScripts\modules\scene\SceneModuleC.ts
 * @Description: 
 */

import { IAssetsElement } from "../../config/Assets";
import { GameConfig } from "../../config/GameConfig";
import { ILevelElement } from "../../config/Level";
import { Const } from "../../const/Const";
import { DataManager } from "../../data/DataManager";
import { SceneModuleS } from "./SceneModuleS";

export class SceneModuleC extends ModuleC<SceneModuleS, null> {
    sceneLocation: mw.Vector;
    private _levelCfg: ILevelElement[];
    //关卡id
    private _level: ILevelElement;
    /**是否可以随机关卡 */
    private _isRandomScene: boolean;
    /**是否完成新手关卡 */
    private _isCompleteRookie: boolean;

    private _sceneManager: Map<number, { scene: mw.GameObject, lenght: number }>;
    private _sceneIndex: number;
    rookieScene: { scene: mw.GameObject, lenght: number };
    private _oringinLoc: mw.Vector;

    public onAwake() {
        this._isRandomScene = false;
        this._isCompleteRookie = true;
    }
    onStart(): void {
        Event.addLocalListener(Const.COMPLETE_GUIDE_SCENE, () => {
            let timeid = setTimeout(() => {
                this.rookieScene.scene.worldTransform.position = new mw.Vector(0, 0, -5000);
                clearTimeout(timeid);
            }, 2000);
        });
    }
    public init() {
        SpawnManager.asyncSpawn({ guid: '2CC6A6874088E0328EDECA8434F7F284', replicates: false }).then((obj) => {
            let loc = new mw.Vector(-782, Const.BASE_POS, 0);
            obj.worldTransform.position = loc;
        })
        this._levelCfg = GameConfig.Level.getAllElement();
        this._level = GameConfig.Level.getElement(this.randomSceneID);
        this._sceneIndex = 0;
        this.sceneLocation = new mw.Vector(1200, Const.BASE_POS, 0);
        this.initSceneData(GameConfig.Assets.getAllElement());
    }


    /**
     * 初始化
     * @param cfgs 
     */
    async initSceneData(cfgs: IAssetsElement[]) {
        this._sceneManager = new Map();
        this._oringinLoc = new mw.Vector(0, 0, -5000);
        for (let i = 0; i < cfgs.length; i++) {
            let cfg = cfgs[i];
            if (cfg.Groupid == 1 && i != 0) {
                let objScene = await SpawnManager.asyncSpawn({ guid: cfg.PrefabsGuid });
                objScene.worldTransform.position = this._oringinLoc;
                this._sceneManager.set(cfg.NameID, { scene: objScene, lenght: cfg.Lenght });
            } else if (cfg.Groupid == 1 && i == 0) {
                let objScene: mw.GameObject = null;
                if (DataManager.isGuideScene) {
                    objScene = await SpawnManager.asyncSpawn({ guid: cfg.PrefabsGuid });
                    objScene.worldTransform.position = this._oringinLoc;
                }
                this.rookieScene = { scene: objScene, lenght: cfg.Lenght };
            }
        }
        this.checkHaveRookieLevel();
        //console.log('initSceneData')
    }

    /**
     * 通过id获取场景
     * @param id 
     * @returns 
     */
    getSceneByID(id: number) {
        if (this._sceneManager.has(id)) {
            return this._sceneManager.get(id);
        } else {
            console.log(`未找到找当id为${id}的场景`);
            return null;
        }
    }

    /**检查是否需要生成新手关卡 */
    private checkHaveRookieLevel() {
        if (DataManager.isGuideScene) {
            this.rookieScene.scene.worldTransform.position = this.sceneLocation;
            this.renewSceneLoc(this.rookieScene);
            this._isCompleteRookie = false;
        }
        this._isRandomScene = true;
    }

    public reset() {
        this._sceneManager.forEach(obj => {
            obj.scene.worldTransform.position = this._oringinLoc;
        });
        this._sceneIndex = 0;
        this.sceneLocation = new mw.Vector(1200, Const.BASE_POS, 0);
        this.checkHaveRookieLevel()
    }


    /**
     * 随机获取一个场景难度值
     * @returns 
     */
    private get randomSceneID() {
        let lastIndex = this._levelCfg.length - 1;
        let random = mw.MathUtil.randomInt(1, this._levelCfg[lastIndex].id + 1);
        return random;
    }


    /**
     * 场景更新
     * @param LevelLen 连续生成的场景个数
     */
    private renewScene() {
        let out = this.getSceneByID(this._level.Scene[this._sceneIndex++]);
        if (out == null) {
            console.error("物体不存在！！！！");
        }
        if (this._sceneIndex >= this._level.Scene.length) {
            this._sceneIndex = 0;
        }
        out.scene.worldTransform.position = this.sceneLocation;
        this.renewSceneLoc(out);
    }

    /**
     * 根据当前场景获取新场景的位置
     * @param scene 当前场景
     * @returns 
     */
    private renewSceneLoc(scene: { scene: mw.GameObject, lenght: number }) {
        let sceneLengthX: number = 0;
        if (scene) {
            sceneLengthX = scene.lenght;
        }
        this.sceneLocation.x += sceneLengthX;
    }

    public onUpdate(dt: number) {
        if (!this._sceneManager) return;
        if (this.sceneLocation.x < (DataManager.gameDis + 9000) && this._isRandomScene) {
            this.renewScene();
        }
    }

}