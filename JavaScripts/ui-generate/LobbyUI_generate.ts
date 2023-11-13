
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/LobbyUI.ui
 * TIME: 2023.05.15-17.19.24
 */



@UIBind('UI/LobbyUI.ui')
export default class LobbyUI_generate extends mw.UIScript {
	@UIWidgetBind('Canvas_Root/Canvas_Head/mImg_Head_Icon')
	public mImg_Head_Icon: mw.Image = undefined;
	@UIWidgetBind('Canvas_Root/Canvas_Name/mTxt_Name')
	public mTxt_Name: mw.TextBlock = undefined;
	@UIWidgetBind('Canvas_Root/mCanvas_Rank/RankTitleCanvas/mBtn_CloseRank')
	public mBtn_CloseRank: mw.Button = undefined;
	@UIWidgetBind('Canvas_Root/mCanvas_Rank/mScrollBox/mCanvas_List')
	public mCanvas_List: mw.Canvas = undefined;
	@UIWidgetBind('Canvas_Root/mCanvas_Rank/mScrollBox')
	public mScrollBox: mw.ScrollBox = undefined;
	@UIWidgetBind('Canvas_Root/mCanvas_Rank/Canvas_Rank_Self/mTxt_SelfScore')
	public mTxt_SelfScore: mw.TextBlock = undefined;
	@UIWidgetBind('Canvas_Root/mCanvas_Rank/Canvas_Rank_Self/mTxt_SelfRanking')
	public mTxt_SelfRanking: mw.TextBlock = undefined;
	@UIWidgetBind('Canvas_Root/mCanvas_Rank')
	public mCanvas_Rank: mw.Canvas = undefined;
	@UIWidgetBind('Canvas_Root/mCanvasStart/mBtn_Start')
	public mBtn_Start: mw.Button = undefined;
	@UIWidgetBind('Canvas_Root/mCanvasStart')
	public mCanvasStart: mw.Canvas = undefined;
	@UIWidgetBind('Canvas_Root/Canvas_Points/mTxt_PointNum')
	public mTxt_PointNum: mw.TextBlock = undefined;
	@UIWidgetBind('Canvas_Root/Canvas_Money/mTxt_MoneyNum')
	public mTxt_MoneyNum: mw.TextBlock = undefined;
	@UIWidgetBind('Canvas_Root/MWCanvas_1/mBtn_OpenRank')
	public mBtn_OpenRank: mw.Button = undefined;
	@UIWidgetBind('Canvas_Root/MWCanvas_2/mSoundNotActive')
	public mSoundNotActive: mw.Image = undefined;
	@UIWidgetBind('Canvas_Root/MWCanvas_2/mSoundActive')
	public mSoundActive: mw.Image = undefined;
	@UIWidgetBind('Canvas_Root/MWCanvas_2/mBtn_Sound')
	public mBtn_Sound: mw.Button = undefined;
	@UIWidgetBind('Canvas_Root/mCanvasRole/mBtn_OpenRoleClothes')
	public mBtn_OpenRoleClothes: mw.Button = undefined;
	@UIWidgetBind('Canvas_Root/mCanvasRole')
	public mCanvasRole: mw.Canvas = undefined;
	@UIWidgetBind('Canvas_Root/mCanvasShop/mBtn_Shop')
	public mBtn_Shop: mw.Button = undefined;
	@UIWidgetBind('Canvas_Root/mCanvasShop')
	public mCanvasShop: mw.Canvas = undefined;



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
		// this.mBtn_CloseRank.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_CloseRank");
		// })
		// this.mBtn_CloseRank.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		// 

		// this.mBtn_Start.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Start");
		// })
		// this.mBtn_Start.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		// 

		// this.mBtn_OpenRank.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_OpenRank");
		// })
		// this.mBtn_OpenRank.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		// 

		// this.mBtn_Sound.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Sound");
		// })
		// this.mBtn_Sound.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		// 

		// this.mBtn_OpenRoleClothes.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_OpenRoleClothes");
		// })
		// this.mBtn_OpenRoleClothes.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		// 

		// this.mBtn_Shop.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Shop");
		// })
		// this.mBtn_Shop.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		// 


		//按钮多语言

		//文本多语言

		this.initLanguage(this.mTxt_Name)


		this.initLanguage(this.mTxt_SelfScore)


		this.initLanguage(this.mTxt_SelfRanking)


		this.initLanguage(this.mTxt_PointNum)


		this.initLanguage(this.mTxt_MoneyNum)


		//文本多语言

		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/mCanvas_Rank/RankTitleCanvas/Txt_Title") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/mCanvas_Rank/Txt_Rank") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/mCanvas_Rank/Txt_Name") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/mCanvas_Rank/Txt_Num") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/mCanvas_Rank/Canvas_Rank_Self/Txt_SelfName") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/mCanvasStart/MWTextBlock_1") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/MWCanvas_1/Txt_Title") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/mCanvasRole/MWTextBlock_1") as any);


		this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/mCanvasShop/MWTextBlock_1") as any);



	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
		let call = mw.UIScript.getBehavior("lan");
		if (call && ui) {
			call(ui);
		}
	}
}
