import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","NameID","PrefabsGuid","Groupid","IsItem","ResourceGroup","Ratio","Lenght"],["","","","","","","",""],[1,101,"4A15C4884AB32E9C15B7D3B5557944D5",1,false,0,null,9930,"场景","新手关卡"],[2,102,"295DF85641C96E6D0454FC88CD9C445E",1,false,0,null,9975,null,"古风场景"],[3,103,"151071C244925B6654AD88A4A5543B76",1,false,0,null,9990,null,"高山场景"],[4,104,"8C78014E4C0DE998B70548A291221F3B",1,false,0,null,9998,null,"沙漠场景"],[5,1001,"7A53A09F46AE5434F4EB91AB30E305E9",2,false,4,[15,15,17,22],640,"障碍物","2节马车"],[6,1002,"F709D3B149FCC0CDA4F9CCBD576A8B2A",2,false,4,[10,10,13,16],970,null,"3节马车"],[7,1003,"BBC3A6F1422406A827CD89903BCA51F7",2,false,2,[15,15,17,20],0,null,"全堵石墩"],[8,1004,"D7C3D4024380C587DE8C7E969CE80957",2,false,1,[15,15,15,18],1292,null,"可上马车"],[9,1005,"FA24A0BE41FBF2BCB944DE9B24362A37",2,false,1,[15,15,15,17],0,null,"堵上面"],[10,1006,"2FCA865E4DDD4CB1FC8241829C726C26",2,false,1,[25,25,25,25],0,null,"堵下面"],[11,1007,"F6DAC3C545E471090C24579B2280F80C",2,false,1,[25,25,25,25],0,null,"堵下面2"],[12,1008,"9F6B133745E5D771BC2669952392CECB",2,false,1,[30,30,30,29],0,null,"堵中间"],[13,1009,"B8503156490B30F9AF673694AC27D3A4",2,false,1,[30,30,30,29],0,null,"带金币的堵下面的石头"],[14,1010,"5EC6250B4CF7EFC6664D6B9AC0C31912",2,false,1,[30,30,30,29],0,null,"带金币的堵下面的箱子"],[15,1011,"EE8A4D8B4BA564551CA25588859BEA83",2,false,1,[25,30,30,25],350,null,"一串金币"],[16,1012,"89C655584287F3B6EF821CAE76D7B557",2,false,1,[25,25,25,26],0,null,"带金币的堵上面"],[17,1013,"F6DAC3C545E471090C24579B2280F80C",2,false,1,[1,1,1,1],0,null,"板车"],[18,1014,"D431550B413EF313EE4A618BA7623C93",2,false,1,[25,25,25,27],965,null,"带金币的可上马车"],[19,1015,"8B3979C54225D152117DB59206E370D3",2,false,1,[12,15,15,15],1866,null,"马车组合"],[20,1016,"5388E5DF42EA8613A9A0A0B77AFF737C",2,false,1,[6,7,8,7],0,null,"钻石"],[21,1017,"CD5DDB7E44490476761B45B58E479CAE",2,true,1,[7,7,7,7],0,null,"防护盾"],[22,1018,"33D330FA4AE56F7AE8BB23AC6C48B423",2,true,1,[6,7,7,6],0,null,"飞行背包"],[23,1019,"7A17794846F2B2116CD90CB827E61E9C",2,true,1,[6,7,7,7],0,null,"双倍金币"],[24,2001,"7C8707E74168B5CFAE46F3B6EE932CE8",3,false,3,null,1750,"障碍物组合"],[25,2002,"7C8707E74168B5CFAE46F3B6EE932CE8",3,false,3,null,2500],[26,2003,"DAA85E1A45CE35A1B0A489B090D83487",3,false,3,null,5000,null,"移动马车组"],[27,2004,"CC4B733F47909BB242882893188C8984",3,false,3,null,1750,null,"金币组1"],[28,2005,"8DCE0DAB48A2172CB518449FEC2022A1",3,false,3,null,1800,null,"金币组2"],[29,2006,"677A25D749E0AD067C7CA3BC0351CFA7",3,false,3,null,710,null,"金币组3"],[30,2007,"7A17794846F2B2116CD90CB827E61E9C",3,true,3,null,20,null,"双倍金币"],[31,2008,"FEF7CA0D4C950FAB6B7AB0983EC1C595",3,false,3,null,4500,null,"障碍物组合2"],[32,2009,"CD5DDB7E44490476761B45B58E479CAE",3,true,3,null,20,null,"防护盾"],[33,2010,"DAA85E1A45CE35A1B0A489B090D83487",3,false,3,null,4389,null,"障碍物组合4"],[34,2011,"33D330FA4AE56F7AE8BB23AC6C48B423",3,true,3,null,20,null,"飞行背包"],[35,2012,"48C4B21B4FA90676D7980DB6B23A92F8",3,false,6,null,37548,null,"空中金币"],[36,2013,"7C8707E74168B5CFAE46F3B6EE932CE8",3,false,3,null,2380,null,"障碍物组合1"]];
export interface IAssetsElement extends IElementBase{
 	/**undefined*/
	id:number
	/**资源名称id*/
	NameID:number
	/**guid*/
	PrefabsGuid:string
	/**组合分类*/
	Groupid:number
	/**是否是道具*/
	IsItem:boolean
	/**资源组*/
	ResourceGroup:number
	/**权重*/
	Ratio:Array<number>
	/**长度*/
	Lenght:number
 } 
export class AssetsConfig extends ConfigBase<IAssetsElement>{
	constructor(){
		super(EXCELDATA);
	}

}