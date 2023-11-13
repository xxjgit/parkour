import { GameConfig } from "../config/GameConfig";

/*
 * @Author: xianjie.xia
 * @LastEditors: pengwei.shi
 * @Date: 2022-11-04 15:08
 * @LastEditTime: 2022-11-27 14:29:02
 * @description: 
 */
export namespace Utils {
    /**
     * 给节点添加脚本
     * @param guid 脚本资源GUID
     * @param root 挂到的节点
     * @returns 
     */
    export async function addScript<T extends mw.Script>(guid: string, root: mw.GameObject) {
        const sc = await mw.Script.spawnScript(guid, false);
        sc.gameObject = root;
        return sc as T;
    }
    /**
     * 角度sin值
     * @param angel 角度
     * @returns 
     */
    export function sin(angel: number) {
        return Math.sign(angel / 57.296);
    }
    /**
     * 最多保留len位小数，负数略小
     * @param pos 
     * @param len 
     */
    export function formatPos(pos, len: number = 2) {
        let v = Math.pow(10, len);
        pos.x = Math.floor(pos.x * v) / v;
        pos.y = Math.floor(pos.y * v) / v;
        if (pos.z)
            pos.z = Math.floor(pos.z * v) / v;
        return pos;
    }
    /**
     * 旋转值-180~180
     * @param rot 
     */
    export function formatRot(rot: mw.Rotation) {
        rot.x = formatV(rot.x);
        rot.y = formatV(rot.y);
        rot.z = formatV(rot.z);
        return rot;
    }
    function formatV(v) {
        v = v % 360;
        if (v > 180)
            v -= 360;
        else if (v < -180)
            v += 360;
        return v
    }
    /**
     * 将坐标归整
     * @param pos 
     */
    export function setPosInt(pos: mw.Vector): mw.Vector {
        pos.x = pos.x > 0 ? Math.ceil(pos.x) : Math.floor(pos.x);
        pos.y = pos.y > 0 ? Math.ceil(pos.y) : Math.floor(pos.y);
        pos.z = pos.z > 0 ? Math.ceil(pos.z) : Math.floor(pos.z);
        return pos;
    }
    /**
     * 
     * @param min 最小值
     * @param max 最大值
     */
    export function random(min: number, max: number): number {
        var rang = max - min;
        var rand = Math.random() * rang;
        return Math.floor(rand) + min;
    }
    /**
     * 从数组中随机几个返回
     * @param list 数组
     * @param num 数量
     */
    export function randomList(list, num: number): any[] {
        if (list.length <= num)
            return list;

        let arry = [];
        list.forEach(item => {
            arry.push(item);
        });
        let nums = [];
        for (let i = 0; i < num; i++) {
            let rand = random(0, arry.length);
            let v = arry[rand];
            nums.push(v);
            arry.splice(rand, 1);
        }
        return nums;
    }

    /**
     * 设置多个ui的可见性
     * @param visible 
     * @param uis 
     */
    export function setUIVisible(visible: boolean, ...uis: mw.Widget[]) {
        if (visible) {
            uis.forEach((ui) => {
                ui && (ui.visibility = mw.SlateVisibility.Visible);
            });
        } else {
            uis.forEach((ui) => {
                ui && (ui.visibility = mw.SlateVisibility.Hidden);
            });
        }
    }


    export function getLanguage(): number {
        let language = mw.LocaleUtil.getDefaultLocale().toLowerCase();
        if (!!language.match("zh")) {
            return 0;
        }
        if (!!language.match("en")) {
            return 1;
        }
        if (!!language.match("ja")) {
            return 2;
        }
        if (!!language.match("de")) {
            return 3;
        }
        return 0;
    }

    export function getTxt(nameID: string) {
        let lan = GameConfig.Language[nameID];
        if (!lan) {
            console.warn(`未找到${nameID}的多语言！`);
            return;
        }
        return lan.Value;
    }

    export function initLanguageUI(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior('lan');
        if (call && ui) {
            call(ui);
        }
    }
}