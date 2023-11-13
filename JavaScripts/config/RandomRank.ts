import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name"],["",""],[1,"UI_Name_1"],[2,"UI_Name_2"],[3,"UI_Name_3"],[4,"UI_Name_4"],[5,"UI_Name_5"],[6,"UI_Name_6"],[7,"UI_Name_7"],[8,"UI_Name_8"],[9,"UI_Name_9"],[10,"UI_Name_10"],[11,"UI_Name_11"],[12,"UI_Name_12"],[13,"UI_Name_13"],[14,"UI_Name_14"],[15,"UI_Name_15"],[16,"UI_Name_16"],[17,"UI_Name_17"],[18,"UI_Name_18"],[19,"UI_Name_19"],[20,"UI_Name_20"],[21,"UI_Name_21"],[22,"UI_Name_22"],[23,"UI_Name_23"],[24,"UI_Name_24"],[25,"UI_Name_25"],[26,"UI_Name_26"],[27,"UI_Name_27"],[28,"UI_Name_28"],[29,"UI_Name_29"],[30,"UI_Name_30"],[31,"UI_Name_31"],[32,"UI_Name_32"],[33,"UI_Name_33"],[34,"UI_Name_34"],[35,"UI_Name_35"],[36,"UI_Name_36"],[37,"UI_Name_37"],[38,"UI_Name_38"],[39,"UI_Name_39"],[40,"UI_Name_40"],[41,"UI_Name_41"],[42,"UI_Name_42"],[43,"UI_Name_43"],[44,"UI_Name_44"],[45,"UI_Name_45"],[46,"UI_Name_46"],[47,"UI_Name_47"],[48,"UI_Name_48"],[49,"UI_Name_49"],[50,"UI_Name_50"]];
export interface IRandomRankElement extends IElementBase{
 	/**undefined*/
	id:number
	/**名字*/
	name:string
 } 
export class RandomRankConfig extends ConfigBase<IRandomRankElement>{
	constructor(){
		super(EXCELDATA);
	}

}