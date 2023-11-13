
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/UIRoot.ui
 * TIME: 2023.05.15-17.19.24
 */



@UIBind('UI/UIRoot.ui')
export default class UIRoot_generate extends mw.UIScript {
	@UIWidgetBind('Canvas/mImg_BG')
	public mImg_BG: mw.Image = undefined;



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

		//文本多语言


	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
		let call = mw.UIScript.getBehavior("lan");
		if (call && ui) {
			call(ui);
		}
	}
}
