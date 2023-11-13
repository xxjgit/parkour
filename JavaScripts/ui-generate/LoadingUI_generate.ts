
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/LoadingUI.ui
 * TIME: 2023.05.15-17.19.24
 */



@UIBind('UI/LoadingUI.ui')
export default class LoadingUI_generate extends mw.UIScript {
    @UIWidgetBind('mCanvas_Root/bg')
    public bg: mw.Image = undefined;
    @UIWidgetBind('mCanvas_Root/loadNode/mImg_BG')
    public mImg_BG: mw.Image = undefined;
    @UIWidgetBind('mCanvas_Root/loadNode/bottom/barLoad')
    public barLoad: mw.ProgressBar = undefined;
    @UIWidgetBind('mCanvas_Root/loadNode/bottom/txtBar')
    public txtBar: mw.TextBlock = undefined;
    @UIWidgetBind('mCanvas_Root/loadNode/bottom')
    public bottom: mw.Canvas = undefined;
    @UIWidgetBind('mCanvas_Root/loadNode')
    public loadNode: mw.Canvas = undefined;
    @UIWidgetBind('mCanvas_Root')
    public mCanvas_Root: mw.Canvas = undefined;



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

        this.initLanguage(this.txtBar)


        //文本多语言


    }
    private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
}
