interface ItemCell {
    //唯一ID 备用
    //guid: string,

    //配置ID
    id: number,
    //数量
    count: number,
    //时限道具 0无限
    //time: number,
    //激活
    // active: boolean = true;
    //等级
    lv: number,
}


export class ItemInfo {

    public list: ItemCell[] = [];
    /**第一次升级 */
    public isFirstUP: boolean = true;
    /**第一次商店购买 */
    public isFirstShopBuy: boolean = true;

}

export class ItemData extends Subdata {
    // @Decorator.persistence()
    // data = new ItemInfo();
    @Decorator.persistence()
    public list: ItemCell[] = [];
    /**第一次升级 */
    @Decorator.persistence()
    public isFirstUP: boolean = true;
    /**第一次商店购买 */
    @Decorator.persistence()
    public isFirstShopBuy: boolean = true;

    public get dataName(): string {
        return 'ItemData'//.name;
    }
    protected onDataInit(): void {
        if (!this.list)
            this.list = [];
    }
    protected initDefaultData(): void {
        super.initDefaultData();
        this.list = [];
        this.isFirstUP = true;
        this.isFirstShopBuy = true;
    }

    public get lenght() {
        return this.list.length;
    }

    /**
     * 是否第一次升级
     */
    // public get isFirstUP() {
    //     return this.isFirstUP;
    // }

    // /**是否第一次在商店购买 */
    // public get isFirstShopBuy() {
    //     return this.isFirstShopBuy;
    // }

    /**
     * 添加道具
     * @param id 配置ID
     * @param count 数量
     */
    public addItem(id: number, count: number, isShopBuy: boolean = false, isGuideBuy: boolean = false) {
        let cell = this.getItem(id, true);
        cell.count += count;
        if (isShopBuy && this.isFirstShopBuy && !isGuideBuy) {
            this.isFirstShopBuy = false;
        }
        this.save(true);
    }
    /**
     * 道具升级
     * @param id 道具ID
     * @param lv 等级
     */
    public upItem(id: number, lv: number) {
        if (this.isFirstUP) {
            this.isFirstUP = false;
        }
        let cell = this.getItem(id, true);
        cell.lv = lv;
        this.save(true);
        //this.syncToClient();
    }
    /**
     * 消耗道具
     * @param num 数量
     * @returns  是否成功
     */
    public costItem(id: number, count: number): boolean {
        let cell = this.getItem(id, false);
        if (!cell || cell.count < count)
            return false
        cell.count -= count;
        this.save(true);
        return true;
    }
    /**
     * 获取道具的数量
     * @param id 
     * @returns 数量
     */
    public getItemCount(id: number): number {
        let cell = this.getItem(id, false);
        return cell ? cell.count : 0;
    }
    /**
     * 获取道具等级
     * @param id 道具ID
     * @returns 
     */
    public getItemLv(id) {
        let cell = this.getItem(id, false);
        return cell ? cell.lv : 0;
    }

    /**
     * 获取一个道具
     * @param id 道具id
     * @param create 没有创建
     */
    private getItem(id: number, create: boolean) {
        let item = null;
        for (let i = 0; i < this.list.length; i++) {
            let cell = this.list[i];
            if (cell.id == id) {
                item = cell;
                break;
            }
        }
        if (!item && create) {
            item = { id: id, count: 0, lv: 0 };
            this.list.push(item);
        }
        return item;
    }
}