
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/ReliveUI.ui
 * TIME: 2023.05.15-17.19.24
 */



@UIBind('UI/ReliveUI.ui')
export default class ReliveUI_generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/Canvas_Settings/Canvas_Title/txtItem')
	public txtItem: mw.TextBlock = undefined;
	@UIWidgetBind('RootCanvas/Canvas_Settings/mBtn_Yes')
	public mBtn_Yes: mw.StaleButton = undefined;
	@UIWidgetBind('RootCanvas/Canvas_Settings/mBtn_No')
	public mBtn_No: mw.StaleButton = undefined;
	@UIWidgetBind('RootCanvas/Canvas_Settings/txtCount')
	public txtCount: mw.TextBlock = undefined;
	@UIWidgetBind('RootCanvas/Canvas_Settings/txtTip')
	public txtTip: mw.TextBlock = undefined;



	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		// 
		// this.mBtn_Yes.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Yes");
		// })
		this.initLanguage(this.mBtn_Yes);
		this.mBtn_Yes.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


		// this.mBtn_No.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_No");
		// })
		this.initLanguage(this.mBtn_No);
		this.mBtn_No.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


		//按钮添加点击
		// 

		//按钮多语言

		//文本多语言

		this.initLanguage(this.txtItem)


		this.initLanguage(this.txtCount)


		this.initLanguage(this.txtTip)


		//文本多语言

		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/MWTextBlock_1") as any);



	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
		let call = mw.UIScript.getBehavior("lan");
		if (call && ui) {
			call(ui);
		}
	}
}
