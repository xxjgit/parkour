/** 
 * @Author       : pengwei.shi
 * @Date         : 2022-12-05 11:38:37
 * @LastEditors  : xianjie.xia
 * @LastEditTime : 2023-06-30 15:46
 * @FilePath     : \streetparkour\JavaScripts\ui\UIRoleHead.ts
 * @Description  : 修改描述
 */
/*
 * @Author: pengwei.shi
 * @Date: 2022-11-21 14:30:35
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-21 16:32:50
 * @FilePath: \streetparkour\JavaScripts\ui\UIRoleHead.ts
 * @Description: 
 */
import { SPUIEvent } from "../const/Define";
import RoleHeadUI_generate from "../ui-generate/RoleHeadUI_generate";
import { Utils } from "../untils/Utils";

export class UIRoleHead extends RoleHeadUI_generate {

    private _id: number;
    public async initUI(id: number, headGuid: string) {
        this._id = id;
        await AssetUtil.asyncDownloadAsset(headGuid);
        this.mImg_Icon.imageGuid = headGuid;
        Utils.setUIVisible(false, this.mImg_Select);
        this.mBtn_Select.onClicked.add(() => {
            Event.dispatchToLocal(SPUIEvent.SelectIcon, this._id);
        });

        Event.addLocalListener(SPUIEvent.SelectRole, this.checkSelectUI)
    }

    /**
     * 如果装备的选中的ui
     * 是当前ui就显示高光ui
     * @param id 
     */
    private checkSelectUI = (id: number) => {
        if (this._id == id) {
            Utils.setUIVisible(true, this.mImg_Select);
        } else {
            if (this.mImg_Select.visible) {
                Utils.setUIVisible(false, this.mImg_Select);
            }
        }
    }
}