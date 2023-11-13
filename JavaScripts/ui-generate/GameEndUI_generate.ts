
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/GameEndUI.ui
 * TIME: 2023.05.15-17.19.24
 */



@UIBind('UI/GameEndUI.ui')
export default class GameEndUI_generate extends mw.UIScript {
	@UIWidgetBind('MWCanvas_2147482460/Canvas_Money/mTxt_MoneyNum')
	public mTxt_MoneyNum: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/Canvas_Points/mTxt_PointNum')
	public mTxt_PointNum: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/MWCanvas_2/mTxt_overScore')
	public mTxt_overScore: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mTxt_overCoin')
	public mTxt_overCoin: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/tipNew')
	public tipNew: mw.Canvas = undefined;
	@UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/CanvasStart_1/mBtn_BackHome')
	public mBtn_BackHome: mw.Button = undefined;
	@UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/MWCanvas_3_1/mBtn_Shop')
	public mBtn_Shop: mw.Button = undefined;
	@UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/mCanvasRole/mBtn_Role')
	public mBtn_Role: mw.Button = undefined;
	@UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/mCanvasRole')
	public mCanvasRole: mw.Canvas = undefined;
	@UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/CanvasStart/mBtn_Continue')
	public mBtn_Continue: mw.Button = undefined;



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
		// this.mBtn_BackHome.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_BackHome");
		// })
		// this.mBtn_BackHome.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		// 

		// this.mBtn_Shop.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Shop");
		// })
		// this.mBtn_Shop.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		// 

		// this.mBtn_Role.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Role");
		// })
		// this.mBtn_Role.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		// 

		// this.mBtn_Continue.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Continue");
		// })
		// this.mBtn_Continue.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		// 


		//按钮多语言

		//文本多语言

		this.initLanguage(this.mTxt_MoneyNum)


		this.initLanguage(this.mTxt_PointNum)


		this.initLanguage(this.mTxt_overScore)


		this.initLanguage(this.mTxt_overCoin)


		//文本多语言

		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWTextBlock_1") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/tipNew/MWNew") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWCanvas_1/CanvasStart_1/MWTextBlock_1") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWCanvas_1/MWCanvas_3_1/MWTextBlock_1") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWCanvas_1/mCanvasRole/MWTextBlock_1") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWCanvas_1/CanvasStart/MWTextBlock_1") as any);



	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
		let call = mw.UIScript.getBehavior("lan");
		if (call && ui) {
			call(ui);
		}
	}
}
