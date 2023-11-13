/** 
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2023-02-06 16:37
 * @LastEditTime : 2023-03-14 17:44
 * @description  : 
 */
/*
 * @Author: pengwei.shi
 * @Date: 2022-11-21 10:01:07
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-22 16:51:01
 * @FilePath: \streetparkour\JavaScripts\modules\role\RoleData.ts
 * @Description: 
 */

class RoleInfo {
    /**已获得的服装id */
    public clothesIDs: number[] = [];
    /**装备的服装ID */
    public equipID: number = 1;
}

export class RoleData extends Subdata {

    // @Decorator.persistence()
    // private data = new RoleInfo();
    @Decorator.persistence()
    public clothesIDs: number[] = [];
    /**装备的服装ID */
    @Decorator.persistence()
    public equipID: number = 1;
    public get dataName(): string {
        return 'RoleData';
    }

    protected onDataInit(): void {
        if (!this.clothesIDs || !this.equipID) {
            this.equipID = 1;
            this.clothesIDs = [1];
        }
    }

    protected initDefaultData(): void {
        super.initDefaultData();
        this.clothesIDs = [1];
        this.equipID = 1;
    }

    public get curClothesIDs() {
        return this.clothesIDs;
    }

    public get curEquitID() {
        return this.equipID;
    }
    public setCurEquitID(val: number) {
        this.equipID = val;
    }


    public saveClothesData(clothesID: number) {
        this.clothesIDs.push(clothesID);
        this.save(true);
    }

    public saveEquipID(clothesID: number) {
        this.equipID = clothesID;
        this.save(true);
    }

}