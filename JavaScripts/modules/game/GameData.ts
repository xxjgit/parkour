
import { GuideTarget } from "../../const/Define";


export class GameInfo {    //之前的结构没变化
    public coinNum: number = 0;
    //宝石数
    public gemNum: number = 0;
    //分
    public score: number = 0;
    //新手关卡引导
    public guideScene: number = 0;
    //商店引导
    public guideShop: number = 0;
    //角色引导
    public guideRole: number = 0;
}

export class GameData extends Subdata {

    @Decorator.persistence()
    public coinNum: number = 0;
    //宝石数
    @Decorator.persistence()
    public gemNum: number = 0;
    //分
    @Decorator.persistence()
    public score: number = 0;
    //新手关卡引导
    @Decorator.persistence()
    public guideScene: number = 0;
    //商店引导
    @Decorator.persistence()
    public guideShop: number = 0;
    //角色引导
    @Decorator.persistence()
    public guideRole: number = 0;
    public get dataName(): string {  //新加的兼容
        return 'GameData';
    }

    protected onDataInit(): void {
        if (!this.guideScene)
            this.guideScene = 0;
        if (!this.gemNum)
            this.gemNum = 0;
        if (!this.guideShop)
            this.guideShop = 0;
        if (!this.guideRole)
            this.guideRole = 0;
    }
    protected initDefaultData(): void {
        super.initDefaultData();
        this.coinNum = 0;
        this.score = 0;
        this.guideScene = 0;
        this.gemNum = 0;
        this.guideRole = 0;
        this.guideShop = 0;
        //console.log(this.score)
    }

    /**
     * 获取引导
     * @param target 目标
     * @returns 
     */
    public getGuide(target: GuideTarget): number {
        let re: number = 0;
        switch (target) {
            case GuideTarget.Scene:
                re = this.guideScene;
                break;
            case GuideTarget.Role:
                re = this.guideRole;
                break;
            case GuideTarget.Shop:
                re = this.guideShop;
                break;
            default:
                break;
        }
        return re;
    }


    /**
     * 设置新手引导是否完成
     * @param target 
     * @param guide 
     */
    public setGuide(target: GuideTarget, guide: number) {
        switch (target) {
            case GuideTarget.Scene:
                this.guideScene = guide;
                break;
            case GuideTarget.Role:
                this.guideRole = guide;
                break;
            case GuideTarget.Shop:
                this.guideShop = guide;
                break;
            default:
                break;
        }
        this.save(true);
    }

    /**
     * 增加货币
     * @param coin 金币数量
     * @param gem 宝石数量
     */
    public addMoney(coin: number, gem: number) {
        this.coinNum += coin;
        this.gemNum += gem;
        this.save(true);
    }
    /**
     * 消耗货币
     * @param coin 金币数量
     * @param gem 宝石数量
     * @returns  是否成功
     */
    public costMoney(coin: number, gem: number): boolean {
        if (!this.enough(coin, gem))
            return false;
        this.coinNum -= coin;
        this.gemNum -= gem;
        this.save(true);
        return true;
    }
    /**
     * 消耗货币
     * @param coin 金币数量
     * @param gem 宝石数量
     * @returns  是否成功
     */
    public enough(coin: number, gem: number): boolean {
        if (this.coinNum < coin)
            return false
        if (this.gemNum < gem)
            return false;
        return true;
    }
    /**
     * 获取当前货币
     */
    public get curCoin(): number {
        return this.coinNum;
    }
    /**
     * 获取当前货币
     */
    public get curGem(): number {
        return this.gemNum;
    }

    // /**
    //  * 直接设置货币数量
    //  * @param num 数量
    //  */
    // public setCoin(num: number) {
    //     this.coinNum = num;
    //     this.saveData(true);
    // }
    /**
     * 设置得分
     * @param score 得分
     */
    public setScore(score) {
        this.score = score;
        this.save(true);
    }
    /**
     * 获取最高分
     */
    public get maxScore(): number {
        return this.score;
    }
}