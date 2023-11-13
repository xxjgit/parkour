
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/RewardUI.ui
 * TIME: 2023.05.15-17.19.24
 */



@UIBind('UI/RewardUI.ui')
export default class RewardUI_generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mBtn_GoGameover')
	public mBtn_GoGameover: mw.Button = undefined;



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
		// this.mBtn_GoGameover.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_GoGameover");
		// })
		// this.mBtn_GoGameover.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		// 


		//按钮多语言

		//文本多语言

		//文本多语言

		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Canvas_Title/MWTextBlock_1") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Canvas_ProgressBar_001/MWCanvas_2147482460/TopCanvas/Txt_PropName3") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Canvas_ProgressBar_001/MWCanvas_2147482460/TopCanvas/Txt_Num3") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Canvas_ProgressBar_001/MWCanvas_2147482460_1/TopCanvas2/Txt_PropName2") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Canvas_ProgressBar_001/MWCanvas_2147482460_1/TopCanvas2/Txt_Num2") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/MWTextBlock_2") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Canvas_1/TextBlock_1") as any);



	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
		let call = mw.UIScript.getBehavior("lan");
		if (call && ui) {
			call(ui);
		}
	}
}
