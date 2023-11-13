/** 
 * @Author       : pengwei.shi
 * @Date         : 2022-12-02 13:52:36
 * @LastEditors  : xianjie.xia
 * @LastEditTime : 2022-12-05 14:11
 * @FilePath     : \streetparkour\JavaScripts\UIRoot.ts
 * @Description  : 修改描述
 */

import UIRoot_generate from "./ui-generate/UIRoot_generate";

export class UIRoot extends UIRoot_generate {
    protected onAwake(): void {
        mw.AssetUtil.asyncDownloadAsset('122885').then(() => {
            this.mImg_BG.visibility = mw.SlateVisibility.Hidden;
        })
    }
}