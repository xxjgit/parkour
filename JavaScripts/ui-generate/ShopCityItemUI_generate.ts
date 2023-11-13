
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/ShopCityItemUI.ui
 * TIME: 2023.05.15-17.19.24
 */



@UIBind('UI/ShopCityItemUI.ui')
export default class ShopCityItemUI_generate extends mw.UIScript {
	@UIWidgetBind('MWCanvas_2147482460/TopCanvas/mIcon_Prop')
	public mIcon_Prop: mw.Image = undefined;
	@UIWidgetBind('MWCanvas_2147482460/TopCanvas/mTxt_PropName')
	public mTxt_PropName: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/TopCanvas/mTxt_Num')
	public mTxt_Num: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/DownCanvas/mBtn_Buy')
	public mBtn_Buy: mw.Button = undefined;
	@UIWidgetBind('MWCanvas_2147482460/DownCanvas/mTxt_Price')
	public mTxt_Price: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/DownCanvas/mIcon_coin')
	public mIcon_coin: mw.Image = undefined;
	@UIWidgetBind('MWCanvas_2147482460/DownCanvas/mIcon_Diamonds')
	public mIcon_Diamonds: mw.Image = undefined;
	@UIWidgetBind('MWCanvas_2147482460/DownCanvas/micon_1')
	public micon_1: mw.Image = undefined;



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
		// this.mBtn_Buy.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Buy");
		// })
		// this.mBtn_Buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		// 


		//按钮多语言

		//文本多语言

		this.initLanguage(this.mTxt_PropName)


		this.initLanguage(this.mTxt_Num)


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
