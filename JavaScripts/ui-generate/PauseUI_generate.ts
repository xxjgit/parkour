﻿
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/PauseUI.ui
 * TIME: 2023.05.15-17.19.24
 */



@UIBind('UI/PauseUI.ui')
export default class PauseUI_generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/Canvas_Settings/mBtn_Yes')
	public mBtn_Yes: mw.StaleButton = undefined;
	@UIWidgetBind('RootCanvas/Canvas_Settings/mBtn_No')
	public mBtn_No: mw.StaleButton = undefined;



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

		//文本多语言

		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Canvas_ProgressBar_001/MWTextBlock_1") as any);



	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
		let call = mw.UIScript.getBehavior("lan");
		if (call && ui) {
			call(ui);
		}
	}
}
