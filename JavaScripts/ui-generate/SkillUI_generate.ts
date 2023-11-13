
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/SkillUI.ui
 * TIME: 2023.05.15-17.19.24
 */



@UIBind('UI/SkillUI.ui')
export default class SkillUI_generate extends mw.UIScript {
	@UIWidgetBind('MWCanvas_2147482460/mImg_Icon')
	public mImg_Icon: mw.Image = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mTxt_Name')
	public mTxt_Name: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mTxt_Des')
	public mTxt_Des: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mLevelContent')
	public mLevelContent: mw.Canvas = undefined;
	@UIWidgetBind('MWCanvas_2147482460/MWCanvas_2/mBtn_LvUp')
	public mBtn_LvUp: mw.Button = undefined;
	@UIWidgetBind('MWCanvas_2147482460/MWCanvas_2/mIcon_coin')
	public mIcon_coin: mw.Image = undefined;
	@UIWidgetBind('MWCanvas_2147482460/MWCanvas_2/mIcon_Diamonds')
	public mIcon_Diamonds: mw.Image = undefined;
	@UIWidgetBind('MWCanvas_2147482460/MWCanvas_2/mTxt_Price')
	public mTxt_Price: mw.TextBlock = undefined;



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
		// this.mBtn_LvUp.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_LvUp");
		// })
		// this.mBtn_LvUp.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		// 


		//按钮多语言

		//文本多语言

		this.initLanguage(this.mTxt_Name)


		this.initLanguage(this.mTxt_Des)


		this.initLanguage(this.mTxt_Price)


		//文本多语言


	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
		let call = mw.UIScript.getBehavior("lan");
		if (call && ui) {
			call(ui);
		}
	}
}
