/** 
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2022-12-09 11:02
 * @LastEditTime : 2023-02-28 13:11
 * @description  : 
 */
export namespace Const {
    /**
     * 角色基础高度
     */
    export const BASE_HEIGHT = 72
        ;
    /**
     * 60帧的间隔
     */
    export const DELAT_TIME = 0.0167;
    /**
     * 路宽
     */
    export const ROAD_WIDTH = 230;
    /**
     * 台阶高度（角色可上
     */
    export const STEP_HEIGHT = 60;

    /**
     * 上方路线的高度
     */
    export const OVER_HEIGHT = 350;
    /**
     * 跳板高度
     */
    export const BOAED_HEIGHT = 110;
    /**
     * 角色飞行高度
     */
    export const FLY_HEIGHT = 800;
    /**
     * 移动z最大旋转
     */
    export const MOVE_ROTMAX = 25;
    /**
     * 移动z旋转
     */
    export const MOVE_ROTZ = 25;

    /**
     * 眩晕特效时间
     */
    export const VERTIGO_TIME = 8;
    /**
     * 基准点
     */
    export const BASE_POS = 1000;



    /****全局事件 */

    //道具使用
    export const ITEM_USE = 'ITEM_USE';
    export const ITEM_ADD = 'ITEM_ADD';
    export const COMPLETE_GUIDE_SCENE = 'Complete_GUIDE';
}