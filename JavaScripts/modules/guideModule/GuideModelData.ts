/*
 * @Author: YuKun.Gao
 * @Date: 2022-06-27 10:15:29
 * @LastEditors: yukun.gao yukun.gao@appshahe.com
 * @LastEditTime: 2022-11-16 15:19:25
 * @Description: file content
 * @FilePath: \JavaScripts\module\guideModule\GuideModelData.ts
 */


/** 新手引导 存档数据 结构 */
export class GuideSrcData {

    /**
     * 已经完成的引导
     */
    public complateGuide: number[] = null;

    /**
     * 当前引导
     */
    public curGuide: number = 0;

}

/** 新手引导 数据 操作类 */
export class GuideDataHelper extends Subdata {

    public onGuideChangeAction: mw.Action = new mw.Action();

    // @Decorator.persistence()
    // private data = new GuideSrcData();
    @Decorator.persistence()
    public complateGuide: number[] = null;

    /**
     * 当前引导
     */
    @Decorator.persistence()
    public curGuide: number = 0;
    // public constructor() {
    //     super(GuideSrcData);
    // }
    public get dataName(): string {
        return 'GuideSrcData';
    }
    /**
     * 初始化引导
     */
    protected initDefaultData(): void {
        if (this.complateGuide == null)
            this.complateGuide = [];
    }

    /**
     * 重置所有引导存档
     */
    public resetAllGuide() {
        this.complateGuide = [];
        this.curGuide = 0;
        this.save(true);
    }

    /**
     * 重置引导存档
     * @param guideId 
     */
    public resetGuideById(guideId: number): boolean {

        let newList = [];
        let has = false;
        this.complateGuide.forEach(e => {
            if (e == guideId) {
                has = true;
                return;
            }
            newList.push(guideId);
        })
        if (!has) return true;
        this.complateGuide = newList;
        if (this.curGuide == guideId) {
            this.curGuide = 0;
        }
        this.save(true);
        return true;

    }

    /**
     * 完成引导
     * @param guideId 引导id
     */
    public onComplate(guideId: number) {
        this.complateGuide.push(guideId);
        this.onGuideChangeAction.call();
        this.save(true);

    }

    /**
     * 引导是否完成
     * @param guideId 引导id
     * @returns 
     */
    public guideIsComplate(guideId: number): boolean {
        let guide = this.complateGuide.findIndex(e => { return e == guideId; })
        if (guide >= 0) {
            return true;
        }
    }

    /**
     * 获取当前引导
     */
    public getCurGuide(): number {
        return this.curGuide;
    }

    /**
     * 设置当前引导阶段
     * @param val 
     */
    public setCurGuide(val: number) {
        this.curGuide = val;
        this.save(true);
    }

}