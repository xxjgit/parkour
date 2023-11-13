
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/GuideModuleUI.ui
 * TIME: 2023.05.15-17.19.24
 */



@UIBind('UI/GuideModuleUI.ui')
export default class GuideModuleUI_generate extends mw.UIScript {
	@UIWidgetBind('MWCanvas_2147482460/mLeftMask')
	public mLeftMask: mw.StaleButton = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mTopMask')
	public mTopMask: mw.StaleButton = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mButtomMask')
	public mButtomMask: mw.StaleButton = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mRightMask')
	public mRightMask: mw.StaleButton = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mBtn')
	public mBtn: mw.StaleButton = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mBtnHand')
	public mBtnHand: mw.Image = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mCanvas_Left')
	public mCanvas_Left: mw.Canvas = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mCanvas_Right')
	public mCanvas_Right: mw.Canvas = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mCanvas_UP')
	public mCanvas_UP: mw.Canvas = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mCanvas_Down')
	public mCanvas_Down: mw.Canvas = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mTxt_UP')
	public mTxt_UP: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mTxt_Down')
	public mTxt_Down: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mTxt_Right')
	public mTxt_Right: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mTxt_Left')
	public mTxt_Left: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mTxt_SkillTips')
	public mTxt_SkillTips: mw.TextBlock = undefined;
	@UIWidgetBind('MWCanvas_2147482460/mTouchMask')
	public mTouchMask: mw.Image = undefined;



	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		// 
		// this.mLeftMask.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mLeftMask");
		// })
		this.initLanguage(this.mLeftMask);
		this.mLeftMask.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


		// this.mTopMask.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mTopMask");
		// })
		this.initLanguage(this.mTopMask);
		this.mTopMask.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


		// this.mButtomMask.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mButtomMask");
		// })
		this.initLanguage(this.mButtomMask);
		this.mButtomMask.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


		// this.mRightMask.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mRightMask");
		// })
		this.initLanguage(this.mRightMask);
		this.mRightMask.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


		// this.mBtn.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn");
		// })
		this.initLanguage(this.mBtn);
		this.mBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


		//按钮添加点击
		// 

		//按钮多语言

		//文本多语言

		this.initLanguage(this.mTxt_UP)


		this.initLanguage(this.mTxt_Down)


		this.initLanguage(this.mTxt_Right)


		this.initLanguage(this.mTxt_Left)


		this.initLanguage(this.mTxt_SkillTips)


		//文本多语言


	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
		let call = mw.UIScript.getBehavior("lan");
		if (call && ui) {
			call(ui);
		}
	}
}
