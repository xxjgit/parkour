import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Name","Value","Value_E"],["","Key|ReadByName","MainLanguage","ChildLanguage"],[1,"UI_Guide_1","向上滑动","Swipe up"],[2,"UI_Guide_2","向下滑动","Swipe down"],[3,"UI_Guide_3","向右滑动","Swipe right"],[4,"UI_Guide_4","向左滑动","Swipe left"],[5,"UI_End_1","得分","Score"],[6,"UI_End_2","新纪录！","New record"],[7,"UI_End_3","回家","Home"],[8,"UI_End_4","角色","Avatar"],[9,"UI_End_5","商店","Store"],[10,"UI_End_6","出发","Start"],[11,"UI_Game_1","新纪录！","New record"],[12,"UI_LobbyUI_1","排行榜","Leaderboard"],[13,"UI_LobbyUI_2","排名","Ranking"],[14,"UI_LobbyUI_3","用户名","Username"],[15,"UI_LobbyUI_4","分数","Score"],[16,"UI_LobbyUI_5","角色","Avatar"],[17,"UI_LobbyUI_6","商店","Store"],[18,"UI_LobbyUI_7","出发","Start"],[19,"UI_PauseUI_1","你想放弃？","Wanna give up？"],[20,"UI_PauseUI_2","是","Yes"],[21,"UI_PauseUI_3","否","No"],[22,"UI_Name_1","花开暗消魂","Heather"],[23,"UI_Name_2","秀恩爱死得快","Loralie"],[24,"UI_Name_3","除了帅我一无所有","Archer"],[25,"UI_Name_4","想多了心会累","Elmer"],[26,"UI_Name_5","落英江南","Nimble"],[27,"UI_Name_6","看清所有","Lois"],[28,"UI_Name_7","忘了你亡了我","Teri"],[29,"UI_Name_8","风晴雪流成河","Hilda"],[30,"UI_Name_9","许你一世情深","Randolph"],[31,"UI_Name_10","笑语千山隐","Nigel"],[32,"UI_Name_11","言为心声","Wolf"],[33,"UI_Name_12","永远的神","Frank"],[34,"UI_Name_13","弹指间的烟灰","Primrose"],[35,"UI_Name_14","天空依旧很蓝","Just"],[36,"UI_Name_15","衡沂博","Lawyer"],[37,"UI_Name_16","空万洲","Horace"],[38,"UI_Name_17","奚坤","Oswald"],[39,"UI_Name_18","柏松青","Stephen"],[40,"UI_Name_19","屈莛衫","Priscilla"],[41,"UI_Name_20","茅百莹","Jennifer"],[42,"UI_Name_21","古莛","Sebastian"],[43,"UI_Name_22","单于刚","Gerard"],[44,"UI_Name_23","阙祥钧","Cheerful"],[45,"UI_Name_24","段斓","Teresa"],[46,"UI_Name_25","邹沂枫","Yolanda"],[47,"UI_Name_26","钱湘鹰","Kelvin"],[48,"UI_Name_27","厉妍勒","Lane"],[49,"UI_Name_28","车雁戾","Everett"],[50,"UI_Name_29","仲孙盈","Harland"],[51,"UI_Name_30","盛匪凛","Udele"],[52,"UI_Name_31","蒯玲莞","Gavin"],[53,"UI_Name_32","蔡班茗","Wyman"],[54,"UI_Name_33","胡翰","Stan"],[55,"UI_Name_34","莫隶芙","Leigh"],[56,"UI_Name_35","宫斩","Seaman"],[57,"UI_Name_36","司徒富","Dark-Haired"],[58,"UI_Name_37","伯德传","Lombard"],[59,"UI_Name_38","肖卿芳","Kacey"],[60,"UI_Name_39","伍翼","Kelsey"],[61,"UI_Name_40","乐正奎邑","Farley"],[62,"UI_Name_41","秋秋契","Quincy"],[63,"UI_Name_42","戴高雅","Peter"],[64,"UI_Name_43","王喜悦","Kirsten"],[65,"UI_Name_44","诸荆焦","Keely"],[66,"UI_Name_45","兄弟联盟","Kenway"],[67,"UI_Name_46","边境矢梦","Laura"],[68,"UI_Name_47","七梨少年","Walton"],[69,"UI_Name_48","梦醒如初","Orva"],[70,"UI_Name_49","呆萌小甜心","Philippa"],[71,"UI_Name_50","糀蝎囡囡","Bobbie"],[72,"UI_RoleName_1","小樱","Sakura"],[73,"UI_RoleName_2","鸣人","Naruto"],[74,"UI_RoleName_3","佐助","Sasuke"],[75,"UI_RoleName_4","卡卡西","Kakashi"],[76,"UI_RoleName_5","雏田","Hinata"],[77,"UI_RoleName_6","带土","Obito"],[78,"UI_RoleName_7","小南","Konan"],[79,"UI_RoleName_8","宇智波斑","Madara"],[80,"UI_RoleName_9","自来也","Jiraiya"],[81,"UI_RoleDesc_1","双倍时间增加2秒","Coin-double time increased by 2 sec"],[82,"UI_RoleDesc_2","飞行时间增加1秒","Flight time increased by 1 sec"],[83,"UI_RoleDesc_3","双倍时间增加2秒","Coin-double time increased by 2 sec"],[84,"UI_RoleDesc_4","护盾时间增加3秒","Shield time increased by 3 sec"],[85,"UI_RoleDesc_5","护盾时间增加1秒","Shield time increased by 1 sec"],[86,"UI_RoleDesc_6","飞行时间增加2秒","Flight time increased by 2 sec"],[87,"UI_RoleDesc_7","飞行时间增加5秒","Flight time increased by 5 sec"],[88,"UI_RoleDesc_8","护盾时间增加6秒","Shield time increased by 6 sec"],[89,"UI_RoleDesc_9","护盾时间增加2秒","Shield time increased by 2 sec"],[90,"UI_Role_1","返回","Back"],[91,"UI_Role_2","选择","Select"],[92,"UI_Role_3","购买","Purchase"],[93,"UI_Role_4","已选","Selected"],[94,"UI_Item_1","钥匙","Key"],[95,"UI_Item_2","护盾","Shield"],[96,"UI_Item_3","双倍","Coin double"],[97,"UI_Item_4","飞行","Flight"],[98,"UI_ItemDesc_1","抵挡一次伤害，升级提高持续时间","Defense against one damage. Upgrade to increase its duration"],[99,"UI_ItemDesc_2","进入飞行状态，升级提高持续时间","Make you fly. Upgrade to increase its duration"],[100,"UI_ItemDesc_3","获得双倍的金币，升级提高持续时间","Collect coins doubly. Upgrade to increase its duration"],[101,"UI_Skill_1","秒","s"],[102,"UI_Relive_1","是","Yes"],[103,"UI_Relive_2","否","No"],[104,"UI_Relive_3","钥匙不足","Insufficient keys"],[105,"UI_Relive_4","消耗钥匙复活","Consume keys to revive"],[106,"UI_Tips_1","已满级","Max"],[107,"UI_Tips_2","点击使用护盾","Click to shield"],[108,"UI_Tips_3","获得","You gained"],[109,"UI_Tips_4","领取","Claim"],[110,"UI_Tips_5","3","3"],[111,"UI_Tips_6","3","3"],[112,"UI_RoleName_10","纲手","Tsunade"],[113,"UI_RoleName_11","天天","Tenten"],[114,"UI_RoleName_12","祢豆子","Nezuko"],[115,"UI_RoleDesc_10","双倍时间增加4秒","Coin-double time increased by 4 sec"],[116,"UI_RoleDesc_11","飞行时间增加4秒","Flight time increased by 4 sec"],[117,"UI_RoleDesc_12","护盾时间增加5秒","Shield time increased by 5 sec"],[118,"UI_RoleDesc_13","双倍时间增加6秒","Coin-double time increased by 6 sec"],[119,"UI_Tips_7","下局开始时即可使用","Available when you play the next round"],[120,"UI_Tips_8","玩家自己","User"]];
export interface ILanguageElement extends IElementBase{
 	/**id*/
	id:number
	/**名字*/
	Name:string
	/**中文*/
	Value:string
 } 
export class LanguageConfig extends ConfigBase<ILanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**Swipe up*/
	get UI_Guide_1():ILanguageElement{return this.getElement(1)};
	/**Swipe down*/
	get UI_Guide_2():ILanguageElement{return this.getElement(2)};
	/**Swipe right*/
	get UI_Guide_3():ILanguageElement{return this.getElement(3)};
	/**Swipe left*/
	get UI_Guide_4():ILanguageElement{return this.getElement(4)};
	/**Score*/
	get UI_End_1():ILanguageElement{return this.getElement(5)};
	/**New record*/
	get UI_End_2():ILanguageElement{return this.getElement(6)};
	/**Home*/
	get UI_End_3():ILanguageElement{return this.getElement(7)};
	/**Avatar*/
	get UI_End_4():ILanguageElement{return this.getElement(8)};
	/**Store*/
	get UI_End_5():ILanguageElement{return this.getElement(9)};
	/**Start*/
	get UI_End_6():ILanguageElement{return this.getElement(10)};
	/**New record*/
	get UI_Game_1():ILanguageElement{return this.getElement(11)};
	/**Leaderboard*/
	get UI_LobbyUI_1():ILanguageElement{return this.getElement(12)};
	/**Ranking*/
	get UI_LobbyUI_2():ILanguageElement{return this.getElement(13)};
	/**Username*/
	get UI_LobbyUI_3():ILanguageElement{return this.getElement(14)};
	/**Score*/
	get UI_LobbyUI_4():ILanguageElement{return this.getElement(15)};
	/**Avatar*/
	get UI_LobbyUI_5():ILanguageElement{return this.getElement(16)};
	/**Store*/
	get UI_LobbyUI_6():ILanguageElement{return this.getElement(17)};
	/**Start*/
	get UI_LobbyUI_7():ILanguageElement{return this.getElement(18)};
	/**Wanna give up？*/
	get UI_PauseUI_1():ILanguageElement{return this.getElement(19)};
	/**Yes*/
	get UI_PauseUI_2():ILanguageElement{return this.getElement(20)};
	/**No*/
	get UI_PauseUI_3():ILanguageElement{return this.getElement(21)};
	/**Heather*/
	get UI_Name_1():ILanguageElement{return this.getElement(22)};
	/**Loralie*/
	get UI_Name_2():ILanguageElement{return this.getElement(23)};
	/**Archer*/
	get UI_Name_3():ILanguageElement{return this.getElement(24)};
	/**Elmer*/
	get UI_Name_4():ILanguageElement{return this.getElement(25)};
	/**Nimble*/
	get UI_Name_5():ILanguageElement{return this.getElement(26)};
	/**Lois*/
	get UI_Name_6():ILanguageElement{return this.getElement(27)};
	/**Teri*/
	get UI_Name_7():ILanguageElement{return this.getElement(28)};
	/**Hilda*/
	get UI_Name_8():ILanguageElement{return this.getElement(29)};
	/**Randolph*/
	get UI_Name_9():ILanguageElement{return this.getElement(30)};
	/**Nigel*/
	get UI_Name_10():ILanguageElement{return this.getElement(31)};
	/**Wolf*/
	get UI_Name_11():ILanguageElement{return this.getElement(32)};
	/**Frank*/
	get UI_Name_12():ILanguageElement{return this.getElement(33)};
	/**Primrose*/
	get UI_Name_13():ILanguageElement{return this.getElement(34)};
	/**Just*/
	get UI_Name_14():ILanguageElement{return this.getElement(35)};
	/**Lawyer*/
	get UI_Name_15():ILanguageElement{return this.getElement(36)};
	/**Horace*/
	get UI_Name_16():ILanguageElement{return this.getElement(37)};
	/**Oswald*/
	get UI_Name_17():ILanguageElement{return this.getElement(38)};
	/**Stephen*/
	get UI_Name_18():ILanguageElement{return this.getElement(39)};
	/**Priscilla*/
	get UI_Name_19():ILanguageElement{return this.getElement(40)};
	/**Jennifer*/
	get UI_Name_20():ILanguageElement{return this.getElement(41)};
	/**Sebastian*/
	get UI_Name_21():ILanguageElement{return this.getElement(42)};
	/**Gerard*/
	get UI_Name_22():ILanguageElement{return this.getElement(43)};
	/**Cheerful*/
	get UI_Name_23():ILanguageElement{return this.getElement(44)};
	/**Teresa*/
	get UI_Name_24():ILanguageElement{return this.getElement(45)};
	/**Yolanda*/
	get UI_Name_25():ILanguageElement{return this.getElement(46)};
	/**Kelvin*/
	get UI_Name_26():ILanguageElement{return this.getElement(47)};
	/**Lane*/
	get UI_Name_27():ILanguageElement{return this.getElement(48)};
	/**Everett*/
	get UI_Name_28():ILanguageElement{return this.getElement(49)};
	/**Harland*/
	get UI_Name_29():ILanguageElement{return this.getElement(50)};
	/**Udele*/
	get UI_Name_30():ILanguageElement{return this.getElement(51)};
	/**Gavin*/
	get UI_Name_31():ILanguageElement{return this.getElement(52)};
	/**Wyman*/
	get UI_Name_32():ILanguageElement{return this.getElement(53)};
	/**Stan*/
	get UI_Name_33():ILanguageElement{return this.getElement(54)};
	/**Leigh*/
	get UI_Name_34():ILanguageElement{return this.getElement(55)};
	/**Seaman*/
	get UI_Name_35():ILanguageElement{return this.getElement(56)};
	/**Dark-Haired*/
	get UI_Name_36():ILanguageElement{return this.getElement(57)};
	/**Lombard*/
	get UI_Name_37():ILanguageElement{return this.getElement(58)};
	/**Kacey*/
	get UI_Name_38():ILanguageElement{return this.getElement(59)};
	/**Kelsey*/
	get UI_Name_39():ILanguageElement{return this.getElement(60)};
	/**Farley*/
	get UI_Name_40():ILanguageElement{return this.getElement(61)};
	/**Quincy*/
	get UI_Name_41():ILanguageElement{return this.getElement(62)};
	/**Peter*/
	get UI_Name_42():ILanguageElement{return this.getElement(63)};
	/**Kirsten*/
	get UI_Name_43():ILanguageElement{return this.getElement(64)};
	/**Keely*/
	get UI_Name_44():ILanguageElement{return this.getElement(65)};
	/**Kenway*/
	get UI_Name_45():ILanguageElement{return this.getElement(66)};
	/**Laura*/
	get UI_Name_46():ILanguageElement{return this.getElement(67)};
	/**Walton*/
	get UI_Name_47():ILanguageElement{return this.getElement(68)};
	/**Orva*/
	get UI_Name_48():ILanguageElement{return this.getElement(69)};
	/**Philippa*/
	get UI_Name_49():ILanguageElement{return this.getElement(70)};
	/**Bobbie*/
	get UI_Name_50():ILanguageElement{return this.getElement(71)};
	/**Sakura*/
	get UI_RoleName_1():ILanguageElement{return this.getElement(72)};
	/**Naruto*/
	get UI_RoleName_2():ILanguageElement{return this.getElement(73)};
	/**Sasuke*/
	get UI_RoleName_3():ILanguageElement{return this.getElement(74)};
	/**Kakashi*/
	get UI_RoleName_4():ILanguageElement{return this.getElement(75)};
	/**Hinata*/
	get UI_RoleName_5():ILanguageElement{return this.getElement(76)};
	/**Obito*/
	get UI_RoleName_6():ILanguageElement{return this.getElement(77)};
	/**Konan*/
	get UI_RoleName_7():ILanguageElement{return this.getElement(78)};
	/**Madara*/
	get UI_RoleName_8():ILanguageElement{return this.getElement(79)};
	/**Jiraiya*/
	get UI_RoleName_9():ILanguageElement{return this.getElement(80)};
	/**Coin-double time increased by 2 sec*/
	get UI_RoleDesc_1():ILanguageElement{return this.getElement(81)};
	/**Flight time increased by 1 sec*/
	get UI_RoleDesc_2():ILanguageElement{return this.getElement(82)};
	/**Coin-double time increased by 2 sec*/
	get UI_RoleDesc_3():ILanguageElement{return this.getElement(83)};
	/**Shield time increased by 3 sec*/
	get UI_RoleDesc_4():ILanguageElement{return this.getElement(84)};
	/**Shield time increased by 1 sec*/
	get UI_RoleDesc_5():ILanguageElement{return this.getElement(85)};
	/**Flight time increased by 2 sec*/
	get UI_RoleDesc_6():ILanguageElement{return this.getElement(86)};
	/**Flight time increased by 5 sec*/
	get UI_RoleDesc_7():ILanguageElement{return this.getElement(87)};
	/**Shield time increased by 6 sec*/
	get UI_RoleDesc_8():ILanguageElement{return this.getElement(88)};
	/**Shield time increased by 2 sec*/
	get UI_RoleDesc_9():ILanguageElement{return this.getElement(89)};
	/**Back*/
	get UI_Role_1():ILanguageElement{return this.getElement(90)};
	/**Select*/
	get UI_Role_2():ILanguageElement{return this.getElement(91)};
	/**Purchase*/
	get UI_Role_3():ILanguageElement{return this.getElement(92)};
	/**Selected*/
	get UI_Role_4():ILanguageElement{return this.getElement(93)};
	/**Key*/
	get UI_Item_1():ILanguageElement{return this.getElement(94)};
	/**Shield*/
	get UI_Item_2():ILanguageElement{return this.getElement(95)};
	/**Coin double*/
	get UI_Item_3():ILanguageElement{return this.getElement(96)};
	/**Flight*/
	get UI_Item_4():ILanguageElement{return this.getElement(97)};
	/**Defense against one damage. Upgrade to increase its duration*/
	get UI_ItemDesc_1():ILanguageElement{return this.getElement(98)};
	/**Make you fly. Upgrade to increase its duration*/
	get UI_ItemDesc_2():ILanguageElement{return this.getElement(99)};
	/**Collect coins doubly. Upgrade to increase its duration*/
	get UI_ItemDesc_3():ILanguageElement{return this.getElement(100)};
	/**s*/
	get UI_Skill_1():ILanguageElement{return this.getElement(101)};
	/**Yes*/
	get UI_Relive_1():ILanguageElement{return this.getElement(102)};
	/**No*/
	get UI_Relive_2():ILanguageElement{return this.getElement(103)};
	/**Insufficient keys*/
	get UI_Relive_3():ILanguageElement{return this.getElement(104)};
	/**Consume keys to revive*/
	get UI_Relive_4():ILanguageElement{return this.getElement(105)};
	/**Max*/
	get UI_Tips_1():ILanguageElement{return this.getElement(106)};
	/**Click to shield*/
	get UI_Tips_2():ILanguageElement{return this.getElement(107)};
	/**You gained*/
	get UI_Tips_3():ILanguageElement{return this.getElement(108)};
	/**Claim*/
	get UI_Tips_4():ILanguageElement{return this.getElement(109)};
	/**3*/
	get UI_Tips_5():ILanguageElement{return this.getElement(110)};
	/**3*/
	get UI_Tips_6():ILanguageElement{return this.getElement(111)};
	/**Tsunade*/
	get UI_RoleName_10():ILanguageElement{return this.getElement(112)};
	/**Tenten*/
	get UI_RoleName_11():ILanguageElement{return this.getElement(113)};
	/**Nezuko*/
	get UI_RoleName_12():ILanguageElement{return this.getElement(114)};
	/**Coin-double time increased by 4 sec*/
	get UI_RoleDesc_10():ILanguageElement{return this.getElement(115)};
	/**Flight time increased by 4 sec*/
	get UI_RoleDesc_11():ILanguageElement{return this.getElement(116)};
	/**Shield time increased by 5 sec*/
	get UI_RoleDesc_12():ILanguageElement{return this.getElement(117)};
	/**Coin-double time increased by 6 sec*/
	get UI_RoleDesc_13():ILanguageElement{return this.getElement(118)};
	/**Available when you play the next round*/
	get UI_Tips_7():ILanguageElement{return this.getElement(119)};
	/**User*/
	get UI_Tips_8():ILanguageElement{return this.getElement(120)};

}