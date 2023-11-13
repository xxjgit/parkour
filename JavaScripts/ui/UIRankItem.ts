/** 
 * @Author       : pengwei.shi
 * @Date         : 2022-12-07 11:07:27
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-01-12 15:19:06
 * @FilePath     : \streetparkour\JavaScripts\ui\UIRankItem.ts
 * @Description  : 修改描述
 */
import RankBaseUI_generate from "../ui-generate/RankBaseUI_generate";

export class UIRankItem extends RankBaseUI_generate {
    public size: mw.Vector2 = null;
    protected onAwake(): void {
        this.size = this.uiObject.size;
    }

    /**
     * 初始化数据
     * @param ranking 排名 
     * @param name 名字
     * @param score 分数
     */
    public initData(ranking: number, name: string, score: number) {
        this.mTxt_Name.text = name;
        this.mTxt_Ranking.text = ranking.toFixed(0);
        this.mTxt_Score.text = score.toFixed(0);
    }

    public reset() {
        this.mTxt_Name.text = "";
        this.mTxt_Ranking.text = "";
        this.mTxt_Score.text = "";
    }
}