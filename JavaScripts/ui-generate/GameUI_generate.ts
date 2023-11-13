
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/GameUI.ui
 * TIME: 2023.05.15-17.19.24
 */



@UIBind('UI/GameUI.ui')
export default class GameUI_generate extends mw.UIScript {
	@UIWidgetBind('gameRoot/touchMove')
	public touchMove: mw.VirtualJoystickPanel = undefined;
	@UIWidgetBind('gameRoot/mCanvas_Point/txtScore')
	public txtScore: mw.TextBlock = undefined;
	@UIWidgetBind('gameRoot/mCanvas_Point/scoreTip')
	public scoreTip: mw.TextBlock = undefined;
	@UIWidgetBind('gameRoot/mCanvas_Point')
	public mCanvas_Point: mw.Canvas = undefined;
	@UIWidgetBind('gameRoot/mCanvas_Money/txtCoin')
	public txtCoin: mw.TextBlock = undefined;
	@UIWidgetBind('gameRoot/mCanvas_Money/doubleTip')
	public doubleTip: mw.TextBlock = undefined;
	@UIWidgetBind('gameRoot/mCanvas_Money')
	public mCanvas_Money: mw.Canvas = undefined;
	@UIWidgetBind('gameRoot/MWCanvas_2/btnPuase')
	public btnPuase: mw.Button = undefined;
	@UIWidgetBind('gameRoot/itemNode/btnItem2/txtItem2')
	public txtItem2: mw.TextBlock = undefined;
	@UIWidgetBind('gameRoot/itemNode/btnItem2')
	public btnItem2: mw.Button = undefined;
	@UIWidgetBind('gameRoot/itemNode/btnItem3/txtItem3')
	public txtItem3: mw.TextBlock = undefined;
	@UIWidgetBind('gameRoot/itemNode/btnItem3')
	public btnItem3: mw.Button = undefined;
	@UIWidgetBind('gameRoot/itemNode/btnItem5/txtItem5')
	public txtItem5: mw.TextBlock = undefined;
	@UIWidgetBind('gameRoot/itemNode/btnItem5')
	public btnItem5: mw.Button = undefined;
	@UIWidgetBind('gameRoot/itemNode')
	public itemNode: mw.Canvas = undefined;
	@UIWidgetBind('gameRoot')
	public gameRoot: mw.Canvas = undefined;



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
		// this.btnPuase.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "btnPuase");
		// })
		// this.btnPuase.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		// 

		// this.btnItem2.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "btnItem2");
		// })
		// this.btnItem2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		// 

		// this.btnItem3.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "btnItem3");
		// })
		// this.btnItem3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		// 

		// this.btnItem5.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "btnItem5");
		// })
		// this.btnItem5.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		// 


		//按钮多语言

		//文本多语言

		this.initLanguage(this.txtScore)


		this.initLanguage(this.scoreTip)


		this.initLanguage(this.txtCoin)


		this.initLanguage(this.doubleTip)


		this.initLanguage(this.txtItem2)


		this.initLanguage(this.txtItem3)


		this.initLanguage(this.txtItem5)


		//文本多语言


	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
		let call = mw.UIScript.getBehavior("lan");
		if (call && ui) {
			call(ui);
		}
	}
}
