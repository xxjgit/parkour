

import { RoleData } from "./RoleData";
import { RoleModuleC } from "./RoleModuleC";
/** 
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2023-02-06 16:37
 * @LastEditTime : 2023-03-08 18:12
 * @description  : 
 */
export class RoleModuleS extends ModuleS<RoleModuleC, RoleData>{

    public override onStart(): void {
        super.onStart();
    }
    onPlayerEnterGame(player: mw.Player): void {
        super.onPlayerEnterGame(player);
        // console.log('enter ', player.playerId)
        //this.getAllClient().net_hideRole(player.playerId);
    }

    /**
     * 保存衣服数据
     * @param id 
     */

    public net_saveClothesData(id: number) {
        console.log(`cundang ${id}`);
        this.currentData.saveClothesData(id);
    }

    /**
     * 更新当前装备的服装
     * @param id 
     */

    public net_saveEquipData(id: number) {
        this.currentData.saveEquipID(id);
    }
}