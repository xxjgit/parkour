
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/PF_Rewards.ui
 * TIME: 2023.05.15-17.19.24
 */



@UIBind('UI/PF_Rewards.ui')
export default class PF_Rewards_generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/Canvas_Rewards/ScorllBox_ItemList/Canvas_ItemList/Canvas_ItemReward/mImg_BG_Reward')
	public mImg_BG_Reward: mw.Image = undefined;
	@UIWidgetBind('RootCanvas/Canvas_Rewards/ScorllBox_ItemList/Canvas_ItemList/Canvas_ItemReward/mImg_Reward')
	public mImg_Reward: mw.Image = undefined;
	@UIWidgetBind('RootCanvas/Canvas_Rewards/ScorllBox_ItemList/Canvas_ItemList/Canvas_ItemReward/mText_Reward')
	public mText_Reward: mw.TextBlock = undefined;



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


		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Rewards/Brn_Obtain") as any);


		//文本多语言

		this.initLanguage(this.mText_Reward)


		//文本多语言

		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Rewards/Canvas_Title/Text_Title") as any);



	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
		let call = mw.UIScript.getBehavior("lan");
		if (call && ui) {
			call(ui);
		}
	}
}
