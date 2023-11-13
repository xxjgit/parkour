
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/GuideUI.ui
 * TIME: 2023.05.15-17.19.24
 */



@UIBind('UI/GuideUI.ui')
export default class GuideUI_generate extends mw.UIScript {
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
    @UIWidgetBind('MWCanvas_2147482460/mImg_Hand')
    public mImg_Hand: mw.Image = undefined;
    @UIWidgetBind('MWCanvas_2147482460/mTxt_SkillTips')
    public mTxt_SkillTips: mw.TextBlock = undefined;



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
