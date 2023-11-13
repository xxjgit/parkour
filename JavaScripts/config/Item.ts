import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","type","priceType","price","maxLv","upType","upCost","time","icon","effect","desc"],["","","","","","","","","","","",""],[1,"UI_Item_1",1,1,100,0,[0],[0],[0],"37744",null,null,"钥匙"],[2,"UI_Item_2",2,1,50,6,[1,1,1,1,1,1],[30,50,100,200,400,800],[25,26,27,28,29,30,31],"91210","113906","UI_ItemDesc_1","护盾"],[3,"UI_Item_4",3,2,1,6,[1,1,1,1,1,1],[30,50,100,200,400,800],[9,10,11,12,13,14,15],"91211","27392","UI_ItemDesc_2","飞行"],[4,"cc",0,2,200,3,[1,2,1],[1,2,3,4,5],[5,6,9],"37744",null,null],[5,"UI_Item_3",3,1,50,6,[1,1,1,1,1,1],[30,50,100,200,400,800],[15,16,17,18,19,20,21],"91196","113916","UI_ItemDesc_3","双倍"],[6,"磁铁",0,2,400,3,[1,2,1],[5,6,11],[5,6,11],"37744",null,"吸金币"]];
export interface IItemElement extends IElementBase{
 	/**undefined*/
	id:number
	/**道具名*/
	name:string
	/**类别*/
	type:number
	/**价格类型*/
	priceType:number
	/**价格*/
	price:number
	/**最高等级*/
	maxLv:number
	/**升级类型*/
	upType:Array<number>
	/**升级消耗*/
	upCost:Array<number>
	/**持续时间*/
	time:Array<number>
	/**图标*/
	icon:string
	/**特效*/
	effect:string
	/**描述信息*/
	desc:string
 } 
export class ItemConfig extends ConfigBase<IItemElement>{
	constructor(){
		super(EXCELDATA);
	}

}