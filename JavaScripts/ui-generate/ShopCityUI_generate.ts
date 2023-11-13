
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/ShopCityUI.ui
 * TIME: 2023.05.15-17.19.24
 */



@UIBind('UI/ShopCityUI.ui')
export default class ShopCityUI_generate extends mw.UIScript {
	@UIWidgetBind('MWCanvas_2147482460/mScrollBox/mPropMidCanvas')
	public mPropMidCanvas: mw.Canvas = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mScrollBox/mSkillMidCanvas')
	public mSkillMidCanvas: mw.Canvas = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mScrollBox')
	public mScrollBox: mw.ScrollBox = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mTopCanvas/MWCanvas_1/mTxt_Shield')
	public mTxt_Shield: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mTopCanvas/MWCanvas_1_1/mTxt_Rebirth')
	public mTxt_Rebirth: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mTopCanvas/MWCanvas_1_3/mTxt_Coin')
	public mTxt_Coin: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mTopCanvas/MWCanvas_1_2/mTxt_Diamonds')
	public mTxt_Diamonds: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mTopCanvas/MWCanvas_2/mBtn_BackLobby')
	public mBtn_BackLobby: mw.Button = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mTopCanvas')
	public mTopCanvas: mw.Canvas = undefined;



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
		// this.mBtn_BackLobby.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_BackLobby");
		// })
		// this.mBtn_BackLobby.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		// 


		//按钮多语言

		//文本多语言

		this.initLanguage(this.mTxt_Shield)


		this.initLanguage(this.mTxt_Rebirth)


		this.initLanguage(this.mTxt_Coin)


		this.initLanguage(this.mTxt_Diamonds)


		//文本多语言

		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/mTopCanvas/MWCanvas_2/MWTextBlock_2") as any);



	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
		let call = mw.UIScript.getBehavior("lan");
		if (call && ui) {
			call(ui);
		}
	}
}
