import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","StartPos","EndPos","ActionType"],["","","",""],[1,300,1450,3],[2,1344,2700,3],[3,2600,4015,4],[4,3820,5200,4],[5,5200,6450,1],[6,6387,6900,2],[7,7032,8300,2],[8,8200,9020,1],[9,9700,11000,5]];
export interface IGuideElement extends IElementBase{
 	/**undefined*/
	id:number
	/**障碍开始位置*/
	StartPos:number
	/**障碍结束位置*/
	EndPos:number
	/**动作类型*/
	ActionType:number
 } 
export class GuideConfig extends ConfigBase<IGuideElement>{
	constructor(){
		super(EXCELDATA);
	}

}