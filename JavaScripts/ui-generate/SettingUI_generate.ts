
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/SettingUI.ui
 * TIME: 2023.05.15-17.19.24
 */



@UIBind('UI/SettingUI.ui')
export default class SettingUI_generate extends mw.UIScript {



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

		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Btn_BG") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Btn_Close") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Brn_Confirm") as any);


		//文本多语言

		//文本多语言

		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Canvas_Title/Text_Title") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Canvas_ProgressBar_001/Text_Setting_001") as any);



	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
		let call = mw.UIScript.getBehavior("lan");
		if (call && ui) {
			call(ui);
		}
	}
}
