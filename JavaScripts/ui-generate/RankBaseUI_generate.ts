
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/RankBaseUI.ui
 * TIME: 2023.05.15-17.19.24
 */



@UIBind('UI/RankBaseUI.ui')
export default class RankBaseUI_generate extends mw.UIScript {
	@UIWidgetBind('MWCanvas_2147482460/mTxt_Ranking')
	public mTxt_Ranking: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mTxt_Name')
	public mTxt_Name: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mTxt_Score')
	public mTxt_Score: mw.TextBlock = undefined;



	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		// 
		//按钮添加点击
		// 

		//按钮多语言

		//文本多语言

		this.initLanguage(this.mTxt_Ranking)


		this.initLanguage(this.mTxt_Name)


		this.initLanguage(this.mTxt_Score)


		//文本多语言


	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
		let call = mw.UIScript.getBehavior("lan");
		if (call && ui) {
			call(ui);
		}
	}
}
