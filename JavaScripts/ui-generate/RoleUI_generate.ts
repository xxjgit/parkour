
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/RoleUI.ui
 * TIME: 2023.05.15-17.19.24
 */



@UIBind('UI/RoleUI.ui')
export default class RoleUI_generate extends mw.UIScript {
	@UIWidgetBind('Canvas_Root/Canvas_Topbar/Canvas_Money2/mTxt_Money')
	public mTxt_Money: mw.TextBlock = undefined;
	@UIWidgetBind('Canvas_Root/Canvas_Topbar/MWCanvas_1/mTxt_Diamonds')
	public mTxt_Diamonds: mw.TextBlock = undefined;
	@UIWidgetBind('Canvas_Root/Canvas_Return/mBtn_Return')
	public mBtn_Return: mw.StaleButton = undefined;
	@UIWidgetBind('Canvas_Root/Canvas_Down/Canvas_Attribute/mTxt_Des')
	public mTxt_Des: mw.TextBlock = undefined;
	@UIWidgetBind('Canvas_Root/Canvas_Down/Canvas_Attribute/mTxt_Name')
	public mTxt_Name: mw.TextBlock = undefined;
	@UIWidgetBind('Canvas_Root/Canvas_Down/mCanvasEquipped')
	public mCanvasEquipped: mw.Canvas = undefined;
	@UIWidgetBind('Canvas_Root/Canvas_Down/mCanvasBuy/mBtn_Buy')
	public mBtn_Buy: mw.StaleButton = undefined;
	@UIWidgetBind('Canvas_Root/Canvas_Down/mCanvasBuy/mCanvasPrice/mTxt_price')
	public mTxt_price: mw.TextBlock = undefined;
	@UIWidgetBind('Canvas_Root/Canvas_Down/mCanvasBuy/mCanvasPrice/mIcon_Coins')
	public mIcon_Coins: mw.Image = undefined;
	@UIWidgetBind('Canvas_Root/Canvas_Down/mCanvasBuy/mCanvasPrice/mIcon_Diamonds')
	public mIcon_Diamonds: mw.Image = undefined;
	@UIWidgetBind('Canvas_Root/Canvas_Down/mCanvasBuy/mCanvasPrice')
	public mCanvasPrice: mw.Canvas = undefined;
	@UIWidgetBind('Canvas_Root/Canvas_Down/mCanvasBuy')
	public mCanvasBuy: mw.Canvas = undefined;
	@UIWidgetBind('Canvas_Root/Canvas_Down/mCanvasEquip/mBtn_Equip')
	public mBtn_Equip: mw.StaleButton = undefined;
	@UIWidgetBind('Canvas_Root/Canvas_Down/mCanvasEquip')
	public mCanvasEquip: mw.Canvas = undefined;
	@UIWidgetBind('Canvas_Root/mCanvas_Mid/mImg_Role')
	public mImg_Role: mw.Image = undefined;
	@UIWidgetBind('Canvas_Root/mCanvas_Mid')
	public mCanvas_Mid: mw.Canvas = undefined;
	@UIWidgetBind('Canvas_Root/ScrollBox_1/mCanvasContent')
	public mCanvasContent: mw.Canvas = undefined;
	@UIWidgetBind('Canvas_Root/MWCanvas_1/CanvasStart_1/mBtn_BackHome')
	public mBtn_BackHome: mw.Button = undefined;
	@UIWidgetBind('Canvas_Root/MWCanvas_1/MWCanvas_3_1/mBtn_Shop')
	public mBtn_Shop: mw.Button = undefined;
	@UIWidgetBind('Canvas_Root/MWCanvas_1/CanvasStart/mBtn_Continue')
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
		// this.mBtn_Return.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Return");
		// })
		this.initLanguage(this.mBtn_Return);
		this.mBtn_Return.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


		// this.mBtn_Buy.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Buy");
		// })
		this.initLanguage(this.mBtn_Buy);
		this.mBtn_Buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


		// this.mBtn_Equip.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Equip");
		// })
		this.initLanguage(this.mBtn_Equip);
		this.mBtn_Equip.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


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

		// this.mBtn_Continue.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Continue");
		// })
		// this.mBtn_Continue.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		// 


		//按钮多语言

		//文本多语言

		this.initLanguage(this.mTxt_Money)


		this.initLanguage(this.mTxt_Diamonds)


		this.initLanguage(this.mTxt_Des)


		this.initLanguage(this.mTxt_Name)


		this.initLanguage(this.mTxt_price)


		//文本多语言

		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/Canvas_Return/Txt_Return") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/Canvas_Down/mCanvasEquipped/MWTextBlock_1") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/MWCanvas_1/CanvasStart_1/MWTextBlock_1") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/MWCanvas_1/MWCanvas_3_1/MWTextBlock_1") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/MWCanvas_1/CanvasStart/MWTextBlock_1") as any);



	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
		let call = mw.UIScript.getBehavior("lan");
		if (call && ui) {
			call(ui);
		}
	}
}
