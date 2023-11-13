import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["Id","Value","Value1","Value2","Value3","Value4","Value5"],["","","","","","",""],[101,14,25,0.05,450,21,null],[102,1000,0,0,0,0,null],[103,3500,0,0,0,0,null],[104,6000,0,0,0,0,null],[105,200,0,0,0,0,null],[106,0,0,0,0,0,[20000,50000,100000]]];
export interface IGlobalElement extends IElementBase{
 	/**undefined*/
	Id:number
	/**参数*/
	Value:number
	/**参数1*/
	Value1:number
	/**参数2*/
	Value2:number
	/**参数3*/
	Value3:number
	/**参数4*/
	Value4:number
	/**参数5*/
	Value5:Array<number>
 } 
export class GlobalConfig extends ConfigBase<IGlobalElement>{
	constructor(){
		super(EXCELDATA);
	}

}