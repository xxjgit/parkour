import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","guid","name","loop","SoundPropportion","des"],["","tag","tag","tag","tag","tag"],[1,["14031"],"主界面游戏BGM",0,1,"进入在主界面时播放"],[2,["117514"],"跑酷时BGM",0,0.65,"玩家开始跑酷时播放"],[3,["21210","27202"],"向上跳",1,1,"玩家向上跳时播放"],[4,["21210","27202"],"左右跳",1,1,"玩家左右移动播放"],[5,["27202"],"下滑",1,1,"玩家下滑时播放"],[6,["39340"],"吃金币",1,0.55,"玩家吃到金币播放"],[7,["120847"],"按钮",1,1,"玩家点击按钮时播放","主界面和结算界面的角色按钮、商店按钮；角色界面和商店界面的返回按钮；角色界面头像选人；选中装备角色；"],[8,["114009"],"受伤",1,1,"玩家受伤时播放"],[9,["114008","117512"],"死亡",1,1,"玩家死亡时播放"],[10,["118099"],"显示结算UI",1,1,"玩家显示结算得分UI时播放"],[11,["119008"],"超过最高分数",1,1,"玩家结算时超过最高分数时，代替显示结算UI音效播放"],[12,["117518"],"吃到道具",1,1,"吃到道具播放"],[13,["47419"],"升级",1,1,"升级道具时播放"],[14,["117517"],"购买道具",1,1,"购买道具时播放"],[15,["117517"],"购买人物",1,1,"购买人物时播放"],[16,["97385"],"触发护盾爆炸",1,1,"触发护盾爆炸时播放"],[17,["97385"],"复活爆炸",1,1,"复活爆炸时播放"],[18,["52570"],"吃到钻石播放",1,0.7,"吃到钻石时播放"]];
export interface IVoiceElement extends IElementBase{
 	/**id*/
	id:number
	/**资源ID*/
	guid:Array<string>
	/**音效名称*/
	name:string
	/**循环播放次数(0=循环)*/
	loop:number
	/**音量比例(0-1)*/
	SoundPropportion:number
	/**必须的备注，说明，方便查阅和程序组装 备注*/
	des:string
 } 
export class VoiceConfig extends ConfigBase<IVoiceElement>{
	constructor(){
		super(EXCELDATA);
	}

}