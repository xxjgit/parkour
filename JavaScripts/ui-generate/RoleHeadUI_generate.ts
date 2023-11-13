/** 
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2023-06-28 16:40
 * @LastEditTime : 2023-06-30 15:53
 * @description  : 
 */

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/RoleHeadUI.ui
 * TIME: 2023.05.15-17.19.24
 */



@UIBind('UI/RoleHeadUI.ui')
export default class RoleHeadUI_generate extends mw.UIScript {
	@UIWidgetBind('MWCanvas_2147482460/MWCanvas_3/mBtn_Select')
	public mBtn_Select: mw.Button = undefined;
	@UIWidgetBind('MWCanvas_2147482460/MWCanvas_3/mImg_Icon')
	public mImg_Icon: mw.Image = undefined;
	@UIWidgetBind('MWCanvas_2147482460/MWCanvas_3/mImg_Select')
	public mImg_Select: mw.Image = undefined;



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
		// this.mBtn_Select.onClicked.add(()=>{
		// 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Select");
		// })
		this.mBtn_Select.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
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
