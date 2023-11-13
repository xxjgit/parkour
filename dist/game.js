'use strict';

var foreign0 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

//配置的基类
class ConfigBase {
    constructor(excelData) {
        this.ELEMENTARR = [];
        this.ELEMENTMAP = new Map();
        this.KEYMAP = new Map();
        let headerLine = 2; //表头的行数
        this.ELEMENTARR = new Array(excelData.length - headerLine);
        for (let i = 0; i < this.ELEMENTARR.length; i++) {
            this.ELEMENTARR[i] = {};
        }
        let column = excelData[0].length; //列数
        for (let j = 0; j < column; j++) { //遍历各列
            let name = excelData[0][j];
            let tags = excelData[1][j].split('|');
            if (tags.includes(ConfigBase.TAG_CHILDLANGUAGE))
                continue;
            let jOffect = 0; //列偏移量
            if (tags.includes(ConfigBase.TAG_MAINLANGUAGE)) {
                let index = j + ConfigBase.languageIndex;
                let targetTags = excelData[1][index].split('|');
                if (index < column && targetTags.includes(ConfigBase.TAG_CHILDLANGUAGE)) {
                    jOffect = ConfigBase.languageIndex;
                }
            }
            let hasTag_Key = tags.includes(ConfigBase.TAG_KEY);
            let hasTag_Language = tags.includes(ConfigBase.TAG_LANGUAGE);
            for (let i = 0; i < this.ELEMENTARR.length; i++) {
                let ele = this.ELEMENTARR[i];
                let value = excelData[i + headerLine][j + jOffect];
                if (j == 0) { //ID
                    this.ELEMENTMAP.set(value, ele);
                }
                else {
                    if (hasTag_Key) {
                        this.KEYMAP.set(value, excelData[i + headerLine][0]);
                    }
                    if (hasTag_Language) {
                        if (ConfigBase.getLanguage != null) {
                            value = ConfigBase.getLanguage(value);
                        }
                        else {
                            value = "unknow";
                        }
                    }
                }
                ele[name] = value;
            }
        }
    }
    //设置获取语言的方法
    static initLanguage(languageIndex, getLanguageFun) {
        ConfigBase.languageIndex = languageIndex;
        ConfigBase.getLanguage = getLanguageFun;
        if (ConfigBase.languageIndex < 0) {
            ConfigBase.languageIndex = ConfigBase.getSystemLanguageIndex();
        }
    }
    //获取系统语言索引
    static getSystemLanguageIndex() {
        let language = mw.LocaleUtil.getDefaultLocale().toString().toLowerCase();
        if (!!language.match("en")) {
            return 0;
        }
        if (!!language.match("zh")) {
            return 1;
        }
        if (!!language.match("ja")) {
            return 2;
        }
        if (!!language.match("de")) {
            return 3;
        }
        return 0;
    }
    /**
    * 根据id获取一个元素
    * @param id id|key
    * @returns Element
    */
    getElement(id) {
        let ele = this.ELEMENTMAP.get(Number(id)) || this.ELEMENTMAP.get(this.KEYMAP.get(id));
        return ele;
    }
    /**
    * 根据字段名和字段值查找一个元素
    * @param fieldName 字段名
    * @param fieldValue 字段值
    * @returns 第一个找到的Element
    */
    findElement(fieldName, fieldValue) {
        for (let i = 0; i < this.ELEMENTARR.length; i++) {
            if (this.ELEMENTARR[i][fieldName] == fieldValue) {
                return this.ELEMENTARR[i];
            }
        }
    }
    /**
    * 根据字段名和字段值查找一组元素
    * @param fieldName 字段名
    * @param fieldValue 字段值
    * @returns 所有符合要求的Element
    */
    findElements(fieldName, fieldValue) {
        let arr = [];
        for (let i = 0; i < this.ELEMENTARR.length; i++) {
            if (this.ELEMENTARR[i][fieldName] == fieldValue) {
                arr.push(this.ELEMENTARR[i]);
            }
        }
        return arr;
    }
    /**获取所有元素*/
    getAllElement() {
        return this.ELEMENTARR;
    }
}
ConfigBase.TAG_KEY = 'Key'; //读取键(除了ID之外的别名，带key的字段必须是string类型)
ConfigBase.TAG_LANGUAGE = 'Language'; //关联语言表的id或key(如果有这个tag，导表工具要把数据生成为string类型，因为会自动进行值的转换)
ConfigBase.TAG_MAINLANGUAGE = 'MainLanguage'; //主语言tag
ConfigBase.TAG_CHILDLANGUAGE = 'ChildLanguage'; //子语言tag
ConfigBase.languageIndex = 0;

var foreign2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ConfigBase: ConfigBase
});

const EXCELDATA$8 = [["id", "NameID", "PrefabsGuid", "Groupid", "IsItem", "ResourceGroup", "Ratio", "Lenght"], ["", "", "", "", "", "", "", ""], [1, 101, "4A15C4884AB32E9C15B7D3B5557944D5", 1, false, 0, null, 9930, "场景", "新手关卡"], [2, 102, "295DF85641C96E6D0454FC88CD9C445E", 1, false, 0, null, 9975, null, "古风场景"], [3, 103, "151071C244925B6654AD88A4A5543B76", 1, false, 0, null, 9990, null, "高山场景"], [4, 104, "8C78014E4C0DE998B70548A291221F3B", 1, false, 0, null, 9998, null, "沙漠场景"], [5, 1001, "7A53A09F46AE5434F4EB91AB30E305E9", 2, false, 4, [15, 15, 17, 22], 640, "障碍物", "2节马车"], [6, 1002, "F709D3B149FCC0CDA4F9CCBD576A8B2A", 2, false, 4, [10, 10, 13, 16], 970, null, "3节马车"], [7, 1003, "BBC3A6F1422406A827CD89903BCA51F7", 2, false, 2, [15, 15, 17, 20], 0, null, "全堵石墩"], [8, 1004, "D7C3D4024380C587DE8C7E969CE80957", 2, false, 1, [15, 15, 15, 18], 1292, null, "可上马车"], [9, 1005, "FA24A0BE41FBF2BCB944DE9B24362A37", 2, false, 1, [15, 15, 15, 17], 0, null, "堵上面"], [10, 1006, "2FCA865E4DDD4CB1FC8241829C726C26", 2, false, 1, [25, 25, 25, 25], 0, null, "堵下面"], [11, 1007, "F6DAC3C545E471090C24579B2280F80C", 2, false, 1, [25, 25, 25, 25], 0, null, "堵下面2"], [12, 1008, "9F6B133745E5D771BC2669952392CECB", 2, false, 1, [30, 30, 30, 29], 0, null, "堵中间"], [13, 1009, "B8503156490B30F9AF673694AC27D3A4", 2, false, 1, [30, 30, 30, 29], 0, null, "带金币的堵下面的石头"], [14, 1010, "5EC6250B4CF7EFC6664D6B9AC0C31912", 2, false, 1, [30, 30, 30, 29], 0, null, "带金币的堵下面的箱子"], [15, 1011, "EE8A4D8B4BA564551CA25588859BEA83", 2, false, 1, [25, 30, 30, 25], 350, null, "一串金币"], [16, 1012, "89C655584287F3B6EF821CAE76D7B557", 2, false, 1, [25, 25, 25, 26], 0, null, "带金币的堵上面"], [17, 1013, "F6DAC3C545E471090C24579B2280F80C", 2, false, 1, [1, 1, 1, 1], 0, null, "板车"], [18, 1014, "D431550B413EF313EE4A618BA7623C93", 2, false, 1, [25, 25, 25, 27], 965, null, "带金币的可上马车"], [19, 1015, "8B3979C54225D152117DB59206E370D3", 2, false, 1, [12, 15, 15, 15], 1866, null, "马车组合"], [20, 1016, "5388E5DF42EA8613A9A0A0B77AFF737C", 2, false, 1, [6, 7, 8, 7], 0, null, "钻石"], [21, 1017, "CD5DDB7E44490476761B45B58E479CAE", 2, true, 1, [7, 7, 7, 7], 0, null, "防护盾"], [22, 1018, "33D330FA4AE56F7AE8BB23AC6C48B423", 2, true, 1, [6, 7, 7, 6], 0, null, "飞行背包"], [23, 1019, "7A17794846F2B2116CD90CB827E61E9C", 2, true, 1, [6, 7, 7, 7], 0, null, "双倍金币"], [24, 2001, "7C8707E74168B5CFAE46F3B6EE932CE8", 3, false, 3, null, 1750, "障碍物组合"], [25, 2002, "7C8707E74168B5CFAE46F3B6EE932CE8", 3, false, 3, null, 2500], [26, 2003, "DAA85E1A45CE35A1B0A489B090D83487", 3, false, 3, null, 5000, null, "移动马车组"], [27, 2004, "CC4B733F47909BB242882893188C8984", 3, false, 3, null, 1750, null, "金币组1"], [28, 2005, "8DCE0DAB48A2172CB518449FEC2022A1", 3, false, 3, null, 1800, null, "金币组2"], [29, 2006, "677A25D749E0AD067C7CA3BC0351CFA7", 3, false, 3, null, 710, null, "金币组3"], [30, 2007, "7A17794846F2B2116CD90CB827E61E9C", 3, true, 3, null, 20, null, "双倍金币"], [31, 2008, "FEF7CA0D4C950FAB6B7AB0983EC1C595", 3, false, 3, null, 4500, null, "障碍物组合2"], [32, 2009, "CD5DDB7E44490476761B45B58E479CAE", 3, true, 3, null, 20, null, "防护盾"], [33, 2010, "DAA85E1A45CE35A1B0A489B090D83487", 3, false, 3, null, 4389, null, "障碍物组合4"], [34, 2011, "33D330FA4AE56F7AE8BB23AC6C48B423", 3, true, 3, null, 20, null, "飞行背包"], [35, 2012, "48C4B21B4FA90676D7980DB6B23A92F8", 3, false, 6, null, 37548, null, "空中金币"], [36, 2013, "7C8707E74168B5CFAE46F3B6EE932CE8", 3, false, 3, null, 2380, null, "障碍物组合1"]];
class AssetsConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$8);
    }
}

var foreign1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AssetsConfig: AssetsConfig
});

const EXCELDATA$7 = [["Id", "Value", "Value1", "Value2", "Value3", "Value4", "Value5"], ["", "", "", "", "", "", ""], [101, 14, 25, 0.05, 450, 21, null], [102, 1000, 0, 0, 0, 0, null], [103, 3500, 0, 0, 0, 0, null], [104, 6000, 0, 0, 0, 0, null], [105, 200, 0, 0, 0, 0, null], [106, 0, 0, 0, 0, 0, [20000, 50000, 100000]]];
class GlobalConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$7);
    }
}

var foreign4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GlobalConfig: GlobalConfig
});

const EXCELDATA$6 = [["id", "StartPos", "EndPos", "ActionType"], ["", "", "", ""], [1, 300, 1450, 3], [2, 1344, 2700, 3], [3, 2600, 4015, 4], [4, 3820, 5200, 4], [5, 5200, 6450, 1], [6, 6387, 6900, 2], [7, 7032, 8300, 2], [8, 8200, 9020, 1], [9, 9700, 11000, 5]];
class GuideConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$6);
    }
}

var foreign5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GuideConfig: GuideConfig
});

const EXCELDATA$5 = [["id", "name", "type", "priceType", "price", "maxLv", "upType", "upCost", "time", "icon", "effect", "desc"], ["", "", "", "", "", "", "", "", "", "", "", ""], [1, "UI_Item_1", 1, 1, 100, 0, [0], [0], [0], "37744", null, null, "钥匙"], [2, "UI_Item_2", 2, 1, 50, 6, [1, 1, 1, 1, 1, 1], [30, 50, 100, 200, 400, 800], [25, 26, 27, 28, 29, 30, 31], "91210", "113906", "UI_ItemDesc_1", "护盾"], [3, "UI_Item_4", 3, 2, 1, 6, [1, 1, 1, 1, 1, 1], [30, 50, 100, 200, 400, 800], [9, 10, 11, 12, 13, 14, 15], "91211", "27392", "UI_ItemDesc_2", "飞行"], [4, "cc", 0, 2, 200, 3, [1, 2, 1], [1, 2, 3, 4, 5], [5, 6, 9], "37744", null, null], [5, "UI_Item_3", 3, 1, 50, 6, [1, 1, 1, 1, 1, 1], [30, 50, 100, 200, 400, 800], [15, 16, 17, 18, 19, 20, 21], "91196", "113916", "UI_ItemDesc_3", "双倍"], [6, "磁铁", 0, 2, 400, 3, [1, 2, 1], [5, 6, 11], [5, 6, 11], "37744", null, "吸金币"]];
class ItemConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$5);
    }
}

var foreign6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ItemConfig: ItemConfig
});

const EXCELDATA$4 = [["id", "Name", "Value", "Value_E"], ["", "Key|ReadByName", "MainLanguage", "ChildLanguage"], [1, "UI_Guide_1", "向上滑动", "Swipe up"], [2, "UI_Guide_2", "向下滑动", "Swipe down"], [3, "UI_Guide_3", "向右滑动", "Swipe right"], [4, "UI_Guide_4", "向左滑动", "Swipe left"], [5, "UI_End_1", "得分", "Score"], [6, "UI_End_2", "新纪录！", "New record"], [7, "UI_End_3", "回家", "Home"], [8, "UI_End_4", "角色", "Avatar"], [9, "UI_End_5", "商店", "Store"], [10, "UI_End_6", "出发", "Start"], [11, "UI_Game_1", "新纪录！", "New record"], [12, "UI_LobbyUI_1", "排行榜", "Leaderboard"], [13, "UI_LobbyUI_2", "排名", "Ranking"], [14, "UI_LobbyUI_3", "用户名", "Username"], [15, "UI_LobbyUI_4", "分数", "Score"], [16, "UI_LobbyUI_5", "角色", "Avatar"], [17, "UI_LobbyUI_6", "商店", "Store"], [18, "UI_LobbyUI_7", "出发", "Start"], [19, "UI_PauseUI_1", "你想放弃？", "Wanna give up？"], [20, "UI_PauseUI_2", "是", "Yes"], [21, "UI_PauseUI_3", "否", "No"], [22, "UI_Name_1", "花开暗消魂", "Heather"], [23, "UI_Name_2", "秀恩爱死得快", "Loralie"], [24, "UI_Name_3", "除了帅我一无所有", "Archer"], [25, "UI_Name_4", "想多了心会累", "Elmer"], [26, "UI_Name_5", "落英江南", "Nimble"], [27, "UI_Name_6", "看清所有", "Lois"], [28, "UI_Name_7", "忘了你亡了我", "Teri"], [29, "UI_Name_8", "风晴雪流成河", "Hilda"], [30, "UI_Name_9", "许你一世情深", "Randolph"], [31, "UI_Name_10", "笑语千山隐", "Nigel"], [32, "UI_Name_11", "言为心声", "Wolf"], [33, "UI_Name_12", "永远的神", "Frank"], [34, "UI_Name_13", "弹指间的烟灰", "Primrose"], [35, "UI_Name_14", "天空依旧很蓝", "Just"], [36, "UI_Name_15", "衡沂博", "Lawyer"], [37, "UI_Name_16", "空万洲", "Horace"], [38, "UI_Name_17", "奚坤", "Oswald"], [39, "UI_Name_18", "柏松青", "Stephen"], [40, "UI_Name_19", "屈莛衫", "Priscilla"], [41, "UI_Name_20", "茅百莹", "Jennifer"], [42, "UI_Name_21", "古莛", "Sebastian"], [43, "UI_Name_22", "单于刚", "Gerard"], [44, "UI_Name_23", "阙祥钧", "Cheerful"], [45, "UI_Name_24", "段斓", "Teresa"], [46, "UI_Name_25", "邹沂枫", "Yolanda"], [47, "UI_Name_26", "钱湘鹰", "Kelvin"], [48, "UI_Name_27", "厉妍勒", "Lane"], [49, "UI_Name_28", "车雁戾", "Everett"], [50, "UI_Name_29", "仲孙盈", "Harland"], [51, "UI_Name_30", "盛匪凛", "Udele"], [52, "UI_Name_31", "蒯玲莞", "Gavin"], [53, "UI_Name_32", "蔡班茗", "Wyman"], [54, "UI_Name_33", "胡翰", "Stan"], [55, "UI_Name_34", "莫隶芙", "Leigh"], [56, "UI_Name_35", "宫斩", "Seaman"], [57, "UI_Name_36", "司徒富", "Dark-Haired"], [58, "UI_Name_37", "伯德传", "Lombard"], [59, "UI_Name_38", "肖卿芳", "Kacey"], [60, "UI_Name_39", "伍翼", "Kelsey"], [61, "UI_Name_40", "乐正奎邑", "Farley"], [62, "UI_Name_41", "秋秋契", "Quincy"], [63, "UI_Name_42", "戴高雅", "Peter"], [64, "UI_Name_43", "王喜悦", "Kirsten"], [65, "UI_Name_44", "诸荆焦", "Keely"], [66, "UI_Name_45", "兄弟联盟", "Kenway"], [67, "UI_Name_46", "边境矢梦", "Laura"], [68, "UI_Name_47", "七梨少年", "Walton"], [69, "UI_Name_48", "梦醒如初", "Orva"], [70, "UI_Name_49", "呆萌小甜心", "Philippa"], [71, "UI_Name_50", "糀蝎囡囡", "Bobbie"], [72, "UI_RoleName_1", "小樱", "Sakura"], [73, "UI_RoleName_2", "鸣人", "Naruto"], [74, "UI_RoleName_3", "佐助", "Sasuke"], [75, "UI_RoleName_4", "卡卡西", "Kakashi"], [76, "UI_RoleName_5", "雏田", "Hinata"], [77, "UI_RoleName_6", "带土", "Obito"], [78, "UI_RoleName_7", "小南", "Konan"], [79, "UI_RoleName_8", "宇智波斑", "Madara"], [80, "UI_RoleName_9", "自来也", "Jiraiya"], [81, "UI_RoleDesc_1", "双倍时间增加2秒", "Coin-double time increased by 2 sec"], [82, "UI_RoleDesc_2", "飞行时间增加1秒", "Flight time increased by 1 sec"], [83, "UI_RoleDesc_3", "双倍时间增加2秒", "Coin-double time increased by 2 sec"], [84, "UI_RoleDesc_4", "护盾时间增加3秒", "Shield time increased by 3 sec"], [85, "UI_RoleDesc_5", "护盾时间增加1秒", "Shield time increased by 1 sec"], [86, "UI_RoleDesc_6", "飞行时间增加2秒", "Flight time increased by 2 sec"], [87, "UI_RoleDesc_7", "飞行时间增加5秒", "Flight time increased by 5 sec"], [88, "UI_RoleDesc_8", "护盾时间增加6秒", "Shield time increased by 6 sec"], [89, "UI_RoleDesc_9", "护盾时间增加2秒", "Shield time increased by 2 sec"], [90, "UI_Role_1", "返回", "Back"], [91, "UI_Role_2", "选择", "Select"], [92, "UI_Role_3", "购买", "Purchase"], [93, "UI_Role_4", "已选", "Selected"], [94, "UI_Item_1", "钥匙", "Key"], [95, "UI_Item_2", "护盾", "Shield"], [96, "UI_Item_3", "双倍", "Coin double"], [97, "UI_Item_4", "飞行", "Flight"], [98, "UI_ItemDesc_1", "抵挡一次伤害，升级提高持续时间", "Defense against one damage. Upgrade to increase its duration"], [99, "UI_ItemDesc_2", "进入飞行状态，升级提高持续时间", "Make you fly. Upgrade to increase its duration"], [100, "UI_ItemDesc_3", "获得双倍的金币，升级提高持续时间", "Collect coins doubly. Upgrade to increase its duration"], [101, "UI_Skill_1", "秒", "s"], [102, "UI_Relive_1", "是", "Yes"], [103, "UI_Relive_2", "否", "No"], [104, "UI_Relive_3", "钥匙不足", "Insufficient keys"], [105, "UI_Relive_4", "消耗钥匙复活", "Consume keys to revive"], [106, "UI_Tips_1", "已满级", "Max"], [107, "UI_Tips_2", "点击使用护盾", "Click to shield"], [108, "UI_Tips_3", "获得", "You gained"], [109, "UI_Tips_4", "领取", "Claim"], [110, "UI_Tips_5", "3", "3"], [111, "UI_Tips_6", "3", "3"], [112, "UI_RoleName_10", "纲手", "Tsunade"], [113, "UI_RoleName_11", "天天", "Tenten"], [114, "UI_RoleName_12", "祢豆子", "Nezuko"], [115, "UI_RoleDesc_10", "双倍时间增加4秒", "Coin-double time increased by 4 sec"], [116, "UI_RoleDesc_11", "飞行时间增加4秒", "Flight time increased by 4 sec"], [117, "UI_RoleDesc_12", "护盾时间增加5秒", "Shield time increased by 5 sec"], [118, "UI_RoleDesc_13", "双倍时间增加6秒", "Coin-double time increased by 6 sec"], [119, "UI_Tips_7", "下局开始时即可使用", "Available when you play the next round"], [120, "UI_Tips_8", "玩家自己", "User"]];
class LanguageConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$4);
    }
    /**Swipe up*/
    get UI_Guide_1() { return this.getElement(1); }
    ;
    /**Swipe down*/
    get UI_Guide_2() { return this.getElement(2); }
    ;
    /**Swipe right*/
    get UI_Guide_3() { return this.getElement(3); }
    ;
    /**Swipe left*/
    get UI_Guide_4() { return this.getElement(4); }
    ;
    /**Score*/
    get UI_End_1() { return this.getElement(5); }
    ;
    /**New record*/
    get UI_End_2() { return this.getElement(6); }
    ;
    /**Home*/
    get UI_End_3() { return this.getElement(7); }
    ;
    /**Avatar*/
    get UI_End_4() { return this.getElement(8); }
    ;
    /**Store*/
    get UI_End_5() { return this.getElement(9); }
    ;
    /**Start*/
    get UI_End_6() { return this.getElement(10); }
    ;
    /**New record*/
    get UI_Game_1() { return this.getElement(11); }
    ;
    /**Leaderboard*/
    get UI_LobbyUI_1() { return this.getElement(12); }
    ;
    /**Ranking*/
    get UI_LobbyUI_2() { return this.getElement(13); }
    ;
    /**Username*/
    get UI_LobbyUI_3() { return this.getElement(14); }
    ;
    /**Score*/
    get UI_LobbyUI_4() { return this.getElement(15); }
    ;
    /**Avatar*/
    get UI_LobbyUI_5() { return this.getElement(16); }
    ;
    /**Store*/
    get UI_LobbyUI_6() { return this.getElement(17); }
    ;
    /**Start*/
    get UI_LobbyUI_7() { return this.getElement(18); }
    ;
    /**Wanna give up？*/
    get UI_PauseUI_1() { return this.getElement(19); }
    ;
    /**Yes*/
    get UI_PauseUI_2() { return this.getElement(20); }
    ;
    /**No*/
    get UI_PauseUI_3() { return this.getElement(21); }
    ;
    /**Heather*/
    get UI_Name_1() { return this.getElement(22); }
    ;
    /**Loralie*/
    get UI_Name_2() { return this.getElement(23); }
    ;
    /**Archer*/
    get UI_Name_3() { return this.getElement(24); }
    ;
    /**Elmer*/
    get UI_Name_4() { return this.getElement(25); }
    ;
    /**Nimble*/
    get UI_Name_5() { return this.getElement(26); }
    ;
    /**Lois*/
    get UI_Name_6() { return this.getElement(27); }
    ;
    /**Teri*/
    get UI_Name_7() { return this.getElement(28); }
    ;
    /**Hilda*/
    get UI_Name_8() { return this.getElement(29); }
    ;
    /**Randolph*/
    get UI_Name_9() { return this.getElement(30); }
    ;
    /**Nigel*/
    get UI_Name_10() { return this.getElement(31); }
    ;
    /**Wolf*/
    get UI_Name_11() { return this.getElement(32); }
    ;
    /**Frank*/
    get UI_Name_12() { return this.getElement(33); }
    ;
    /**Primrose*/
    get UI_Name_13() { return this.getElement(34); }
    ;
    /**Just*/
    get UI_Name_14() { return this.getElement(35); }
    ;
    /**Lawyer*/
    get UI_Name_15() { return this.getElement(36); }
    ;
    /**Horace*/
    get UI_Name_16() { return this.getElement(37); }
    ;
    /**Oswald*/
    get UI_Name_17() { return this.getElement(38); }
    ;
    /**Stephen*/
    get UI_Name_18() { return this.getElement(39); }
    ;
    /**Priscilla*/
    get UI_Name_19() { return this.getElement(40); }
    ;
    /**Jennifer*/
    get UI_Name_20() { return this.getElement(41); }
    ;
    /**Sebastian*/
    get UI_Name_21() { return this.getElement(42); }
    ;
    /**Gerard*/
    get UI_Name_22() { return this.getElement(43); }
    ;
    /**Cheerful*/
    get UI_Name_23() { return this.getElement(44); }
    ;
    /**Teresa*/
    get UI_Name_24() { return this.getElement(45); }
    ;
    /**Yolanda*/
    get UI_Name_25() { return this.getElement(46); }
    ;
    /**Kelvin*/
    get UI_Name_26() { return this.getElement(47); }
    ;
    /**Lane*/
    get UI_Name_27() { return this.getElement(48); }
    ;
    /**Everett*/
    get UI_Name_28() { return this.getElement(49); }
    ;
    /**Harland*/
    get UI_Name_29() { return this.getElement(50); }
    ;
    /**Udele*/
    get UI_Name_30() { return this.getElement(51); }
    ;
    /**Gavin*/
    get UI_Name_31() { return this.getElement(52); }
    ;
    /**Wyman*/
    get UI_Name_32() { return this.getElement(53); }
    ;
    /**Stan*/
    get UI_Name_33() { return this.getElement(54); }
    ;
    /**Leigh*/
    get UI_Name_34() { return this.getElement(55); }
    ;
    /**Seaman*/
    get UI_Name_35() { return this.getElement(56); }
    ;
    /**Dark-Haired*/
    get UI_Name_36() { return this.getElement(57); }
    ;
    /**Lombard*/
    get UI_Name_37() { return this.getElement(58); }
    ;
    /**Kacey*/
    get UI_Name_38() { return this.getElement(59); }
    ;
    /**Kelsey*/
    get UI_Name_39() { return this.getElement(60); }
    ;
    /**Farley*/
    get UI_Name_40() { return this.getElement(61); }
    ;
    /**Quincy*/
    get UI_Name_41() { return this.getElement(62); }
    ;
    /**Peter*/
    get UI_Name_42() { return this.getElement(63); }
    ;
    /**Kirsten*/
    get UI_Name_43() { return this.getElement(64); }
    ;
    /**Keely*/
    get UI_Name_44() { return this.getElement(65); }
    ;
    /**Kenway*/
    get UI_Name_45() { return this.getElement(66); }
    ;
    /**Laura*/
    get UI_Name_46() { return this.getElement(67); }
    ;
    /**Walton*/
    get UI_Name_47() { return this.getElement(68); }
    ;
    /**Orva*/
    get UI_Name_48() { return this.getElement(69); }
    ;
    /**Philippa*/
    get UI_Name_49() { return this.getElement(70); }
    ;
    /**Bobbie*/
    get UI_Name_50() { return this.getElement(71); }
    ;
    /**Sakura*/
    get UI_RoleName_1() { return this.getElement(72); }
    ;
    /**Naruto*/
    get UI_RoleName_2() { return this.getElement(73); }
    ;
    /**Sasuke*/
    get UI_RoleName_3() { return this.getElement(74); }
    ;
    /**Kakashi*/
    get UI_RoleName_4() { return this.getElement(75); }
    ;
    /**Hinata*/
    get UI_RoleName_5() { return this.getElement(76); }
    ;
    /**Obito*/
    get UI_RoleName_6() { return this.getElement(77); }
    ;
    /**Konan*/
    get UI_RoleName_7() { return this.getElement(78); }
    ;
    /**Madara*/
    get UI_RoleName_8() { return this.getElement(79); }
    ;
    /**Jiraiya*/
    get UI_RoleName_9() { return this.getElement(80); }
    ;
    /**Coin-double time increased by 2 sec*/
    get UI_RoleDesc_1() { return this.getElement(81); }
    ;
    /**Flight time increased by 1 sec*/
    get UI_RoleDesc_2() { return this.getElement(82); }
    ;
    /**Coin-double time increased by 2 sec*/
    get UI_RoleDesc_3() { return this.getElement(83); }
    ;
    /**Shield time increased by 3 sec*/
    get UI_RoleDesc_4() { return this.getElement(84); }
    ;
    /**Shield time increased by 1 sec*/
    get UI_RoleDesc_5() { return this.getElement(85); }
    ;
    /**Flight time increased by 2 sec*/
    get UI_RoleDesc_6() { return this.getElement(86); }
    ;
    /**Flight time increased by 5 sec*/
    get UI_RoleDesc_7() { return this.getElement(87); }
    ;
    /**Shield time increased by 6 sec*/
    get UI_RoleDesc_8() { return this.getElement(88); }
    ;
    /**Shield time increased by 2 sec*/
    get UI_RoleDesc_9() { return this.getElement(89); }
    ;
    /**Back*/
    get UI_Role_1() { return this.getElement(90); }
    ;
    /**Select*/
    get UI_Role_2() { return this.getElement(91); }
    ;
    /**Purchase*/
    get UI_Role_3() { return this.getElement(92); }
    ;
    /**Selected*/
    get UI_Role_4() { return this.getElement(93); }
    ;
    /**Key*/
    get UI_Item_1() { return this.getElement(94); }
    ;
    /**Shield*/
    get UI_Item_2() { return this.getElement(95); }
    ;
    /**Coin double*/
    get UI_Item_3() { return this.getElement(96); }
    ;
    /**Flight*/
    get UI_Item_4() { return this.getElement(97); }
    ;
    /**Defense against one damage. Upgrade to increase its duration*/
    get UI_ItemDesc_1() { return this.getElement(98); }
    ;
    /**Make you fly. Upgrade to increase its duration*/
    get UI_ItemDesc_2() { return this.getElement(99); }
    ;
    /**Collect coins doubly. Upgrade to increase its duration*/
    get UI_ItemDesc_3() { return this.getElement(100); }
    ;
    /**s*/
    get UI_Skill_1() { return this.getElement(101); }
    ;
    /**Yes*/
    get UI_Relive_1() { return this.getElement(102); }
    ;
    /**No*/
    get UI_Relive_2() { return this.getElement(103); }
    ;
    /**Insufficient keys*/
    get UI_Relive_3() { return this.getElement(104); }
    ;
    /**Consume keys to revive*/
    get UI_Relive_4() { return this.getElement(105); }
    ;
    /**Max*/
    get UI_Tips_1() { return this.getElement(106); }
    ;
    /**Click to shield*/
    get UI_Tips_2() { return this.getElement(107); }
    ;
    /**You gained*/
    get UI_Tips_3() { return this.getElement(108); }
    ;
    /**Claim*/
    get UI_Tips_4() { return this.getElement(109); }
    ;
    /**3*/
    get UI_Tips_5() { return this.getElement(110); }
    ;
    /**3*/
    get UI_Tips_6() { return this.getElement(111); }
    ;
    /**Tsunade*/
    get UI_RoleName_10() { return this.getElement(112); }
    ;
    /**Tenten*/
    get UI_RoleName_11() { return this.getElement(113); }
    ;
    /**Nezuko*/
    get UI_RoleName_12() { return this.getElement(114); }
    ;
    /**Coin-double time increased by 4 sec*/
    get UI_RoleDesc_10() { return this.getElement(115); }
    ;
    /**Flight time increased by 4 sec*/
    get UI_RoleDesc_11() { return this.getElement(116); }
    ;
    /**Shield time increased by 5 sec*/
    get UI_RoleDesc_12() { return this.getElement(117); }
    ;
    /**Coin-double time increased by 6 sec*/
    get UI_RoleDesc_13() { return this.getElement(118); }
    ;
    /**Available when you play the next round*/
    get UI_Tips_7() { return this.getElement(119); }
    ;
    /**User*/
    get UI_Tips_8() { return this.getElement(120); }
    ;
}

var foreign7 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LanguageConfig: LanguageConfig
});

const EXCELDATA$3 = [["id", "ObstacleGroupID", "SpawnPos", "Scene"], ["", "", "", ""], [1, [2013, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004], [12000, 16000, 30000, 32000, 42000, 62000, 82000, 102000, 122000], [102, 103, 104]], [2, [2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2013], [13000, 15000, 28000, 29000, 38000, 78000, 98000, 118000, 138000], [103, 102, 104]], [3, [2010, 2009, 2008, 2007, 2006, 2005, 2004, 2013, 2011], [14000, 18000, 20000, 25000, 35000, 55000, 75000, 97000, 115000], [104, 103, 102]], [4, [2009, 2008, 2007, 2006, 2005, 2004, 2013, 2011, 2010], [5000, 13000, 24000, 18000, 29000, 49000, 59000, 79000, 108000], [102, 104, 103]], [5, [2008, 2007, 2006, 2005, 2004, 2013, 2011, 2010, 2009], [8000, 12000, 22000, 32000, 42000, 62000, 82000, 102000, 122000], [103, 104, 102]], [6, [2007, 2006, 2005, 2004, 2013, 2011, 2010, 2009, 2008], [7000, 15000, 28000, 29000, 38000, 78000, 98000, 118000, 138000], [102, 103, 104]], [7, [2006, 2005, 2004, 2013, 2011, 2010, 2009, 2008, 2007], [4000, 14000, 20000, 25000, 35000, 55000, 75000, 97000, 115000], [103, 102, 104]], [8, [2005, 2004, 2013, 2011, 2010, 2009, 2008, 2007, 2006], [5000, 13000, 24000, 18000, 29000, 49000, 59000, 79000, 108000], [104, 103, 102]], [9, [2004, 2013, 2011, 2010, 2009, 2008, 2007, 2006, 2005], [6000, 12000, 22000, 32000, 42000, 62000, 82000, 102000, 122000], [102, 104, 103]]];
class LevelConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$3);
    }
}

var foreign8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LevelConfig: LevelConfig
});

const EXCELDATA$2 = [["id", "name"], ["", ""], [1, "UI_Name_1"], [2, "UI_Name_2"], [3, "UI_Name_3"], [4, "UI_Name_4"], [5, "UI_Name_5"], [6, "UI_Name_6"], [7, "UI_Name_7"], [8, "UI_Name_8"], [9, "UI_Name_9"], [10, "UI_Name_10"], [11, "UI_Name_11"], [12, "UI_Name_12"], [13, "UI_Name_13"], [14, "UI_Name_14"], [15, "UI_Name_15"], [16, "UI_Name_16"], [17, "UI_Name_17"], [18, "UI_Name_18"], [19, "UI_Name_19"], [20, "UI_Name_20"], [21, "UI_Name_21"], [22, "UI_Name_22"], [23, "UI_Name_23"], [24, "UI_Name_24"], [25, "UI_Name_25"], [26, "UI_Name_26"], [27, "UI_Name_27"], [28, "UI_Name_28"], [29, "UI_Name_29"], [30, "UI_Name_30"], [31, "UI_Name_31"], [32, "UI_Name_32"], [33, "UI_Name_33"], [34, "UI_Name_34"], [35, "UI_Name_35"], [36, "UI_Name_36"], [37, "UI_Name_37"], [38, "UI_Name_38"], [39, "UI_Name_39"], [40, "UI_Name_40"], [41, "UI_Name_41"], [42, "UI_Name_42"], [43, "UI_Name_43"], [44, "UI_Name_44"], [45, "UI_Name_45"], [46, "UI_Name_46"], [47, "UI_Name_47"], [48, "UI_Name_48"], [49, "UI_Name_49"], [50, "UI_Name_50"]];
class RandomRankConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$2);
    }
}

var foreign9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    RandomRankConfig: RandomRankConfig
});

const EXCELDATA$1 = [["id", "Name", "gender", "Desc", "PropID", "TimeAdd", "Skins", "Icon", "Verticaldraw", "Cost", "CurrencyType"], ["", "", "", "", "", "", "", "", "", "", ""], [1, "UI_RoleName_5", 2, "UI_RoleDesc_5", 2, 1, ["A1C356DC47F09010EFC4EAB17F612461", "4555CD8342D44C7FC4031DA2FA3FD646", "4A9794494E7E422523D4F4B9F8A133D3", "6BD3CC1D451209DA38E920B0C61716AC", "5EA79CF24905FB5475271EA880C178FB", "5E7363914C684EE6E9064F92B903DE4A"], "129421", "129427", 10, 1, "雏田"], [2, "UI_RoleName_1", 2, "UI_RoleDesc_2", 3, 1, ["9FCF3ADD4AD0BEC2495A70B11D2B7A05", "D4046B854F30B8B3E558298171CF4688", "061183EB4540BA1DCC2B06AE8B2B45A5", "BA5A16DA4BF321EEACEC3DA5EC2DEDED", "F06FF96B46926C167857F1BE4BDA34DB", "D8D64F9C4667DDBF627C9BBCAA70491A"], "129423", "129095", 0, 1, "小樱"], [3, "UI_RoleName_3", 1, "UI_RoleDesc_3", 5, 2, ["D9317E0741EE763ED65217B8FC898A12", "3B05E68D4B0B0B8C18462AA1DC7FFE90", "E23DAC5043D717D17FF477BC42279AA0", "AABF8A494187E9667CD94D9212BDFFB2", "9E5FD30642C2DBAA5CFDA58E81F5DFE5", "4D0676D64A25FBBA3BEE4B9F4FE2D153"], "129430", "129425", 50, 1, "佐助"], [4, "UI_RoleName_2", 1, "UI_RoleDesc_9", 2, 2, ["F9CB6D5E4B1A959853309792286890B8", "B060A21348B25A17DBA916A03288A0E1", "0CCDECFF49DAEDE71D6273AB94763820", "484275D449BB5A04D4DDA4B62FF48CFE", "F64B7BC04E6960586028A3B3F1C0B890", "E907D4B343463A44B185C0B099FC482C"], "129434", "129437", 50, 1, "鸣人"], [5, "UI_RoleName_10", 2, "UI_RoleDesc_6", 3, 2, ["88DAEC624DFA827FCDDD379D5AC88D26"], "132459", "132457", 3, 2, "纲手"], [6, "UI_RoleName_11", 2, "UI_RoleDesc_4", 2, 3, ["8A05EDF34F7551A3222217940BD3A54A"], "132456", "132458", 150, 1, "天天"], [7, "UI_RoleName_9", 1, "UI_RoleDesc_10", 5, 4, ["ACD21BD543B39673EC0056AFD8A4609F", "EC7F40ED451A9CEB9AC4D3828629F1E8", "431415094E55A88DCFC6ACAC0C7E971F", "C0E9D8194D4AB568D4EED2846E205201", "D78FC0644D3380D81846D0BCE8E92C07", "D5F5104443E20E97601F3FAD19856179"], "129431", "129424", 200, 1, "自来也"], [8, "UI_RoleName_6", 1, "UI_RoleDesc_11", 3, 4, ["38B8CFD34C684181DA4A00AEEEC46BF9", "33654EA7448F222432775ABCBEE8E08F", "362156E240B4F67405F2B4B988B7EBF9", "99327F1B490AC6AB160A6987D8101779", "B8A725974E0503A835EB4986EE9553F6", "47DEA8984D73E16D374B9EB80DC2FFE7"], "129435", "129433", 400, 1, "带土"], [9, "UI_RoleName_12", 2, "UI_RoleDesc_12", 2, 5, ["D5C9D5144703288505CAF0B198497E25"], "132454", "132455", 600, 1, "祢豆子"], [10, "UI_RoleName_7", 2, "UI_RoleDesc_7", 3, 5, ["BC0E54314124994392B68EA1C9D34759", "1528A36F4733C398702FC38FA6A0B833", "1D7B35B04012C2E5B552F690E13961B2", "F589708A4F0AC077F688FC8B544C76F7", "C5FF04BA423A6C0DDBB02591BAFE4AE6", "2D9C30964647A1791CB0988BB9A5D3E7"], "129428", "129439", 800, 1, "小南"], [11, "UI_RoleName_4", 1, "UI_RoleDesc_13", 5, 6, ["E164D5724ED16EDC9B704AABD718CEB1", "4ED6E26E43DA444F4ED82AB180BA7B49", "9623C67A4B9B0690FCC69EB266644A4D", "723249D34DB82C4F3175C8AEBE25825C", "B734F4334B58FBA5797D59A6A489F34C", "DAB7499A4048C00C334048AA9441D704"], "129432", "129436", 10, 2, "卡卡西"], [12, "UI_RoleName_8", 1, "UI_RoleDesc_8", 2, 6, ["6E7CA6F34CF57C5F1EF1C9B829AD62BD", "1FFF0A984EDFDC5D947B968E70D9BA9B", "102D0B6841F51C062305578335222843", "F1AE60444D0E298F45DDB4A9BC7210FC", "581DB2F94BE474DD803FDBAEE6C59DAE", "7D5C7A5F4579E03914A2F2AE83514BE0"], "129429", "129426", 1000, 1, "宇智波斑"]];
class RoleConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$1);
    }
}

var foreign10 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    RoleConfig: RoleConfig
});

const EXCELDATA = [["id", "guid", "name", "loop", "SoundPropportion", "des"], ["", "tag", "tag", "tag", "tag", "tag"], [1, ["14031"], "主界面游戏BGM", 0, 1, "进入在主界面时播放"], [2, ["117514"], "跑酷时BGM", 0, 0.65, "玩家开始跑酷时播放"], [3, ["21210", "27202"], "向上跳", 1, 1, "玩家向上跳时播放"], [4, ["21210", "27202"], "左右跳", 1, 1, "玩家左右移动播放"], [5, ["27202"], "下滑", 1, 1, "玩家下滑时播放"], [6, ["39340"], "吃金币", 1, 0.55, "玩家吃到金币播放"], [7, ["120847"], "按钮", 1, 1, "玩家点击按钮时播放", "主界面和结算界面的角色按钮、商店按钮；角色界面和商店界面的返回按钮；角色界面头像选人；选中装备角色；"], [8, ["114009"], "受伤", 1, 1, "玩家受伤时播放"], [9, ["114008", "117512"], "死亡", 1, 1, "玩家死亡时播放"], [10, ["118099"], "显示结算UI", 1, 1, "玩家显示结算得分UI时播放"], [11, ["119008"], "超过最高分数", 1, 1, "玩家结算时超过最高分数时，代替显示结算UI音效播放"], [12, ["117518"], "吃到道具", 1, 1, "吃到道具播放"], [13, ["47419"], "升级", 1, 1, "升级道具时播放"], [14, ["117517"], "购买道具", 1, 1, "购买道具时播放"], [15, ["117517"], "购买人物", 1, 1, "购买人物时播放"], [16, ["97385"], "触发护盾爆炸", 1, 1, "触发护盾爆炸时播放"], [17, ["97385"], "复活爆炸", 1, 1, "复活爆炸时播放"], [18, ["52570"], "吃到钻石播放", 1, 0.7, "吃到钻石时播放"]];
class VoiceConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA);
    }
}

var foreign11 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    VoiceConfig: VoiceConfig
});

class GameConfig {
    /**
    * 多语言设置
    * @param languageIndex 语言索引(-1为系统默认语言)
    * @param getLanguageFun 根据key获取语言内容的方法
    */
    static initLanguage(languageIndex, getLanguageFun) {
        ConfigBase.initLanguage(languageIndex, getLanguageFun);
        this.configMap.clear();
    }
    static getConfig(ConfigClass) {
        if (!this.configMap.has(ConfigClass.name)) {
            this.configMap.set(ConfigClass.name, new ConfigClass());
        }
        return this.configMap.get(ConfigClass.name);
    }
    static get Assets() { return this.getConfig(AssetsConfig); }
    ;
    static get Global() { return this.getConfig(GlobalConfig); }
    ;
    static get Guide() { return this.getConfig(GuideConfig); }
    ;
    static get Item() { return this.getConfig(ItemConfig); }
    ;
    static get Language() { return this.getConfig(LanguageConfig); }
    ;
    static get Level() { return this.getConfig(LevelConfig); }
    ;
    static get RandomRank() { return this.getConfig(RandomRankConfig); }
    ;
    static get Role() { return this.getConfig(RoleConfig); }
    ;
    static get Voice() { return this.getConfig(VoiceConfig); }
    ;
}
GameConfig.configMap = new Map();

var foreign3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GameConfig: GameConfig
});

/**
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2022-12-09 11:02
 * @LastEditTime : 2023-02-28 13:11
 * @description  :
 */
var Const;
(function (Const) {
    /**
     * 角色基础高度
     */
    Const.BASE_HEIGHT = 72;
    /**
     * 60帧的间隔
     */
    Const.DELAT_TIME = 0.0167;
    /**
     * 路宽
     */
    Const.ROAD_WIDTH = 230;
    /**
     * 台阶高度（角色可上
     */
    Const.STEP_HEIGHT = 60;
    /**
     * 上方路线的高度
     */
    Const.OVER_HEIGHT = 350;
    /**
     * 跳板高度
     */
    Const.BOAED_HEIGHT = 110;
    /**
     * 角色飞行高度
     */
    Const.FLY_HEIGHT = 800;
    /**
     * 移动z最大旋转
     */
    Const.MOVE_ROTMAX = 25;
    /**
     * 移动z旋转
     */
    Const.MOVE_ROTZ = 25;
    /**
     * 眩晕特效时间
     */
    Const.VERTIGO_TIME = 8;
    /**
     * 基准点
     */
    Const.BASE_POS = 1000;
    /****全局事件 */
    //道具使用
    Const.ITEM_USE = 'ITEM_USE';
    Const.ITEM_ADD = 'ITEM_ADD';
    Const.COMPLETE_GUIDE_SCENE = 'Complete_GUIDE';
})(Const || (Const = {}));

var foreign12 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get Const () { return Const; }
});

/**
 * @Author       : xianjie.xia
 * @LastEditors  : pengwei.shi
 * @Date         : 2022-11-25 13:34
 * @LastEditTime : 2022-12-12 16:35:44
 * @description  :
 */
/**
 * 操作玩家移动类型
 */
var MoveType;
(function (MoveType) {
    MoveType[MoveType["None"] = 0] = "None";
    MoveType[MoveType["Jump"] = 1] = "Jump";
    MoveType[MoveType["Left"] = 2] = "Left";
    MoveType[MoveType["Right"] = 3] = "Right";
    MoveType[MoveType["Down"] = 4] = "Down";
})(MoveType || (MoveType = {}));
var GameState;
(function (GameState) {
    GameState[GameState["None"] = 0] = "None";
    GameState[GameState["Init"] = 1] = "Init";
    GameState[GameState["Ready"] = 2] = "Ready";
    GameState[GameState["Game"] = 3] = "Game";
    GameState[GameState["End"] = 4] = "End";
    GameState[GameState["Puase"] = 5] = "Puase";
    GameState[GameState["Over"] = 6] = "Over";
})(GameState || (GameState = {}));
/**资源类型 */
var ResourceType;
(function (ResourceType) {
    /**不能随机 */
    ResourceType[ResourceType["CantRandom"] = 0] = "CantRandom";
    /**可以随机、可以通过 */
    ResourceType[ResourceType["CanRandomAndCanPass"] = 1] = "CanRandomAndCanPass";
    /**可以随机、不能通过 */
    ResourceType[ResourceType["CanRandomAndCantPass"] = 2] = "CanRandomAndCantPass";
    /**不能随机、可以通过 */
    ResourceType[ResourceType["CantRandomAndCanPass"] = 3] = "CantRandomAndCanPass";
    /**可随机、不可以通过、小范围随机位置 */
    ResourceType[ResourceType["CanRamdomAndCantPassPos"] = 4] = "CanRamdomAndCantPassPos";
    /**天空金币奖励 */
    ResourceType[ResourceType["SkyCoins"] = 6] = "SkyCoins";
})(ResourceType || (ResourceType = {}));
var BlockType;
(function (BlockType) {
    BlockType[BlockType["None"] = 0] = "None";
    BlockType[BlockType["Pass"] = 1] = "Pass";
    BlockType[BlockType["Stop"] = 2] = "Stop";
    BlockType[BlockType["Board"] = 3] = "Board";
    BlockType[BlockType["Block"] = 4] = "Block";
    BlockType[BlockType["StepBlock"] = 5] = "StepBlock";
    BlockType[BlockType["Border"] = 6] = "Border";
    BlockType[BlockType["Step"] = 7] = "Step";
    BlockType[BlockType["Coin"] = 8] = "Coin";
    BlockType[BlockType["Gem"] = 9] = "Gem";
    BlockType[BlockType["Item"] = 10] = "Item";
})(BlockType || (BlockType = {}));
/**UI引导 */
var Guide;
(function (Guide) {
    Guide[Guide["UP"] = 0] = "UP";
    Guide[Guide["Down"] = 1] = "Down";
    Guide[Guide["Left"] = 2] = "Left";
    Guide[Guide["Right"] = 3] = "Right";
    Guide[Guide["Hand"] = 4] = "Hand";
})(Guide || (Guide = {}));
/**埋点事件 */
var MGSEvent;
(function (MGSEvent) {
    /**障碍触发器guid */
    MGSEvent["DIE_ITEMGUID"] = "DIE_ITEMGUID";
    /**重置金币事件计数 */
    MGSEvent["GOLD_NUM_RESET"] = "GOLD_NUM_RESET";
})(MGSEvent || (MGSEvent = {}));
/**音效 */
var SPSound;
(function (SPSound) {
    SPSound[SPSound["Lobby"] = 1] = "Lobby";
    SPSound[SPSound["Game"] = 2] = "Game";
    SPSound[SPSound["Jump"] = 3] = "Jump";
    SPSound[SPSound["Move"] = 4] = "Move";
    /**滑铲 */
    SPSound[SPSound["Down"] = 5] = "Down";
    SPSound[SPSound["Coin"] = 6] = "Coin";
    SPSound[SPSound["PressButton"] = 7] = "PressButton";
    /**眩晕 */
    SPSound[SPSound["vertigo"] = 8] = "vertigo";
    SPSound[SPSound["Death"] = 9] = "Death";
    /**游戏结束、开始结算 */
    SPSound[SPSound["GameOver"] = 10] = "GameOver";
    /**超越最高分 */
    SPSound[SPSound["OverMaxScore"] = 11] = "OverMaxScore";
    SPSound[SPSound["GetItem"] = 12] = "GetItem";
    SPSound[SPSound["UpGrade"] = 13] = "UpGrade";
    SPSound[SPSound["BuyItem"] = 14] = "BuyItem";
    SPSound[SPSound["BuyRole"] = 15] = "BuyRole";
    /**护盾爆炸 */
    SPSound[SPSound["ShieldBomb"] = 16] = "ShieldBomb";
    /**复活爆炸 */
    SPSound[SPSound["ReliveBomb"] = 17] = "ReliveBomb";
    /**获得钻石 */
    SPSound[SPSound["GetGem"] = 18] = "GetGem";
})(SPSound || (SPSound = {}));
/**
 * 动画资源
 */
var AnimRes;
(function (AnimRes) {
    AnimRes["Idel"] = "46302";
    AnimRes["Idel2"] = "33579";
    AnimRes["Run"] = "78633";
    AnimRes["Run2"] = "84859";
    AnimRes["Jump"] = "21614";
    AnimRes["Trun"] = "52967";
    AnimRes["Down"] = "35443";
    //Drop = '14599',
    AnimRes["Die"] = "84923";
    AnimRes["Fly"] = "121604";
    AnimRes["Jump2"] = "14710";
})(AnimRes || (AnimRes = {}));
/**
 * 特效资源
 */
var EffectRes;
(function (EffectRes) {
    EffectRes["Vertigo"] = "88830";
    EffectRes["Coin"] = "88789";
    EffectRes["Relive"] = "89080";
})(EffectRes || (EffectRes = {}));
/**地铁跑酷ui点击事件 */
var SPUIEvent;
(function (SPUIEvent) {
    /**选中头像 */
    SPUIEvent["SelectIcon"] = "SelectIcon";
    /**点选道具 */
    SPUIEvent["PropPress"] = "PropPress";
    /**技能升级 */
    SPUIEvent["SkillLvUp"] = "SkillLvUp";
    /**选中、装备 */
    SPUIEvent["SelectRole"] = "SelectRole";
})(SPUIEvent || (SPUIEvent = {}));
var PriceType;
(function (PriceType) {
    PriceType[PriceType["Coin"] = 1] = "Coin";
    PriceType[PriceType["Diamonds"] = 2] = "Diamonds";
})(PriceType || (PriceType = {}));
//引导类型
var GuideTarget;
(function (GuideTarget) {
    GuideTarget[GuideTarget["Scene"] = 0] = "Scene";
    GuideTarget[GuideTarget["Shop"] = 1] = "Shop";
    GuideTarget[GuideTarget["Role"] = 2] = "Role";
})(GuideTarget || (GuideTarget = {}));

var foreign13 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get AnimRes () { return AnimRes; },
    get BlockType () { return BlockType; },
    get EffectRes () { return EffectRes; },
    get GameState () { return GameState; },
    get Guide () { return Guide; },
    get GuideTarget () { return GuideTarget; },
    get MGSEvent () { return MGSEvent; },
    get MoveType () { return MoveType; },
    get PriceType () { return PriceType; },
    get ResourceType () { return ResourceType; },
    get SPSound () { return SPSound; },
    get SPUIEvent () { return SPUIEvent; }
});

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/LobbyUI.ui
 * TIME: 2023.05.15-17.19.24
 */
let LobbyUI_generate = class LobbyUI_generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mImg_Head_Icon = undefined;
        this.mTxt_Name = undefined;
        this.mBtn_CloseRank = undefined;
        this.mCanvas_List = undefined;
        this.mScrollBox = undefined;
        this.mTxt_SelfScore = undefined;
        this.mTxt_SelfRanking = undefined;
        this.mCanvas_Rank = undefined;
        this.mBtn_Start = undefined;
        this.mCanvasStart = undefined;
        this.mTxt_PointNum = undefined;
        this.mTxt_MoneyNum = undefined;
        this.mBtn_OpenRank = undefined;
        this.mSoundNotActive = undefined;
        this.mSoundActive = undefined;
        this.mBtn_Sound = undefined;
        this.mBtn_OpenRoleClothes = undefined;
        this.mCanvasRole = undefined;
        this.mBtn_Shop = undefined;
        this.mCanvasShop = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        //按钮添加点击
        // 
        // this.mBtn_CloseRank.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_CloseRank");
        // })
        // this.mBtn_CloseRank.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        // this.mBtn_Start.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Start");
        // })
        // this.mBtn_Start.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        // this.mBtn_OpenRank.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_OpenRank");
        // })
        // this.mBtn_OpenRank.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        // this.mBtn_Sound.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Sound");
        // })
        // this.mBtn_Sound.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        // this.mBtn_OpenRoleClothes.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_OpenRoleClothes");
        // })
        // this.mBtn_OpenRoleClothes.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        // this.mBtn_Shop.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Shop");
        // })
        // this.mBtn_Shop.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        //按钮多语言
        //文本多语言
        this.initLanguage(this.mTxt_Name);
        this.initLanguage(this.mTxt_SelfScore);
        this.initLanguage(this.mTxt_SelfRanking);
        this.initLanguage(this.mTxt_PointNum);
        this.initLanguage(this.mTxt_MoneyNum);
        //文本多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/mCanvas_Rank/RankTitleCanvas/Txt_Title"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/mCanvas_Rank/Txt_Rank"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/mCanvas_Rank/Txt_Name"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/mCanvas_Rank/Txt_Num"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/mCanvas_Rank/Canvas_Rank_Self/Txt_SelfName"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/mCanvasStart/MWTextBlock_1"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/MWCanvas_1/Txt_Title"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/mCanvasRole/MWTextBlock_1"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/mCanvasShop/MWTextBlock_1"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('Canvas_Root/Canvas_Head/mImg_Head_Icon')
], LobbyUI_generate.prototype, "mImg_Head_Icon", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/Canvas_Name/mTxt_Name')
], LobbyUI_generate.prototype, "mTxt_Name", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/mCanvas_Rank/RankTitleCanvas/mBtn_CloseRank')
], LobbyUI_generate.prototype, "mBtn_CloseRank", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/mCanvas_Rank/mScrollBox/mCanvas_List')
], LobbyUI_generate.prototype, "mCanvas_List", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/mCanvas_Rank/mScrollBox')
], LobbyUI_generate.prototype, "mScrollBox", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/mCanvas_Rank/Canvas_Rank_Self/mTxt_SelfScore')
], LobbyUI_generate.prototype, "mTxt_SelfScore", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/mCanvas_Rank/Canvas_Rank_Self/mTxt_SelfRanking')
], LobbyUI_generate.prototype, "mTxt_SelfRanking", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/mCanvas_Rank')
], LobbyUI_generate.prototype, "mCanvas_Rank", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/mCanvasStart/mBtn_Start')
], LobbyUI_generate.prototype, "mBtn_Start", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/mCanvasStart')
], LobbyUI_generate.prototype, "mCanvasStart", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/Canvas_Points/mTxt_PointNum')
], LobbyUI_generate.prototype, "mTxt_PointNum", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/Canvas_Money/mTxt_MoneyNum')
], LobbyUI_generate.prototype, "mTxt_MoneyNum", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/MWCanvas_1/mBtn_OpenRank')
], LobbyUI_generate.prototype, "mBtn_OpenRank", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/MWCanvas_2/mSoundNotActive')
], LobbyUI_generate.prototype, "mSoundNotActive", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/MWCanvas_2/mSoundActive')
], LobbyUI_generate.prototype, "mSoundActive", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/MWCanvas_2/mBtn_Sound')
], LobbyUI_generate.prototype, "mBtn_Sound", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/mCanvasRole/mBtn_OpenRoleClothes')
], LobbyUI_generate.prototype, "mBtn_OpenRoleClothes", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/mCanvasRole')
], LobbyUI_generate.prototype, "mCanvasRole", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/mCanvasShop/mBtn_Shop')
], LobbyUI_generate.prototype, "mBtn_Shop", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/mCanvasShop')
], LobbyUI_generate.prototype, "mCanvasShop", void 0);
LobbyUI_generate = __decorate([
    UIBind('UI/LobbyUI.ui')
], LobbyUI_generate);
var LobbyUI_generate$1 = LobbyUI_generate;

var foreign65 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: LobbyUI_generate$1
});

/*
 * @Author: pengwei.shi
 * @Date: 2022-11-13 15:20:38
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-27 11:48:45
 * @FilePath: \streetparkour\JavaScripts\untils\MGSCenter.ts
 * @Description:
 */
class MGSCenterBase {
    static msgUpload(key, des, data) {
        //console.log("统计", key, des, JSON.stringify(data));
        mw.RoomService.reportLogInfo(key, des, JSON.stringify(data));
    }
}
/**
 * SP埋点
 */
var MGSCenter;
(function (MGSCenter) {
    let guidsMap = new Map;
    function addGuid(guid, group) {
        guidsMap.set(guid, group);
    }
    MGSCenter.addGuid = addGuid;
    /**
     * 看进入游戏次数和人数
     */
    function ts_game_start() {
        MGSCenterBase.msgUpload(`ts_game_start`, `记录游戏中开局事件,进入游戏记录`, { game_mode: 50 });
    }
    MGSCenter.ts_game_start = ts_game_start;
    /**
     * 核心循环开始
     */
    function ts_coregameplay_start() {
        MGSCenterBase.msgUpload(`ts_coregameplay_start`, `玩家开局`, { gameid: mw.RouteService.getMGSGameId() });
    }
    MGSCenter.ts_coregameplay_start = ts_coregameplay_start;
    /**
     * 核心循环结束
     */
    function ts_coregameplay_end() {
        MGSCenterBase.msgUpload(`ts_coregameplay_end`, `玩家吃到50金币`, { gameid: mw.RouteService.getMGSGameId() });
    }
    MGSCenter.ts_coregameplay_end = ts_coregameplay_end;
    /**
     * 新手引导开始
     */
    function ts_tutorial_start() {
        MGSCenterBase.msgUpload(`ts_tutorial_start`, `玩家首次开跑`, { gameid: mw.RouteService.getMGSGameId() });
    }
    MGSCenter.ts_tutorial_start = ts_tutorial_start;
    /**
     * 新手引导步骤
     * @param step
     */
    function ts_tutorial_step(step) {
        let steps = 'step';
        steps = steps + step.toFixed(0);
        MGSCenterBase.msgUpload(`ts_tutorial_step`, `新手引导步骤`, { tutorial_step: steps });
    }
    MGSCenter.ts_tutorial_step = ts_tutorial_step;
    /**
     * 新手引导结束
     */
    function ts_tutorial_end() {
        MGSCenterBase.msgUpload(`ts_tutorial_end`, `新手引导结束`, { gameid: mw.RouteService.getMGSGameId() });
    }
    MGSCenter.ts_tutorial_end = ts_tutorial_end;
    /**
     * 死亡埋点
     * @param guid 障碍物guid
     * @param randomLevel 随机关卡个数
     */
    function ts_action_dead(guid, randomLevel) {
        let group = guidsMap.get(guid);
        MGSCenterBase.msgUpload(`ts_action_dead`, `玩家死亡`, { death_type: group, stage_level: randomLevel });
    }
    MGSCenter.ts_action_dead = ts_action_dead;
    /**
     * 看一局进行的时间
     * 和当前所游玩过的轮数
     * @param roundTime
     * @param roundNum
     */
    function ts_game_result(roundTime, roundNum) {
        MGSCenterBase.msgUpload(`ts_game_result`, `看一局多长时间,看一个玩家完成了多少局`, { round_length: roundTime, round: roundNum });
    }
    MGSCenter.ts_game_result = ts_game_result;
    /**
     * 游戏结算
     * @param score 分数
     * @param money 金币数
     * @param roundWake 本次游戏内超越最高分的次数
     */
    function ts_game_over_one(score, money) {
        MGSCenterBase.msgUpload(`ts_game_over`, `游戏内一局结算`, { player_level: score, round_money: money });
    }
    MGSCenter.ts_game_over_one = ts_game_over_one;
    /**
     * 游戏结算
     * @param roundWake 本次游戏内超越最高分的次数
     */
    function ts_game_over_two(roundWake) {
        MGSCenterBase.msgUpload(`ts_game_over`, `游戏内一局结算`, { round_wave: roundWake });
    }
    MGSCenter.ts_game_over_two = ts_game_over_two;
    /**
     * 游戏结算
     * @param gemNum 钻石数量
     * @param sheildNum 吃到的护盾数量
     * @param flyNum 吃到的飞行道具数量
     * @param doubleCoin 吃到的双倍金币数量
     * @param activeUseSheild 主动使用护盾次数
     * @param activeUseRebirth 主动复活次数
     */
    function ts_game_over_three(gemNum, sheildNum, flyNum, doubleCoin, activeUseSheild, activeUseRebirth) {
        MGSCenterBase.msgUpload(`ts_game_over`, `游戏内一局结算`, { point_hold: gemNum, ghost_killall: sheildNum, ghost_timeout: flyNum, ghost_fail: doubleCoin, student_leave: activeUseSheild, student_dead: activeUseRebirth });
    }
    MGSCenter.ts_game_over_three = ts_game_over_three;
    /**
     * 主界面Start按钮
     */
    function lobbyGoButton() {
        MGSCenterBase.msgUpload(`ts_action_click`, `点击主界面GO`, { button: 'skill' });
    }
    MGSCenter.lobbyGoButton = lobbyGoButton;
    /**
     * 点击主界面关闭音乐
     */
    function lobbyCloseSound() {
        MGSCenterBase.msgUpload(`ts_action_click`, `点击主界面关闭音乐`, { button: 'gem_1' });
    }
    MGSCenter.lobbyCloseSound = lobbyCloseSound;
    /**
     * 点击跑酷界面暂停
     */
    function gamePause() {
        MGSCenterBase.msgUpload(`ts_action_click`, `跑酷暂停`, { button: 'gem_2' });
    }
    MGSCenter.gamePause = gamePause;
    /**
     * 点击结算界面GO
     */
    function gameContine() {
        MGSCenterBase.msgUpload(`ts_action_click`, `结算界面`, { button: 'gem_3' });
    }
    MGSCenter.gameContine = gameContine;
    /**
     * 点击结算界面返回大庁
     */
    function backLobby() {
        MGSCenterBase.msgUpload(`ts_action_click`, `结算回家`, { button: 'gem_4' });
    }
    MGSCenter.backLobby = backLobby;
    /**
     * 点击排行榜
     */
    function mgsRank() {
        MGSCenterBase.msgUpload(`ts_action_click`, `点击主界面排行榜`, { button: 'gem_5' });
    }
    MGSCenter.mgsRank = mgsRank;
    /**
     * 点击主界面角色
     */
    function mgsLobbyRole() {
        MGSCenterBase.msgUpload(`ts_action_click`, `点击主界面角色`, { button: 'gem6' });
    }
    MGSCenter.mgsLobbyRole = mgsLobbyRole;
    /**
     * 点击主界面角色
     */
    function mgsLobbyShop() {
        MGSCenterBase.msgUpload(`ts_action_click`, `点击主界面商店`, { button: 'gem7' });
    }
    MGSCenter.mgsLobbyShop = mgsLobbyShop;
    /**
     * 点击结算界面角色
     */
    function mgsGameOverRole() {
        MGSCenterBase.msgUpload(`ts_action_click`, `点击结算界面角色`, { button: 'gem8' });
    }
    MGSCenter.mgsGameOverRole = mgsGameOverRole;
    /**
     * 点击结算界面商店
     */
    function mgsGameOverShop() {
        MGSCenterBase.msgUpload(`ts_action_click`, `点击结算界面商店`, { button: 'gem9' });
    }
    MGSCenter.mgsGameOverShop = mgsGameOverShop;
    /**
     * 首次购买角色
     */
    function mgsIsFirstRoleActionBuy() {
        MGSCenterBase.msgUpload(`ts_action_buy_plane`, `玩家购买角色触发`, { isfirstbuy: 50 });
    }
    MGSCenter.mgsIsFirstRoleActionBuy = mgsIsFirstRoleActionBuy;
    /**
     * 玩家购买角色情况
     * @param roleID
     */
    function mgsRoleActionBuy(roleID) {
        MGSCenterBase.msgUpload(`ts_action_unlock`, `玩家购买角色触发`, { area_id: roleID });
    }
    MGSCenter.mgsRoleActionBuy = mgsRoleActionBuy;
    /**
     * 首次购买道具
     */
    function mgsIsFirstItemActionBuy() {
        MGSCenterBase.msgUpload(`ts_action_buy_skill`, `玩家购买道具触发`, { isfirstbuy: 50 });
    }
    MGSCenter.mgsIsFirstItemActionBuy = mgsIsFirstItemActionBuy;
    /**
     * 购买道具
     * @itemID
     */
    function mgsItemActionBuy(itemID) {
        MGSCenterBase.msgUpload(`ts_action_unlock`, `玩家购买道具触发`, { item_id: itemID });
    }
    MGSCenter.mgsItemActionBuy = mgsItemActionBuy;
    /**
     * 玩家道具升级情况
     * @param itemID
     * @param isFirst 是否首次升级
     */
    function mgsItemActionUP(itemID, isFirst = false) {
        if (isFirst) {
            MGSCenterBase.msgUpload(`ts_action_buy_storage`, `玩家升级道具触发`, { storage_id: itemID, isfirstbuy: 50 });
        }
        else {
            MGSCenterBase.msgUpload(`ts_action_buy_storage`, `玩家升级道具触发`, { storage_id: itemID });
        }
    }
    MGSCenter.mgsItemActionUP = mgsItemActionUP;
    /**
     * 道具使用情况
     * @param itemID
     */
    function mgsActionUseItem(itemID) {
        MGSCenterBase.msgUpload(`ts_action_use_item`, `使用道具`, { item_id: itemID });
    }
    MGSCenter.mgsActionUseItem = mgsActionUseItem;
    /**
     * 玩家打开界面埋点
     * 1 从角色界面跳转到道具界面
     * 2 从道具界面跳转到角色界面
     * @param id
     */
    function ts_task(id) {
        MGSCenterBase.msgUpload(`ts_task`, `玩家打开页面触发`, { task_id: id });
    }
    MGSCenter.ts_task = ts_task;
    /**
     * 主动使用飞行和双倍道具
     * @param fly
     * @param doubleCoin
     */
    function ts_action_pick(fly, doubleCoin) {
        MGSCenterBase.msgUpload(`ts_action_pick`, `主动使用飞行或者双倍时`, { loot: fly, object: doubleCoin });
    }
    MGSCenter.ts_action_pick = ts_action_pick;
    /**
     * 吃到道具和生成道具的比值
     * @param ratio
     */
    function ts_game_over(ratio) {
        MGSCenterBase.msgUpload(`ts_game_over`, `玩家吃到道具和出现道具的比值`, { all_talent: ratio.toFixed(1) });
    }
    MGSCenter.ts_game_over = ts_game_over;
    /**
     * 引导玩家道具系统时一步步触发
     * @param id
     */
    function ts_action_firstdo(id) {
        MGSCenterBase.msgUpload(`ts_action_firstdo`, `引导步骤完成度`, { record: id });
    }
    MGSCenter.ts_action_firstdo = ts_action_firstdo;
})(MGSCenter || (MGSCenter = {}));

var foreign82 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get MGSCenter () { return MGSCenter; }
});

/*
 * @Author: xianjie.xia
 * @LastEditors: xianjie.xia
 * @Date: 2022-10-25 10:08
 * @LastEditTime: 2022-11-24 16:32
 * @description: 相机控制
 */
class CameraCtrl {
    constructor() {
        /**
         * 相机的目标点
         */
        this._dest = new mw.Vector(0, 0, 0);
        /**
         * 旋转
         */
        this._rotation = new mw.Rotation(0, 0, 0);
        /**
         * 初始化完成否
         */
        this._bInited = false;
        /**
         * 相机跟随移动距离间隔  %
         */
        this._delta = 0.1;
    }
    /**
     * 初始化
     * @param obj 相机锁定节点
     * @param ctrl 角色控制器
     */
    init(obj, ctrl) {
        this._root = obj;
        //let char = Player.localPlayer.character;
        Camera.currentCamera.parent = (obj);
        this._targetCtrl = ctrl;
        if (!this._targetCtrl)
            console.log('playerctrl is null');
        this._bInited = true;
        this.reset();
    }
    /**
     * 重置
     */
    reset() {
        let pos = this._targetCtrl.destPos;
        this._rotation.z = -90;
        this._dest.y = Const.BASE_POS + 50;
        this._dest.x = pos.x + 20;
        this._dest.z = pos.z - 100;
        this._root.worldTransform.rotation = this._rotation;
        this._root.worldTransform.position = this._dest;
    }
    /**
     * 帧更新
     * @param dt
     * @param rate
     * @returns
     */
    onUpdate(dt, rate) {
        if (!this._bInited)
            return;
        let pos = this._targetCtrl.destPos;
        this._dest.x = pos.x;
        if (DataManager.isReady) {
            let dz = pos.z - this._dest.z;
            if (Math.abs(dz) > 1)
                this._dest.z += dz * this._delta * rate * 1.5;
            else
                this._dest.z = pos.z;
            let dy = pos.y - this._dest.y;
            if (Math.abs(dy) > 1)
                this._dest.y += dy * this._delta * rate;
            else
                this._dest.y = pos.y;
            if (this._rotation.z < 0)
                this._rotation.z += rate * 0.2 + Math.abs(this._rotation.z) * 0.05 * rate;
            else
                this._rotation.z = 0;
            this._root.worldTransform.rotation = this._rotation;
            this._root.worldTransform.position = this._dest;
        }
        else if (DataManager.isGaming || DataManager.isEnd) {
            this._dest.y = pos.y;
            //this._rotation.y = 0;
            this._rotation.z = 0;
            let pz = pos.z;
            if (this._targetCtrl.isFly) {
                //this._dest.x -= 100;
                //this._rotation.y = 10;
                pz -= 50;
            }
            let dz = pz - this._dest.z;
            if (dz < 0 || this._targetCtrl.isOnLand)
                this._dest.z += dz * this._delta * rate;
            else if (this._targetCtrl.isFollow)
                this._dest.z += dz * this._delta * rate;
            this._root.worldTransform.position = this._dest;
            this._root.worldTransform.rotation = this._rotation;
        }
    }
}

var foreign35 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CameraCtrl
});

class PlayerManagerExtesion {
    static init() {
        ModuleService.registerModule(RpcExtesionS, RpcExtesionC, null);
    }
    static isNpc(obj) {
        if ((obj instanceof Character) && obj.player == null) {
            return true;
        }
        return false;
    }
    static isCharacter(obj) {
        if ((obj instanceof Character) && obj.player != null) {
            return true;
        }
        return false;
    }
    static isUseRpc(isSync) {
        if (SystemUtil.isServer()) {
            return false;
        }
        else {
            return isSync;
        }
    }
    static stopStanceExtesion(char, sync) {
        sync = sync === undefined ? true : sync;
        if (!this.isUseRpc(sync)) {
            char.currentSubStance?.stop();
            return;
        }
        let mtStance = new RpcStance("", char);
        let module = ModuleService.getModule(RpcExtesionC);
        module.stopStanceSync(char.gameObjectId, mtStance);
    }
    static changeBaseStanceExtesion(char, assetId) {
        if (!this.isUseRpc(true)) {
            if (assetId == "") {
                char.currentStance?.stop();
                return;
            }
            let basicStance = char.loadStance(assetId);
            basicStance.play();
        }
        else {
            let module = ModuleService.getModule(RpcExtesionC);
            module.playBasicStance(char.gameObjectId, assetId);
        }
    }
    static changeStanceExtesion(char, assetId) {
        let sync = true;
        if (!this.isUseRpc(sync)) {
            if (assetId == "") {
                char.currentSubStance?.stop();
                return;
            }
            char.loadSubStance(assetId).play();
            return;
        }
        let mtStance = new RpcStance(assetId, char);
        let module = ModuleService.getModule(RpcExtesionC);
        module.playStanceSync(char.gameObjectId, mtStance);
    }
    static loadStanceExtesion(char, assetId, sync) {
        sync = sync === undefined ? true : sync;
        if (!this.isUseRpc(sync)) {
            return char.loadSubStance(assetId);
        }
        sync = sync == undefined ? true : sync;
        const stance = new RpcStance(assetId, char);
        return stance;
    }
    static rpcPlayAnimation(owner, assetId, loop = 1, speed = 1) {
        let ani = this.loadAnimationExtesion(owner, assetId);
        ani.loop = loop;
        ani.speed = speed;
        ani.play();
        return ani;
    }
    static rpcStopAnimation(owner, assetId) {
        if (!this.isUseRpc(true)) {
            if (owner.currentAnimation && owner.currentAnimation.assetId == assetId)
                owner.currentAnimation.stop();
            return;
        }
        if (owner.currentAnimation && owner.currentAnimation.assetId == assetId)
            owner.currentAnimation.stop();
        let module = ModuleService.getModule(RpcExtesionC);
        module.stopAnimationSync(owner.gameObjectId, assetId);
    }
    static rpcPlayAnimationLocally(owner, assetId, AnimationLength = 0, loopCount = 1) {
        if (owner === undefined || owner === null)
            return;
        let anim = owner.loadAnimation(assetId);
        anim.loop = loopCount;
        anim.speed = AnimationLength === 0 ? 1 : this.getRate(anim.length / AnimationLength);
        anim.play();
        return anim;
    }
    static getRate(num) {
        return Math.round(num * 100) / 100;
    }
    static loadAnimationExtesion(char, assetid, sync) {
        sync = sync === undefined ? true : sync;
        if (!this.isUseRpc(sync)) {
            return char.loadAnimation(assetid);
        }
        const anim = new RpcAnimation(char, assetid);
        return anim;
    }
}
class RpcExtesionC extends ModuleC {
    constructor() {
        super(...arguments);
        this.syncAnimation = null;
    }
    net_playerJoin(playerId) {
        if (this.localPlayerId == playerId)
            return;
        let char = this.localPlayer.character;
        let curAnimation = char.currentAnimation;
        if (!curAnimation)
            return;
        let ani = this.syncAnimation;
        if (ani && curAnimation.assetId == ani.assetId && ani.isPlaying) {
            this.server.net_playAnimationSync(char.gameObjectId, ani.assetId, ani.speed, ani.loop, ani.slot, playerId);
        }
    }
    playAnimationSync(charGuid, myAnimation) {
        if (charGuid == this.localPlayer.character.gameObjectId) {
            this.syncAnimation = myAnimation;
        }
        this.server.net_playAnimationSync(charGuid, myAnimation.assetId, myAnimation.speed, myAnimation.loop, myAnimation.slot);
    }
    pauseAnimationSync(charGuid, myAnimation) {
        this.server.net_pauseAnimationSync(charGuid, myAnimation.assetId);
    }
    resumeAnimationSync(charGuid, myAnimation) {
        this.server.net_resumeAnimationSync(charGuid, myAnimation.assetId);
    }
    stopAnimationSync(charGuid, myAnimation) {
        if (charGuid == this.localPlayer.character.gameObjectId) {
            this.syncAnimation = null;
        }
        let assetId = typeof myAnimation == "string" ? myAnimation : myAnimation.assetId;
        this.server.net_stopAnimationSync(charGuid, assetId);
    }
    playBasicStance(charGuid, basicStance) {
        this.server.net_playBasicStance(charGuid, basicStance);
    }
    playStanceSync(charGuid, myStance) {
        this.server.net_playStanceSync(charGuid, myStance.assetId, myStance.blendMode);
    }
    stopStanceSync(charGuid, stance) {
        this.server.net_stopStanceSync(charGuid, stance.assetId);
    }
    net_playAnimation(charGuid, assetId, rate, loop, slot) {
        if (charGuid == this.localPlayer.character.gameObjectId)
            return;
        RpcAnimation.playAnimation(charGuid, assetId, rate, loop, slot);
    }
    net_pauseAnimation(charGuid, assetId) {
        if (charGuid == this.localPlayer.character.gameObjectId)
            return;
        RpcAnimation.pauseAnimation(charGuid, assetId);
    }
    net_resumeAnimation(charGuid, assetId) {
        if (charGuid == this.localPlayer.character.gameObjectId)
            return;
        RpcAnimation.resumeAnimation(charGuid, assetId);
    }
    net_stopAnimation(charGuid, assetId) {
        if (charGuid == this.localPlayer.character.gameObjectId)
            return;
        RpcAnimation.stopAnimation(charGuid, assetId);
    }
}
class RpcExtesionS extends ModuleS {
    async net_playBasicStance(charGuid, basicStance) {
        let char = await GameObject.asyncFindGameObjectById(charGuid);
        char.loadStance(basicStance).play();
    }
    net_playAnimationSync(charGuid, assetId, rate, loop, slot, playerId = 0) {
        if (playerId != 0) {
            this.getClient(playerId).net_playAnimation(charGuid, assetId, rate, loop, slot);
            return;
        }
        this.getAllClient().net_playAnimation(charGuid, assetId, rate, loop, slot);
    }
    net_pauseAnimationSync(charGuid, assetId) {
        this.getAllClient().net_pauseAnimation(charGuid, assetId);
    }
    net_resumeAnimationSync(charGuid, assetId) {
        this.getAllClient().net_resumeAnimation(charGuid, assetId);
    }
    net_stopAnimationSync(charGuid, assetId) {
        this.getAllClient().net_stopAnimation(charGuid, assetId);
    }
    playStanceSync(charGuid, mystance) {
        RpcStance.playStance(charGuid, mystance.assetId, mystance.blendMode);
    }
    net_stopStanceSync(charGuid, assetId) {
        RpcStance.stopStance(charGuid, assetId);
    }
    stopStanceSync(charGuid, stance) {
        RpcStance.stopStance(charGuid, stance.assetId);
    }
    net_playStanceSync(charGuid, assetid, blendMode) {
        RpcStance.playStance(charGuid, assetid, blendMode);
    }
    onPlayerEnterGame(player) {
        this.getAllClient().net_playerJoin(player.playerId);
    }
}
class RpcAnimation {
    constructor(char, assetId) {
        this.ani = null;
        this.assetId = null;
        this.owner = null;
        this._loop = 1;
        this._speed = 1;
        this._slot = mw.AnimSlot.Default;
        this.owner = char;
        this.assetId = assetId;
        this.ani = char.loadAnimation(assetId);
    }
    get loop() {
        return this._loop;
    }
    set loop(value) {
        this._loop = value;
        this.ani.loop = value;
    }
    get speed() {
        return this._speed;
    }
    set speed(value) {
        this._speed = value;
        this.ani.speed = value;
    }
    get slot() {
        return this._slot;
    }
    set slot(value) {
        this._slot = value;
        this.ani.slot = value;
    }
    get length() {
        return this.ani.length;
    }
    get isPlaying() {
        return this.ani.isPlaying;
    }
    get onFinish() {
        return this.ani.onFinish;
    }
    play() {
        this.ani?.play();
        let module = ModuleService.getModule(RpcExtesionC);
        module.playAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    pause() {
        this.ani?.pause();
        let module = ModuleService.getModule(RpcExtesionC);
        module.pauseAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    resume() {
        this.ani?.resume();
        let module = ModuleService.getModule(RpcExtesionC);
        module.resumeAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    stop() {
        this.ani?.stop();
        let module = ModuleService.getModule(RpcExtesionC);
        module.stopAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    static playAnimation(guid, assetid, speed, loop, slot) {
        let char = Character.findGameObjectById(guid);
        if (!char)
            return;
        let anim = char.loadAnimation(assetid);
        anim.loop = loop;
        anim.speed = speed;
        anim.slot = slot;
        anim.play();
        return anim;
    }
    static pauseAnimation(guid, assetId) {
        let char = Character.findGameObjectById(guid);
        if (!char)
            return;
        let anim = char.currentAnimation;
        if (!anim)
            return;
        anim.pause();
    }
    static resumeAnimation(guid, assetId) {
        let char = Character.findGameObjectById(guid);
        if (!char)
            return;
        let anim = char.currentAnimation;
        if (!anim)
            return;
        anim.resume();
    }
    static stopAnimation(guid, assetId) {
        let char = Character.findGameObjectById(guid);
        if (!char)
            return;
        let anim = char.currentAnimation;
        if (!anim)
            return;
        anim.stop();
    }
}
class RpcStance {
    constructor(assetId, owner) {
        this.assetId = null;
        this.owner = null;
        this.blendMode = null;
        this.assetId = assetId;
        this.owner = owner;
    }
    play() {
        let module = SystemUtil.isServer() ? ModuleService.getModule(RpcExtesionS) : ModuleService.getModule(RpcExtesionC);
        module.playStanceSync(this.owner.gameObjectId, this);
        return true;
    }
    stop() {
        let module = SystemUtil.isServer() ? ModuleService.getModule(RpcExtesionS) : ModuleService.getModule(RpcExtesionC);
        module.stopStanceSync(this.owner.gameObjectId, this);
        return true;
    }
    static playStance(charGuid, assetId, blendMode) {
        let char = GameObject.findGameObjectById(charGuid);
        if (!char)
            return;
        if (assetId == "") {
            char.currentSubStance?.stop();
            return;
        }
        let stance = char.loadSubStance(assetId);
        if (blendMode != null)
            stance.blendMode = blendMode;
        stance.play();
    }
    static stopStance(charGuid, assetId) {
        let char = GameObject.findGameObjectById(charGuid);
        if (!char)
            return;
        let currentStance = char.currentSubStance;
        if (currentStance && (currentStance.assetId == assetId || assetId == "")) {
            currentStance.stop();
        }
    }
}
PlayerManagerExtesion.init();

var foreign18 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PlayerManagerExtesion: PlayerManagerExtesion
});

class SpawnManager {
    static replicateGuid(guid) {
        let res = guid;
        if (this.replicateDic.has(guid)) {
            res = this.replicateDic.get(guid);
        }
        else if (this.deleteDic.has(guid)) {
            console.error("-------", guid, "------- is deleted!");
        }
        return res;
    }
    static modifyPoolSpawn(guid, type) {
        let assetId = this.replicateGuid(guid);
        if (type == undefined) {
            return GameObjPool.spawn(assetId);
        }
        return GameObjPool.spawn(assetId, type);
    }
    static modifyPoolAsyncSpawn(guid, type) {
        let assetId = this.replicateGuid(guid);
        if (type == undefined) {
            return GameObjPool.asyncSpawn(assetId);
        }
        return GameObjPool.asyncSpawn(assetId, type);
    }
    static wornSpawn(assetId, inReplicates, transform) {
        let info = {
            guid: assetId,
            replicates: inReplicates,
            transform: transform
        };
        return this.spawn(info);
    }
    static wornAsyncSpawn(assetId, inReplicates, transform) {
        let info = {
            guid: assetId,
            replicates: inReplicates,
            transform: transform
        };
        return this.asyncSpawn(info);
    }
    static spawn(info) {
        let assetId = info.gameObjectId ? info.gameObjectId : info.guid;
        let guid = this.replicateGuid(assetId);
        let obj = mw.GameObject.spawn(guid, { replicates: info.replicates, transform: info.transform });
        return obj;
    }
    static asyncSpawn(info) {
        let assetId = info.gameObjectId ? info.gameObjectId : info.guid;
        let guid = this.replicateGuid(assetId);
        let obj = mw.GameObject.asyncSpawn(guid, { replicates: info.replicates, transform: info.transform });
        return obj;
    }
}
SpawnManager.replicateDic = new Map([
    ["104", "Sound"],
    ["109", "SpawnLocation"],
    ["113", "Trigger"],
    ["116", "Interactor"],
    ["117", "BlockingVolume"],
    ["4301", "PointLight"],
    ["4306", "Effect"],
    ["20191", "PhysicsThruster"],
    ["20193", "NavigationVolume"],
    ["21151", "PostProcess"],
    ["108547", "ObjectLauncher"],
    ["119918", "IntegratedMover"],
    ["12683", "SwimmingVolume"],
    ["16037", "UIWidget"],
    ["16038", "WheeledVehicle4W"],
    ["20504", "PhysicsFulcrum"],
    ["20194", "NavModifierVolume"],
    ["20638", "HotWeapon"],
    ["25782", "Anchor"],
    ["67455", "PhysicsImpulse"],
    ["NPC", "Character"],
    ["31969", "Character"],
    ["124744", "Character"],
    ["28449", "Character"],
    ["BlockingArea", "BlockingVolume"],
    ["RelativeEffect", "Effect"],
    ["Thruster", "PhysicsThruster"],
    ["NavMeshVolume", "NavigationVolume"],
    ["PostProcessAdvance", "PostProcess"],
    ["ProjectileLauncher", "ObjectLauncher"],
    ["PhysicsSports", "IntegratedMover"],
]);
SpawnManager.deleteDic = new Map([
    ["110", true],
    ["8444", true],
    ["14090", true],
    ["14971", true],
    ["2695", true],
    ["30829", true],
    ["31479", true],
    ["14197", true],
]);

var foreign19 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SpawnManager: SpawnManager
});

/**
 * 根据GUID返回全局唯一POOL
 */
var SharePool;
(function (SharePool) {
    const pools = new Map();
    function getPool(guid) {
        let pool = pools.get(guid);
        if (!pool) {
            pool = new Pool(guid);
            pools.set(guid, pool);
        }
        return pool;
    }
    SharePool.getPool = getPool;
    function getCreaterPool(name, creater, spawn, despawn) {
        let pool = pools.get(name);
        if (!pool) {
            pool = new CreaterPool(creater, spawn, despawn);
            pools.set(name, pool);
        }
        return pool;
    }
    SharePool.getCreaterPool = getCreaterPool;
    function getClonePool(guid) {
        let pool = pools.get(guid);
        if (!pool) {
            pool = new ClonePool(guid);
            pools.set(guid, pool);
        }
        return pool;
    }
    SharePool.getClonePool = getClonePool;
})(SharePool || (SharePool = {}));
class Pool {
    constructor(guid) {
        this.guid = guid;
        this.cache = [];
    }
    /**
     * 从对象池获取一个物体
     * @returns
     */
    spawn() {
        if (this.cache.length > 0) {
            return this.cache.shift()["show"]();
        }
        const obj = SpawnManager.spawn({ guid: this.guid });
        return new PObject(this, obj);
    }
    /**
     * 归还一个物体到对象池
     * @returns
     */
    despawn(obj) {
        this.cache.push(obj);
    }
}
class CreaterPool {
    constructor(_creater, _spawn, _despawn) {
        this._creater = _creater;
        this._spawn = _spawn;
        this._despawn = _despawn;
        this.cache = [];
    }
    /**
     * 从对象池获取一个物体
     * @returns
     */
    spawn(...param) {
        if (this.cache.length > 0) {
            const pObj = this.cache.shift();
            this._spawn(pObj.obj);
            return pObj["show"]();
        }
        const obj = this._creater(...param);
        return new PObject2(this, obj);
    }
    /**
     * 归还一个物体到对象池
     * @returns
     */
    despawn(obj) {
        this._despawn(obj.obj);
        this.cache.push(obj);
    }
}
class ClonePool {
    constructor(guid) {
        this.guid = guid;
        this.cache = [];
    }
    /**
     * 从对象池获取一个物体
     * @returns
     */
    spawn() {
        if (this.cache.length > 0) {
            return this.cache.shift()["show"]();
        }
        const obj = GameObject.findGameObjectById(this.guid).clone();
        return new PObject(this, obj);
    }
    /**
     * 归还一个物体到对象池
     * @returns
     */
    despawn(obj) {
        this.cache.push(obj);
    }
}
class PObject2 {
    show() {
        this._isCreated = false;
        return this;
    }
    despawn() {
        this.pool.despawn(this);
    }
    isCreated() {
        return this._isCreated;
    }
    constructor(pool, obj) {
        this.pool = pool;
        this.obj = obj;
        this._isCreated = true;
    }
}
class PObject {
    /**
     * 是否是创建的
     */
    isCreated() {
        return this._isCreated;
    }
    /**
     * 回调
     */
    despawn() {
        this.hide();
        this.pool.despawn(this);
    }
    /**
     * 显示
     * @returns
     */
    show() {
        this._isCreated = false;
        this.obj.setVisibility(mw.PropertyStatus.On);
        return this;
    }
    /**
     * 隐藏
     * @returns
     */
    hide() {
        this.obj.setVisibility(mw.PropertyStatus.Off);
        return this;
    }
    constructor(pool, obj) {
        this.pool = pool;
        this.obj = obj;
        this._isCreated = true;
    }
}

var foreign83 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get SharePool () { return SharePool; }
});

/*
 * @Author: xianjie.xia
 * @LastEditors: pengwei.shi
 * @Date: 2022-11-04 15:08
 * @LastEditTime: 2022-11-27 14:29:02
 * @description:
 */
var Utils;
(function (Utils) {
    /**
     * 给节点添加脚本
     * @param guid 脚本资源GUID
     * @param root 挂到的节点
     * @returns
     */
    async function addScript(guid, root) {
        const sc = await mw.Script.spawnScript(guid, false);
        sc.gameObject = root;
        return sc;
    }
    Utils.addScript = addScript;
    /**
     * 角度sin值
     * @param angel 角度
     * @returns
     */
    function sin(angel) {
        return Math.sign(angel / 57.296);
    }
    Utils.sin = sin;
    /**
     * 最多保留len位小数，负数略小
     * @param pos
     * @param len
     */
    function formatPos(pos, len = 2) {
        let v = Math.pow(10, len);
        pos.x = Math.floor(pos.x * v) / v;
        pos.y = Math.floor(pos.y * v) / v;
        if (pos.z)
            pos.z = Math.floor(pos.z * v) / v;
        return pos;
    }
    Utils.formatPos = formatPos;
    /**
     * 旋转值-180~180
     * @param rot
     */
    function formatRot(rot) {
        rot.x = formatV(rot.x);
        rot.y = formatV(rot.y);
        rot.z = formatV(rot.z);
        return rot;
    }
    Utils.formatRot = formatRot;
    function formatV(v) {
        v = v % 360;
        if (v > 180)
            v -= 360;
        else if (v < -180)
            v += 360;
        return v;
    }
    /**
     * 将坐标归整
     * @param pos
     */
    function setPosInt(pos) {
        pos.x = pos.x > 0 ? Math.ceil(pos.x) : Math.floor(pos.x);
        pos.y = pos.y > 0 ? Math.ceil(pos.y) : Math.floor(pos.y);
        pos.z = pos.z > 0 ? Math.ceil(pos.z) : Math.floor(pos.z);
        return pos;
    }
    Utils.setPosInt = setPosInt;
    /**
     *
     * @param min 最小值
     * @param max 最大值
     */
    function random(min, max) {
        var rang = max - min;
        var rand = Math.random() * rang;
        return Math.floor(rand) + min;
    }
    Utils.random = random;
    /**
     * 从数组中随机几个返回
     * @param list 数组
     * @param num 数量
     */
    function randomList(list, num) {
        if (list.length <= num)
            return list;
        let arry = [];
        list.forEach(item => {
            arry.push(item);
        });
        let nums = [];
        for (let i = 0; i < num; i++) {
            let rand = random(0, arry.length);
            let v = arry[rand];
            nums.push(v);
            arry.splice(rand, 1);
        }
        return nums;
    }
    Utils.randomList = randomList;
    /**
     * 设置多个ui的可见性
     * @param visible
     * @param uis
     */
    function setUIVisible(visible, ...uis) {
        if (visible) {
            uis.forEach((ui) => {
                ui && (ui.visibility = mw.SlateVisibility.Visible);
            });
        }
        else {
            uis.forEach((ui) => {
                ui && (ui.visibility = mw.SlateVisibility.Hidden);
            });
        }
    }
    Utils.setUIVisible = setUIVisible;
    function getLanguage() {
        let language = mw.LocaleUtil.getDefaultLocale().toLowerCase();
        if (!!language.match("zh")) {
            return 0;
        }
        if (!!language.match("en")) {
            return 1;
        }
        if (!!language.match("ja")) {
            return 2;
        }
        if (!!language.match("de")) {
            return 3;
        }
        return 0;
    }
    Utils.getLanguage = getLanguage;
    function getTxt(nameID) {
        let lan = GameConfig.Language[nameID];
        if (!lan) {
            console.warn(`未找到${nameID}的多语言！`);
            return;
        }
        return lan.Value;
    }
    Utils.getTxt = getTxt;
    function initLanguageUI(ui) {
        let call = mw.UIScript.getBehavior('lan');
        if (call && ui) {
            call(ui);
        }
    }
    Utils.initLanguageUI = initLanguageUI;
})(Utils || (Utils = {}));

var foreign85 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get Utils () { return Utils; }
});

/**
 * @Author       : xianjie.xia
 * @LastEditors  : pengwei.shi
 * @Date         : 2022-11-23 11:22
 * @LastEditTime : 2022-12-13 11:27:40
 * @description  :
 */
class ItemModuleC extends ModuleC {
    /**
     * 添加道具
     * @param id 道具ID
     * @param count 数量
     * @param isShop 是否从商店购买
     * @returns
     */
    addItem(id, count, isShop = false) {
        if (isShop) {
            this.mgsItemBuy(id);
        }
        this.data.addItem(id, count, isShop, DataManager.isGuideShop);
        this.server.net_addItem(id, count, isShop, DataManager.isGuideShop);
    }
    /**
     * 消耗道具
     * @param id 道具ID
     * @param count 数量
     * @returns
     */
    async costItem(id, count) {
        if (this.data.getItemCount(id) >= count) {
            this.data.costItem(id, count);
            return await this.server.net_costItem(id, count);
        }
        return false;
    }
    /**
     * 获取该道具的等级
     * @param id 道具ID
     * @returns 等级
     */
    getItemLv(id) {
        return this.data.getItemLv(id);
    }
    /**
     * 获取该道具的数量
     * @param id 道具ID
     * @returns 数量
     */
    getItemCount(id) {
        return this.data.getItemCount(id);
    }
    /**
     * 升级道具
     * @param id 道具ID
     * @returns 成功
     */
    upItem(id) {
        let cfg = GameConfig.Item.getElement(id);
        if (!cfg)
            return false;
        let lv = this.data.getItemLv(id);
        if (lv >= cfg.maxLv)
            return false;
        let ut = cfg.upType[lv];
        let uc = cfg.upCost[lv];
        let gm = ModuleService.getModule(GameModuleC);
        if (gm.enough(ut, uc)) {
            MGSCenter.mgsItemActionUP(id, this.data.isFirstUP);
            Sound.instance.gameSound(SPSound.UpGrade);
            gm.cost(ut, uc);
            this.data.upItem(id, lv + 1);
            //this.callServerFun(this.server.upItem, id, lv + 1, ut, uc);
            this.server.net_upItem(id, lv + 1, ut, uc);
            return true;
        }
        return false;
    }
    /**
     * 道具购买埋点
     * @param itemID
     */
    mgsItemBuy(itemID) {
        if (DataManager.isGuideShop)
            return;
        if (this.data.isFirstShopBuy) {
            MGSCenter.mgsIsFirstItemActionBuy();
            MGSCenter.mgsItemActionBuy(itemID);
        }
        else {
            MGSCenter.mgsItemActionBuy(itemID);
        }
    }
}

var foreign30 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ItemModuleC: ItemModuleC
});

/**
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2022-11-23 09:58
 * @LastEditTime : 2022-11-29 17:22:51
 * @description  : 角色道具
 */
class RoleItem {
    constructor() {
        //默认道具
        this._addItem = 0;
        this._addTime = 0;
        //性别
        this.gender = 0;
        //护盾时长
        this._shieldTime = 0;
        //飞行
        this._flyTime = 0;
        //双倍
        this._doubleTime = 0;
        //上一次播放的动画（也是当前在播放的动画）
        this._lastAnim = '';
        // /**
        //  * 动画播放
        //  * @param anim 动画资源
        //  * @param rate 时长
        //  * @param loop 循环
        //  * @returns 
        //  */
        // protected playAinm(anim: string, rate: number = undefined, loop: number = 1) {
        //     if (anim === this._lastAnim)
        //         return;
        //     this._lastAnim = anim;
        //     //PlayerManagerExtesion.rpcPlayAnimationLocally(this._role, anim, time, loop)
        //     let ani = PlayerManagerExtesion.loadAnimationExtesion(this._role, anim, false)
        //     if (ani) {
        //         ani.rate = rate;
        //         ani.loop = loop;
        //         ani.play();
        //     }
        // }
    }
    /**
     * 护盾中
     */
    get isShield() {
        return this._shieldTime > 0;
    }
    //飞行中
    get isFly() {
        return this._flyTime > 0;
    }
    //双倍中
    get isDouble() {
        return this._doubleTime > 0;
    }
    /**
     * 设置角色(换装)
     * @param rid 角色ID
     */
    setRole(rid) {
        let rc = GameConfig.Role.getElement(rid);
        if (!rc)
            return;
        this._role.displayName = '';
        this.setSkins(rc);
        this._addItem = rc.PropID;
        this._addTime = rc.TimeAdd;
        this.gender = rc.gender;
        let cfgs = GameConfig.Item.getAllElement();
        for (let v of cfgs) {
            if (v.effect && v.effect.length > 1) {
                mw.AssetUtil.asyncDownloadAsset(v.effect);
            }
        }
    }
    /**
     * 重置
     */
    reset() {
        this._doubleTime = 0;
        this._flyTime = 0;
        this._shieldTime = 0;
        this.shieldEffect(false);
        this.flyEffect(false);
        this.doubleEffect(false);
    }
    /**
     * 帧更新
     * @param dt 间隔时间
     * @param rate 倍率
     */
    onUpdate(dt, rate) {
        if (this._shieldTime > 0) {
            this._shieldTime -= dt;
            if (this._shieldTime <= 0)
                this.shieldEffect(false);
        }
        if (this._flyTime > 0) {
            this._flyTime -= dt;
            if (this._flyTime <= 0)
                this.flyEffect(false);
        }
        if (this._doubleTime > 0) {
            this._doubleTime -= dt;
            if (this._doubleTime <= 0)
                this.doubleEffect(false);
        }
    }
    /**
     * 使用道具
     * @param id
     * @returns
     */
    useItem(id) {
        let cfg = GameConfig.Item.getElement(id);
        if (!cfg)
            return;
        let imc = ModuleService.getModule(ItemModuleC);
        let lv = imc.getItemLv(id);
        let add = this._addItem == id;
        let time = cfg.time[lv];
        time += add ? this._addTime : 0;
        switch (id) {
            case 1: //捡到钥匙
                imc.addItem(id, 1);
                break;
            case 2: //无敌
                this._shieldTime = time;
                this.shieldEffect(true, cfg.effect);
                break;
            case 3: //飞行
                this._flyTime = time;
                this.flyEffect(true, cfg.effect);
                break;
            case 5: //双倍
                this._doubleTime = time;
                this.doubleEffect(true, cfg.effect);
                break;
        }
        MGSCenter.mgsActionUseItem(id);
        Event.dispatchToLocal(Const.ITEM_USE, id, time);
    }
    /**
     * 护盾触发
     */
    onShield() {
        this._shieldTime = 0;
        this.shieldEffect(false);
        this.reliveEffect();
        Event.dispatchToLocal(Const.ITEM_USE, 2, 0);
    }
    /**
     * 复活特效
     * @returns
     */
    reliveEffect() {
        if (!this._reliveEf) {
            let effect = SharePool.getPool(EffectRes.Relive).spawn();
            if (!effect || !effect.obj)
                return;
            this._reliveEf = effect.obj;
            this._role.attachToSlot(this._reliveEf, 23);
            this._reliveEf.localTransform.position = (new mw.Vector(100, 0, 0));
            // this._vertigoEf.localTransform.rotation = ();
            this._reliveEf.worldTransform.scale = new mw.Vector(1.4, 1.4, 1.4);
            this._reliveEf.loop = false;
        }
        if (this._reliveEf) {
            Sound.instance.gameSound(SPSound.ReliveBomb);
            this._reliveEf.play();
        }
    }
    /**
     * 护盾特效
     * @param show 显示
     * @param res 资源
     * @returns
     */
    shieldEffect(show, res = '') {
        if (!this._shieldEf) {
            let effect = SharePool.getPool(res).spawn();
            if (!effect || !effect.obj)
                return;
            this._shieldEf = effect.obj;
            this._role.attachToSlot(this._shieldEf, 23);
            this._shieldEf.localTransform.position = (new mw.Vector(0, 0, 0));
            // this._vertigoEf.localTransform.rotation = ();
            this._shieldEf.worldTransform.scale = new mw.Vector(1, 1, 1);
            this._shieldEf.loop = true;
        }
        if (!this._shieldEf)
            return;
        if (show) {
            this._shieldEf.play();
            this._shieldEf.setVisibility(mw.PropertyStatus.On);
        }
        else {
            this._shieldEf.stop();
            this._shieldEf.setVisibility(mw.PropertyStatus.Off);
        }
    }
    /**
     * 飞行特效
     * @param show 显示
     * @param res 资源
     * @returns
     */
    flyEffect(show, res = '') {
        if (!this._flyEf) {
            let effect = SharePool.getPool(res).spawn();
            if (!effect || !effect.obj)
                return;
            this._flyEf = effect.obj;
            this._role.attachToSlot(this._flyEf, 23);
            this._flyEf.localTransform.position = (new mw.Vector(100, 0, 0));
            // this._vertigoEf.localTransform.rotation = ();
            this._flyEf.worldTransform.scale = new mw.Vector(3, 3, 3);
            this._flyEf.loop = true;
        }
        if (!this._flyEf)
            return;
        if (show) {
            this._flyEf.play();
            this._flyEf.setVisibility(mw.PropertyStatus.On);
        }
        else {
            this._flyEf.stop();
            this._flyEf.setVisibility(mw.PropertyStatus.Off);
            Event.dispatchToLocal(Const.ITEM_USE, 3, 0);
        }
    }
    /**
     * 双倍特效
     * @param show 显示
     * @param res 资源
     * @returns
     */
    doubleEffect(show, res = '') {
        if (!this._doubleEf) {
            let effect = SharePool.getPool(res).spawn();
            if (!effect || !effect.obj)
                return;
            this._doubleEf = effect.obj;
            this._role.attachToSlot(this._doubleEf, 23);
            this._doubleEf.localTransform.position = (new mw.Vector(0, 0, 80));
            // this._vertigoEf.localTransform.rotation = ();
            this._doubleEf.worldTransform.scale = new mw.Vector(1, 1, 1);
            this._doubleEf.loop = true;
        }
        if (!this._doubleEf)
            return;
        if (show) {
            this._doubleEf.play();
            this._doubleEf.setVisibility(mw.PropertyStatus.On);
        }
        else {
            Event.dispatchToLocal(Const.ITEM_USE, 5, 0);
            this._doubleEf.stop();
            this._doubleEf.setVisibility(mw.PropertyStatus.Off);
        }
    }
    /**
     * 设置皮肤
     * @param cfg 角色配置
     */
    async setSkins(cfg) {
        this._role.clearDescription();
        //this._role.clearDescription();
        // for (let i = 0; i < cfg.Skins.length; i++) {
        //     let guid = cfg.Skins[i];
        //     await mw.AssetUtil.asyncDownloadAsset(guid);
        //     this._role.description.base.wholeBody = (guid);
        // }
        //TODO 未找到
        // this._role.syncDIYDataBegin();
        // this._role.setDescription(cfg.Skins);
        this._role.setDescription(cfg.Skins);
        //(mw.HumanoidV2).setDescription(cfg.Skins);
    }
}

var foreign38 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    RoleItem: RoleItem
});

//import RoleTrigger from "./RoleTrigger";
/**
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2022-11-28 13:24
 * @LastEditTime : 2022-11-28 18:55
 * @description  : 角色控制
 */
class RoleCtrl extends RoleItem {
    constructor() {
        super(...arguments);
        /**
         * 需要缓动到的目标点
         */
        this._destY = 0;
        this._destZ = 0;
        /**
         * 当前速度，基础速度,加速度,最大速度
         */
        this._speed = 10;
        this._speedY = 25;
        this._baseSpeed = 10;
        this._accSpeed = 0.2;
        this._maxSpeed = 20;
        /**
         * 加速距离
         */
        this._accDis = 10000;
        /**
         * 角色目标点
         */
        this._dest = new mw.Vector(0, 0, 0);
        /**
         * 角色旋转
         */
        this._rotation = new mw.Rotation(0, 0, 0);
        /**
         * 跳跃时长
         */
        this._jumpTime = 0;
        /**
         * 掉落计时，用于加速度
         */
        this._dropTime = 0;
        /**
         * 下滑时长
         */
        this._downTime = 0;
        /**
         * 死亡计时
         */
        this._dieTime = 0;
        /**
         * 快速下落
         */
        this._fastDrop = false;
        /**
         * 眩晕时长
         */
        this._vertigoTime = 0;
        /**
         * 是否着陆了
         */
        this._isLand = false;
        //射线检测
        this._tempPos = new mw.Vector(0, 0, 0);
        this._lineDest = new mw.Vector(0, 0, 0);
        /**
         * 初始化完成否
         */
        this._bInited = false;
        /**
         * 上台阶时间
         */
        this._stepTime = 0;
        //允许镜头高度跟随
        this.isFollow = false;
    }
    /**
     * 初始化
     * @param obj 角色节点
     * @param rid 角色ID
     */
    init(obj) {
        //let trigger =  GameObject.asyncFindGameObjectById('BAC9BBE54B878D20B239B0AC3A5ED3C0');
        this._role = obj;
        this.reset();
        this._bInited = true;
        //给角色触发器绑脚本
        // Utils.addScript<RoleTrigger>('59D07B5F43175182FA035F8E2F856E55', trigger).then(sc => {
        //     sc.init(this);
        //     this._bInited = true;
        //     trigger.setCollision(mw.CollisionStatus.QueryOnly,true);
        // });
    }
    /**
     * 设置角色信息
     * @param speed 基础移动速度
     * @param speedY 左右移动速度
     * @param acc 加速度
     * @param accDis 加速距离
     * @param max 最大速度
     */
    setInfo(speed, speedY, acc, accDis, max) {
        this._baseSpeed = speed;
        this._speedY = speedY;
        this._accSpeed = acc;
        this._accDis = accDis;
        this._maxSpeed = max;
    }
    /**
     * 测试
     * @param v 参数
     */
    test(v) {
        this._baseSpeed = v;
    }
    /**
     * 重置
     */
    reset() {
        super.reset();
        this._jumpTime = 0;
        this._dropTime = 0;
        this._vertigoTime = 0;
        this._destY = Const.BASE_POS;
        this._lastAnim = '';
        this._destZ = Const.BASE_HEIGHT;
        this._dest.x = 0;
        this._dest.y = Const.BASE_POS;
        this._dest.z = Const.BASE_HEIGHT;
        this._rotation.z = 90;
        if (this._role) {
            this._role.worldTransform.position = this._dest;
            this._role.worldTransform.rotation = this._rotation;
            //this._role.setVisibility(mw.PropertyStatus.On);
            //this._role.setVisibility(true);
            this.puase();
        }
        this.vertigoEnd();
    }
    setRole(rid) {
        super.setRole(rid);
        this.puase();
    }
    relive() {
        this.vertigoEnd();
        //this._role.setVisibility(mw.PropertyStatus.On);
        //this._role.setVisibility(true);
        this.reliveEffect();
    }
    /**
     * 暂停
     */
    puase() {
        let anim = AnimRes.Idel;
        if (this.gender == 2)
            anim = AnimRes.Idel2;
        this.playAinm(anim, 1, 0);
        this._lastAnim = '';
    }
    /**
     * 获取角色位置
     */
    get destPos() {
        return this._dest;
    }
    /**
     * 是否在地面上
     */
    get isOnLand() {
        return this._isLand;
    }
    /**
     * 帧更新
     * @param dt 时间间隔
     * @param rate 帧倍率
     */
    onUpdate(dt, rate) {
        if (!this._bInited)
            return;
        if (DataManager.isGaming) {
            super.onUpdate(dt, rate);
            this.getSpeed(); //
            this._destZ = Const.BASE_HEIGHT;
            this.freshVertigo(dt); //眩晕
            this.lineTrace(rate);
            //位置计算
            this.getDestXY(rate);
            this.getDestZ(rate);
            this._isLand = Math.abs(this._dest.z - this._destZ) < 1;
            //着地后重置，防止起跳碰撞（误为着地）
            if (this._isLand && this._jumpTime < 12) {
                this._dropTime = 0;
                this._jumpTime = 0;
                if (this._fastDrop) {
                    this._fastDrop = false;
                    this.down();
                }
                else if (this._downTime < 1) {
                    this.run();
                }
            }
        }
        else if (DataManager.isEnd) {
            this.lineTrace(rate);
            this.back(rate, 110);
            this.getDestZ(rate);
        }
        else if (DataManager.isReady) {
            if (this._rotation.z > 0)
                this._rotation.z -= rate * 0.2 + this._rotation.z * rate * 0.04;
            else
                this._rotation.z = 0;
            this._role.worldTransform.rotation = this._rotation;
        }
    }
    /**
     * 操作玩家移动
     * @param type 方式
     */
    move(type) {
        switch (type) {
            default: return;
            case MoveType.Jump:
                this.jump();
                return;
            case MoveType.Down:
                if (this._isLand)
                    this.down();
                else {
                    this._dropTime = 10;
                    this._jumpTime = 0;
                    this._fastDrop = true;
                }
                return;
            case MoveType.Left:
                if (this._destY > Const.BASE_POS - 200) {
                    this._destY -= Const.ROAD_WIDTH;
                    this.rtMove(true);
                }
                break;
            case MoveType.Right:
                if (this._destY < Const.BASE_POS + 200) {
                    this._destY += Const.ROAD_WIDTH;
                    this.rtMove(false);
                }
                break;
        }
    }
    /**
     * 检测到触发器
     * @param type 类型
     */
    onTrigger(type, pos, guid) {
        switch (type) {
            default: return;
            case BlockType.Item:
                break;
            case BlockType.Coin:
                {
                    let num = this.isDouble ? 2 : 1;
                    DataManager.addCoin(num);
                    this.coinEffect();
                }
                break;
            case BlockType.Gem:
                {
                    //let num = this.isDouble ? 2 : 1;
                    DataManager.addGem(1);
                    this.coinEffect();
                }
                break;
            case BlockType.Stop:
                this.onCollision(guid);
                break;
            case BlockType.Pass:
                if (this._downTime > 0)
                    break;
                else
                    this.onCollision(guid);
                break;
            case BlockType.Step:
                this._stepTime = 6;
                break;
            case BlockType.StepBlock:
            case BlockType.Board:
            case BlockType.Block:
            case BlockType.Border:
                let max = type == BlockType.Board ? Const.BOAED_HEIGHT : Const.OVER_HEIGHT;
                let dz = max - this._dest.z;
                let dy = pos.y - this._dest.y;
                //正面，左右差值
                if (Math.abs(dy) < 10 && type != BlockType.Border) {
                    if (type == BlockType.StepBlock) {
                        return;
                    }
                    else if (dz > 0)
                        this.onCollision(guid);
                }
                else {
                    this.onCollision(guid);
                    if (dy > 0) { //障碍在右边
                        if (this._dest.y > Const.BASE_POS)
                            this._destY = Const.BASE_POS;
                        else
                            this._destY = Const.BASE_POS - Const.ROAD_WIDTH;
                    }
                    else if (this._dest.y < Const.BASE_POS)
                        this._destY = Const.BASE_POS;
                    else
                        this._destY = Const.BASE_POS + Const.ROAD_WIDTH;
                    // this._destY += dy < 0 ? Const.ROAD_Width : -Const.ROAD_Width;
                    // if (this._destY < Const.BASE_POS - Const.ROAD_Width)
                    //     this._destY = Const.BASE_POS - Const.ROAD_Width
                    // else if (this._destY > Const.BASE_POS + Const.ROAD_Width)
                    //     this._destY = Const.BASE_POS + Const.ROAD_Width
                }
                break;
        }
    }
    /**
     * 碰撞
     * @param guid 碰撞的道具guid
     */
    onCollision(guid) {
        if (this._vertigoTime > 0 || this.isRTMove)
            this.onDie(guid);
        else
            this.vertigo();
    }
    /**
     * 速度计算
     */
    getSpeed() {
        let n = Math.floor(DataManager.gameDis / this._accDis);
        this._speed = this._baseSpeed + n * this._accSpeed;
        if (this._speed > this._maxSpeed)
            this._speed = this._maxSpeed;
        //特效8秒，减速1秒
        if (this._vertigoTime >= 7)
            this._speed *= 0.5;
        if (this.isFly)
            this._speed = this._maxSpeed + 10;
    }
    /**
     * 左右位置计算
     */
    getDestXY(rate) {
        //死亡后退，100控制后退时长
        if (this._dieTime > 100) {
            this.back(rate, 100);
        }
        else {
            let ds = this._speed * rate;
            DataManager.gameDis += ds;
            this._dest.x = DataManager.gameDis;
        }
        let dy = this._dest.y - this._destY; //差值
        let my = this._speedY * rate; //位移值
        if (Math.abs(dy) > my) {
            if (dy < 0) {
                if (this._rotation.z < Const.MOVE_ROTMAX)
                    this._rotation.z += rate * Const.MOVE_ROTZ;
                this._dest.y += my;
                if (this._dest.y > this._destY)
                    this._dest.y = this._destY;
            }
            else {
                if (this._rotation.z > -Const.MOVE_ROTMAX)
                    this._rotation.z -= rate * Const.MOVE_ROTZ;
                this._dest.y -= my;
                if (this._dest.y < this._destY)
                    this._dest.y = this._destY;
            }
        }
        else {
            this._dest.y = this._destY;
            this._rotation = Utils.formatRot(this._rotation);
            let rz = this._rotation.z;
            if (Math.abs(rz) > 1) {
                this._rotation.z -= rate * rz * 0.1;
            }
            else
                this._rotation.z = 0;
        }
        //左右移带旋转
        this._role.worldTransform.rotation = this._rotation;
    }
    /**
     * 后退，非引导则死亡
     * @param rate 帧倍率
     * @param max 后退时长
     */
    back(rate, max) {
        this._dieTime -= rate;
        if (this._dieTime > max) {
            this._dest.x -= (this._dieTime - max) * rate * 0.7;
            DataManager.gameDis = this._dest.x;
        }
        else if (this._dieTime < 1 && !DataManager.isGuideScene) {
            DataManager.onEnd();
            if (this._dieAnim)
                this._dieAnim.pause();
            //this._role.visible = false;
            // this._role.setVisibility(false);
            // this._role.setVisibility(mw.PropertyStatus.Off);
        }
    }
    /**
     * 高度计算
     */
    getDestZ(rate) {
        this.isFollow = false;
        if (this._jumpTime > 0) {
            this._jumpTime -= rate;
            let mz = this._jumpTime * rate * 1.9;
            this._dest.z += mz;
        }
        else {
            let dz = this._destZ - this._dest.z;
            if (dz < -1) { //降落
                this._dropTime += rate;
                let dt = this._dropTime;
                let v = this._fastDrop ? 1.5 : 0.5;
                let z = dt * v * rate;
                this._dest.z -= z;
                if (this._dest.z < this._destZ) {
                    this._dest.z = this._destZ;
                    this._dropTime = 0;
                }
            }
            else if (dz > 1) {
                if (this.isFly)
                    this._dest.z += dz * 0.08 * rate;
                else if (dz < Const.STEP_HEIGHT) //爬坡
                    this._dest.z = this._destZ;
                else
                    this._dest.z += dz * 0.08 * rate;
                this.isFollow = true;
            }
        }
        if (this._downTime > 0)
            this._downTime -= rate;
        this._role.worldTransform.position = this._dest;
        this._tempPos.x = this._dest.x - 20;
        this._tempPos.y = this._dest.y;
        this._tempPos.z = this._dest.z;
        this._lineDest.x = this._tempPos.x + 30;
        this._lineDest.y = this._tempPos.y;
        this._lineDest.z = this._tempPos.z - 20;
        let hits = QueryUtil.lineTrace(this._tempPos, this._lineDest, true, false);
        // for (let i = 0; i < hits.length; i++) {
        //     let hit = hits[i];
        //     let guid = hit.guid;
        //     if (!guid || guid == '92198BB8')
        //         continue;
        //     this.onEnter(hit)
        //     break;
        // }
        for (let i = 0; i < hits.length; i++) {
            let hit = hits[i];
            let guid = hit.gameObject.gameObjectId;
            if (!guid || guid == '92198BB8')
                continue;
            if (!hit.gameObject)
                continue;
            this.onEnter(hit.gameObject);
            //break;
        }
    }
    onEnter(other) {
        //console.log('onEnter')
        let tag = other.name;
        if (!tag)
            return;
        let type = BlockType.None;
        let vis = other.getVisibility();
        if (tag == 'pass') {
            //隐藏通过点
            other.setVisibility(mw.PropertyStatus.Off, true);
            other.setCollision(mw.CollisionStatus.Off);
            return;
        }
        else if (tag == 'block1') {
            type = BlockType.Stop;
        }
        else if (tag == 'block2') {
            type = BlockType.Pass;
        }
        else if (tag == 'board') {
            type = BlockType.Board;
        }
        else if (tag == 'block') {
            type = BlockType.Block;
        }
        else if (tag == 'block0') {
            type = BlockType.StepBlock;
        }
        else if (tag == 'border') {
            type = BlockType.Border;
        }
        else if (tag == 'step') {
            type = BlockType.Step;
        }
        else if (tag.indexOf('coin') >= 0 && vis) {
            other.setVisibility(mw.PropertyStatus.Off, true);
            other.setCollision(mw.CollisionStatus.Off);
            type = BlockType.Coin;
            Sound.instance.gameSound(SPSound.Coin);
        }
        else if (tag.indexOf('gem') >= 0 && vis) {
            other.setVisibility(mw.PropertyStatus.Off, true);
            other.setCollision(mw.CollisionStatus.Off);
            type = BlockType.Gem;
            Sound.instance.gameSound(SPSound.GetGem);
        }
        else if (tag.indexOf('item') >= 0 && vis) {
            other.setVisibility(mw.PropertyStatus.Off, true);
            other.setCollision(mw.CollisionStatus.Off);
            let id = 0;
            type = BlockType.Item;
            if (tag == 'item2')
                id = 2;
            else if (tag == 'item3')
                id = 3;
            else if (tag == 'item5')
                id = 5;
            else
                console.log(tag);
            this.useItem(id);
            DataManager.onItem(id, false);
            Sound.instance.gameSound(SPSound.GetItem);
        }
        this.onTrigger(type, other.worldTransform.position, other.gameObjectId);
    }
    /**
     * 射线检测地面
     * @param rate 帧倍率
     */
    lineTrace(rate) {
        if (this.isFly) {
            this._destZ = Const.FLY_HEIGHT;
            return;
        }
        this._tempPos.x = this._dest.x;
        this._tempPos.y = this._dest.y;
        this._tempPos.z = this._dest.z;
        if (this._stepTime > 0) {
            this._stepTime -= rate;
            this._tempPos.z += 100; //坡道增加起点Z
            this._tempPos.x += this._speed;
        }
        this._lineDest.x = this._tempPos.x;
        this._lineDest.y = this._tempPos.y;
        this._lineDest.z = this._tempPos.z - 500; //向下延长射线
        let hits = QueryUtil.lineTrace(this._tempPos, this._lineDest, true, false);
        for (let i = 0; i < hits.length; i++) {
            let hit = hits[i];
            if (!hit.gameObject)
                continue;
            let guid = hit.gameObject.gameObjectId;
            let n = hit.gameObject.name;
            //排除自身相关，有更好的办法???
            if (!guid || guid == '92198BB8')
                continue;
            if (!n || n.indexOf('coin') >= 0 || n.indexOf('gem') >= 0 || n.indexOf('item') >= 0 || n == 'pass' || n.indexOf('金币') >= 0)
                continue;
            // if(hit.gameObject.worldTransform.position.z>1)
            //     console.log(n);
            let pz = hit.impactPoint.z + Const.BASE_HEIGHT;
            if (pz < this._dest.z + Const.BASE_HEIGHT) //高度修正
                this._destZ = pz;
            break;
        }
    }
    /**
     * 是否在左右移动中
     */
    get isRTMove() {
        // if (this._jumpTime > 0)
        //     return false;
        if (Math.abs(this._destY - this._dest.y) > 1)
            return false;
        return true;
    }
    /**
     * 死亡触发
     * @param guid 碰撞的道具GUID
     */
    onDie(guid) {
        if (this.isShield) {
            this.onShield();
            return;
        }
        else if (DataManager.isGuideScene) {
            DataManager.isGuideTips = true;
            this.vertigo();
            MGSCenter.ts_tutorial_step(9);
        }
        else {
            this.vertigoEnd();
            DataManager.onDie();
            this.die();
            //死亡埋点
            Event.dispatchToLocal(MGSEvent.DIE_ITEMGUID, guid);
            Sound.instance.gameSound(SPSound.Death);
        }
        //死亡触发到结算预留表现时长
        if (DataManager.isGuideScene && !this.isRTMove) {
            //玩家在新手引导且撞墙
            this._dieTime = 0;
        }
        else {
            this._dieTime = 140;
        }
    }
    /**
     * 眩晕
     */
    vertigo() {
        this._vertigoTime = Const.VERTIGO_TIME;
        if (!this._vertigoEf) {
            let effect = SharePool.getPool(EffectRes.Vertigo).spawn();
            if (!effect || !effect.obj)
                return;
            this._vertigoEf = effect.obj;
            this._role.attachToSlot(this._vertigoEf, 23);
            this._vertigoEf.localTransform.position = (new mw.Vector(0, 0, 150));
            // this._vertigoEf.localTransform.rotation = ();
            // this._vertigoEf.localTransform.scale = ();
            this._vertigoEf.loop = (true);
        }
        this._vertigoEf.play();
        this._vertigoEf.setVisibility(mw.PropertyStatus.On);
        Sound.instance.gameSound(SPSound.vertigo);
    }
    /**
     * 吃金币特效
     * @returns
     */
    coinEffect() {
        if (!this._coinEf) {
            let effect = SharePool.getPool(EffectRes.Coin).spawn();
            if (!effect || !effect.obj)
                return;
            this._coinEf = effect.obj;
            this._role.attachToSlot(this._coinEf, 20);
            //this._coinEf.localTransform.position = (new mw.Vector(0, 0, -20));
            // this._vertigoEf.localTransform.rotation = ();
            // this._vertigoEf.localTransform.scale = ();
            this._coinEf.loop = (false);
        }
        this._coinEf.stop();
        this._coinEf.play();
    }
    /**
     * 刷新眩晕
     * @param dt
     */
    freshVertigo(dt) {
        //眩晕特效
        if (this._vertigoTime > 0) {
            this._vertigoTime -= dt;
            if (this._vertigoTime <= 0) {
                this.vertigoEnd();
            }
        }
    }
    /**
     * 眩晕结束
     */
    vertigoEnd() {
        this._vertigoTime = 0;
        if (this._vertigoEf) {
            this._vertigoEf.stop();
            this._vertigoEf.setVisibility(mw.PropertyStatus.On);
        }
    }
    /**
     * 跑
     * @returns
     */
    run() {
        if (!DataManager.isGaming)
            return;
        //速度与动画匹配
        let t = 0.9 + this._speed / 30;
        let anim = AnimRes.Run;
        if (this.isFly)
            anim = AnimRes.Fly;
        else if (this.gender == 2)
            anim = AnimRes.Run2;
        this.playAinm(anim, t, 0);
    }
    /**
     * 跳
     * @returns
     */
    jump() {
        if (!this._isLand)
            return;
        if (this.isFly)
            return;
        this._downTime = 0;
        this._jumpTime = 16; //调试出的跳跃时长
        let as = [AnimRes.Jump, AnimRes.Jump2];
        let rand = Utils.random(0, as.length);
        let spd = rand == 0 ? 0.5 : 1;
        let anim = as[rand];
        this.playAinm(anim, spd, 1);
    }
    /**
     * 左右移动
     * @param left 左
     */
    rtMove(left) {
        this._stepTime = 0;
        this.playAinm(AnimRes.Trun, 2, 0);
    }
    /**
     * 下滑
     */
    down() {
        if (this.isFly)
            return;
        //下滑的时间段
        this._lastAnim = '';
        this._downTime = 40; //调试出的下滑时长
        this.playAinm(AnimRes.Down, 1);
    }
    /**
     * 死亡动画
     */
    die() {
        this._dieAnim = this.playAinm(AnimRes.Die, 1);
    }
    /**
     * 播放角色动画
     * @param anim 动画id
     * @param time 倍率
     * @param loop 循环
     * @returns
     */
    playAinm(anim, rate = undefined, loop = 1) {
        if (anim === this._lastAnim)
            return null;
        this._lastAnim = anim;
        //PlayerManagerExtesion.rpcPlayAnimationLocally(this._role, anim, time, loop)
        let ani = PlayerManagerExtesion.loadAnimationExtesion(this._role, anim, false);
        if (ani) {
            ani.speed = rate;
            ani.loop = loop;
            ani.play();
        }
        return ani;
    }
}

var foreign36 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RoleCtrl
});

/*
 * @Author: xianjie.xia
 * @LastEditors: pengwei.shi
 * @Date: 2022-10-31 14:39
 * @LastEditTime: 2022-11-27 13:52:14
 * @description:
 */
class RoleModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        this.onPlayerAdd = async (player) => {
            await player.asyncReady();
            player?.character?.setVisibility(mw.PropertyStatus.Off, true);
        };
    }
    get roleData() {
        return { clothesIDs: this.data.curClothesIDs, equipID: this.data.curEquitID };
    }
    onStart() {
        this._roleCtrl = new RoleCtrl();
        this._cameraCtrl = new CameraCtrl();
    }
    async init() {
        return new Promise((resolve) => {
            //角色初始化
            let cfg = GameConfig.Global.getElement(101); //角色的全局配置
            this._roleCtrl.setInfo(cfg.Value, cfg.Value1, cfg.Value2, cfg.Value3, cfg.Value4);
            GameObject.asyncFindGameObjectById('92198BB8').then(async (obj) => {
                this._roleCtrl.init(obj);
                this.freshRole();
                resolve(true);
            });
            //角色相机初始化
            GameObject.asyncFindGameObjectById('90D8BA3D').then((obj) => {
                this._cameraCtrl.init(obj, this._roleCtrl);
            });
        });
    }
    onUpdate(dt) {
        if (DataManager.isPuase)
            return;
        let rate = dt / Const.DELAT_TIME;
        //限制帧数倍率
        if (rate > 4)
            rate = 4;
        else if (rate < 0.8)
            rate = 0.8;
        this._roleCtrl.onUpdate(dt, rate);
        this._cameraCtrl.onUpdate(dt, rate);
    }
    /**
     * 开始
     */
    gameStart() {
    }
    /**
     * 暂停
     */
    gamePuase() {
        this._roleCtrl.puase();
    }
    /**
     * 重置
     */
    reset() {
        this._roleCtrl.reset();
        this._cameraCtrl.reset();
    }
    /**
     * 移动
     * @param type 方向
     */
    move(type) {
        this._roleCtrl.move(type);
    }
    relive() {
        this._roleCtrl.relive();
    }
    test(v) {
        this._roleCtrl.test(v);
    }
    /**
     * 使用道具
     * @param id 道具ID
     */
    useItem(id) {
        this._roleCtrl.useItem(id);
        DataManager.onItem(id, true);
    }
    /**
     * 刷新衣服数据、购买衣服
     * @param clothesID
     * @returns 是否购买成功
     */
    refreshClothesData(clothesID) {
        let index = this.data.curClothesIDs.indexOf(clothesID);
        if (index == -1) {
            //埋点
            this.mgs(clothesID);
            this.data.curClothesIDs.push(clothesID);
            //保存数据
            // this.callServerFun(this.server.saveClothesData, clothesID);
            this.server.net_saveClothesData(clothesID);
            // console.log(`购买${clothesID}`);
            this.freshRole();
            return true;
        }
        else {
            // console.log(`已购买${clothesID}`);
            return false;
        }
    }
    /**
     * 获取性别
     * 1=男
     * 2=女
     */
    get gender() {
        return this._roleCtrl ? this._roleCtrl.gender : 1;
    }
    /**
     * 刷新装备数据
     * @param clothesID
     */
    refreashEquipData(clothesID) {
        //保存数据
        this.data.setCurEquitID(clothesID);
        // this.callServerFun(this.server.saveEquipData, clothesID);
        this.server.net_saveEquipData(clothesID);
        // console.log(`已装备${clothesID}`);
        this.freshRole();
    }
    freshRole() {
        this._roleCtrl.setRole(this.data.curEquitID);
    }
    /**
     * 隐藏玩家角色
     * @param playerId 玩家ID
     */
    net_hideRole(playerId) {
        // console.log('net  ', playerId);
        // let player = Player.getPlayer(playerId);
        // player.character.setVisibility(mw.PropertyStatus.Off, true);
    }
    onEnterScene(sceneType) {
        Player.onPlayerJoin.add(this.onPlayerAdd);
        Player.localPlayer?.character?.setVisibility(mw.PropertyStatus.Off, true);
    }
    /**
     * 角色购买埋点
     * @param buyID
     */
    mgs(buyID) {
        if (DataManager.isGuideRole)
            return;
        if (this.data.curClothesIDs.length == 2) {
            MGSCenter.mgsIsFirstRoleActionBuy();
            MGSCenter.mgsRoleActionBuy(buyID);
        }
        else {
            MGSCenter.mgsRoleActionBuy(buyID);
        }
    }
}

var foreign39 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    RoleModuleC: RoleModuleC
});

class Sound {
    static get instance() {
        if (!this._inst)
            this._inst = new Sound();
        return this._inst;
    }
    /**
     * 播放bgm
     * @param soundType
     */
    gameBGM(soundType) {
        let voice = this.getAsset(soundType);
        let role = ModuleService.getModule(RoleModuleC);
        let guid = voice.guid[role.gender - 1] || voice.guid[0];
        this.playBGM(guid, voice.SoundPropportion);
        // console.log(`播放的音效是：${soundType}`)
    }
    /**
     * 播放音效
     * @param soundType
     */
    gameSound(soundType) {
        let voice = this.getAsset(soundType);
        let role = ModuleService.getModule(RoleModuleC);
        let guid = voice.guid[role.gender - 1] || voice.guid[0];
        switch (soundType) {
            case SPSound.Coin:
                this.playSound(guid, true, voice.SoundPropportion, voice.loop);
                break;
            default:
                this.playSound(guid, true, voice.SoundPropportion, voice.loop);
                break;
        }
    }
    /**
     * 设置音效是否生效
     * @returns 当前音效是否生效
     */
    setSoundActive() {
        let vscale = mw.SoundService.BGMVolumeScale;
        if (vscale == 0) {
            mw.SoundService.BGMVolumeScale = 1;
            mw.SoundService.volumeScale = 1;
            return true;
        }
        else {
            mw.SoundService.BGMVolumeScale = 0;
            mw.SoundService.volumeScale = 0;
            return false;
        }
    }
    /**
     * 获取音效资源
     * @param index
     * @returns
     */
    getAsset(index) {
        return GameConfig.Voice.getElement(index);
    }
    /**
    * 播放bgm
    * @param guid
    * @param volume
    */
    playBGM(guid, volume) {
        mw.SoundService.stopBGM();
        mw.SoundService.playBGM(guid, volume);
    }
    /**
     *
     * @param guid
     * @param volume
     * @param needPauseSound 是否需要暂停音效
     */
    playSound(guid, needPauseSound = true, volume, loopNum) {
        if (needPauseSound) {
            mw.SoundService.stopAllSound();
        }
        mw.SoundService.playSound(guid, loopNum, volume);
    }
}

var foreign84 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Sound: Sound
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/RankBaseUI.ui
 * TIME: 2023.05.15-17.19.24
 */
let RankBaseUI_generate = class RankBaseUI_generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mTxt_Ranking = undefined;
        this.mTxt_Name = undefined;
        this.mTxt_Score = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        //按钮添加点击
        // 
        //按钮多语言
        //文本多语言
        this.initLanguage(this.mTxt_Ranking);
        this.initLanguage(this.mTxt_Name);
        this.initLanguage(this.mTxt_Score);
        //文本多语言
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTxt_Ranking')
], RankBaseUI_generate.prototype, "mTxt_Ranking", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTxt_Name')
], RankBaseUI_generate.prototype, "mTxt_Name", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTxt_Score')
], RankBaseUI_generate.prototype, "mTxt_Score", void 0);
RankBaseUI_generate = __decorate([
    UIBind('UI/RankBaseUI.ui')
], RankBaseUI_generate);
var RankBaseUI_generate$1 = RankBaseUI_generate;

var foreign68 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RankBaseUI_generate$1
});

/**
 * @Author       : pengwei.shi
 * @Date         : 2022-12-07 11:07:27
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-01-12 15:19:06
 * @FilePath     : \streetparkour\JavaScripts\ui\UIRankItem.ts
 * @Description  : 修改描述
 */
class UIRankItem extends RankBaseUI_generate$1 {
    constructor() {
        super(...arguments);
        this.size = null;
    }
    onAwake() {
        this.size = this.uiObject.size;
    }
    /**
     * 初始化数据
     * @param ranking 排名
     * @param name 名字
     * @param score 分数
     */
    initData(ranking, name, score) {
        this.mTxt_Name.text = name;
        this.mTxt_Ranking.text = ranking.toFixed(0);
        this.mTxt_Score.text = score.toFixed(0);
    }
    reset() {
        this.mTxt_Name.text = "";
        this.mTxt_Ranking.text = "";
        this.mTxt_Score.text = "";
    }
}

var foreign52 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UIRankItem: UIRankItem
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/GuideModuleUI.ui
 * TIME: 2023.05.15-17.19.24
 */
let GuideModuleUI_generate = class GuideModuleUI_generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mLeftMask = undefined;
        this.mTopMask = undefined;
        this.mButtomMask = undefined;
        this.mRightMask = undefined;
        this.mBtn = undefined;
        this.mBtnHand = undefined;
        this.mCanvas_Left = undefined;
        this.mCanvas_Right = undefined;
        this.mCanvas_UP = undefined;
        this.mCanvas_Down = undefined;
        this.mTxt_UP = undefined;
        this.mTxt_Down = undefined;
        this.mTxt_Right = undefined;
        this.mTxt_Left = undefined;
        this.mTxt_SkillTips = undefined;
        this.mTouchMask = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        // this.mLeftMask.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mLeftMask");
        // })
        this.initLanguage(this.mLeftMask);
        this.mLeftMask.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // this.mTopMask.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mTopMask");
        // })
        this.initLanguage(this.mTopMask);
        this.mTopMask.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // this.mButtomMask.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mButtomMask");
        // })
        this.initLanguage(this.mButtomMask);
        this.mButtomMask.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // this.mRightMask.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mRightMask");
        // })
        this.initLanguage(this.mRightMask);
        this.mRightMask.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // this.mBtn.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn");
        // })
        this.initLanguage(this.mBtn);
        this.mBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        //按钮添加点击
        // 
        //按钮多语言
        //文本多语言
        this.initLanguage(this.mTxt_UP);
        this.initLanguage(this.mTxt_Down);
        this.initLanguage(this.mTxt_Right);
        this.initLanguage(this.mTxt_Left);
        this.initLanguage(this.mTxt_SkillTips);
        //文本多语言
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mLeftMask')
], GuideModuleUI_generate.prototype, "mLeftMask", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTopMask')
], GuideModuleUI_generate.prototype, "mTopMask", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mButtomMask')
], GuideModuleUI_generate.prototype, "mButtomMask", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mRightMask')
], GuideModuleUI_generate.prototype, "mRightMask", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mBtn')
], GuideModuleUI_generate.prototype, "mBtn", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mBtnHand')
], GuideModuleUI_generate.prototype, "mBtnHand", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mCanvas_Left')
], GuideModuleUI_generate.prototype, "mCanvas_Left", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mCanvas_Right')
], GuideModuleUI_generate.prototype, "mCanvas_Right", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mCanvas_UP')
], GuideModuleUI_generate.prototype, "mCanvas_UP", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mCanvas_Down')
], GuideModuleUI_generate.prototype, "mCanvas_Down", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTxt_UP')
], GuideModuleUI_generate.prototype, "mTxt_UP", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTxt_Down')
], GuideModuleUI_generate.prototype, "mTxt_Down", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTxt_Right')
], GuideModuleUI_generate.prototype, "mTxt_Right", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTxt_Left')
], GuideModuleUI_generate.prototype, "mTxt_Left", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTxt_SkillTips')
], GuideModuleUI_generate.prototype, "mTxt_SkillTips", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTouchMask')
], GuideModuleUI_generate.prototype, "mTouchMask", void 0);
GuideModuleUI_generate = __decorate([
    UIBind('UI/GuideModuleUI.ui')
], GuideModuleUI_generate);
var GuideModuleUI_generate$1 = GuideModuleUI_generate;

var foreign62 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GuideModuleUI_generate$1
});

class ActionMgr {
    constructor() {
        this._tweens = new Map();
    }
    static get instance() {
        if (!this._inst)
            this._inst = new ActionMgr();
        return this._inst;
    }
    /**新增
     * args:对象
     * target:当前的类
     */
    runTween(args, target) {
        let pair = null;
        if (this._tweens.has(target)) {
            pair = this._tweens.get(target);
        }
        else {
            pair = [];
            this._tweens.set(target, pair);
        }
        let ret = new mw.Tween(args);
        pair.push(ret);
        return ret;
    }
    /**
     *移除
     * @param target
     */
    remove(target) {
        let pair = this._tweens.get(target);
        if (pair) {
            pair.forEach((tween) => {
                tween.stop();
            });
            this._tweens.delete(target);
        }
    }
    /**进度条缓动效果 */
    SlowMotion_loadingBar(bar, newPercent, target, completeCallback) {
        let currentValue = bar.currentValue;
        let duration = (newPercent - currentValue) * 1000;
        return this.runTween({ x: currentValue }, target)
            .to({ x: newPercent }, Math.abs(duration))
            .onUpdate((value) => {
            bar.percent = value.x;
        }).start().onComplete(() => {
            if (completeCallback) {
                completeCallback();
            }
        });
    }
    /**数字文本缓动效果 */
    SlowMotion_UINumberText(text, newNumber, target, format = "") {
        let curCounts = Number(text.text);
        if (!curCounts) {
            curCounts = 0;
        }
        return this.runTween({ x: curCounts }, target)
            .to({ x: newNumber }, 300)
            .onUpdate((value) => {
            text.text = Math.round(value.x).toString() + format;
        }).start();
    }
    /**
     * 震动物体
     */
    ShakeObj(obj, axis, amplitude, times = 0) {
    }
    /**
     * 震动UI
     */
    ShakeUI(ui, dir, target, amplitude = 10, duration = 200, times = Infinity) {
        let origin = ui.position;
        let pos0 = new mw.Vector2(origin.x, origin.y);
        let pos1 = pos0.add(dir.normalize().multiply(amplitude));
        return this.runTween(pos0, target).to(pos1, duration).onUpdate((v) => {
            ui.position = v;
        }).start().yoyo(true).repeat(times);
    }
    /**
     * 过渡黑幕动画
     * @param duration
     * @param start
     */
    showBlackMask(ui, duration, target, start, onTranparent, complete) {
        let lastOpacity = 0;
        let exe = false;
        return this.runTween({ x: 0 }, target).to({ x: [1, 0] }, duration)
            .onUpdate((opacity) => {
            if (opacity.x - lastOpacity < 0 && !exe) {
                onTranparent && onTranparent();
                exe = true;
            }
            lastOpacity = opacity.x;
            ui.renderOpacity = opacity.x;
        })
            .onComplete(() => {
            complete && complete();
        })
            .onStart(() => {
            start && start();
        })
            .start();
    }
    fadeIn(ui, duration, target, complete) {
        let color = ui.renderOpacity;
        return this.runTween({ value: color }, target).to({ value: 1 }, duration)
            .onUpdate((ref) => {
            ui.renderOpacity = ref.value;
        })
            .start().onComplete(() => {
            complete && complete();
        }).easing(mw.TweenUtil.Easing.Cubic.Out);
    }
    fadeOut(ui, duration, target, complete, easing = mw.TweenUtil.Easing.Quadratic.In) {
        let color = ui.renderOpacity;
        return this.runTween({ value: color }, target).to({ value: 0 }, duration)
            .onUpdate((ref) => {
            ui.renderOpacity = ref.value;
        })
            .start().onComplete(() => {
            complete && complete();
        }).easing(easing);
    }
    fadeInOut(ui, duration, to, target, outCallback, complete) {
        let lastValue = 0;
        let call = true;
        let color = ui.renderOpacity;
        return this.runTween({ value: color }, target).to({ value: to }, duration)
            .onUpdate((ref) => {
            ui.renderOpacity = ref.value;
            if (call && ref.value - lastValue < 0) {
                outCallback && outCallback();
                call = false;
            }
            lastValue = ref.value;
        })
            .start().onComplete(() => {
            complete && complete();
        }).easing(mw.TweenUtil.Easing.Cubic.Out);
    }
    /**
     * 闪烁
     * @param widget UI组件
     * @param duration 持续时间
     * @param time 闪烁次数，默认-1，永久
     * @param target 绑定的脚本
     * @param opacityMin 透明度最小值
     * @param opacityMax 透明度最大值
     * @returns
     */
    flash(widget, duration, target, time = Infinity, opacityMin = 0, opacityMax = 1) {
        return this.runTween({ value: opacityMax }, target).to({ value: [opacityMin, opacityMax] }, duration)
            .onUpdate((ref) => {
            widget.renderOpacity = ref.value;
        })
            .start().yoyo()
            .repeat(time);
    }
    /**
     * UI移动
     * @param widget
     * @param end
     * @param duration
     * @param target
     * @param compelet
     * @returns
     */
    moveTo2D(widget, start, end, duration, target, compelet, easing) {
        let st = new mw.Vector2(start.x, start.y);
        widget.position = st;
        return this.runTween(st, target).to(end, duration)
            .onUpdate((pos) => {
            widget.position = pos;
        })
            .onComplete(() => {
            compelet && compelet();
        })
            .start().easing(easing);
    }
    moveTo3D(obj, to, duration, target, onComplete, easing) {
        let start = new mw.Vector(obj.worldTransform.position.x, obj.worldTransform.position.y, obj.worldTransform.position.z);
        return this.runTween(start, target).to(to, duration)
            .onUpdate((pos) => {
            obj.worldTransform.position = pos;
        })
            .onComplete(() => {
            onComplete && onComplete();
        })
            .start().easing(easing);
    }
    /**
     * 渲染缩放
     * @param widget
     * @param to
     * @param duration
     * @param target
     * @param onComplete
     * @param easing
     * @returns
     */
    renderScaleTo(widget, to, duration, target, onComplete, easing) {
        let st = widget.renderScale.clone();
        return this.runTween(st, target).to(to, duration)
            .onUpdate((s) => {
            widget.renderScale = s;
        })
            .onComplete(() => {
            onComplete && onComplete();
        })
            .start().easing(easing);
    }
}

var foreign81 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ActionMgr: ActionMgr
});

/*
 * @Author: YuKun.Gao
 * @Date: 2022-06-27 09:56:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-01 14:30:11
 * @Description: file content
 * @FilePath: \JavaScripts\module\guideModule\GuideModuleView.ts
 */
/**
 * 新手引导UI
 */
class GuideModuleView extends GuideModuleUI_generate$1 {
    constructor() {
        super(...arguments);
        /**
         * 接收空间坐标
         */
        this.outPixelPos = new mw.Vector2(0, 0);
        /**
         * 用于接收视口坐标
         */
        this.outViewPos = new mw.Vector2(0, 0);
        /**
         * 当前引导绑定Target
         */
        this.bindTarget = null;
        /**
         * 按钮触发后的通知
         */
        this.btnClickToGuide = null;
        /**
         * 按钮触发后的事件传递
         */
        this.btnClickToTarget = null;
        /**
         * 到达目标点后的回调
         */
        this.toTargetPosCallback = null;
        /**判断指定提示ui是否生效，防止多次执行 */
        this.tipsActive = false;
        /**判断手指tween是否生效 */
        this.activeLockTween = false;
        /**
         * 引导button点击后的回调
         */
        this.buttonClick = () => {
            // 完成当前引导
            if (this.btnClickToGuide) {
                this.btnClickToGuide();
                this.btnClickToGuide = null;
            }
            // 触发对应点击按钮事件
            if (this.btnClickToTarget) {
                this.btnClickToTarget();
                this.btnClickToTarget = null;
                this.bindTarget = null;
            }
            this.resetTweenAnimation();
            // 隐藏按钮组件
            this.mBtn.visibility = (mw.SlateVisibility.Hidden);
            this.mBtnHand.visibility = (mw.SlateVisibility.Hidden);
        };
    }
    /**
     * 模块初始化
     */
    onStart() {
        this.layer = mw.UILayerDialog;
        this.canUpdate = true;
        this.mLeftMask.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mLeftMask");
        });
        this.mTopMask.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mTopMask");
        });
        this.mButtomMask.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mButtomMask");
        });
        this.mRightMask.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mRightMask");
        });
        this.mBtn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mBtn");
        });
        this.mBtn.onClicked.add(() => {
            this.buttonClick();
        });
        // 设置隐藏mask
        this.showMask(false);
        // 隐藏按钮
        this.mBtn.visibility = (mw.SlateVisibility.Hidden);
        this.mBtnHand.visibility = (mw.SlateVisibility.Hidden);
        this.tipsUI = [];
    }
    /**
     * 隐藏所有的组件
     */
    hideAllItem() {
        // 设置隐藏mask
        this.showMask(false);
        // 隐藏按钮
        Utils.setUIVisible(false, this.mTopMask, this.mBtn, this.mBtnHand);
        this.targetPos = null;
        this.resetTweenAnimation();
    }
    /**
     * mask显隐
     * @param isShow
     */
    showMask(isShow, isShowMask = false) {
        // 隐藏引导组件
        let state = mw.SlateVisibility.Visible;
        if (!isShow)
            state = mw.SlateVisibility.Hidden;
        this.mTopMask.visibility = (state);
        this.mButtomMask.visibility = (state);
        this.mLeftMask.visibility = (state);
        this.mRightMask.visibility = (state);
        if (isShow) {
            mw.UIService.show(GuideModuleView);
        }
        else {
            mw.UIService.hide(GuideModuleView);
        }
        // console.log(`sssssssssssssssssssss         ${isShow}     ${isDontHidePanel}`);
        if (!isShowMask) {
            mw.UIService.show(GuideModuleView);
            this.mTopMask.visibility = mw.SlateVisibility.Hidden;
            this.mButtomMask.visibility = mw.SlateVisibility.Hidden;
            this.mLeftMask.visibility = mw.SlateVisibility.Hidden;
            this.mRightMask.visibility = mw.SlateVisibility.Hidden;
        }
    }
    onShow() {
        Utils.setUIVisible(false, this.mTouchMask);
    }
    /**
     * 重置tween动画
     * 以及动画相关的ui
     */
    resetTweenAnimation() {
        if (this.tipsTween && this.tipsTween.isPlaying()) {
            this.tipsTween.stop();
        }
        if (this.lockHandTween && this.lockHandTween.isPlaying()) {
            this.lockHandTween.stop();
        }
        this.tipsActive = false;
        this.activeLockTween = false;
        this.tipsUI.forEach((v) => {
            v.visibility = mw.SlateVisibility.Hidden;
        });
        this.tipsUI.length = 0;
    }
    /**
     * 设置引导到目标点
     * @param targetPos 目标点
     * @param callback 回调
     */
    async setGuideArrowTargetPos(targetPos, callback, bUpdateArrow = false, uiData) {
        // 检查玩家是否到达目标点
        ModuleService.getModule(GuideModuleC);
        if (uiData && !this.tipsActive) {
            let tweenUI = null;
            uiData.uiName?.forEach((e, i) => {
                let ui = this.rootCanvas.getChildByName(e);
                ui.visibility = mw.SlateVisibility.HitTestInvisible;
                this.tipsUI.push(ui);
                if (e.indexOf(`Canvas`) >= 0) {
                    tweenUI = ui;
                }
            });
            //tween动画
            if (uiData.isEnableTween) {
                // console.log(`tweenUI名称！！！！${tweenUI.name}`);
                this.setGuideArrowTargetPosUiTip(tweenUI, uiData.startPos, uiData.endPos, uiData.scale);
            }
            //锁定ui
            if (uiData.lockUI) {
                this.lockMWUIWidget(uiData.lockUI, null, null, true, false, 2);
            }
        }
        if (!bUpdateArrow) {
            //oTrace("设置到达目标点");
            // 设置到达目标点后的回调
            this.toTargetPosCallback = callback;
            // 设置目标点
            this.targetPos = targetPos;
        }
        let playerPos = DataManager.gameDis;
        if (playerPos > targetPos.x) {
            // 回调到达目标点
            if (this.toTargetPosCallback) {
                let res = this.toTargetPosCallback();
                if (!res)
                    return;
                this.showMask(false);
                this.resetTweenAnimation();
            }
            this.toTargetPosCallback = null;
            return;
        }
    }
    setGuideArrowTargetPosUiTip(ui, startPos, endPos, scale) {
        if (this.tipsTween && this.tipsTween.isPlaying()) {
            this.tipsTween.stop();
        }
        let tScale = scale ? scale : 1;
        let uiScale = mw.Vector2.zero;
        this.tipsTween = new mw.Tween({ loc: startPos.clone(), scale: tScale }).to({ loc: endPos.clone(), scale: 1 }, 1000).onUpdate(v => {
            ui.position = v.loc;
            uiScale.x = v.scale;
            uiScale.y = v.scale;
            ui.renderScale = uiScale;
        }).onStop(() => {
            ui.renderScale = mw.Vector2.one;
            this.tipsUI?.forEach(e => {
                e.visibility = mw.SlateVisibility.Hidden;
            });
        }).repeat(Infinity).onComplete(() => {
            this.tipsUI.forEach((v) => {
                v.visibility = mw.SlateVisibility.Hidden;
            });
        }).onRepeat(() => {
            if (DataManager.isGuideTips && DataManager.isGuideScene) {
                ui.position = startPos.clone();
                this.tipsUI?.forEach(e => {
                    e.visibility = mw.SlateVisibility.Visible;
                });
                DataManager.isGuideTips = false;
            }
            else {
                this.tipsUI?.forEach(e => {
                    e.visibility = mw.SlateVisibility.Hidden;
                });
            }
        }).start();
    }
    /**
     * 锁定对象
     * @param target
     * @param callback
     * @param tips
     * @param isShowBtn 需要监听自定义条件的时候才会展示
     * @param isShowMask
     * @returns
     */
    lockMWUIWidget(target, callback, tips = "", isShowBtn = true, isShowMask, handDir = 1) {
        if (target.tickSpaceGeometry == null || this.activeLockTween) {
            return;
        }
        // 获取target的slot信息
        let target_slot = target;
        mw.localToViewport(target.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
        // 如果对象是一个按钮，则同时添加一个监听消息，点击覆盖区域后触发对应按钮事件
        if (this.bindTarget != target) {
            this.btnClickToGuide = callback;
            this.bindTarget = target;
            if (target instanceof mw.Button || target instanceof mw.StaleButton) {
                //技能引导、部分因gameui层级与guidemoduleview层级不同做的特殊处理
                if (target.name == `btnItem2`) {
                    let skiilButtonClick;
                    skiilButtonClick = () => {
                        this.buttonClick();
                        target.onClicked.remove(skiilButtonClick);
                    };
                    target.onClicked.add(skiilButtonClick);
                }
                else {
                    this.btnClickToTarget = () => {
                        target.onClicked.broadcast();
                    };
                }
            }
        }
        if (!this.outViewPos || this.outViewPos.equals(mw.Vector2.zero)) {
            return;
        }
        const viewportSize = mw.WindowUtil.getViewportSize();
        let targetSlotSize = target_slot.size;
        if (isShowMask) {
            this.showMask(true, isShowMask);
            let duration = 500;
            Utils.setUIVisible(true, this.mTouchMask);
            //top
            this.mTopMask.position = mw.Vector2.zero;
            ActionMgr.instance.runTween({ sizeX: viewportSize.x, sizeY: 0 }, this)
                .to({ sizeX: viewportSize.x, sizeY: this.outViewPos.y }, duration)
                .onUpdate((obj) => {
                this.mTopMask.size = new mw.Vector2(obj.sizeX, obj.sizeY);
            }).start();
            //bottom
            this.mButtomMask.position = new mw.Vector2(0, this.uiObject.size.y);
            const bottomSize = this.mButtomMask.size.clone();
            ActionMgr.instance.runTween({ sizeX: viewportSize.x, sizeY: bottomSize.y, posX: this.mButtomMask.position.x, posY: this.mButtomMask.position.y }, this)
                .to({ sizeX: viewportSize.x, sizeY: this.uiObject.size.y - this.outViewPos.y - targetSlotSize.y, posX: 0, posY: this.outViewPos.y + targetSlotSize.y }, duration)
                .onUpdate((obj) => {
                this.mButtomMask.size = new mw.Vector2(obj.sizeX, obj.sizeY);
                this.mButtomMask.position = new mw.Vector2(obj.posX, obj.posY);
            }).start();
            //Left
            this.mLeftMask.size = new mw.Vector2(0, this.uiObject.size.y);
            this.mLeftMask.position = new mw.Vector2(0, 0);
            ActionMgr.instance.runTween({ sizeX: 0, sizeY: this.mLeftMask.size.y, posX: 0, posY: 0 }, this)
                .to({ sizeX: this.outViewPos.x, sizeY: targetSlotSize.y, posX: 0, posY: this.outViewPos.y }, duration)
                .onUpdate((obj) => {
                this.mLeftMask.size = new mw.Vector2(obj.sizeX, obj.sizeY);
                this.mLeftMask.position = new mw.Vector2(obj.posX, obj.posY);
            }).start();
            //Right
            this.mRightMask.size = new mw.Vector2(0, this.uiObject.size.y);
            this.mRightMask.position = new mw.Vector2(this.uiObject.size.x, 0);
            ActionMgr.instance.runTween({ sizeX: this.mRightMask.size.x, sizeY: this.mRightMask.size.y, posX: this.mRightMask.position.x, posY: this.mRightMask.position.y }, this)
                .to({
                sizeX: this.uiObject.size.x - this.outViewPos.x - targetSlotSize.x,
                sizeY: targetSlotSize.y,
                posX: this.outViewPos.x + targetSlotSize.x,
                posY: this.outViewPos.y
            }, duration)
                .onUpdate((obj) => {
                this.mRightMask.size = new mw.Vector2(obj.sizeX, obj.sizeY);
                this.mRightMask.position = new mw.Vector2(obj.posX, obj.posY);
            })
                .onComplete(() => {
                Utils.setUIVisible(true, this.mBtnHand);
                Utils.setUIVisible(false, this.mTouchMask);
            })
                .start();
        }
        //设置手指
        this.mBtnHand.position =
            new mw.Vector2(this.outViewPos.x + targetSlotSize.x / 2 - this.mBtnHand.size.x / 2, this.outViewPos.y + targetSlotSize.y / 2);
        // 设置button区域
        this.mBtn.position = new mw.Vector2(this.outViewPos.x, this.outViewPos.y);
        this.mBtn.size = new mw.Vector2(target_slot.size.x, target_slot.size.y);
        if (isShowBtn)
            this.mBtn.visibility = (mw.SlateVisibility.Visible);
        else
            this.mBtn.visibility = (mw.SlateVisibility.Hidden);
        this.lockUIHandAction(target, handDir, isShowMask);
        this.activeLockTween = true;
    }
    /**
     * 指示ui的tween动画
     * @param targetUI
     * @param dir
     * @param isScale
     */
    lockUIHandAction(targetUI, dir, isScale) {
        Utils.setUIVisible(!isScale, this.mBtnHand);
        let curPos = this.mBtnHand.position.clone();
        let start;
        let end;
        switch (dir) {
            //向下指
            case 1:
                end = curPos.clone().add(new mw.Vector2(0, -350));
                start = curPos.clone().add(new mw.Vector2(0, -250));
                this.mBtnHand.renderTransformAngle = 180;
                break;
            //向上指
            case 2:
                end = curPos.clone().add(new mw.Vector2(0, 250));
                start = curPos.clone().add(new mw.Vector2(0, 120));
                this.mBtnHand.renderTransformAngle = 0;
                break;
        }
        let prePos = this.mBtnHand.position;
        let tScale = isScale ? 1 : 1.5;
        let tRenderScale = mw.Vector2.zero;
        this.lockHandTween = new mw.Tween({ loc: end, scale: 1 }).to({ loc: start, scale: tScale }, 1000).onUpdate((v) => {
            this.mBtnHand.position = v.loc;
            tRenderScale.x = v.scale;
            tRenderScale.y = v.scale;
            targetUI.renderScale = tRenderScale;
        }).repeat(Infinity).onStop(() => {
            Utils.setUIVisible(false, this.mBtnHand);
            this.mBtnHand.position = prePos;
            this.activeLockTween = false;
            targetUI.renderScale = mw.Vector2.one;
        }).start();
    }
}

var foreign47 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GuideModuleView: GuideModuleView
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/GameEndUI.ui
 * TIME: 2023.05.15-17.19.24
 */
let GameEndUI_generate = class GameEndUI_generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mTxt_MoneyNum = undefined;
        this.mTxt_PointNum = undefined;
        this.mTxt_overScore = undefined;
        this.mTxt_overCoin = undefined;
        this.tipNew = undefined;
        this.mBtn_BackHome = undefined;
        this.mBtn_Shop = undefined;
        this.mBtn_Role = undefined;
        this.mCanvasRole = undefined;
        this.mBtn_Continue = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        //按钮添加点击
        // 
        // this.mBtn_BackHome.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_BackHome");
        // })
        // this.mBtn_BackHome.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        // this.mBtn_Shop.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Shop");
        // })
        // this.mBtn_Shop.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        // this.mBtn_Role.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Role");
        // })
        // this.mBtn_Role.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        // this.mBtn_Continue.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Continue");
        // })
        // this.mBtn_Continue.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        //按钮多语言
        //文本多语言
        this.initLanguage(this.mTxt_MoneyNum);
        this.initLanguage(this.mTxt_PointNum);
        this.initLanguage(this.mTxt_overScore);
        this.initLanguage(this.mTxt_overCoin);
        //文本多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWTextBlock_1"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/tipNew/MWNew"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWCanvas_1/CanvasStart_1/MWTextBlock_1"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWCanvas_1/MWCanvas_3_1/MWTextBlock_1"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWCanvas_1/mCanvasRole/MWTextBlock_1"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWCanvas_1/CanvasStart/MWTextBlock_1"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Canvas_Money/mTxt_MoneyNum')
], GameEndUI_generate.prototype, "mTxt_MoneyNum", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/Canvas_Points/mTxt_PointNum')
], GameEndUI_generate.prototype, "mTxt_PointNum", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/MWCanvas_2/mTxt_overScore')
], GameEndUI_generate.prototype, "mTxt_overScore", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTxt_overCoin')
], GameEndUI_generate.prototype, "mTxt_overCoin", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/tipNew')
], GameEndUI_generate.prototype, "tipNew", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/CanvasStart_1/mBtn_BackHome')
], GameEndUI_generate.prototype, "mBtn_BackHome", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/MWCanvas_3_1/mBtn_Shop')
], GameEndUI_generate.prototype, "mBtn_Shop", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/mCanvasRole/mBtn_Role')
], GameEndUI_generate.prototype, "mBtn_Role", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/mCanvasRole')
], GameEndUI_generate.prototype, "mCanvasRole", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/CanvasStart/mBtn_Continue')
], GameEndUI_generate.prototype, "mBtn_Continue", void 0);
GameEndUI_generate = __decorate([
    UIBind('UI/GameEndUI.ui')
], GameEndUI_generate);
var GameEndUI_generate$1 = GameEndUI_generate;

var foreign60 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GameEndUI_generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/ShopCityUI.ui
 * TIME: 2023.05.15-17.19.24
 */
let ShopCityUI_generate = class ShopCityUI_generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mPropMidCanvas = undefined;
        this.mSkillMidCanvas = undefined;
        this.mScrollBox = undefined;
        this.mTxt_Shield = undefined;
        this.mTxt_Rebirth = undefined;
        this.mTxt_Coin = undefined;
        this.mTxt_Diamonds = undefined;
        this.mBtn_BackLobby = undefined;
        this.mTopCanvas = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        //按钮添加点击
        // 
        // this.mBtn_BackLobby.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_BackLobby");
        // })
        // this.mBtn_BackLobby.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        //按钮多语言
        //文本多语言
        this.initLanguage(this.mTxt_Shield);
        this.initLanguage(this.mTxt_Rebirth);
        this.initLanguage(this.mTxt_Coin);
        this.initLanguage(this.mTxt_Diamonds);
        //文本多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/mTopCanvas/MWCanvas_2/MWTextBlock_2"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mScrollBox/mPropMidCanvas')
], ShopCityUI_generate.prototype, "mPropMidCanvas", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mScrollBox/mSkillMidCanvas')
], ShopCityUI_generate.prototype, "mSkillMidCanvas", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mScrollBox')
], ShopCityUI_generate.prototype, "mScrollBox", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTopCanvas/MWCanvas_1/mTxt_Shield')
], ShopCityUI_generate.prototype, "mTxt_Shield", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTopCanvas/MWCanvas_1_1/mTxt_Rebirth')
], ShopCityUI_generate.prototype, "mTxt_Rebirth", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTopCanvas/MWCanvas_1_3/mTxt_Coin')
], ShopCityUI_generate.prototype, "mTxt_Coin", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTopCanvas/MWCanvas_1_2/mTxt_Diamonds')
], ShopCityUI_generate.prototype, "mTxt_Diamonds", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTopCanvas/MWCanvas_2/mBtn_BackLobby')
], ShopCityUI_generate.prototype, "mBtn_BackLobby", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTopCanvas')
], ShopCityUI_generate.prototype, "mTopCanvas", void 0);
ShopCityUI_generate = __decorate([
    UIBind('UI/ShopCityUI.ui')
], ShopCityUI_generate);
var ShopCityUI_generate$1 = ShopCityUI_generate;

var foreign75 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ShopCityUI_generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/ShopCityItemUI.ui
 * TIME: 2023.05.15-17.19.24
 */
let ShopCityItemUI_generate = class ShopCityItemUI_generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mIcon_Prop = undefined;
        this.mTxt_PropName = undefined;
        this.mTxt_Num = undefined;
        this.mBtn_Buy = undefined;
        this.mTxt_Price = undefined;
        this.mIcon_coin = undefined;
        this.mIcon_Diamonds = undefined;
        this.micon_1 = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        //按钮添加点击
        // 
        // this.mBtn_Buy.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Buy");
        // })
        // this.mBtn_Buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        //按钮多语言
        //文本多语言
        this.initLanguage(this.mTxt_PropName);
        this.initLanguage(this.mTxt_Num);
        this.initLanguage(this.mTxt_Price);
        //文本多语言
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('MWCanvas_2147482460/TopCanvas/mIcon_Prop')
], ShopCityItemUI_generate.prototype, "mIcon_Prop", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/TopCanvas/mTxt_PropName')
], ShopCityItemUI_generate.prototype, "mTxt_PropName", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/TopCanvas/mTxt_Num')
], ShopCityItemUI_generate.prototype, "mTxt_Num", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/DownCanvas/mBtn_Buy')
], ShopCityItemUI_generate.prototype, "mBtn_Buy", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/DownCanvas/mTxt_Price')
], ShopCityItemUI_generate.prototype, "mTxt_Price", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/DownCanvas/mIcon_coin')
], ShopCityItemUI_generate.prototype, "mIcon_coin", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/DownCanvas/mIcon_Diamonds')
], ShopCityItemUI_generate.prototype, "mIcon_Diamonds", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/DownCanvas/micon_1')
], ShopCityItemUI_generate.prototype, "micon_1", void 0);
ShopCityItemUI_generate = __decorate([
    UIBind('UI/ShopCityItemUI.ui')
], ShopCityItemUI_generate);
var ShopCityItemUI_generate$1 = ShopCityItemUI_generate;

var foreign74 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ShopCityItemUI_generate$1
});

/**
 * @Author       : pengwei.shi
 * @Date         : 2022-12-05 11:38:37
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2022-12-05 14:51:33
 * @FilePath     : \streetparkour\JavaScripts\ui\UIShopCityItem.ts
 * @Description  : 修改描述
 */
class UIShopCityItem extends ShopCityItemUI_generate$1 {
    get propID() {
        return this._propID;
    }
    initUI(propID) {
        let data = GameConfig.Item.getElement(propID);
        this.mIcon_Prop.imageGuid = data.icon;
        this.mTxt_PropName.text = Utils.getTxt(data.name);
        this.mTxt_Price.text = data.price.toFixed(0);
        this._propID = propID;
        this.mBtn_Buy.onClicked.add(() => {
            Event.dispatchToLocal(SPUIEvent.PropPress, this._propID);
        });
        Utils.setUIVisible(false, this.mIcon_Diamonds, this.mIcon_coin);
        if (data.priceType == PriceType.Coin) {
            Utils.setUIVisible(true, this.mIcon_coin);
        }
        else {
            Utils.setUIVisible(true, this.mIcon_Diamonds);
        }
        this.setPropNum();
    }
    /**
     * 设置当前玩家获得该道具的数量
     * @param num
     */
    setPropNum() {
        let num = ModuleService.getModule(ItemModuleC).getItemCount(this._propID);
        this.mTxt_Num.text = num.toString();
    }
}

var foreign58 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UIShopCityItem: UIShopCityItem
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/SkillItemUI.ui
 * TIME: 2023.05.15-17.19.24
 */
let SkillItemUI_generate = class SkillItemUI_generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mTxt_ActiveTime = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        //按钮添加点击
        // 
        //按钮多语言
        //文本多语言
        this.initLanguage(this.mTxt_ActiveTime);
        //文本多语言
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTxt_ActiveTime')
], SkillItemUI_generate.prototype, "mTxt_ActiveTime", void 0);
SkillItemUI_generate = __decorate([
    UIBind('UI/SkillItemUI.ui')
], SkillItemUI_generate);
var SkillItemUI_generate$1 = SkillItemUI_generate;

var foreign76 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SkillItemUI_generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/SkillUI.ui
 * TIME: 2023.05.15-17.19.24
 */
let SkillUI_generate = class SkillUI_generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mImg_Icon = undefined;
        this.mTxt_Name = undefined;
        this.mTxt_Des = undefined;
        this.mLevelContent = undefined;
        this.mBtn_LvUp = undefined;
        this.mIcon_coin = undefined;
        this.mIcon_Diamonds = undefined;
        this.mTxt_Price = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        //按钮添加点击
        // 
        // this.mBtn_LvUp.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_LvUp");
        // })
        // this.mBtn_LvUp.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        //按钮多语言
        //文本多语言
        this.initLanguage(this.mTxt_Name);
        this.initLanguage(this.mTxt_Des);
        this.initLanguage(this.mTxt_Price);
        //文本多语言
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mImg_Icon')
], SkillUI_generate.prototype, "mImg_Icon", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTxt_Name')
], SkillUI_generate.prototype, "mTxt_Name", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTxt_Des')
], SkillUI_generate.prototype, "mTxt_Des", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mLevelContent')
], SkillUI_generate.prototype, "mLevelContent", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/MWCanvas_2/mBtn_LvUp')
], SkillUI_generate.prototype, "mBtn_LvUp", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/MWCanvas_2/mIcon_coin')
], SkillUI_generate.prototype, "mIcon_coin", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/MWCanvas_2/mIcon_Diamonds')
], SkillUI_generate.prototype, "mIcon_Diamonds", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/MWCanvas_2/mTxt_Price')
], SkillUI_generate.prototype, "mTxt_Price", void 0);
SkillUI_generate = __decorate([
    UIBind('UI/SkillUI.ui')
], SkillUI_generate);
var SkillUI_generate$1 = SkillUI_generate;

var foreign77 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SkillUI_generate$1
});

/**
 * @Author       : pengwei.shi
 * @Date         : 2022-12-02 13:52:36
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-01-12 15:18:32
 * @FilePath     : \streetparkour\JavaScripts\ui\UISkill.ts
 * @Description  : 修改描述
 */
/*
 * @Author: pengwei.shi
 * @Date: 2022-11-22 17:47:45
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-28 10:27:37
 * @FilePath: \streetparkour\JavaScripts\ui\UISkill.ts
 * @Description:
 */
class UISkillItem extends SkillItemUI_generate$1 {
    setActiveTime(time) {
        this.mTxt_ActiveTime.text = time.toString();
    }
}
class UISkill extends SkillUI_generate$1 {
    get skillID() {
        return this._skillID;
    }
    /**
     * 初始化技能ui界面
     * @param id
     * @param currentLv 当前等级
     * @param row 行距
     */
    initUI(id, currentLv, row) {
        this._itemCfg = GameConfig.Item.getElement(id);
        this._row = row;
        this._skillID = id;
        this._curLvIndex = -1;
        this.mTxt_Des.text = Utils.getTxt(this._itemCfg.desc);
        this.mTxt_Name.text = Utils.getTxt(this._itemCfg.name);
        this._pos = mw.Vector2.zero;
        this.mImg_Icon.imageGuid = this._itemCfg.icon;
        this._activeTimeList = this._itemCfg.time.concat();
        //添加等级ui、设置每个等级的技能持续时间
        this.addSkillLevelItem(currentLv);
        this.mBtn_LvUp.onClicked.add(() => {
            Event.dispatchToLocal(SPUIEvent.SkillLvUp, this._skillID);
        });
        this.refreshSkillLevelUI(currentLv);
    }
    /**
     * 刷新当前等级ui
     * @param lv
     */
    refreshSkillLevelUI(lv) {
        if (lv > this._curLvIndex) {
            this.addSkillLevelItem(lv);
        }
        this.refreshPriceTypeUI(lv);
    }
    /**
     * 添加等级ui
     * @param lv
     */
    addSkillLevelItem(lv) {
        let preSizeX = 0;
        for (let i = this._curLvIndex + 1; i <= lv; i++) {
            let ui = mw.UIService.create(UISkillItem);
            let preSlot = ui.uiObject;
            preSizeX = preSlot.size.x;
            this.mLevelContent.addChild(ui.uiObject);
            preSlot.position = this._pos;
            this._pos.x += this._row;
            this._pos.x += preSizeX;
            ui.setActiveTime(this._activeTimeList[i]);
            //前一个技能等级ui变暗
            if (this._preLevelItemUI) {
                this._preLevelItemUI.uiObject.renderOpacity = 0.5;
            }
            this._preLevelItemUI = ui;
        }
        this._curLvIndex = lv;
    }
    refreshPriceTypeUI(lv) {
        Utils.setUIVisible(false, this.mIcon_Diamonds, this.mIcon_coin);
        if (this._itemCfg.upType[lv] == PriceType.Coin) {
            Utils.setUIVisible(true, this.mIcon_coin);
        }
        else if (this._itemCfg.upType[lv] == PriceType.Diamonds) {
            Utils.setUIVisible(true, this.mIcon_Diamonds);
        }
        if (this._itemCfg.upCost[lv]) {
            this.mTxt_Price.text = this._itemCfg.upCost[lv].toString();
        }
        else {
            this.mIcon_Diamonds.visibility = mw.SlateVisibility.Collapsed;
            this.mIcon_coin.visibility = mw.SlateVisibility.Collapsed;
            this.mTxt_Price.text = Utils.getTxt(`UI_Tips_1`);
        }
    }
}

var foreign59 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UISkill: UISkill
});

/**
 * @Author       : pengwei.shi
 * @Date         : 2022-12-02 13:52:36
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2022-12-05 10:33:02
 * @FilePath     : \streetparkour\JavaScripts\ui\UIShopCity.ts
 * @Description  : 商城ui
 */
class UIShopCity extends ShopCityUI_generate$1 {
    constructor() {
        super(...arguments);
        /**
         * 购买道具
         * @param propID
         */
        this.buyProp = (propID) => {
            let data = this._propCfg.find(i => i.id == propID);
            if (this._gameModule.enough(data.priceType, data.price)) {
                this._gameModule.cost(data.priceType, data.price);
                this._itemModule.addItem(propID, 1, true);
                //更新界面数量
                let ui = this._propMap.find(i => i.propID == propID);
                ui.setPropNum();
                this.refreshUINum();
                Sound.instance.gameSound(SPSound.BuyRole);
            }
        };
        /**
         * 技能升级
         * @param id
         */
        this.upSkillLevel = (id) => {
            let skillUI = this._skillMap.find(i => i.skillID == id);
            if (skillUI) {
                if (this._itemModule.upItem(id)) {
                    let lv = this._itemModule.getItemLv(id);
                    skillUI.refreshSkillLevelUI(lv);
                    this.refreshUINum();
                }
            }
        };
    }
    get getItem() {
        return this._propMap[0];
    }
    onStart() {
        this.layer = mw.UILayerMiddle;
        this._propCfg = [];
        this._propCfg = GameConfig.Item.getAllElement();
        this._gameModule = ModuleService.getModule(GameModuleC);
        this._itemModule = ModuleService.getModule(ItemModuleC);
        this.mBtn_BackLobby.onClicked.add(() => {
            mw.UIService.show(UILobby);
            mw.UIService.hide(UIShopCity);
            Sound.instance.gameSound(SPSound.PressButton);
        });
        let pos = mw.Vector2.zero;
        //初始化道具模块
        this._propMap = [];
        this.initPropCanvas(pos);
        Event.addLocalListener(SPUIEvent.PropPress, this.buyProp);
        //初始化技能模块
        this._skillMap = [];
        this.initSkillsCanvas(pos);
        Event.addLocalListener(SPUIEvent.SkillLvUp, this.upSkillLevel);
        this.refreshUINum();
    }
    /**
     * 初始化道具界面
     */
    initPropCanvas(pos) {
        /**行距 */
        let propRow = 90;
        /**列距 */
        let propColumn = 90;
        /**一行显示几个商品 */
        let propRowNum = 2;
        let propSize;
        let propPos = pos;
        for (let prop of this._propCfg) {
            if (prop.type > 0) {
                let ui = mw.UIService.create(UIShopCityItem);
                ui.initUI(prop.id);
                this._propMap.push(ui);
            }
        }
        if (!this._propMap[0]) {
            console.warn(`道具商城数量为0`);
            return;
        }
        propSize = this._propMap[0].rootCanvas.size;
        let t = 0;
        propPos.x = propRow;
        for (let propUI of this._propMap) {
            t += 1;
            this.mScrollBox.addChild(propUI.uiObject);
            propUI.uiObject.position = propPos;
            propPos.x += propSize.x;
            propPos.x += propRow;
            //换行
            if (t >= propRowNum) {
                t = 0;
                propPos.y += propSize.y;
                propPos.y += propColumn;
                propPos.x = propRow;
            }
        }
        propPos.x = 0;
        this.guideItem = this._propMap[0].mBtn_Buy;
    }
    /**
     * 初始化技能界面
     */
    initSkillsCanvas(pos) {
        /**技能列距 */
        let skillColumn = 20;
        /**技能子级等级的行距 */
        let skillLvItemRow = 18;
        let skillPos = pos;
        let preSize = null;
        skillPos.x = 0;
        for (let prop of this._propCfg) {
            if (prop.type > 1) {
                let ui = mw.UIService.create(UISkill);
                if (!preSize) {
                    preSize = ui.uiObject.size;
                }
                this.mScrollBox.addChild(ui.uiObject);
                ui.uiObject.position = skillPos;
                ui.uiObject.size = preSize;
                //初始化技能ui
                let lv = this._itemModule.getItemLv(prop.id);
                ui.initUI(prop.id, lv, skillLvItemRow);
                this._skillMap.push(ui);
                skillPos.y += preSize.y;
                skillPos.y += skillColumn;
            }
        }
    }
    /**
     * 刷新道具、货币数量
     */
    refreshUINum() {
        this.mTxt_Shield.text = this._itemModule.getItemCount(2).toString();
        this.mTxt_Rebirth.text = this._itemModule.getItemCount(1).toString();
        this.mTxt_Coin.text = this._gameModule.curCoin.toString();
        this.mTxt_Diamonds.text = this._gameModule.curGem.toString();
    }
    onShow() {
        MGSCenter.ts_task(1);
        this.mScrollBox.scrollOffset = 0;
        //每次打开都需要刷新
        this.refreshUINum();
        this._propMap.forEach(item => {
            item.setPropNum();
        });
        let gmc = ModuleService.getModule(GuideModuleC);
        if (DataManager.isGuideShop && gmc.currentGuideIsNull) {
            let time = setTimeout(() => {
                gmc.triggerGuide(10);
                clearTimeout(time);
            }, 100);
        }
    }
}

var foreign57 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UIShopCity: UIShopCity
});

/*
 * @Author: pengwei.shi
 * @Date: 2022-11-10 19:16:18
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-27 13:45:10
 * @FilePath: \streetparkour\JavaScripts\ui\UIGameOver.ts
 * @Description:
 */
class UIGameOver extends GameEndUI_generate$1 {
    constructor() {
        super(...arguments);
        /**显示动画 */
        this._delay = 0.5;
        this._coin = 0;
        this._maxCoin = 0;
        this._maxScore = 0;
        this._score = 0;
        this._lastScore = 0;
    }
    onStart() {
        this._gameModule = ModuleService.getModule(GameModuleC);
        //调用接口继续游戏
        this.mBtn_Continue.onClicked.add(() => {
            this._gameModule.gameStart();
            mw.UIService.show(GameUI, true);
            mw.UIService.hide(UIGameOver);
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.gameContine();
        });
        //回到大厅
        this.mBtn_BackHome.onClicked.add(() => {
            mw.UIService.show(UILobby, true);
            mw.UIService.hide(UIGameOver);
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.backLobby();
        });
        //跳转到角色界面逻辑
        this.mBtn_Role.onClicked.add(() => {
            mw.UIService.show(UIRole);
            mw.UIService.hide(UIGameOver);
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.mgsGameOverRole();
        });
        //跳转到商店
        this.mBtn_Shop.onClicked.add(() => {
            mw.UIService.show(UIShopCity);
            mw.UIService.hide(UIGameOver);
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.mgsGameOverShop();
        });
        this.canUpdate = true;
    }
    onShow() {
        this.mgsGameOver();
        this.mgsRefreshRecord();
        this._delay = 0.5;
        this.tipNew.visibility = mw.SlateVisibility.Collapsed;
        this._lastScore = this._gameModule.maxScore;
        this.mTxt_PointNum.text = this._lastScore.toFixed(0);
        this.mTxt_MoneyNum.text = this._gameModule.curCoin.toFixed(0);
        this._coin = 0;
        this._maxCoin = DataManager.coinNum;
        this._maxScore = DataManager.endScore;
        this._score = DataManager.curScore;
        this.mTxt_overCoin.text = '0';
        this.mTxt_overScore.text = this._score.toFixed(0);
        this._gameModule.gameEnd();
        Sound.instance.gameSound(SPSound.GameOver);
        if (DataManager.isGuideShop) {
            MGSCenter.ts_action_firstdo(1);
            Utils.setUIVisible(false, this.mCanvasRole);
            mw.UIService.getUI(GameUI).guideButtonAction(1);
            let time = setTimeout(() => {
                ModuleService.getModule(GuideModuleC).triggerGuide(3);
                clearTimeout(time);
            }, 100);
        }
        if (DataManager.isGuideRole && !DataManager.isGuideShop) {
            MGSCenter.ts_action_firstdo(4);
            let time = setTimeout(() => {
                ModuleService.getModule(GuideModuleC).triggerGuide(5);
                clearTimeout(time);
            }, 100);
        }
    }
    onUpdate(dt) {
        this._delay -= dt;
        if (this._delay > 0)
            return;
        if (this._coin < this._maxCoin) {
            this._coin += this._maxCoin * dt;
            if (this._coin >= this._maxCoin) {
                this._coin = this._maxCoin;
                this.mTxt_MoneyNum.text = this._gameModule.curCoin.toFixed(0);
            }
            this.mTxt_overCoin.text = this._coin.toFixed(0);
        }
        if (this._score < this._maxScore) {
            this._score += this._maxCoin * dt * 12;
            if (this._score >= this._maxScore) {
                this._score = this._maxScore;
                this.mTxt_PointNum.text = this._gameModule.maxScore.toFixed(0);
                if (this._score > this._lastScore) {
                    this.tipNew.visibility = (mw.SlateVisibility.Visible);
                    Sound.instance.gameSound(SPSound.OverMaxScore);
                }
            }
            this.mTxt_overScore.text = this._score.toFixed(0);
        }
    }
    /**
     * 游戏结束埋点
     */
    mgsGameOver() {
        DataManager.gameRound += 1;
        MGSCenter.ts_game_result(DataManager.gameTime, DataManager.gameRound);
        MGSCenter.ts_game_over_one(DataManager.endScore, DataManager.coinNum);
        //被动使用
        let sheild = DataManager.gameItems.get(2);
        let flyNum = DataManager.gameItems.get(3)?.pick || 0;
        let doubleCoin = DataManager.gameItems.get(5)?.pick || 0;
        MGSCenter.ts_game_over_three(DataManager.gemNum, sheild?.pick || 0, flyNum, doubleCoin, sheild?.use || 0, DataManager.reliveNum);
        //主动使用
        let activeFly = DataManager.gameItems.get(3)?.use || 0;
        let activeDoubleCoin = DataManager.gameItems.get(5)?.use || 0;
        MGSCenter.ts_action_pick(activeFly, activeDoubleCoin);
        //生成的道具和吃到的道具比值
        let getItems = 0;
        for (let [k, v] of DataManager.gameItems) {
            getItems += v.pick;
        }
        let ratio = getItems / DataManager.totalItems;
        MGSCenter.ts_game_over(ratio);
        // console.log(`生成的总道具 ${DataManager.totalItems}, 吃到的道具 ${getItems}`);
    }
    /**
     * 刷新记录
     */
    mgsRefreshRecord() {
        let gameModule = ModuleService.getModule(GameModuleC);
        if (gameModule.maxScore < DataManager.endScore) {
            DataManager.roundWave += 1;
            MGSCenter.ts_game_over_two(DataManager.roundWave);
        }
    }
}

var foreign48 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UIGameOver: UIGameOver
});

/**
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2023-02-06 16:37
 * @LastEditTime : 2023-08-20 11:04
 * @description  :
 */
/*
 * @Author: YuKun.Gao
 * @Date: 2022-06-29 15:33:59
 * @LastEditors: YuKun.Gao
 * @LastEditTime: 2022-07-04 19:10:22
 * @Description: file content
 * @FilePath: \JavaScripts\module\guideModule\GuideContent.ts
 */
class GuideContent {
}
/**
 * 引导线Guid
 */
GuideContent.GuideArrowGuid = "197413";
/**
 * 引导线材质Guid
 */
GuideContent.GuideArrowMartialGuid = "196988";
/**
 * 目的地特效Guid
 */
GuideContent.GuideWorldTargetEffectGuid = "197483";
/**
 * 新手引导UI刷新时间
 */
GuideContent.ConstRefrashUITime = 0.1;

var foreign24 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GuideContent: GuideContent
});

/*
 * @Author: YuKun.Gao
 * @Date: 2022-06-27 10:36:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-01 14:41:49
 * @Description: file content
 * @FilePath: \JavaScripts\module\guideModule\GuideInfo.ts
 */
/**
 * 引导信息
 */
var GuideState;
(function (GuideState) {
    /**
     * 拉取任务
     * */
    GuideState[GuideState["Pull"] = 0] = "Pull";
    /**
     * 等待完成UI
     */
    GuideState[GuideState["WaitUI"] = 1] = "WaitUI";
    /**
     * 等待到达世界坐标
     */
    GuideState[GuideState["WaitToPos"] = 2] = "WaitToPos";
    /**
     * 等待完成自定义条件
     */
    GuideState[GuideState["ConditionRes"] = 3] = "ConditionRes";
    /**
     * 执行自定义函数
     */
    GuideState[GuideState["RunFunc"] = 4] = "RunFunc";
    /**
     * 完成
     */
    GuideState[GuideState["Complate"] = 5] = "Complate";
})(GuideState || (GuideState = {}));
/**
 * 引导任务阶段
 */
class GuideTaskStage {
    constructor() {
        /**
         * UI关联组件
         */
        this.uiWidget = null;
        /**
         * 默认刷新dt
         */
        this.refrashDt = GuideContent.ConstRefrashUITime;
        /**
         * 当前刷新UI的dt
         */
        this.curReFrashDt = 0;
        /**
         * 需要引导到达的位置
         */
        this.toWorldPos = null;
        /**
         * UI完成需要检测的条件
         */
        this.uiCheckCondition = null;
        /**
         * 完成需要检测的条件
         */
        this.checkCondition = [];
        /**
         * 引导UI时的提示语言
         */
        this.tips = "";
        /**
         * 需要执行的自定义函数
         */
        this.runFuncs = [];
        /**提示ui的id */
        this.uiTipsID = 0;
        /**手指的指向 */
        this.handDir = 1;
        this.isShowMask = true;
    }
    copy() {
        let condition = null;
        switch (this.type) {
            case GuideState.WaitUI:
                condition = this.uiWidget;
                break;
            case GuideState.WaitToPos:
                condition = this.toWorldPos;
                break;
            case GuideState.ConditionRes:
                condition = this.checkCondition;
                break;
        }
        let res = GuideTaskStage.newGuideTaskStage(this.type, condition, this.uiTipsID, this.runFuncs, this.uiCheckCondition, this.handDir, this.isShowMask);
        res.tips = this.tips;
        return res;
    }
    /**
     * 创建引导任务阶段
     * @param type 类型
     * @param condition 条件
     */
    static newGuideTaskStage(type, condition, uiTipsID = 0, runFuncs = [], uiConditionRes = null, handDir = 1, isShowMask = true) {
        let guideTaskStage = new GuideTaskStage();
        guideTaskStage.type = type;
        guideTaskStage.uiTipsID = uiTipsID;
        guideTaskStage.handDir = handDir;
        guideTaskStage.isShowMask = isShowMask;
        switch (type) {
            case GuideState.WaitUI:
                if (condition instanceof mw.Widget) {
                    guideTaskStage.uiWidget = condition;
                }
                guideTaskStage.uiCheckCondition = uiConditionRes;
                break;
            case GuideState.WaitToPos:
                if (condition instanceof mw.Vector)
                    guideTaskStage.toWorldPos = condition;
                guideTaskStage.uiCheckCondition = uiConditionRes;
                break;
            case GuideState.ConditionRes:
                if (condition instanceof Array)
                    guideTaskStage.checkCondition = condition;
                break;
            case GuideState.RunFunc:
                guideTaskStage.runFuncs = runFuncs;
                break;
        }
        return guideTaskStage;
    }
}
/**
 * 引导信息
 */
class GuideInfo {
    constructor(complateNotify) {
        /**
         * 引导阶段
         */
        this.guideStage = 0;
        /**
         * 引导列表
         */
        this.taskStage = [];
        /**
         * 源引导列表
         */
        this.srcStage = [];
        /**
         * 当前引导状态
         */
        this.curState = GuideState.Pull;
        /**
         * 引导完成后的通知
         */
        this.complateNotify = null;
        /**
         * 每100毫秒刷新下UI
         */
        this.refrashUITime = 0.1;
        this.complateNotify = complateNotify;
        this.uiTweenMap = [];
    }
    /**
         * 添加引导ui上tween动画的数据
         * 分别是名称、开始位置、结束位置
         *
         * 需要优先于所有引导添加
         * @param params
         */
    addUiData(...params) {
        params.forEach((e) => {
            this.uiTweenMap.push(e);
        });
    }
    /**
     * 关联引导UI - 过滤按钮 - 自定义通过条件
     * @param widget
     * @param condition
     * @returns
     */
    addBindUIByCondition(widget, condition) {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitUI, widget, null, [], condition);
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }
    /**
     * 关联引导UI - 过滤按钮 - 自定义通过条件 - 带提示
     * @param widget
     * @param condition
     * @returns
     */
    addBindUIAndTipsByCondition(widget, tips, condition) {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitUI, widget, null, [], condition);
        stage.tips = tips;
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }
    /**
     * 关联引导UI - 按顺序压入
     * @param widget
     * @returns
     */
    //TODO:这位置可以加一个callback 做埋点等
    addBindUI(...widgets) {
        widgets.forEach((v, i, arrs) => {
            let dir = v.handDir ? v.handDir : 1;
            let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitUI, v.ui, 0, null, null, dir, v.isShowMask);
            this.taskStage.push(stage);
            this.srcStage.push(stage.copy());
        });
        return this;
    }
    addBindUIAndCallBack(...widgets) {
        widgets.forEach((v, i, arrs) => {
            let dir = v.handDir ? v.handDir : 1;
            let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitUI, v.ui, 0, null, v.condition, dir, v.isShowMask);
            this.taskStage.push(stage);
            this.srcStage.push(stage.copy());
        });
        return this;
    }
    /**
     * 关联引导UI 可以带Tips
     * @param widget
     * @param tips
     * @returns
     */
    addBindUIAndTips(widget, tips) {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitUI, widget);
        stage.tips = tips;
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }
    /**
     * 关联引导UI - 按顺序压入 - 跟随UI刷新
     * @param widget
     * @returns
     */
    addBindUIAlawaysRefrash(...widgets) {
        widgets.forEach((v, i, arrs) => {
            let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitUI, v);
            stage.refrashDt = 0;
            stage.curReFrashDt = 0;
            this.taskStage.push(stage);
            this.srcStage.push(stage.copy());
        });
        return this;
    }
    /**
     * 关联世界坐标 - 按顺序压入
     * @param poslist
     * @returns
     */
    addBindWorldPosAndUI(uiId, pos) {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitToPos, pos, uiId);
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }
    /**
     * 关联世界坐标 - 自定义通过条件 - 按顺序压入
     * @param poslist
     * @param uiID
     * @param callback
     * @returns
     */
    addBindWorldPosByConditionAndUI(posx, uiID, callback) {
        let pos = new mw.Vector(posx, Const.BASE_POS, 80);
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitToPos, pos, uiID, [], callback);
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }
    /**
    * 关联世界坐标 - 按顺序压入
    * @param poslist
    * @returns
    */
    addBindWorldPos(...poslist) {
        poslist.forEach((v, i, arrs) => {
            let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitToPos, v);
            this.taskStage.push(stage);
            this.srcStage.push(stage.copy());
        });
        return this;
    }
    /**
     * 关联世界坐标 - 自定义通过条件 - 按顺序压入
     * @param poslist
     * @param callback
     * @returns
     */
    addBindWorldPosByCondition(poslist, callback) {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitToPos, poslist, null, [], callback);
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }
    /**
     * 添加一个引导完成条件 - 按顺序压入
     * @param condition
     * @returns
     */
    addCondition(...condition) {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.ConditionRes, condition);
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }
    /**
     * 添加一个自定义执行函数
     * @param func
     */
    addRunFunc(...funcs) {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.RunFunc, null, null, funcs);
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }
    /**
     * 重置所有引导阶段
     */
    resetAllStage() {
        this.curState = GuideState.Pull;
        this.refrashUITime = 0.1;
        this.taskStage = [];
        for (let i = 0; i < this.srcStage.length; ++i) {
            this.taskStage.push(this.srcStage[i].copy());
        }
    }
    /**
     * 获取当前引导任务
     */
    getCurTask() {
        if (this.taskStage.length <= 0)
            return null;
        return this.taskStage[0];
    }
    /**
     * 执行处理
     */
    handle(dt) {
        /**
         * 当前状态是拉取任务
         */
        if (this.curState == GuideState.Pull) {
            this.pullTask();
            return;
        }
        if (this.curState == GuideState.WaitUI) {
            this.taskStage[0].curReFrashDt -= dt;
            if (this.taskStage[0].curReFrashDt <= 0) {
                let first = this.taskStage[0].uiWidget;
                this.beginUITask(first);
                let stage = this.taskStage[0];
                if (stage.uiCheckCondition && stage.uiCheckCondition()) {
                    mw.UIService.getUI(GuideModuleView).hideAllItem();
                    this.onUITaskCallback();
                    return;
                }
            }
            return;
        }
        /**
         * 验证是否到达目标点
         */
        if (this.curState == GuideState.WaitToPos) {
            mw.UIService.getUI(GuideModuleView).setGuideArrowTargetPos(this.taskStage[0].toWorldPos, null, true);
            return;
        }
        /**
         * 验证是否完成自定义条件
         */
        if (this.curState == GuideState.ConditionRes) {
            if (this.checkCondition()) {
                this.curState = GuideState.Pull;
                this.taskStage.shift();
            }
            return;
        }
    }
    /**
     * 拉取任务
     */
    pullTask() {
        let task = null;
        //当前是否还有任务
        if (this.taskStage.length > 0) {
            //获取最前面的任务
            task = this.taskStage[0];
            //拉取UI任务
            if (task.type == GuideState.WaitUI) {
                this.taskStage[0];
                let first = this.taskStage[0].uiWidget;
                this.beginUITask(first);
                return;
            }
            else {
                mw.UIService.getUI(GuideModuleView).showMask(false);
            }
            //拉取目标点任务
            if (task.type == GuideState.WaitToPos) {
                let toPos = this.taskStage[0].toWorldPos;
                let id = this.taskStage[0].uiTipsID;
                let data = this.uiTweenMap.find(i => i.uiId == id);
                if (data) {
                    this.beginToWorldPosTask(toPos, data);
                }
                else {
                    this.beginToWorldPosTask(toPos);
                }
                return;
            }
            //拉取自定义判断条件
            if (task.type == GuideState.ConditionRes) {
                this.curState = GuideState.ConditionRes;
                return;
            }
            //拉取自定义运行函数
            if (task.type == GuideState.RunFunc) {
                // oTrace("执行自定义函数")
                this.taskStage.shift();
                this.curState = GuideState.Pull;
                try {
                    task.runFuncs.forEach((v, i, arrs) => {
                        v();
                    });
                }
                catch (ex) {
                    console.log(ex.stack);
                }
                return;
            }
        }
        //拉取不到任务 - 完成引导
        this.curState = GuideState.Complate;
        mw.UIService.getUI(GuideModuleView).showMask(false);
        if (this.complateNotify) {
            this.complateNotify.call(this.guideStage);
        }
    }
    /**
     * 检测并且完成引导
     */
    checkCondition() {
        let res = true;
        this.taskStage[0].checkCondition.forEach(v => {
            if (!v())
                res = false;
        });
        return res;
    }
    /**
     * UI任务触发完成后的回调
     */
    onUITaskCallback() {
        this.curState = GuideState.Pull;
        this.taskStage.shift();
    }
    /**
     * 引导到目标地点后的回调
     */
    onWorldToPosTaskCallback() {
        //oTrace("回调到达目标点")
        let stage = this.taskStage[0];
        if (stage.uiCheckCondition != null) {
            let res = stage.uiCheckCondition();
            if (!res) {
                return false;
            }
        }
        this.curState = GuideState.Pull;
        this.taskStage.shift();
        return true;
    }
    /**
     * 开始UI引导
     * @param widget 要引导点击的目标UI对象或区域
     */
    beginUITask(widget) {
        this.taskStage[0].curReFrashDt = this.taskStage[0].refrashDt;
        let dir = this.taskStage[0].handDir;
        let isShowMask = this.taskStage[0].isShowMask;
        this.curState = GuideState.WaitUI;
        mw.UIService.getUI(GuideModuleView).lockMWUIWidget(widget, this.onUITaskCallback.bind(this), this.taskStage[0].tips, this.taskStage[0].uiCheckCondition == null, isShowMask, dir);
    }
    /**
     * 开始到目标点引导
     * @param toPos 目标点
     */
    beginToWorldPosTask(toPos, uiData) {
        this.curState = GuideState.WaitToPos;
        mw.UIService.getUI(GuideModuleView).showMask(false);
        mw.UIService.show(GuideModuleView);
        mw.UIService.getUI(GuideModuleView).setGuideArrowTargetPos(toPos, this.onWorldToPosTaskCallback.bind(this), false, uiData);
    }
}

var foreign25 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GuideInfo: GuideInfo,
    GuideTaskStage: GuideTaskStage
});

/*
 * @Author: YuKun.Gao
 * @Date: 2022-06-27 09:56:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-06 15:25:52
 * @Description: file content
 * @FilePath: \JavaScripts\module\guideModule\GuideModuleC.ts
 */
/**
 * 新手引导客户端模块
 */
class GuideModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        /**
         * 预设引导信息列表
         */
        this.guideInfoList = [];
        /**
         * 是否初始化
         */
        this.isInit = false;
        /**
         * 当前引导Id
         */
        this.curGuideIdVal = 0;
        /**
         * 当前正在运行的引导
         */
        this.runningGuide = null;
        /**
         * 阶段完成广播
         */
        this.guideComplateAction = new mw.Action1();
        /**
         * 覆盖到达目标点距离判断 默认50 小于50则到达
         */
        this._reSetToTargetPosDistance = 50;
        /**
         * 引导起始点z偏移
         */
        this._arrowStartPosOffsetZ = 0;
        this.loobyGuideCallBack = () => {
            let looby = mw.UIService.getUI(UILobby);
            Utils.setUIVisible(true, looby.mCanvasShop);
            //赠送新手关卡奖励
            let imc = ModuleService.getModule(ItemModuleC);
            if (imc.getItemCount(2) < 1) {
                imc.addItem(2, 8);
                imc.addItem(3, 3);
                imc.addItem(5, 3);
                imc.addItem(1, 5);
            }
            //防止出现的按钮不会消失的情况
            mw.UIService.getUI(GuideModuleView).hideAllItem();
        };
    }
    /**当前是否有引导 */
    get currentGuideIsNull() {
        return this.runningGuide == null;
    }
    onStart() {
        this._gameModule = ModuleService.getModule(GameModuleC);
        this.guideCfg = GameConfig.Guide.getAllElement();
        Event.addLocalListener(Const.COMPLETE_GUIDE_SCENE, (isForceStop) => {
            if (isForceStop) {
                this.forceCompleteCurrentGuide();
                //接触限制左右移动
                mw.UIService.getUI(GameUI).isStartGuide = false;
                this._gameModule.completeGuide(GuideTarget.Scene);
                console.log(`当前的引导状况！！！！！${this.currentGuideIsNull}`);
            }
        });
    }
    /**
     * 进入场景
     * @param sceneType
     */
    init() {
        //初始化引导
        if (this.isInit == false) {
            this.initGuide();
        }
        let looby = mw.UIService.getUI(UILobby);
        let shop = mw.UIService.getUI(UIShopCity);
        let gameOver = mw.UIService.getUI(UIGameOver);
        let gameUI = mw.UIService.getUI(GameUI);
        let role = mw.UIService.getUI(UIRole);
        //大厅开始按钮引导
        let guide1 = this.addGuideStageHandle(1);
        guide1.addBindUI({ ui: looby.mBtn_Start, handDir: 1, isShowMask: false }).addRunFunc(this.loobyGuideCallBack);
        //新手关卡引导的ui数据
        let guide2 = this.addGuideStageHandle(2);
        let uiLeft = [`mCanvas_Left`, `mTxt_Left`];
        let uiRight = [`mCanvas_Right`, `mTxt_Right`];
        let uiUp = [`mCanvas_UP`, `mTxt_UP`];
        let uiDown = [`mCanvas_Down`, `mTxt_Down`];
        guide2.addUiData({
            uiId: 1,
            uiName: uiLeft,
            oriPos: new mw.Vector2(640, 790),
            isEnableTween: true,
            startPos: new mw.Vector2(640, 790),
            endPos: new mw.Vector2(22, 790),
        }, {
            uiId: 2,
            uiName: uiRight,
            oriPos: new mw.Vector2(16, 790),
            isEnableTween: true,
            startPos: new mw.Vector2(16, 790),
            endPos: new mw.Vector2(620, 790),
        }, {
            uiId: 3,
            uiName: uiUp,
            oriPos: new mw.Vector2(300, 1340),
            isEnableTween: true,
            startPos: new mw.Vector2(300, 1340),
            endPos: new mw.Vector2(300, 200),
        }, {
            uiId: 4,
            uiName: uiDown,
            oriPos: new mw.Vector2(324, 180),
            isEnableTween: true,
            startPos: new mw.Vector2(324, 180),
            endPos: new mw.Vector2(324, 1340),
        }, {
            uiId: 5,
            uiName: ["mTxt_SkillTips"],
            lockUI: mw.UIService.getUI(GameUI).btnItem2,
        });
        guide2.addBindWorldPos(new mw.Vector(1400, 1000, 80));
        this.guideCfg.forEach((e, i) => {
            guide2.addBindWorldPosByConditionAndUI(e.EndPos + 1200, e.ActionType, null).addRunFunc(() => {
                //埋点
                MGSCenter.ts_tutorial_step(i + 1);
            });
            if (i == 0) {
                guide2.addRunFunc(() => {
                    gameUI.isStartGuide = false;
                });
            }
            if (i == this.guideCfg.length - 1) {
                guide2.addRunFunc(() => {
                    DataManager.isGuideScene = false;
                    ModuleService.getModule(GameModuleC).completeGuide(GuideTarget.Scene);
                    //显示奖励提示界面
                    DataManager.isShowRewardUI = true;
                });
            }
            //倒数第二个
            if (i == this.guideCfg.length - 2) {
                guide2.addRunFunc(() => {
                    //放出第二技能按钮
                    gameUI.guideButtonAction(2);
                });
            }
            //最后一个引导
            if (i == this.guideCfg.length - 1) {
                guide2.addRunFunc(() => {
                    //正常完成场景引导回收关卡
                    Event.dispatchToLocal(Const.COMPLETE_GUIDE_SCENE, false);
                });
            }
        });
        //第一局结束界面商店引导
        let guide3 = this.addGuideStageHandle(3);
        guide3.addBindUI({ ui: gameOver.mBtn_Shop, handDir: 1 }).addRunFunc(() => {
            MGSCenter.ts_action_firstdo(2);
            this.triggerGuide(4);
        });
        let guide4 = this.addGuideStageHandle(4);
        guide4.addBindUI({ ui: shop.guideItem, handDir: 2 }).addRunFunc(() => {
            MGSCenter.ts_action_firstdo(3);
            Utils.setUIVisible(true, gameOver.mCanvasRole, looby.mCanvasShop);
            this._gameModule.completeGuide(GuideTarget.Shop);
        });
        //商店引导 直接打开商店界面
        let guide10 = this.addGuideStageHandle(10);
        guide10.addBindUI({ ui: shop.guideItem, handDir: 2 }).addRunFunc(() => {
            MGSCenter.ts_action_firstdo(3);
            Utils.setUIVisible(true, gameOver.mCanvasRole);
            this._gameModule.completeGuide(GuideTarget.Shop);
        });
        //第二局结束界面角色引导
        let guide5 = this.addGuideStageHandle(5);
        guide5.addBindUI({ ui: gameOver.mBtn_Role, handDir: 1 }).addRunFunc(() => {
            MGSCenter.ts_action_firstdo(5);
            this.triggerGuide(6);
        });
        let guide6 = this.addGuideStageHandle(6);
        guide6.addBindUI({ ui: role.guideRole.headUI }).addRunFunc(() => {
            MGSCenter.ts_action_firstdo(6);
            this.triggerGuide(7);
        });
        let guide7 = this.addGuideStageHandle(7);
        guide7.addBindUI({ ui: role.guideRole.buyUI }).addRunFunc(() => {
            MGSCenter.ts_action_firstdo(7);
            Utils.setUIVisible(true, looby.mCanvasRole);
            this._gameModule.completeGuide(GuideTarget.Role);
        });
        //角色引导 直接打开角色界面
        let guide8 = this.addGuideStageHandle(8);
        guide8.addBindUI({ ui: role.guideRole.headUI }).addRunFunc(() => {
            MGSCenter.ts_action_firstdo(6);
            this.triggerGuide(9);
        });
        let guide9 = this.addGuideStageHandle(9);
        guide9.addBindUI({ ui: role.guideRole.buyUI }).addRunFunc(() => {
            MGSCenter.ts_action_firstdo(7);
            Utils.setUIVisible(true, looby.mCanvasRole);
            this._gameModule.completeGuide(GuideTarget.Role);
        });
        if (DataManager.isGuideScene) {
            //禁止左右移动
            gameUI.isStartGuide = true;
            //隐藏技能按钮
            gameUI.guideButtonAction(3);
            //开始赠送110个金币
            ModuleService.getModule(GameModuleC).guideAddMoney(100);
        }
        let time = setTimeout(() => {
            if (DataManager.isGuideScene) {
                if (DataManager.isReady || DataManager.isGaming) {
                    this.loobyGuideCallBack();
                    this.triggerGuide(2);
                }
                else {
                    this.triggerGuide(1);
                }
                clearTimeout(time);
            }
        }, 3000);
        this.guideComplateAction.add((id) => {
            if (id == 1 && DataManager.isGuideScene) {
                this.triggerGuide(2);
            }
        });
    }
    /**
     * 初始化引导模块
     */
    initGuide() {
        if (this.isInit == false)
            this.isInit = true;
        //初始化当前阶段
        this.curGuideIdVal = this.data.getCurGuide();
        //清理掉通过的引导阶段
        // let newList = [];
        // this.guideInfoList.forEach((v) => {
        //     if (v.guideStage >= this.curGuideIdVal) {
        //         newList.push(v);
        //     }
        // })
        // this.guideInfoList = newList;
        //排序引导
        this.guideInfoList = this.guideInfoList.sort((a, b) => {
            return a.guideStage - b.guideStage;
        });
        //触发当前引导
        //TODO:考虑后这里不触发了，还是又外部去触发
        // let guideInfo = this.guideInfoList.find(e => { return e.guideStage == this.curStageVal })
        //监听引导完成
        this.guideComplateAction.add((guideId) => {
            console.log("GuideModuleC : 监听引导完成" + guideId);
            this.server.net_ComplateGuide(guideId);
        }, this);
    }
    /**
     * 添加引导
     * @param guideId 引导id - 不要重复
     * @return 引导信息
     */
    addGuideStageHandle(guideId) {
        // 检测引导Id是否可用
        let canUseGuideId = true;
        this.guideInfoList.forEach(e => {
            if (e.guideStage == guideId)
                canUseGuideId = false;
        });
        if (!canUseGuideId) {
            console.log("repeat stage val : " + guideId);
            return null;
        }
        // 创建引导
        let guideInfo = new GuideInfo(this.guideComplateAction);
        guideInfo.guideStage = guideId;
        this.guideInfoList.push(guideInfo);
        return guideInfo;
    }
    /**
     * 触发引导
     * @param guideId 阶段id
     */
    triggerGuide(guideId) {
        // 查询引导
        let guide = this.guideInfoList.find(e => e.guideStage == guideId);
        if (guide == null) {
            console.log("[GuideModuleC] : find guide info error -> stage = " + guideId + " " + this.guideInfoList.length);
            return false;
        }
        // 判断引导是否完成
        // if (this.data.guideIsComplate(guideId)) return false;
        // 执行引导
        this.runningGuide = guide;
        // 设置当前引导
        this.server.net_SetCurrentRunGuide(guideId);
        this.curGuideIdVal = guideId;
        //mw.UIService.getUI(GuideModuleView).show();// getUI().show();
        mw.UIService.show(GuideModuleView);
        return true;
    }
    /**
     * Tick
     * @param dt
     */
    onUpdate(dt) {
        // 更新当前引导
        if (this.runningGuide) {
            this.runningGuide.handle(dt);
        }
    }
    /**
     * 强制关闭当前引导
     */
    forceCompleteCurrentGuide() {
        this.runningGuide = null;
        mw.UIService.getUI(GuideModuleView).hideAllItem();
        mw.UIService.hide(GuideModuleView);
    }
}

var foreign27 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GuideModuleC: GuideModuleC
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/RoleUI.ui
 * TIME: 2023.05.15-17.19.24
 */
let RoleUI_generate = class RoleUI_generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mTxt_Money = undefined;
        this.mTxt_Diamonds = undefined;
        this.mBtn_Return = undefined;
        this.mTxt_Des = undefined;
        this.mTxt_Name = undefined;
        this.mCanvasEquipped = undefined;
        this.mBtn_Buy = undefined;
        this.mTxt_price = undefined;
        this.mIcon_Coins = undefined;
        this.mIcon_Diamonds = undefined;
        this.mCanvasPrice = undefined;
        this.mCanvasBuy = undefined;
        this.mBtn_Equip = undefined;
        this.mCanvasEquip = undefined;
        this.mImg_Role = undefined;
        this.mCanvas_Mid = undefined;
        this.mCanvasContent = undefined;
        this.mBtn_BackHome = undefined;
        this.mBtn_Shop = undefined;
        this.mBtn_Continue = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        // this.mBtn_Return.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Return");
        // })
        this.initLanguage(this.mBtn_Return);
        this.mBtn_Return.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // this.mBtn_Buy.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Buy");
        // })
        this.initLanguage(this.mBtn_Buy);
        this.mBtn_Buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // this.mBtn_Equip.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Equip");
        // })
        this.initLanguage(this.mBtn_Equip);
        this.mBtn_Equip.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        //按钮添加点击
        // 
        // this.mBtn_BackHome.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_BackHome");
        // })
        // this.mBtn_BackHome.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        // this.mBtn_Shop.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Shop");
        // })
        // this.mBtn_Shop.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        // this.mBtn_Continue.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Continue");
        // })
        // this.mBtn_Continue.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        //按钮多语言
        //文本多语言
        this.initLanguage(this.mTxt_Money);
        this.initLanguage(this.mTxt_Diamonds);
        this.initLanguage(this.mTxt_Des);
        this.initLanguage(this.mTxt_Name);
        this.initLanguage(this.mTxt_price);
        //文本多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/Canvas_Return/Txt_Return"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/Canvas_Down/mCanvasEquipped/MWTextBlock_1"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/MWCanvas_1/CanvasStart_1/MWTextBlock_1"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/MWCanvas_1/MWCanvas_3_1/MWTextBlock_1"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("Canvas_Root/MWCanvas_1/CanvasStart/MWTextBlock_1"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('Canvas_Root/Canvas_Topbar/Canvas_Money2/mTxt_Money')
], RoleUI_generate.prototype, "mTxt_Money", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/Canvas_Topbar/MWCanvas_1/mTxt_Diamonds')
], RoleUI_generate.prototype, "mTxt_Diamonds", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/Canvas_Return/mBtn_Return')
], RoleUI_generate.prototype, "mBtn_Return", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/Canvas_Down/Canvas_Attribute/mTxt_Des')
], RoleUI_generate.prototype, "mTxt_Des", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/Canvas_Down/Canvas_Attribute/mTxt_Name')
], RoleUI_generate.prototype, "mTxt_Name", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/Canvas_Down/mCanvasEquipped')
], RoleUI_generate.prototype, "mCanvasEquipped", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/Canvas_Down/mCanvasBuy/mBtn_Buy')
], RoleUI_generate.prototype, "mBtn_Buy", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/Canvas_Down/mCanvasBuy/mCanvasPrice/mTxt_price')
], RoleUI_generate.prototype, "mTxt_price", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/Canvas_Down/mCanvasBuy/mCanvasPrice/mIcon_Coins')
], RoleUI_generate.prototype, "mIcon_Coins", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/Canvas_Down/mCanvasBuy/mCanvasPrice/mIcon_Diamonds')
], RoleUI_generate.prototype, "mIcon_Diamonds", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/Canvas_Down/mCanvasBuy/mCanvasPrice')
], RoleUI_generate.prototype, "mCanvasPrice", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/Canvas_Down/mCanvasBuy')
], RoleUI_generate.prototype, "mCanvasBuy", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/Canvas_Down/mCanvasEquip/mBtn_Equip')
], RoleUI_generate.prototype, "mBtn_Equip", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/Canvas_Down/mCanvasEquip')
], RoleUI_generate.prototype, "mCanvasEquip", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/mCanvas_Mid/mImg_Role')
], RoleUI_generate.prototype, "mImg_Role", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/mCanvas_Mid')
], RoleUI_generate.prototype, "mCanvas_Mid", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/ScrollBox_1/mCanvasContent')
], RoleUI_generate.prototype, "mCanvasContent", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/MWCanvas_1/CanvasStart_1/mBtn_BackHome')
], RoleUI_generate.prototype, "mBtn_BackHome", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/MWCanvas_1/MWCanvas_3_1/mBtn_Shop')
], RoleUI_generate.prototype, "mBtn_Shop", void 0);
__decorate([
    UIWidgetBind('Canvas_Root/MWCanvas_1/CanvasStart/mBtn_Continue')
], RoleUI_generate.prototype, "mBtn_Continue", void 0);
RoleUI_generate = __decorate([
    UIBind('UI/RoleUI.ui')
], RoleUI_generate);
var RoleUI_generate$1 = RoleUI_generate;

var foreign72 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RoleUI_generate$1
});

/**
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2023-06-28 16:40
 * @LastEditTime : 2023-06-30 15:53
 * @description  :
 */
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/RoleHeadUI.ui
 * TIME: 2023.05.15-17.19.24
 */
let RoleHeadUI_generate = class RoleHeadUI_generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mBtn_Select = undefined;
        this.mImg_Icon = undefined;
        this.mImg_Select = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        //按钮添加点击
        // 
        // this.mBtn_Select.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Select");
        // })
        this.mBtn_Select.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        //按钮多语言
        //文本多语言
        //文本多语言
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('MWCanvas_2147482460/MWCanvas_3/mBtn_Select')
], RoleHeadUI_generate.prototype, "mBtn_Select", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/MWCanvas_3/mImg_Icon')
], RoleHeadUI_generate.prototype, "mImg_Icon", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/MWCanvas_3/mImg_Select')
], RoleHeadUI_generate.prototype, "mImg_Select", void 0);
RoleHeadUI_generate = __decorate([
    UIBind('UI/RoleHeadUI.ui')
], RoleHeadUI_generate);
var RoleHeadUI_generate$1 = RoleHeadUI_generate;

var foreign71 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RoleHeadUI_generate$1
});

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
class UIRoleHead extends RoleHeadUI_generate$1 {
    constructor() {
        super(...arguments);
        /**
         * 如果装备的选中的ui
         * 是当前ui就显示高光ui
         * @param id
         */
        this.checkSelectUI = (id) => {
            if (this._id == id) {
                Utils.setUIVisible(true, this.mImg_Select);
            }
            else {
                if (this.mImg_Select.visible) {
                    Utils.setUIVisible(false, this.mImg_Select);
                }
            }
        };
    }
    async initUI(id, headGuid) {
        this._id = id;
        await AssetUtil.asyncDownloadAsset(headGuid);
        this.mImg_Icon.imageGuid = headGuid;
        Utils.setUIVisible(false, this.mImg_Select);
        this.mBtn_Select.onClicked.add(() => {
            Event.dispatchToLocal(SPUIEvent.SelectIcon, this._id);
        });
        Event.addLocalListener(SPUIEvent.SelectRole, this.checkSelectUI);
    }
}

var foreign56 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UIRoleHead: UIRoleHead
});

/*
 * @Author: pengwei.shi
 * @Date: 2022-11-18 15:47:15
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-27 14:40:37
 * @FilePath: \streetparkour\JavaScripts\ui\UIRole.ts
 * @Description: 角色换装功能的ui
 */
class UIRole extends RoleUI_generate$1 {
    constructor() {
        super(...arguments);
        /**当前显示的服装id */
        this.curClothesIDInPage = 1;
        /**
         * 购买角色
         */
        this.buyRole = () => {
            let role = this._roleData.find(i => i.id == this.curClothesIDInPage);
            let roleModule = ModuleService.getModule(RoleModuleC);
            let gameModule = ModuleService.getModule(GameModuleC);
            if (gameModule.enough(role.CurrencyType, role.Cost)) {
                if (roleModule.refreshClothesData(role.id)) {
                    gameModule.cost(role.CurrencyType, role.Cost);
                    this.finalEquipID = this.curClothesIDInPage;
                    this.refreshUIByID(this.curClothesIDInPage);
                    Sound.instance.gameSound(SPSound.BuyRole);
                }
            }
        };
    }
    onStart() {
        this.layer = mw.UILayerMiddle;
        this._roleData = [];
        this._roleData = GameConfig.Role.getAllElement();
        this.curClothesIDInPage = 1;
        Event.addLocalListener(SPUIEvent.SelectIcon, (id) => {
            this.curClothesIDInPage = id;
            this.refreshUIByID(id);
            Sound.instance.gameSound(SPSound.PressButton);
        });
        this.initUI();
    }
    initUI() {
        Utils.setUIVisible(false, this.mCanvasBuy, this.mCanvasEquip);
        let distanceY = 20;
        let loc = mw.Vector2.zero;
        let preSize = null;
        for (let data of this._roleData) {
            let ui = mw.UIService.create(UIRoleHead);
            if (!preSize) {
                preSize = ui.uiObject.size;
            }
            this.mCanvasContent.addChild(ui.uiObject);
            ui.uiObject.position = loc;
            ui.initUI(data.id, data.Icon);
            loc.y += preSize.y;
            loc.y += distanceY;
            if (data.id == 2) {
                this.guideRole = { headUI: ui.mBtn_Select, buyUI: this.mBtn_Buy };
            }
        }
        this.mBtn_Return.onClicked.add(() => {
            mw.UIService.show(UILobby);
            mw.UIService.hide(UIRole);
            Sound.instance.gameSound(SPSound.PressButton);
        });
        //购买
        this.mBtn_Buy.onClicked.add(this.buyRole);
        //装备
        this.mBtn_Equip.onClicked.add(() => {
            this.finalEquipID = this.curClothesIDInPage;
            this.refreshUIByID(this.curClothesIDInPage);
            Sound.instance.gameSound(SPSound.PressButton);
        });
        //直接开始游戏
        this.mBtn_Continue.onClicked.add(() => {
            ModuleService.getModule(GameModuleC).gameStart();
            mw.UIService.show(GameUI, true);
            mw.UIService.hide(UIRole);
            Sound.instance.gameSound(SPSound.PressButton);
        });
        //回到大厅
        this.mBtn_BackHome.onClicked.add(() => {
            mw.UIService.show(UILobby);
            mw.UIService.hide(UIRole);
            Sound.instance.gameSound(SPSound.PressButton);
        });
        //跳转到商店
        this.mBtn_Shop.onClicked.add(() => {
            mw.UIService.show(UIShopCity);
            mw.UIService.hide(UIRole);
            Sound.instance.gameSound(SPSound.PressButton);
        });
    }
    /**
     * 通过索引刷新界面
     * @param index
     */
    refreshUIByID(id) {
        Utils.setUIVisible(false, this.mCanvasBuy, this.mCanvasEquip, this.mCanvasEquipped, this.mIcon_Coins, this.mIcon_Diamonds);
        Event.dispatchToLocal(SPUIEvent.SelectRole, this.curClothesIDInPage);
        let data = this._roleData.find(i => i.id == id);
        this.mImg_Role.imageGuid = data.Verticaldraw;
        this.mTxt_Name.text = Utils.getTxt(data.Name);
        this.mTxt_Des.text = Utils.getTxt(data.Desc);
        let gmc = ModuleService.getModule(GameModuleC);
        this.mTxt_Money.text = gmc.curCoin.toString();
        this.mTxt_Diamonds.text = gmc.curGem.toString();
        this.mTxt_price.text = data.Cost.toFixed(0);
        if (data.CurrencyType == PriceType.Coin) {
            Utils.setUIVisible(true, this.mIcon_Coins);
        }
        else {
            Utils.setUIVisible(true, this.mIcon_Diamonds);
        }
        let playerData = ModuleService.getModule(RoleModuleC).roleData;
        let resultIndex = playerData.clothesIDs.indexOf(data.id);
        if (resultIndex == -1) {
            //玩家未购买
            Utils.setUIVisible(true, this.mCanvasBuy);
        }
        else if (data.id == this.finalEquipID) {
            //玩家已装备
            Utils.setUIVisible(true, this.mCanvasEquipped);
        }
        else {
            Utils.setUIVisible(true, this.mCanvasEquip);
        }
    }
    onShow() {
        MGSCenter.ts_task(2);
        this.finalEquipID = ModuleService.getModule(RoleModuleC).roleData.equipID;
        this.refreshUIByID(this.curClothesIDInPage);
        let gmc = ModuleService.getModule(GuideModuleC);
        if (DataManager.isGuideRole && gmc.currentGuideIsNull) {
            let time = setTimeout(() => {
                gmc.triggerGuide(8);
                clearTimeout(time);
            }, 100);
        }
    }
    onHide() {
        if (ModuleService.getModule(RoleModuleC).roleData.equipID != this.finalEquipID) {
            ModuleService.getModule(RoleModuleC).refreashEquipData(this.finalEquipID);
        }
    }
}

var foreign55 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UIRole: UIRole
});

/*
 * @Author: pengwei.shi
 * @Date: 2022-11-09 17:25:21
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-27 14:38:43
 * @FilePath: \streetparkour\JavaScripts\ui\UILobby.ts
 * @Description:
 */
class UILobby extends LobbyUI_generate$1 {
    onStart() {
        this._rankData = [];
        this._onShowRankList = [];
        this._rankUIPool = [];
        this.rankNameCfg = GameConfig.RandomRank.getAllElement();
        this.gameModule = ModuleService.getModule(GameModuleC);
        this.initRankData();
        this.initUI();
        this.layer = mw.UILayerMiddle;
    }
    /**
     * 音效暂停与播放
     */
    soundAction() {
        let re = Sound.instance.setSoundActive();
        if (re) {
            Utils.setUIVisible(true, this.mSoundActive);
            Utils.setUIVisible(false, this.mSoundNotActive);
        }
        else {
            Utils.setUIVisible(false, this.mSoundActive);
            Utils.setUIVisible(true, this.mSoundNotActive);
        }
    }
    initUI() {
        this.mTxt_Name.text = mw.AccountService.getNickName();
        mw.AccountService.fillAvatar(this.mImg_Head_Icon);
        Utils.setUIVisible(false, this.mCanvas_Rank);
        this.mBtn_Start.onClicked.add(() => {
            this.gameModule.gameStart();
            mw.UIService.show(GameUI, true);
            mw.UIService.hide(UILobby);
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.lobbyGoButton();
            if (DataManager.isGuideScene) {
                MGSCenter.ts_tutorial_start();
            }
        });
        this.mBtn_OpenRank.onClicked.add(() => {
            Utils.setUIVisible(true, this.mCanvas_Rank);
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.mgsRank();
        });
        this.mBtn_CloseRank.onClicked.add(() => {
            Utils.setUIVisible(false, this.mCanvas_Rank);
            Sound.instance.gameSound(SPSound.PressButton);
        });
        this.mBtn_Sound.onClicked.add(() => {
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.lobbyCloseSound();
            this.soundAction();
        });
        //角色换装
        this.mBtn_OpenRoleClothes.onClicked.add(() => {
            mw.UIService.show(UIRole);
            mw.UIService.hide(UILobby);
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.mgsLobbyRole();
        });
        //商店
        this.mBtn_Shop.onClicked.add(() => {
            mw.UIService.show(UIShopCity);
            mw.UIService.hide(UILobby);
            MGSCenter.mgsLobbyShop();
            Sound.instance.gameSound(SPSound.PressButton);
        });
    }
    /**
     * 初始化排行榜数据
     */
    initRankData() {
        let indexSet = [];
        while (indexSet.length <= 10) {
            let index = mw.MathUtil.randomInt(0, this.rankNameCfg.length);
            if (indexSet.indexOf(index) == -1) {
                indexSet.push(index);
            }
        }
        indexSet.forEach((id, index) => {
            let name = this.rankNameCfg[id].name;
            let rankData = { name: Utils.getTxt(name), score: 0 };
            if (index < 3) {
                rankData.score = mw.MathUtil.randomInt(40000, 88888);
            }
            else if (index >= 3 && index < 10) {
                rankData.score = mw.MathUtil.randomInt(20000, 40001);
            }
            else {
                rankData.score = mw.MathUtil.randomInt(0, 20001);
            }
            this._rankData.push(rankData);
        });
    }
    /**
     * 刷新排行榜ui
     */
    onRefreshRank() {
        this.mTxt_PointNum.text = this.gameModule.maxScore.toFixed(0);
        this.mTxt_MoneyNum.text = this.gameModule.curCoin.toFixed(0);
        //加入玩家自己的分数
        let name = mw.AccountService.getNickName();
        if (this._rankData.find(i => i.name == name)) {
            this._rankData.find(i => i.name == name).score = this.gameModule.maxScore;
        }
        else {
            this._rankData.push({ name: mw.AccountService.getNickName(), score: this.gameModule.maxScore });
        }
        this._rankData.sort((a, b) => {
            if (a.score > b.score)
                return -1;
            else
                return 1;
        });
        let pos = mw.Vector2.zero;
        let size = null;
        for (let i = 0; i < this._rankData.length; i++) {
            let rui = this._rankUIPool.shift();
            if (!rui) {
                rui = mw.UIService.create(UIRankItem);
            }
            if (!size) {
                size = rui.size;
            }
            rui.reset();
            this.mScrollBox.addChild(rui.uiObject);
            rui.uiObject.size = size;
            rui.uiObject.position = pos;
            rui.initData(i + 1, this._rankData[i].name, this._rankData[i].score);
            this._onShowRankList.push(rui);
            pos.y += rui.size.y + 10;
            rui.setVisible(mw.SlateVisibility.Visible);
        }
    }
    onHide() {
        this._onShowRankList.forEach((ui) => {
            ui.setVisible(false);
            this._rankUIPool.push(ui);
        });
        this._onShowRankList.length = 0;
        Utils.setUIVisible(false, this.mCanvas_Rank);
    }
    onShow(isShowRank = false) {
        this.onRefreshRank();
        let name = mw.AccountService.getNickName();
        if (this._rankData.find(i => i.name == name)) {
            this.mTxt_SelfRanking.text = (this._rankData.findIndex(i => i.name == name) + 1).toFixed(0);
            this.mTxt_SelfScore.text = this._rankData.find(i => i.name == name).score.toFixed(0);
        }
        else {
            this.mTxt_SelfRanking.text = "0";
            this.mTxt_SelfScore.text = "0";
        }
        Sound.instance.gameBGM(SPSound.Lobby);
        if (isShowRank) {
            Utils.setUIVisible(true, this.mCanvas_Rank);
        }
    }
}

var foreign50 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UILobby: UILobby
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/LoadingUI.ui
 * TIME: 2023.05.15-17.19.24
 */
let LoadingUI_generate = class LoadingUI_generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.bg = undefined;
        this.mImg_BG = undefined;
        this.barLoad = undefined;
        this.txtBar = undefined;
        this.bottom = undefined;
        this.loadNode = undefined;
        this.mCanvas_Root = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        //按钮添加点击
        // 
        //按钮多语言
        //文本多语言
        this.initLanguage(this.txtBar);
        //文本多语言
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('mCanvas_Root/bg')
], LoadingUI_generate.prototype, "bg", void 0);
__decorate([
    UIWidgetBind('mCanvas_Root/loadNode/mImg_BG')
], LoadingUI_generate.prototype, "mImg_BG", void 0);
__decorate([
    UIWidgetBind('mCanvas_Root/loadNode/bottom/barLoad')
], LoadingUI_generate.prototype, "barLoad", void 0);
__decorate([
    UIWidgetBind('mCanvas_Root/loadNode/bottom/txtBar')
], LoadingUI_generate.prototype, "txtBar", void 0);
__decorate([
    UIWidgetBind('mCanvas_Root/loadNode/bottom')
], LoadingUI_generate.prototype, "bottom", void 0);
__decorate([
    UIWidgetBind('mCanvas_Root/loadNode')
], LoadingUI_generate.prototype, "loadNode", void 0);
__decorate([
    UIWidgetBind('mCanvas_Root')
], LoadingUI_generate.prototype, "mCanvas_Root", void 0);
LoadingUI_generate = __decorate([
    UIBind('UI/LoadingUI.ui')
], LoadingUI_generate);
var LoadingUI_generate$1 = LoadingUI_generate;

var foreign64 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: LoadingUI_generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/GuideUI.ui
 * TIME: 2023.05.15-17.19.24
 */
let GuideUI_generate = class GuideUI_generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mCanvas_Left = undefined;
        this.mCanvas_Right = undefined;
        this.mCanvas_UP = undefined;
        this.mCanvas_Down = undefined;
        this.mTxt_UP = undefined;
        this.mTxt_Down = undefined;
        this.mTxt_Right = undefined;
        this.mTxt_Left = undefined;
        this.mImg_Hand = undefined;
        this.mTxt_SkillTips = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        //按钮添加点击
        // 
        //按钮多语言
        //文本多语言
        this.initLanguage(this.mTxt_UP);
        this.initLanguage(this.mTxt_Down);
        this.initLanguage(this.mTxt_Right);
        this.initLanguage(this.mTxt_Left);
        this.initLanguage(this.mTxt_SkillTips);
        //文本多语言
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mCanvas_Left')
], GuideUI_generate.prototype, "mCanvas_Left", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mCanvas_Right')
], GuideUI_generate.prototype, "mCanvas_Right", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mCanvas_UP')
], GuideUI_generate.prototype, "mCanvas_UP", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mCanvas_Down')
], GuideUI_generate.prototype, "mCanvas_Down", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTxt_UP')
], GuideUI_generate.prototype, "mTxt_UP", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTxt_Down')
], GuideUI_generate.prototype, "mTxt_Down", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTxt_Right')
], GuideUI_generate.prototype, "mTxt_Right", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTxt_Left')
], GuideUI_generate.prototype, "mTxt_Left", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mImg_Hand')
], GuideUI_generate.prototype, "mImg_Hand", void 0);
__decorate([
    UIWidgetBind('MWCanvas_2147482460/mTxt_SkillTips')
], GuideUI_generate.prototype, "mTxt_SkillTips", void 0);
GuideUI_generate = __decorate([
    UIBind('UI/GuideUI.ui')
], GuideUI_generate);
var GuideUI_generate$1 = GuideUI_generate;

var foreign63 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GuideUI_generate$1
});

/*
 * @Author: pengwei.shi
 * @Date: 2022-11-13 10:10:22
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-17 09:16:52
 * @FilePath: \streetparkour\JavaScripts\ui\UIGuide.ts
 * @Description: 新手引导UI 和 逻辑
 */
class UIGuide extends GuideUI_generate$1 {
    constructor() {
        super(...arguments);
        /**
         * 隐藏自身解除订阅
         */
        this.endGuidAction = () => {
            Utils.setUIVisible(false, this.mImg_Hand);
            this.stopAllTween();
            if (this._curGuideButton) {
                this._curGuideButton.onClicked.remove(this.endGuidAction);
            }
            //迭代可能需要
            //技能按钮，不点不关闭ui
            // if (this.fingerIndex >= this.fingerGuideData.length - 1) {
            //     this.setVisible(false);
            // }
        };
    }
    onStart() {
        this.layer = mw.UILayerScene;
        this._guideUIMap = new Map();
        this.initUI();
    }
    initUI() {
        this.fingerGuideData = [];
        this._guideUIMap.set(Guide.Down, { canvas: this.mCanvas_Down, txt: this.mTxt_Down });
        this._guideUIMap.set(Guide.Left, { canvas: this.mCanvas_Left, txt: this.mTxt_Left });
        this._guideUIMap.set(Guide.Right, { canvas: this.mCanvas_Right, txt: this.mTxt_Right });
        this._guideUIMap.set(Guide.UP, { canvas: this.mCanvas_UP, txt: this.mTxt_UP });
        this._guideUIMap.set(Guide.Hand, { canvas: this.mImg_Hand, txt: null });
        this.fingerGuideData.push({ startOffset: new mw.Vector2(0, -200), endOffset: new mw.Vector2(0, -80), isScale: true, rot: 180 });
        this.fingerGuideData.push({ startOffset: new mw.Vector2(0, 200), endOffset: new mw.Vector2(0, 150), isScale: true, rot: 0 });
        for (let [k, v] of this._guideUIMap) {
            Utils.setUIVisible(false, v.canvas, v.txt);
        }
        Utils.setUIVisible(false, this.mImg_Hand, this.mTxt_SkillTips);
        this.layer = mw.UILayerTop;
    }
    /**
     * 设置当前ui的不同状态
     * @param state
     */
    guideState(state) {
        this._lastState = state;
        switch (state) {
            case Guide.Down:
                this.guideAction(new mw.Vector2(324, 1340), state);
                break;
            case Guide.Left:
                this.guideAction(new mw.Vector2(22, 790), state);
                break;
            case Guide.Right:
                this.guideAction(new mw.Vector2(620, 790), state);
                break;
            case Guide.UP:
                this.guideAction(new mw.Vector2(300, 200), state);
                break;
            case Guide.Hand:
                this.guideSkill();
                break;
        }
    }
    /**
     * 新手关卡技能按钮引导
     */
    guideSkill() {
        let btn = mw.UIService.getUI(GameUI).btnItem2;
        this.fingerGuide(btn, 1);
    }
    /**
     * 引导动作
     * @param targetPos 目标位置
     * @param action 动作
     */
    guideAction(targetPos, action) {
        let guide = this._guideUIMap.get(action);
        Utils.setUIVisible(true, guide.canvas, guide.txt);
        this.uiTween(targetPos, guide.canvas, () => {
            Utils.setUIVisible(false, guide.canvas, guide.txt);
        });
    }
    /**
     * ui动画
     * @param targetPos 目标点
     * @param ui
     * @param completeCallBack
     * @param times 次数
     */
    uiTween(targetPos, ui, completeCallBack, times) {
        this.stopAllTween();
        let uiPrePosition = ui.position.clone();
        this._tween3 = new mw.Tween(ui.position).to(targetPos, 1000).onUpdate((v) => {
            ui.position = v;
        }).onStop(() => {
            ui.position = uiPrePosition;
            if (completeCallBack) {
                completeCallBack();
            }
        }).onComplete(() => {
            ui.position = uiPrePosition;
            if (completeCallBack) {
                completeCallBack();
            }
        }).repeat(times).start();
    }
    onHide() {
        this.stopAllTween();
    }
    /**
     * 手指引导
     * @param uiButton 引导的按钮
     * @param dataIndex 按钮对应的数据索引，
     * 0为大厅的按钮数据，
     * 1为新手引导技能的数据
     */
    fingerGuide(uiButton, dataIndex) {
        this.fingerIndex = dataIndex;
        this._curGuideButton = uiButton;
        let data = this.fingerGuideData[dataIndex];
        let outPix = mw.Vector2.zero;
        let outViewPos = mw.Vector2.zero;
        uiButton.onClicked.add(this.endGuidAction);
        let time = setTimeout(() => {
            mw.localToViewport(uiButton.tickSpaceGeometry, mw.Vector2.zero, outPix, outViewPos);
            let startPos = data.startOffset.add(outViewPos);
            let endPos = data.endOffset.add(outViewPos);
            this.guideFingerAction(uiButton, data.isScale, startPos, endPos);
            this.mImg_Hand.renderTransformAngle = data.rot;
            Utils.setUIVisible(true, this.mImg_Hand);
            if (dataIndex == 1) {
                Utils.setUIVisible(true, this.mTxt_SkillTips);
            }
            clearTimeout(time);
        }, 1000);
    }
    /**
     * 指引技能
     */
    guideFingerAction(ui, activeScale, startPos, endPos) {
        //手指动作
        this._tween1 = new mw.Tween(startPos).to(endPos, 1000).onUpdate(v => {
            this.mImg_Hand.position = v;
        }).repeat(Infinity).onStop(() => {
            Utils.setUIVisible(false, this.mImg_Hand);
        }).onComplete(() => {
            Utils.setUIVisible(false, this.mImg_Hand);
        }).start();
        //按钮放大缩小
        if (activeScale) {
            let tarsize = new mw.Vector2(1.5, 1.5);
            this._tween2 = new mw.Tween(mw.Vector2.one).to(tarsize).onUpdate(v => {
                ui.renderScale = v;
            }).repeat(Infinity).onStop(() => {
                ui.renderScale = mw.Vector2.one;
            }).onComplete(() => {
                ui.renderScale = mw.Vector2.one;
            }).start();
        }
    }
    /**
     * 暂停当前ui的
     * tween行为
     */
    stopAllTween() {
        if (this._tween1 && this._tween1.isPlaying()) {
            this._tween1.stop();
        }
        if (this._tween2 && this._tween2.isPlaying()) {
            this._tween2.stop();
        }
        if (this._tween3 && this._tween3.isPlaying()) {
            this._tween3.stop();
        }
    }
}

var foreign49 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UIGuide: UIGuide
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/PauseUI.ui
 * TIME: 2023.05.15-17.19.24
 */
let PauseUI_generate = class PauseUI_generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mBtn_Yes = undefined;
        this.mBtn_No = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        // this.mBtn_Yes.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Yes");
        // })
        this.initLanguage(this.mBtn_Yes);
        this.mBtn_Yes.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // this.mBtn_No.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_No");
        // })
        this.initLanguage(this.mBtn_No);
        this.mBtn_No.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        //按钮添加点击
        // 
        //按钮多语言
        //文本多语言
        //文本多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Canvas_ProgressBar_001/MWTextBlock_1"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('RootCanvas/Canvas_Settings/mBtn_Yes')
], PauseUI_generate.prototype, "mBtn_Yes", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Canvas_Settings/mBtn_No')
], PauseUI_generate.prototype, "mBtn_No", void 0);
PauseUI_generate = __decorate([
    UIBind('UI/PauseUI.ui')
], PauseUI_generate);
var PauseUI_generate$1 = PauseUI_generate;

var foreign66 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PauseUI_generate$1
});

/**
 * @Author       : pengwei.shi
 * @Date         : 2022-11-29 16:54:09
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2022-12-12 19:54:18
 * @FilePath     : \streetparkour\JavaScripts\ui\UIPause.ts
 * @Description  : 暂停界面
 */
class UIPause extends PauseUI_generate$1 {
    onStart() {
        this.mBtn_Yes.onClicked.add(() => {
            if (DataManager.isGuideScene) {
                Event.dispatchToLocal(Const.COMPLETE_GUIDE_SCENE, true);
            }
            mw.UIService.show(UIGameOver);
            mw.UIService.hide(UIPause);
            Sound.instance.gameSound(SPSound.PressButton);
            if (DataManager.isShowRewardUI) {
                DataManager.isShowRewardUI = false;
            }
        });
        this.mBtn_No.onClicked.add(() => {
            ModuleService.getModule(GameModuleC).gamePuase();
            mw.UIService.show(GameUI);
            mw.UIService.hide(UIPause);
            Sound.instance.gameSound(SPSound.PressButton);
            if (DataManager.isGuideScene) {
                mw.UIService.show(GuideModuleView);
            }
        });
    }
    onShow() {
        if (DataManager.isGuideScene) {
            mw.UIService.hide(GuideModuleView);
        }
    }
}

var foreign51 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UIPause: UIPause
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/ReliveUI.ui
 * TIME: 2023.05.15-17.19.24
 */
let ReliveUI_generate = class ReliveUI_generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.txtItem = undefined;
        this.mBtn_Yes = undefined;
        this.mBtn_No = undefined;
        this.txtCount = undefined;
        this.txtTip = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        // this.mBtn_Yes.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_Yes");
        // })
        this.initLanguage(this.mBtn_Yes);
        this.mBtn_Yes.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // this.mBtn_No.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_No");
        // })
        this.initLanguage(this.mBtn_No);
        this.mBtn_No.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        //按钮添加点击
        // 
        //按钮多语言
        //文本多语言
        this.initLanguage(this.txtItem);
        this.initLanguage(this.txtCount);
        this.initLanguage(this.txtTip);
        //文本多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/MWTextBlock_1"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('RootCanvas/Canvas_Settings/Canvas_Title/txtItem')
], ReliveUI_generate.prototype, "txtItem", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Canvas_Settings/mBtn_Yes')
], ReliveUI_generate.prototype, "mBtn_Yes", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Canvas_Settings/mBtn_No')
], ReliveUI_generate.prototype, "mBtn_No", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Canvas_Settings/txtCount')
], ReliveUI_generate.prototype, "txtCount", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Canvas_Settings/txtTip')
], ReliveUI_generate.prototype, "txtTip", void 0);
ReliveUI_generate = __decorate([
    UIBind('UI/ReliveUI.ui')
], ReliveUI_generate);
var ReliveUI_generate$1 = ReliveUI_generate;

var foreign69 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ReliveUI_generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/RewardUI.ui
 * TIME: 2023.05.15-17.19.24
 */
let RewardUI_generate = class RewardUI_generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mBtn_GoGameover = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        //按钮添加点击
        // 
        // this.mBtn_GoGameover.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "mBtn_GoGameover");
        // })
        // this.mBtn_GoGameover.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        //按钮多语言
        //文本多语言
        //文本多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Canvas_Title/MWTextBlock_1"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Canvas_ProgressBar_001/MWCanvas_2147482460/TopCanvas/Txt_PropName3"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Canvas_ProgressBar_001/MWCanvas_2147482460/TopCanvas/Txt_Num3"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Canvas_ProgressBar_001/MWCanvas_2147482460_1/TopCanvas2/Txt_PropName2"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Canvas_ProgressBar_001/MWCanvas_2147482460_1/TopCanvas2/Txt_Num2"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/MWTextBlock_2"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Canvas_1/TextBlock_1"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('RootCanvas/mBtn_GoGameover')
], RewardUI_generate.prototype, "mBtn_GoGameover", void 0);
RewardUI_generate = __decorate([
    UIBind('UI/RewardUI.ui')
], RewardUI_generate);
var RewardUI_generate$1 = RewardUI_generate;

var foreign70 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RewardUI_generate$1
});

/**
 * @Author       : pengwei.shi
 * @Date         : 2022-11-30 09:46:38
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2022-12-02 15:09:24
 * @FilePath     : \streetparkour\JavaScripts\ui\UIReward.ts
 * @Description  : 奖励提示ui界面
 */
class UIReward extends RewardUI_generate$1 {
    onStart() {
        this.mBtn_GoGameover.onClicked.add(() => {
            mw.UIService.show(UIGameOver);
            mw.UIService.hide(UIReward);
            DataManager.isShowRewardUI = false;
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.mgsActionUseItem(100);
        });
    }
}

var foreign54 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UIReward: UIReward
});

/**
 * @Author       : pengwei.shi
 * @Date         : 2022-12-02 13:52:36
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2022-12-02 15:12:11
 * @FilePath     : \streetparkour\JavaScripts\ui\UIRelive.ts
 * @Description  : 修改描述
 */
/**
 * @Author       : xianjie.xia
 * @LastEditors  : pengwei.shi
 * @Date         : 2022-11-22 14:56
 * @LastEditTime : 2022-11-30 09:54:33
 * @description  :
 */
class UIRelive extends ReliveUI_generate$1 {
    constructor() {
        super(...arguments);
        //复活道具ID
        this._itemID = 1;
        //复活消耗
        this._costNum = 1;
    }
    onStart() {
        let imc = ModuleService.getModule(ItemModuleC);
        this.mBtn_Yes.onClicked.add(() => {
            if (imc.costItem(this._itemID, this._costNum)) {
                ModuleService.getModule(GameModuleC).relive();
                mw.UIService.hide(UIRelive);
                DataManager.onItem(this._itemID, true);
            }
            Sound.instance.gameSound(SPSound.PressButton);
        });
        this.mBtn_No.onClicked.add(() => {
            if (!DataManager.isShowRewardUI) {
                mw.UIService.show(UIGameOver);
                mw.UIService.hide(UIRelive);
            }
            else {
                mw.UIService.show(UIReward);
                mw.UIService.hide(UIRelive);
            }
            Sound.instance.gameSound(SPSound.PressButton);
        });
    }
    onShow(...params) {
        let imc = ModuleService.getModule(ItemModuleC);
        let num = imc.getItemCount(this._itemID);
        this.txtItem.text = num.toString();
        this._costNum = DataManager.reliveNum + 1;
        this.mBtn_Yes.enable = num >= this._costNum;
        let vis = num < this._costNum ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
        this.txtTip.visibility = vis;
        this.txtCount.text = 'x' + this._costNum;
        let color = num > 0 ? new mw.LinearColor(1, 1, 1) : new mw.LinearColor(1, 0, 0);
        this.txtCount.fontColor = color;
    }
}

var foreign53 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UIRelive: UIRelive
});

/**
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2022-11-28 11:27
 * @LastEditTime : 2022-12-05 14:44
 * @description  : 加载页面
 */
class LoadingUI extends LoadingUI_generate$1 {
    constructor() {
        super(...arguments);
        this._loadMax = 0;
        this._loadRate = 0.01;
        this._curPro = 0;
        this._wait = 0;
        this._list = [];
        this._loadNum = 0;
        this._maxNum = 0;
        this._resTime = 0;
    }
    onStart() {
        this.layer = mw.UILayerTop;
        this._curPro = 0.01;
        this._wait = 0;
        this._loadMax = 0;
        this.showBar();
        this._list.push('2CC6A6874088E0328EDECA8434F7F284');
        for (let v in AnimRes) {
            this._list.push(AnimRes[v]);
        }
        // for (let asset of GameConfig.Assets.getAllElement()) {
        //     this._list.push(asset.PrefabsGuid);
        // }
        for (let v in EffectRes) {
            this._list.push(EffectRes[v]);
        }
        this._maxNum = this._list.length;
        this.canUpdate = true;
        this.layer = mw.UILayerSystem;
    }
    setPro(pro) {
        //console.log(pro);
        if (this._loadMax < pro)
            this._loadMax = pro * 0.5;
        this._loadMax = this._loadMax > 0.5 ? 0.5 : this._loadMax;
        if (pro > 1) {
            this._loadRate *= 0.5;
            this.enterGame();
            this.loadRes();
        }
        //console.log('hideLoad')
    }
    loadRes() {
        if (this._loadNum >= this._maxNum) {
            // console.log('done')
            this._resTime = 0;
        }
        else {
            let res = this._list.pop();
            //console.log(res);
            this._resTime = 3;
            // mw.AssetUtil.loadAsset(res)
            mw.AssetUtil.asyncDownloadAsset(res).then(() => {
                // console.log(res + ' done')
                this.resDone();
            });
        }
    }
    resDone() {
        this._loadNum++;
        this._loadMax = 0.5 + (this._loadNum / this._maxNum) * 0.5;
        if (this._loadMax > 1)
            this._loadMax = 1;
        this.loadRes();
    }
    showBar() {
        let pro = Math.floor(this._curPro * 100);
        this.txtBar.text = (pro + "%");
        this.barLoad.currentValue = (this._curPro);
    }
    onUpdate(dt) {
        if (this._wait > 1)
            return;
        if (this._resTime > 0) {
            this._resTime -= dt;
            if (this._resTime <= 0)
                this.resDone();
        }
        if (this._curPro < this._loadMax) {
            this._curPro += this._loadRate;
            if (this._curPro >= this._loadMax) {
                this._curPro = this._loadMax;
            }
            this.showBar();
        }
        else if (this._curPro >= 1) {
            this._wait += this._loadRate * 5;
            if (this._wait > 1) {
                //this.uiObject.visibility = mw.SlateVisibility.Collapsed;
                //console.log('LoadingUI')
                //mw.UIService.show(UILobby);
                mw.UIService.hide(LoadingUI);
            }
        }
    }
    // private async loadDone() {
    //     for (let v in EffectRes) {
    //         let res = EffectRes[v];
    //         await mw.AssetUtil.asyncDownloadAsset(res);
    //         //console.log(res, Date.now())
    //     }
    //     // let i = 0;
    //     // for (let v in AnimRes) {
    //     //     i++;
    //     //     let res = AnimRes[v];
    //     //     if (i > 4) {
    //     //         await MWCore.AsyncAssetDownload(res);
    //     //         console.log(res, Date.now())
    //     //     }
    //     // }
    //     this.enterGame();
    // }
    /**
 * 加载完成，进入游戏
 */
    enterGame() {
        MGSCenter.ts_game_start();
        mw.UIService.getUI(GuideModuleView);
        mw.UIService.show(UILobby);
        mw.UIService.getUI(GameUI);
        mw.UIService.getUI(UIGameOver);
        mw.UIService.getUI(UIPause);
        mw.UIService.getUI(UIShopCity);
        mw.UIService.getUI(UIRole);
        mw.UIService.getUI(UIRelive);
        mw.UIService.getUI(UIGuide);
        //手动初始化
        ModuleService.getModule(GameModuleC).init();
    }
}

var foreign16 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: LoadingUI
});

/*
 * @Author: pengwei.shi
 * @Date: 2022-11-07 17:26:34
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-27 15:50:46
 * @FilePath: \streetparkour\JavaScripts\modules\obstacle\Obstacle.ts
 * @Description: 障碍
 */
class Obstacle {
    constructor(id) {
        this.id = id;
        this._isReady = false;
    }
    async init() {
        let cfg = GameConfig.Assets.getAllElement().find(i => i.NameID == this.id);
        this.isItem = cfg.IsItem ? true : false;
        this._defaultPos = new mw.Vector(0, 0, -5000);
        this.resourceType = cfg.ResourceGroup;
        this._coinList = [];
        this._autoList = [];
        this._itemList = [];
        this._passList = [];
        this._obloction = 0;
        this._autoDis = 0;
        this._obLenght = cfg.Lenght ? cfg.Lenght : 0;
        this._isActive = false;
        this._obj = await SpawnManager.asyncSpawn({ guid: cfg.PrefabsGuid });
        return this._obj.asyncReady().then(readyObj => {
            let childs = readyObj.getChildren();
            //this._obj.setCollision(mw.CollisionStatus.QueryOnly,true);
            for (let child of childs) {
                let str = child.name;
                if (str === 'coins') {
                    let list = child.getChildren();
                    for (let c of list) {
                        this._coinList.push(c);
                    }
                }
                else if (str === 'items') {
                    let list = child.getChildren();
                    for (let c of list) {
                        this._coinList.push(c);
                    }
                }
                else if (str === 'pass') {
                    this._passList.push(child);
                }
                else if (str === 'auto') {
                    this._autoList.push(child);
                }
                else if (str.indexOf('block') >= 0 || str.indexOf('board') >= 0) {
                    MGSCenter.addGuid(child.gameObjectId, this.id);
                    //child.setCollision(mw.CollisionStatus.QueryOnly);
                }
            }
            this._isReady = true;
        });
    }
    setLocation(loc) {
        if (!this._isReady)
            return;
        this._obloction = loc.x;
        this._obj.worldTransform.position = loc;
        this._isActive = true;
    }
    /**
     * 隐藏
     */
    setHide(dis) {
        if (this._obloction - DataManager.gameDis < dis)
            this.resetPos();
    }
    onUpdate(dt) {
        // if (this._coinList.length > 0) {
        //     for (let obj of this._coinList) {
        //         let rot = obj.rotation;
        //         rot.z -= dt * 150;
        //         obj.rotation = rot;
        //     }
        // }
        //移动物件
        if (this._autoList.length > 0) {
            let ds = this._obloction - DataManager.gameDis;
            if (ds > 0 && ds < 3000) {
                let dis = DataManager.carSpeed * dt;
                for (let obj of this._autoList) {
                    let pos = obj.worldTransform.position;
                    pos.x -= dis;
                    obj.worldTransform.position = pos;
                }
                this._autoDis += dis;
            }
        }
        //判断障碍物是否生效
        let obstacleLen = this._obloction + this._obLenght;
        //1200 为玩家距离场景x轴原点的位置
        if (DataManager.gameDis - 1200 > obstacleLen) {
            this._isActive = false;
        }
    }
    /**
     * 重置位置
     * 供对象池调用
     */
    resetPos() {
        if (!this._isReady)
            return;
        this._obj.worldTransform.position = this._defaultPos;
        this._isActive = false;
        if (this._coinList.length > 0) {
            this._coinList.forEach((obj) => {
                obj.setVisibility(mw.PropertyStatus.On, true);
                obj.setCollision(mw.CollisionStatus.QueryOnly);
            });
        }
        if (this._itemList.length > 0) {
            this._itemList.forEach((obj) => {
                obj.setVisibility(mw.PropertyStatus.On, true);
                obj.setCollision(mw.CollisionStatus.QueryOnly);
            });
        }
        for (let obj of this._autoList) {
            let pos = obj.worldTransform.position;
            pos.x += this._autoDis;
            obj.worldTransform.position = pos;
        }
        for (let obj of this._passList) {
            obj.setVisibility(mw.PropertyStatus.On, true);
            obj.setCollision(mw.CollisionStatus.QueryOnly);
        }
    }
    /**获取障碍长度 */
    get getObLenght() {
        return this._obLenght;
    }
    /**获取障碍物是否生效 */
    get active() {
        return this._isActive;
    }
}

var foreign32 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Obstacle: Obstacle
});

/*
 * @Author: pengwei.shi
 * @Date: 2022-11-07 09:14:51
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-13 11:17:11
 * @FilePath: \streetparkour\JavaScripts\modules\obstacle\ObstacleModuleC.ts
 * @Description:
 */
class ObstacleModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        /**初始生成关卡的位置、在玩家前方多少距离生成 */
        this._initSpawnObstaclePos = 0;
        //埋点数据
        /**随机关卡个数 */
        this._mgsRandomLevelCount = 0;
        this.flagID = null;
        this._loadNum = 0;
        this._loadMax = 0;
        this._initing = false;
    }
    onAwake() {
        this._randomObstacleData = [];
        this._onUsageObstacle = [];
        this.logicTempData = [];
        this._logicQueue = [];
        this._allWeight = [];
        this._levelData = [];
        this.logicList = [];
        this.cfgAssets = GameConfig.Assets.getAllElement();
        this.cfgLevels = GameConfig.Level.getAllElement();
        this._obstaclesSpwanDis = GameConfig.Global.getElement(103).Value;
        DataManager.carSpeed = GameConfig.Global.getElement(105).Value;
        //死亡埋点
        Event.addLocalListener(MGSEvent.DIE_ITEMGUID, (guid) => {
            MGSCenter.ts_action_dead(guid, this._mgsRandomLevelCount);
        });
    }
    onStart() {
        this._obstacleWeight = new ObstacleWeight();
        this._tracks = [new mw.Vector(0, Const.BASE_POS, 0), new mw.Vector(0, Const.BASE_POS - Const.ROAD_WIDTH, 0), new mw.Vector(0, Const.BASE_POS + Const.ROAD_WIDTH, 0)];
        //关卡数据
        this._levelDataIndex = 0;
        this.initLevelData();
        this.initRadomObstalceData();
        this._initSpawnObstaclePos = GameConfig.Global.getElement(104).Value;
        this.initPoolData(this.cfgAssets, 4);
    }
    /**
     * 初始化关卡数据
     * @param cfgData
     */
    initLevelData() {
        this._levelData.length = 0;
        let levelID = mw.MathUtil.randomInt(0, this.cfgLevels.length);
        let ogid = this.cfgLevels[levelID].ObstacleGroupID;
        let sp = this.cfgLevels[levelID].SpawnPos;
        for (let i = 0; i < ogid.length; i++) {
            this._levelData.push({ spawnPos: sp[i], ObstacleGroupID: ogid[i] });
        }
    }
    /**
     * 初始化池数据
     * @param cfgs
     * @param initLength 默认生成的数量
     */
    initPoolData(cfgs, initLength) {
        this._obstacleMap = new Map();
        this._obstacleData = new Map();
        cfgs.forEach((cfg) => {
            if (cfg.Groupid != 1) {
                this._obstacleData.set(cfg.NameID, { rGuid: cfg.PrefabsGuid, rType: cfg.ResourceGroup, lenght: cfg.Lenght });
                //寻找天空金币的id
                if (cfg.ResourceGroup == ResourceType.SkyCoins) {
                    this._skyCoinsID = cfg.NameID;
                }
            }
        });
        /**将障碍数据加入分针生成队列 */
        for (let [k, v] of this._obstacleData) {
            let size = initLength;
            //如果是障碍物组、天空金币关卡则只可以生成两个
            if (v.rType == ResourceType.CantRandomAndCanPass || v.rType == ResourceType.SkyCoins)
                size = 2;
            for (let i = 0; i < size; i++) {
                this.logicTempData.push(k);
            }
        }
        this._loadUi = mw.UIService.getUI(LoadingUI);
        this._loadNum = 0;
        this._loadMax = this.logicTempData.length;
    }
    /**
     * 动态加载障碍
     * @returns
     */
    async loadAssetInPool(dt) {
        if (this.logicTempData.length < 1)
            return;
        this._initing = true;
        let id = this.logicTempData.pop();
        if (id != 0) {
            let ob = new Obstacle(id);
            await ob.init();
            this._loadNum++;
            this._loadUi.setPro(this._loadNum / this._loadMax);
            this._initing = false;
            if (!this.flagID) {
                this.flagID = id;
            }
            if (this.flagID != id) {
                this._obstacleMap.set(this.flagID, this.logicList);
                this.logicList = [];
                this.flagID = id;
            }
            this.logicList.push(ob);
            //最后一个
            if (this.logicTempData.length < 1) {
                this._obstacleMap.set(this.flagID, this.logicList);
                this.logicList.length = 0;
                this._initing = true;
                this._loadUi.setPro(2);
                this.checkHaveRookieScene();
            }
        }
        else
            this._initing = false;
    }
    /**
     * 初始化随机数据
     */
    initRadomObstalceData() {
        GameConfig.Assets.getAllElement().forEach(cfg => {
            if (cfg.Groupid == 2) {
                this._randomObstacleData.push({ nameID: cfg.NameID, ResourceType: cfg.ResourceGroup, weight: cfg.Ratio });
            }
        });
        for (let i = 0; i < this._randomObstacleData.length; i++) {
            if (this._randomObstacleData[i].ResourceType == 1) {
                this._canPassObstacleIndex = i;
            }
            for (let j = 0; j < this._randomObstacleData[i].weight.length; j++) {
                this._allWeight[j] || this._allWeight.push(0);
                this._allWeight[j] += this._randomObstacleData[i].weight[j];
            }
        }
    }
    /**
     * 设置天空金币关卡的位置
     * @param posX
     * @param posZ
     */
    setSkyCoinsLevelPos(posX, posZ) {
        let re = this._obstacleMap.get(this._skyCoinsID);
        if (re && re[0]) {
            let pos = this._tracks[0].clone();
            pos.x = posX;
            pos.z = posZ;
            this._skyCoins = re.pop();
            this._skyCoins.setLocation(pos);
            this._onUsageObstacle.push(this._skyCoins);
        }
    }
    /**
     * 隐藏飞行金币
     */
    hideSkyCoins() {
        if (this._skyCoins)
            this._skyCoins.resetPos();
    }
    /**
     * 通过id组获取障碍组
     * @param ids
     * @returns
     */
    getObstacleByID(ids) {
        let objs = [];
        for (let id of ids) {
            if (!this._obstacleMap.has(id)) {
                console.log(`未找到id为: ${id}的对象列表`);
                continue;
            }
            let objList = this._obstacleMap.get(id);
            let obj = objList.pop();
            if (obj) {
                objs.push(obj);
            }
            else {
                obj = new Obstacle(id);
                obj.init();
                objList.push(obj);
            }
        }
        return objs;
    }
    /**
     * 将障碍放回池内
     * @param obj
     * @returns
     */
    putbackObstacleToPool(obj) {
        //检查对象是否存在于map内
        if (!this._obstacleMap.has(obj.id))
            return;
        let objList = this._obstacleMap.get(obj.id);
        //对象已存在表中、直接返回
        if (objList.indexOf(obj) != -1)
            return;
        obj.resetPos();
        objList.push(obj);
    }
    /**
     * 复活隐藏
     */
    hide(dis = 1000) {
        for (let i = 0; i < this._onUsageObstacle.length; i++) {
            let ob = this._onUsageObstacle[i];
            ob.setHide(dis);
        }
    }
    /**查看是否有新手关卡 */
    checkHaveRookieScene() {
        if (DataManager.isGuideScene) {
            this._obstaclesSpwanDis += GameConfig.Assets.getElement(1).Lenght;
        }
    }
    /**
     * 通过关卡定点距离生成障碍物组
     * @param spawnPoint
     * @returns 返回id
     */
    getLevelDataByDistance(spawnPoint) {
        if (!this._levelData[this._levelDataIndex])
            return 0;
        if (spawnPoint >= this._levelData[this._levelDataIndex].spawnPos) {
            return this._levelData[this._levelDataIndex++].ObstacleGroupID;
        }
        else {
            return 0;
        }
    }
    /**重置 */
    reset() {
        this._obstaclesSpwanDis = GameConfig.Global.getElement(103).Value;
        this._aheadCreateLen = 0;
        this._mgsRandomLevelCount = 0;
        this._levelDataIndex = 0;
        for (let i of this._onUsageObstacle) {
            this.putbackObstacleToPool(i);
        }
        for (let i of this._tracks) {
            i.x = 0;
        }
        this._onUsageObstacle.length = 0;
        this._logicQueue.forEach((data) => {
            if (data.obj) {
                this.putbackObstacleToPool(data.obj);
            }
        });
        this._logicQueue.length = 0;
        this.checkHaveRookieScene();
        this._obstacleWeight.onReset();
        this.initLevelData();
    }
    onUpdate(dt) {
        if (!this._initing)
            this.loadAssetInPool(dt);
        if (!DataManager.isGaming && !DataManager.isReady)
            return;
        this._aheadCreateLen = DataManager.gameDis + this._initSpawnObstaclePos;
        this.createObstatecleInScene();
        this.checkObstaclePutbackPool();
        if (this._logicQueue.length > 0) {
            if (this._logicQueue[0] && this._logicQueue[0].obj) {
                this._logicQueue[0].obj.setLocation(this._logicQueue[0].pos);
                this._onUsageObstacle.push(this._logicQueue[0].obj);
            }
            this._logicQueue.shift();
        }
        this._onUsageObstacle.forEach(ob => {
            ob.onUpdate(dt);
        });
        this._obstacleWeight.onUpdate();
    }
    /**
     * 回收到障碍池中
     */
    checkObstaclePutbackPool() {
        for (let i = 0; i < this._onUsageObstacle.length; i++) {
            if (!this._onUsageObstacle[i].active) {
                let t = this._onUsageObstacle[i];
                this._onUsageObstacle.splice(i, 1);
                this.putbackObstacleToPool(t);
            }
        }
    }
    /**
     * 在关卡内创建障碍
     */
    createObstatecleInScene() {
        if (this._logicQueue.length <= 0 && this._obstaclesSpwanDis < this._aheadCreateLen) {
            let resultID = this.getLevelDataByDistance(this._obstaclesSpwanDis);
            let objs;
            if (resultID) {
                objs = this.getObstacleByID([resultID]);
            }
            else {
                objs = this.randomObstacle();
            }
            //统计道具
            objs.forEach(e => {
                if (e.isItem) {
                    // console.error(`生成道具id：${e.id}`);
                    DataManager.totalItems += 1;
                }
            });
            this.setObstacleRandomPositon(objs);
            //加上障碍间隔
            this._obstaclesSpwanDis += GameConfig.Global.getElement(102).Value;
            this._mgsRandomLevelCount++;
        }
    }
    /**
     * 随机障碍
     */
    randomObstacle() {
        let obIds = this.getRandomObstacleID();
        let objs = this.getObstacleByID(obIds);
        return objs;
    }
    /**
     * 随机获取三个障碍物id
     * 其中一个必定是可以通过的
     */
    getRandomObstacleID() {
        //在这一段跑道不可以通过的障碍个数
        let cantPassCount = 0;
        let obIds = [];
        let obData;
        for (let i = 0; i < 3; i++) {
            if (cantPassCount >= 2) {
                obData = this.getRandomObstacleData(true);
            }
            else {
                obData = this.getRandomObstacleData();
            }
            if (obData.ResourceType == ResourceType.CanRandomAndCantPass || obData.ResourceType == ResourceType.CanRamdomAndCantPassPos) {
                cantPassCount++;
            }
            obIds.push(obData.nameID);
        }
        return obIds;
    }
    /**
     * 随机获取障碍物数据
     * @param isPass 是否指定通过
     * @returns
     */
    getRandomObstacleData(isPass = false) {
        let weight = 0;
        let random = 0;
        if (isPass) {
            for (let i = 0; i < 10; i++) {
                random = mw.MathUtil.randomInt(0, this._allWeight[this._obstacleWeight.weightIndex]);
                weight = 0;
                for (let i of this._randomObstacleData) {
                    weight += i.weight[this._obstacleWeight.weightIndex];
                    if (weight > random && i.ResourceType == ResourceType.CanRandomAndCanPass) {
                        return { nameID: i.nameID, ResourceType: i.ResourceType };
                    }
                }
            }
            // console.log(`调用了低保方法`);
            //保证有一条道路是可通过的
            return this._randomObstacleData[this._canPassObstacleIndex];
        }
        else {
            random = mw.MathUtil.randomInt(0, this._allWeight[this._obstacleWeight.weightIndex]);
            for (let i of this._randomObstacleData) {
                weight += i.weight[this._obstacleWeight.weightIndex];
                if (weight > random) {
                    return { nameID: i.nameID, ResourceType: i.ResourceType };
                }
            }
            // console.log(`未找到、随机值：${random}，权重：${weight}`);
        }
    }
    /**
     * 给障碍组随机位置
     * 包括障碍组和障碍组合
     * @param objs
     */
    setObstacleRandomPositon(objs) {
        this._logicQueue.push({ obj: null, pos: null });
        for (let i of this._tracks) {
            i.x = this._obstaclesSpwanDis;
        }
        for (let i = 0; i < objs.length; i++) {
            switch (objs[i].resourceType) {
                case ResourceType.CanRamdomAndCantPassPos:
                    this._tracks[i].x += mw.MathUtil.randomInt(100, 151);
                    break;
                case ResourceType.CanRandomAndCanPass:
                    this._tracks[i].x += mw.MathUtil.randomInt(100, 701);
                    break;
                case ResourceType.CanRandomAndCantPass:
                    this._tracks[i].x += mw.MathUtil.randomInt(100, 701);
                    break;
            }
            this._logicQueue.push({ obj: objs[i], pos: this._tracks[i] });
            let obLen = this._tracks[i].x + objs[i].getObLenght;
            //更新每段障碍生成的起始位置
            if (this._obstaclesSpwanDis < obLen) {
                this._obstaclesSpwanDis = obLen;
            }
        }
        this._logicQueue.push({ obj: null, pos: null });
    }
}
/**
 * 障碍权重管理类
 * 负责到指定位置切换权重组
 */
class ObstacleWeight {
    get weightIndex() {
        return this._weightIndex;
    }
    constructor() {
        this._weightIndex = 0;
        this._index = 0;
        this._weightIndex = 0;
        this._index = 0;
        this._weightCutCodition = GameConfig.Global.getElement(106).Value5;
    }
    onUpdate() {
        if (!this._weightCutCodition[this._index]) {
            return;
        }
        if (DataManager.gameDis > this._weightCutCodition[this._index]) {
            this._weightIndex++;
            this._index++;
        }
    }
    onReset() {
        this._index = 0;
        this._weightIndex = 0;
    }
}

var foreign33 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ObstacleModuleC: ObstacleModuleC
});

class SceneModuleC extends ModuleC {
    onAwake() {
        this._isRandomScene = false;
        this._isCompleteRookie = true;
    }
    onStart() {
        Event.addLocalListener(Const.COMPLETE_GUIDE_SCENE, () => {
            let timeid = setTimeout(() => {
                this.rookieScene.scene.worldTransform.position = new mw.Vector(0, 0, -5000);
                clearTimeout(timeid);
            }, 2000);
        });
    }
    init() {
        SpawnManager.asyncSpawn({ guid: '2CC6A6874088E0328EDECA8434F7F284', replicates: false }).then((obj) => {
            let loc = new mw.Vector(-782, Const.BASE_POS, 0);
            obj.worldTransform.position = loc;
        });
        this._levelCfg = GameConfig.Level.getAllElement();
        this._level = GameConfig.Level.getElement(this.randomSceneID);
        this._sceneIndex = 0;
        this.sceneLocation = new mw.Vector(1200, Const.BASE_POS, 0);
        this.initSceneData(GameConfig.Assets.getAllElement());
    }
    /**
     * 初始化
     * @param cfgs
     */
    async initSceneData(cfgs) {
        this._sceneManager = new Map();
        this._oringinLoc = new mw.Vector(0, 0, -5000);
        for (let i = 0; i < cfgs.length; i++) {
            let cfg = cfgs[i];
            if (cfg.Groupid == 1 && i != 0) {
                let objScene = await SpawnManager.asyncSpawn({ guid: cfg.PrefabsGuid });
                objScene.worldTransform.position = this._oringinLoc;
                this._sceneManager.set(cfg.NameID, { scene: objScene, lenght: cfg.Lenght });
            }
            else if (cfg.Groupid == 1 && i == 0) {
                let objScene = null;
                if (DataManager.isGuideScene) {
                    objScene = await SpawnManager.asyncSpawn({ guid: cfg.PrefabsGuid });
                    objScene.worldTransform.position = this._oringinLoc;
                }
                this.rookieScene = { scene: objScene, lenght: cfg.Lenght };
            }
        }
        this.checkHaveRookieLevel();
        //console.log('initSceneData')
    }
    /**
     * 通过id获取场景
     * @param id
     * @returns
     */
    getSceneByID(id) {
        if (this._sceneManager.has(id)) {
            return this._sceneManager.get(id);
        }
        else {
            console.log(`未找到找当id为${id}的场景`);
            return null;
        }
    }
    /**检查是否需要生成新手关卡 */
    checkHaveRookieLevel() {
        if (DataManager.isGuideScene) {
            this.rookieScene.scene.worldTransform.position = this.sceneLocation;
            this.renewSceneLoc(this.rookieScene);
            this._isCompleteRookie = false;
        }
        this._isRandomScene = true;
    }
    reset() {
        this._sceneManager.forEach(obj => {
            obj.scene.worldTransform.position = this._oringinLoc;
        });
        this._sceneIndex = 0;
        this.sceneLocation = new mw.Vector(1200, Const.BASE_POS, 0);
        this.checkHaveRookieLevel();
    }
    /**
     * 随机获取一个场景难度值
     * @returns
     */
    get randomSceneID() {
        let lastIndex = this._levelCfg.length - 1;
        let random = mw.MathUtil.randomInt(1, this._levelCfg[lastIndex].id + 1);
        return random;
    }
    /**
     * 场景更新
     * @param LevelLen 连续生成的场景个数
     */
    renewScene() {
        let out = this.getSceneByID(this._level.Scene[this._sceneIndex++]);
        if (out == null) {
            console.error("物体不存在！！！！");
        }
        if (this._sceneIndex >= this._level.Scene.length) {
            this._sceneIndex = 0;
        }
        out.scene.worldTransform.position = this.sceneLocation;
        this.renewSceneLoc(out);
    }
    /**
     * 根据当前场景获取新场景的位置
     * @param scene 当前场景
     * @returns
     */
    renewSceneLoc(scene) {
        let sceneLengthX = 0;
        if (scene) {
            sceneLengthX = scene.lenght;
        }
        this.sceneLocation.x += sceneLengthX;
    }
    onUpdate(dt) {
        if (!this._sceneManager)
            return;
        if (this.sceneLocation.x < (DataManager.gameDis + 9000) && this._isRandomScene) {
            this.renewScene();
        }
    }
}

var foreign42 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SceneModuleC: SceneModuleC
});

/*
 * @Author: xianjie.xia
 * @LastEditors: xianjie.xia
 * @Date: 2022-10-31 14:39
 * @LastEditTime: 2022-11-25 13:38
 * @description:
 */
// export namespace Modules {
//     export let userModule = ModuleService.getModule(ItemModuleC);
//     export let xxxModule = ModuleService.getModule(RoleModuleC);
// }
class GameModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        this._readyTime = 0;
    }
    //游戏初始化
    async init() {
        DataManager.init();
        this.guideDataInit();
        this._roleModuleC = ModuleService.getModule(RoleModuleC);
        let smc = ModuleService.getModule(SceneModuleC);
        smc.init();
        await this._roleModuleC.init();
        let gmc = ModuleService.getModule(GuideModuleC);
        gmc.init();
    }
    /**
     * 引导数据更新
     */
    guideDataInit() {
        DataManager.isGuideScene = this.data.getGuide(GuideTarget.Scene) < 1;
        DataManager.isGuideShop = this.data.getGuide(GuideTarget.Shop) < 1;
        DataManager.isGuideRole = this.data.getGuide(GuideTarget.Role) < 1;
        let looby = mw.UIService.getUI(UILobby);
        Utils.setUIVisible(false, looby.mCanvasRole, looby.mCanvasShop);
        if (!DataManager.isGuideScene) {
            Utils.setUIVisible(true, looby.mCanvasShop);
            if (!DataManager.isGuideShop) {
                Utils.setUIVisible(true, looby.mCanvasRole);
            }
        }
    }
    onUpdate(dt) {
        if (DataManager.isPuase)
            return;
        else if (DataManager.isGaming)
            DataManager.gameTime += dt;
        if (this._readyTime > 0) {
            this._readyTime -= dt;
            if (this._readyTime <= 0) {
                DataManager.setState(GameState.Game);
            }
        }
    }
    /**
     * 游戏开始
     */
    gameStart() {
        DataManager.setState(GameState.Ready);
        this._roleModuleC.gameStart();
        this._readyTime = 2;
        MGSCenter.ts_coregameplay_start();
    }
    /**
     * 暂停操作
     */
    gamePuase() {
        this._roleModuleC.gamePuase();
        DataManager.puase();
    }
    /**
     * 复活
     */
    relive() {
        this._roleModuleC.relive();
        DataManager.relive();
        //复活场景障碍消失
        ModuleService.getModule(ObstacleModuleC).hide();
    }
    /**
     * 重置游戏参数
     */
    reset() {
        DataManager.init();
        this._readyTime = 0;
        this._roleModuleC.reset();
        ModuleService.getModule(SceneModuleC).reset();
        ModuleService.getModule(ObstacleModuleC).reset();
    }
    //测试的
    test(v) {
        this._roleModuleC.test(v);
    }
    /**
     * 移动玩家
     * @param type 方式
     * @returns
     */
    movePlayer(type) {
        if (!DataManager.isGaming)
            return;
        this._roleModuleC.move(type);
    }
    /**
     * 当前货币
     */
    get curCoin() {
        return this.data.curCoin;
    }
    /**
     * 当前宝石
     */
    get curGem() {
        return this.data.curGem;
    }
    /**
     * 当前游戏分
     */
    // public get curScore(): number {
    //     return DataManager.curScore;
    // }
    /**
     * 最高分
     */
    get maxScore() {
        return this.data.maxScore;
    }
    /**
     * 游戏结算,结算界面打开时
     */
    gameEnd() {
        let score = DataManager.endScore;
        //this.server.onScore(score);
        if (score > this.maxScore)
            this.server.net_onScore(score);
        // this.callServerFun(this.server.onScore, score);
        this.data.addMoney(DataManager.coinNum, DataManager.gemNum);
        //this.callServerFun(this.server.addMoney, DataManager.coinNum, DataManager.gemNum);
        this.server.net_addMoney(DataManager.coinNum, DataManager.gemNum);
        this.reset();
    }
    /**
     * 完成引导
     * @param target
     */
    completeGuide(target) {
        switch (target) {
            case GuideTarget.Scene:
                DataManager.isGuideScene = false;
                break;
            case GuideTarget.Role:
                DataManager.isGuideRole = false;
                break;
            case GuideTarget.Shop:
                DataManager.isGuideShop = false;
                break;
        }
        this.server.net_onGuide(target, 1);
    }
    /**
     * 使用道具
     * @param id
     */
    useItem(id, count = 1) {
        console.log('useitem:' + id);
        let ic = ModuleService.getModule(ItemModuleC);
        let prom = ic.costItem(id, count);
        if (!prom)
            return;
        prom.then((res) => {
            if (res)
                this._roleModuleC.useItem(id);
        });
    }
    /**
     * 消耗
     * @param type 类型
     * @param num 数量
     * @returns 成功
     */
    cost(type, num) {
        let c = type == 1 ? num : 0;
        let g = type == 2 ? num : 0;
        if (this.data.costMoney(c, g)) {
            // this.callServerFun(this.server.cost, c, g);
            this.server.net_cost(c, g);
            return true;
        }
        return false;
    }
    /**
     * 消耗
     * @param type 类型
     * @param num 数量
     * @returns 足够
     */
    enough(type, num) {
        let c = type == 1 ? num : 0;
        let g = type == 2 ? num : 0;
        return this.data.enough(c, g);
    }
    /**
     * 引导增加金币
     * @param num
     */
    guideAddMoney(num) {
        if (this.data.curCoin < num) {
            let coin = num - this.data.curCoin;
            this.data.addMoney(coin, 0);
            this.server.net_addMoney(coin, 0);
        }
    }
}

var foreign22 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GameModuleC: GameModuleC
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/GameUI.ui
 * TIME: 2023.05.15-17.19.24
 */
let GameUI_generate = class GameUI_generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.touchMove = undefined;
        this.txtScore = undefined;
        this.scoreTip = undefined;
        this.mCanvas_Point = undefined;
        this.txtCoin = undefined;
        this.doubleTip = undefined;
        this.mCanvas_Money = undefined;
        this.btnPuase = undefined;
        this.txtItem2 = undefined;
        this.btnItem2 = undefined;
        this.txtItem3 = undefined;
        this.btnItem3 = undefined;
        this.txtItem5 = undefined;
        this.btnItem5 = undefined;
        this.itemNode = undefined;
        this.gameRoot = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        //按钮添加点击
        // 
        // this.btnPuase.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "btnPuase");
        // })
        // this.btnPuase.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        // this.btnItem2.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "btnItem2");
        // })
        // this.btnItem2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        // this.btnItem3.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "btnItem3");
        // })
        // this.btnItem3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        // this.btnItem5.onClicked.add(()=>{
        // 	Event.dispatchToLocal("PlayButtonClick", "btnItem5");
        // })
        // this.btnItem5.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        // 
        //按钮多语言
        //文本多语言
        this.initLanguage(this.txtScore);
        this.initLanguage(this.scoreTip);
        this.initLanguage(this.txtCoin);
        this.initLanguage(this.doubleTip);
        this.initLanguage(this.txtItem2);
        this.initLanguage(this.txtItem3);
        this.initLanguage(this.txtItem5);
        //文本多语言
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('gameRoot/touchMove')
], GameUI_generate.prototype, "touchMove", void 0);
__decorate([
    UIWidgetBind('gameRoot/mCanvas_Point/txtScore')
], GameUI_generate.prototype, "txtScore", void 0);
__decorate([
    UIWidgetBind('gameRoot/mCanvas_Point/scoreTip')
], GameUI_generate.prototype, "scoreTip", void 0);
__decorate([
    UIWidgetBind('gameRoot/mCanvas_Point')
], GameUI_generate.prototype, "mCanvas_Point", void 0);
__decorate([
    UIWidgetBind('gameRoot/mCanvas_Money/txtCoin')
], GameUI_generate.prototype, "txtCoin", void 0);
__decorate([
    UIWidgetBind('gameRoot/mCanvas_Money/doubleTip')
], GameUI_generate.prototype, "doubleTip", void 0);
__decorate([
    UIWidgetBind('gameRoot/mCanvas_Money')
], GameUI_generate.prototype, "mCanvas_Money", void 0);
__decorate([
    UIWidgetBind('gameRoot/MWCanvas_2/btnPuase')
], GameUI_generate.prototype, "btnPuase", void 0);
__decorate([
    UIWidgetBind('gameRoot/itemNode/btnItem2/txtItem2')
], GameUI_generate.prototype, "txtItem2", void 0);
__decorate([
    UIWidgetBind('gameRoot/itemNode/btnItem2')
], GameUI_generate.prototype, "btnItem2", void 0);
__decorate([
    UIWidgetBind('gameRoot/itemNode/btnItem3/txtItem3')
], GameUI_generate.prototype, "txtItem3", void 0);
__decorate([
    UIWidgetBind('gameRoot/itemNode/btnItem3')
], GameUI_generate.prototype, "btnItem3", void 0);
__decorate([
    UIWidgetBind('gameRoot/itemNode/btnItem5/txtItem5')
], GameUI_generate.prototype, "txtItem5", void 0);
__decorate([
    UIWidgetBind('gameRoot/itemNode/btnItem5')
], GameUI_generate.prototype, "btnItem5", void 0);
__decorate([
    UIWidgetBind('gameRoot/itemNode')
], GameUI_generate.prototype, "itemNode", void 0);
__decorate([
    UIWidgetBind('gameRoot')
], GameUI_generate.prototype, "gameRoot", void 0);
GameUI_generate = __decorate([
    UIBind('UI/GameUI.ui')
], GameUI_generate);
var GameUI_generate$1 = GameUI_generate;

var foreign61 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GameUI_generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/UseItem.ui
 * TIME: 2023.05.15-17.19.24
 */
let UseItem_generate = class UseItem_generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.icon = undefined;
        this.time = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        //按钮添加点击
        // 
        //按钮多语言
        //文本多语言
        this.initLanguage(this.time);
        //文本多语言
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('Canvas/icon')
], UseItem_generate.prototype, "icon", void 0);
__decorate([
    UIWidgetBind('Canvas/time')
], UseItem_generate.prototype, "time", void 0);
UseItem_generate = __decorate([
    UIBind('UI/UseItem.ui')
], UseItem_generate);
var UseItem_generate$1 = UseItem_generate;

var foreign79 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: UseItem_generate$1
});

/**
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2022-11-27 14:14
 * @LastEditTime : 2022-11-28 18:56
 * @description  :
 */
class GameUI extends GameUI_generate$1 {
    constructor() {
        super(...arguments);
        //按下
        this.isPress = false;
        this._isInited = false;
        //信息刷新间隔
        this._freshDt = 0.5;
        //上局最高分
        this._lastMax = 0;
        this._tipTag = false;
        //道具按钮隐藏时长
        this._hideTime = 10;
        /**处于开始引导的时候， 无法左右移动 */
        this.isStartGuide = false;
        /**
         * 道具使用被通知显示
         * @param id ID
         * @param time 时间
         * @returns
         */
        this.onItemUse = (id, time) => {
            let cfg = GameConfig.Item.getElement(id);
            if (!cfg)
                return;
            // console.log(id, time)
            let item = this.getItem(id);
            item.setInfo(id, cfg.icon, time);
            this.freshUse();
            if (id == 2) {
                if (time <= 0) //护盾触发
                    ModuleService.getModule(ObstacleModuleC).hide();
            }
            else if (id == 3) {
                let omc = ModuleService.getModule(ObstacleModuleC);
                if (time > 0) //飞行触发
                    omc.setSkyCoinsLevelPos(DataManager.gameDis + 1800, Const.FLY_HEIGHT - 50);
                else {
                    omc.hideSkyCoins();
                    omc.hide(1500);
                }
            }
            else if (id == 5) {
                let vis = time > 0 ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
                this.doubleTip.visibility = vis;
            }
        };
        /**
         * 移动操作
         * @param dir
         */
        this.doMove = (dir) => {
            let absx = Math.abs(dir.x);
            let absy = Math.abs(dir.y);
            if (absx + absy > 0.1 && this.isPress) {
                let type = MoveType.None;
                if (absx > absy) {
                    type = dir.x > 0 ? MoveType.Right : MoveType.Left;
                }
                else {
                    type = dir.y > 0 ? MoveType.Jump : MoveType.Down;
                }
                switch (type) {
                    case MoveType.Right:
                        if (this.isStartGuide)
                            type = MoveType.None;
                        Sound.instance.gameSound(SPSound.Move);
                        break;
                    case MoveType.Left:
                        if (this.isStartGuide)
                            type = MoveType.None;
                        Sound.instance.gameSound(SPSound.Move);
                        break;
                    case MoveType.Jump:
                        Sound.instance.gameSound(SPSound.Jump);
                        break;
                    case MoveType.Down:
                        Sound.instance.gameSound(SPSound.Down);
                        break;
                }
                this._gameModuleC.movePlayer(type);
                this.isPress = false;
            }
        };
        /**
         * 刷新道具显示
         */
        this.freshItem = () => {
            let imc = ModuleService.getModule(ItemModuleC);
            let num2 = imc.getItemCount(2);
            this.txtItem2.text = 'x' + num2;
            let num3 = imc.getItemCount(3);
            this.txtItem3.text = 'x' + num3;
            let num5 = imc.getItemCount(5);
            this.txtItem5.text = 'x' + num5;
        };
    }
    onStart() {
        this.initUI();
        this._gameModuleC = ModuleService.getModule(GameModuleC);
        this.canUpdate = true;
    }
    /**
     * 当前UI初始化
     * @returns
     */
    initUI() {
        if (this._isInited)
            return;
        this.btnPuase.onClicked.add(() => {
            this._gameModuleC.gamePuase();
            mw.UIService.show(UIPause);
            mw.UIService.hide(GameUI);
            Sound.instance.gameSound(SPSound.PressButton);
            MGSCenter.gamePause();
        });
        let cfg2 = GameConfig.Item.getElement(2);
        this.btnItem2.normalImageGuid = cfg2.icon;
        this.btnItem2.onClicked.add(() => {
            this._gameModuleC.useItem(2);
            this.freshItem();
            Sound.instance.gameSound(SPSound.PressButton);
        });
        let cfg3 = GameConfig.Item.getElement(3);
        this.btnItem3.normalImageGuid = cfg3.icon;
        this.btnItem3.onClicked.add(() => {
            this._gameModuleC.useItem(3);
            this.freshItem();
            Sound.instance.gameSound(SPSound.PressButton);
        });
        let cfg5 = GameConfig.Item.getElement(5);
        this.btnItem5.normalImageGuid = cfg5.icon;
        this.btnItem5.onClicked.add(() => {
            this._gameModuleC.useItem(5);
            this.freshItem();
            Sound.instance.gameSound(SPSound.PressButton);
        });
        //滑动
        this.touchMove.onJoyStickDown.add(() => {
            this.isPress = true;
        });
        this.touchMove.onInputDir.add(this.doMove);
        this._useItem = [];
        this._tempV2 = new mw.Vector2(0, 400);
        Event.addLocalListener(Const.ITEM_USE, this.onItemUse);
        Event.addLocalListener(Const.ITEM_ADD, this.freshItem);
        this._isInited = true;
        this.layer = mw.UILayerSystem;
    }
    /**
     * 获取一个道具使用提示组件
     * @param id 道具ID
     * @returns
     */
    getItem(id) {
        //优先找相同的刷新
        for (let v of this._useItem) {
            if (v.itemId == id)
                return v;
        }
        //找一个空闲的
        for (let v of this._useItem) {
            if (v.itemTime <= 0)
                return v;
        }
        //创建新的
        let item = mw.UIService.create(UseItem);
        this.itemNode.addChild(item.uiObject);
        this._useItem.push(item);
        return item;
    }
    onShow(game) {
        if (game) { //只有新开游戏才执行
            this.freshInfo();
            this.freshItem();
            this._lastMax = this._gameModuleC.maxScore;
            this._tipTag = false;
            this._hideTime = 10;
            this.doubleTip.visibility = mw.SlateVisibility.Collapsed;
            this.scoreTip.visibility = mw.SlateVisibility.Collapsed;
            if (!DataManager.isGuideScene) {
                this.btnItem3.visibility = mw.SlateVisibility.Visible;
                this.btnItem5.visibility = mw.SlateVisibility.Visible;
            }
            Sound.instance.gameBGM(SPSound.Game);
            this._useItem.forEach(item => {
                item.reset();
            });
        }
    }
    guideButtonAction(type) {
        // console.log(`-------------zhixing      ${type}`);
        switch (type) {
            case 1:
                this.btnItem2.visibility = mw.SlateVisibility.Visible;
                this.btnItem3.visibility = mw.SlateVisibility.Visible;
                this.btnItem5.visibility = mw.SlateVisibility.Visible;
                this.freshItem();
                break;
            case 2:
                this.btnItem2.visibility = mw.SlateVisibility.Visible;
                this.freshItem();
                break;
            case 3:
                this.btnItem2.visibility = mw.SlateVisibility.Hidden;
                this.btnItem3.visibility = mw.SlateVisibility.Hidden;
                this.btnItem5.visibility = mw.SlateVisibility.Hidden;
                break;
        }
    }
    onUpdate(dt) {
        if (DataManager.isGaming || DataManager.isEnd) {
            if (dt > 3) {
                this._gameModuleC.gamePuase();
                mw.UIService.show(UIPause);
                mw.UIService.hide(GameUI);
                return;
            }
            this._freshDt += dt;
            if (this._freshDt > 0.5)
                this.freshInfo();
            this._useItem.forEach(item => {
                if (item.onUpdate(dt))
                    this.freshUse();
            });
            if (this._hideTime > 0) {
                this._hideTime -= dt;
                if (this._hideTime <= 0) {
                    this.btnItem3.visibility = mw.SlateVisibility.Collapsed;
                    this.btnItem5.visibility = mw.SlateVisibility.Collapsed;
                }
            }
        }
    }
    /**
     * 刷新信息显示
     */
    freshInfo() {
        this.txtCoin.text = DataManager.coinNum.toString();
        this.txtScore.text = DataManager.curScore.toString();
        if (!this._tipTag && this._lastMax > 1000 && DataManager.endScore > this._lastMax) {
            this._tipTag = true;
            this.scoreTip.visibility = mw.SlateVisibility.Visible;
            setTimeout(() => {
                this.scoreTip.visibility = mw.SlateVisibility.Collapsed;
            }, 5000);
            //
        }
    }
    /**
     * 刷新使用
     */
    freshUse() {
        let idx = 0;
        for (let v of this._useItem) {
            if (v.itemTime <= 0)
                continue;
            this._tempV2.x = 100 + idx * 200;
            v.setPos(this._tempV2);
            idx++;
        }
    }
}
class UseItem extends UseItem_generate$1 {
    constructor() {
        super(...arguments);
        this.itemTime = 0;
        this.itemId = 0;
    }
    /**
     * 设置信息
     * @param icon 图标
     * @param time 时间
     * @param pos 坐标
     */
    setInfo(id, icon, time) {
        this.itemId = id;
        this.icon.imageGuid = icon;
        this.itemTime = time;
        this.time.text = time.toFixed(1);
        this.fresh();
    }
    /**
     * 重置
     */
    reset() {
        this.itemId = 0;
        this.itemTime = 0;
        this.fresh();
    }
    /**
     * 设置位置
     * @param pos 坐标
     */
    setPos(pos) {
        this.uiObject.position = pos;
    }
    /**
     * 刷新时间
     * @param dt
     * @returns
     */
    onUpdate(dt) {
        if (this.itemTime > 0) {
            this.itemTime -= dt;
            this.time.text = this.itemTime.toFixed(1);
            if (this.itemTime <= 0) {
                this.fresh();
                return true;
            }
        }
        return false;
    }
    /**
     * 刷新显示
     */
    fresh() {
        let vis = this.itemTime > 0 ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
        this.uiObject.visibility = vis;
    }
}

var foreign46 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GameUI: GameUI
});

/**
 * @Author       : xianjie.xia
 * @LastEditors  : pengwei.shi
 * @Date         : 2022-11-04 11:25
 * @LastEditTime : 2022-11-27 15:02:12
 * @description  : 游戏中数据
 */
class DataManager {
    /**
     * 游戏数据初始化
     */
    static init() {
        this.setState(GameState.Init);
        this.gameDis = 0;
        this.reliveNum = 0;
        this.coinNum = 0;
        this.gemNum = 0;
        this.gameTime = 0;
        this.gameItems.clear();
        this.totalItems = 0;
    }
    // public static testNum = 0;
    /**
     * 是否游戏进行中
     */
    static get isGaming() {
        return this.gameState == GameState.Game;
    }
    //准备中
    static get isReady() {
        return this.gameState == GameState.Ready;
    }
    //暂停中
    static get isPuase() {
        return this.gameState == GameState.Puase;
    }
    //已结束
    static get isEnd() {
        return this.gameState == GameState.End;
    }
    /**
     * 获得金币
     * @param num 数量
     */
    static addCoin(num) {
        //50金币打点
        if (this.coinNum < 50 && this.coinNum + num >= 50)
            MGSCenter.ts_coregameplay_end();
        this.coinNum += num;
    }
    /**
     * 获得宝石
     * @param num 数量
     */
    static addGem(num) {
        this.gemNum += num;
    }
    /**
     * 当前游戏分
     */
    static get curScore() {
        return Math.ceil(this.gameDis * 0.07);
    }
    /**
     * 结算分
     */
    static get endScore() {
        return this.curScore + this.coinNum * 12;
    }
    /**
     * 设置游戏状态
     * @param state 状态
     */
    static setState(state) {
        this.gameState = state;
    }
    /**
     * 暂停操作
     */
    static puase(puase = false) {
        if (puase) {
            this._lastState = this.gameState;
            this.gameState = GameState.Puase;
        }
        if (this.gameState == GameState.Puase && !puase)
            this.gameState = this._lastState;
        else {
            this._lastState = this.gameState;
            this.gameState = GameState.Puase;
        }
    }
    /**
     * 道具触发统计
     * @param id 道具ID
     * @param use 主动使用
     */
    static onItem(id, use) {
        let info = this.gameItems.get(id);
        if (!info)
            info = { id: id, use: 0, pick: 0 };
        if (use)
            info.use++;
        else
            info.pick++;
        this.gameItems.set(id, info);
    }
    /**
     * 死亡 结束游戏
     */
    static onDie() {
        this.setState(GameState.End);
    }
    /**
     * 游戏结算
     */
    static onEnd() {
        this.setState(GameState.Over);
        //复活
        mw.UIService.hide(GameUI);
        mw.UIService.show(UIRelive);
        // mw.UIService.show(UIGameOver)
        //console.log('结算界面')
    }
    /**
     * 复活
     */
    static relive() {
        this.reliveNum++;
        mw.UIService.show(GameUI);
        this.setState(GameState.Game);
    }
}
/**
 * 游戏状态
 */
DataManager.gameState = GameState.None;
/**
 * 游戏进行到的距离位置，供场景刷新
 */
DataManager.gameDis = 0;
/**
 * 埋点使用 游戏时间
 */
DataManager.gameTime = 0;
/**
 * 埋点使用 游戏轮数
 */
DataManager.gameRound = 0;
/**
 * 埋点使用 刷新最高分的次数
 */
DataManager.roundWave = -1;
/**
 * 复活次数
 */
DataManager.reliveNum = 0;
/**
 * 游戏内获得的货币
 */
DataManager.coinNum = 0;
DataManager.gemNum = 0;
/**
 * 是否新手关卡引导中
 */
DataManager.isGuideScene = true;
/**
 * 是否需要商店引导
 */
DataManager.isGuideRole = true;
/**
 * 是否需要角色界面引导
 */
DataManager.isGuideShop = true;
/**
 * 所有引导是否完成
 */
DataManager.allGuideIsCompelete = true;
/**
 * 首次玩游戏在结算界面前
 * 提示玩家获得奖励的ui界面
 */
DataManager.isShowRewardUI = false;
/**
 * 新手撞墙提示
 */
DataManager.isGuideTips = false;
//马车移动速度
DataManager.carSpeed = 200;
/**
 * 上次的状态，暂停使用
 */
DataManager._lastState = GameState.None;
/**
 * 道具使用统计
 * id 道具ID
 * use 主动使用数量
 * pick 场景拾取数量
 */
DataManager.gameItems = new Map();
/**
 * 每一局生成的总道具量
 */
DataManager.totalItems = 0;

var foreign14 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    DataManager: DataManager
});

class GameInfo {
    constructor() {
        this.coinNum = 0;
        //宝石数
        this.gemNum = 0;
        //分
        this.score = 0;
        //新手关卡引导
        this.guideScene = 0;
        //商店引导
        this.guideShop = 0;
        //角色引导
        this.guideRole = 0;
    }
}
class GameData extends Subdata {
    constructor() {
        super(...arguments);
        this.coinNum = 0;
        //宝石数
        this.gemNum = 0;
        //分
        this.score = 0;
        //新手关卡引导
        this.guideScene = 0;
        //商店引导
        this.guideShop = 0;
        //角色引导
        this.guideRole = 0;
    }
    get dataName() {
        return 'GameData';
    }
    onDataInit() {
        if (!this.guideScene)
            this.guideScene = 0;
        if (!this.gemNum)
            this.gemNum = 0;
        if (!this.guideShop)
            this.guideShop = 0;
        if (!this.guideRole)
            this.guideRole = 0;
    }
    initDefaultData() {
        super.initDefaultData();
        this.coinNum = 0;
        this.score = 0;
        this.guideScene = 0;
        this.gemNum = 0;
        this.guideRole = 0;
        this.guideShop = 0;
        //console.log(this.score)
    }
    /**
     * 获取引导
     * @param target 目标
     * @returns
     */
    getGuide(target) {
        let re = 0;
        switch (target) {
            case GuideTarget.Scene:
                re = this.guideScene;
                break;
            case GuideTarget.Role:
                re = this.guideRole;
                break;
            case GuideTarget.Shop:
                re = this.guideShop;
                break;
        }
        return re;
    }
    /**
     * 设置新手引导是否完成
     * @param target
     * @param guide
     */
    setGuide(target, guide) {
        switch (target) {
            case GuideTarget.Scene:
                this.guideScene = guide;
                break;
            case GuideTarget.Role:
                this.guideRole = guide;
                break;
            case GuideTarget.Shop:
                this.guideShop = guide;
                break;
        }
        this.save(true);
    }
    /**
     * 增加货币
     * @param coin 金币数量
     * @param gem 宝石数量
     */
    addMoney(coin, gem) {
        this.coinNum += coin;
        this.gemNum += gem;
        this.save(true);
    }
    /**
     * 消耗货币
     * @param coin 金币数量
     * @param gem 宝石数量
     * @returns  是否成功
     */
    costMoney(coin, gem) {
        if (!this.enough(coin, gem))
            return false;
        this.coinNum -= coin;
        this.gemNum -= gem;
        this.save(true);
        return true;
    }
    /**
     * 消耗货币
     * @param coin 金币数量
     * @param gem 宝石数量
     * @returns  是否成功
     */
    enough(coin, gem) {
        if (this.coinNum < coin)
            return false;
        if (this.gemNum < gem)
            return false;
        return true;
    }
    /**
     * 获取当前货币
     */
    get curCoin() {
        return this.coinNum;
    }
    /**
     * 获取当前货币
     */
    get curGem() {
        return this.gemNum;
    }
    // /**
    //  * 直接设置货币数量
    //  * @param num 数量
    //  */
    // public setCoin(num: number) {
    //     this.coinNum = num;
    //     this.saveData(true);
    // }
    /**
     * 设置得分
     * @param score 得分
     */
    setScore(score) {
        this.score = score;
        this.save(true);
    }
    /**
     * 获取最高分
     */
    get maxScore() {
        return this.score;
    }
}
__decorate([
    Decorator.persistence()
], GameData.prototype, "coinNum", void 0);
__decorate([
    Decorator.persistence()
], GameData.prototype, "gemNum", void 0);
__decorate([
    Decorator.persistence()
], GameData.prototype, "score", void 0);
__decorate([
    Decorator.persistence()
], GameData.prototype, "guideScene", void 0);
__decorate([
    Decorator.persistence()
], GameData.prototype, "guideShop", void 0);
__decorate([
    Decorator.persistence()
], GameData.prototype, "guideRole", void 0);

var foreign21 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GameData: GameData,
    GameInfo: GameInfo
});

class GameModuleS extends ModuleS {
    onStart() {
        super.onStart();
    }
    onPlayerEnterGame(player) {
        super.onPlayerEnterGame(player);
    }
    /**
     * 获得货币
     * @param coin 数量
     */
    net_addMoney(coin, gem) {
        //console.log('add', coin);
        this.currentData.addMoney(coin, gem);
    }
    /**
     * 游戏得分
     */
    net_onScore(score) {
        if (this.currentData.maxScore < score) {
            this.currentData.setScore(score);
        }
    }
    /**
     * 完成引导
     * @param target 引导目标
     * @param guide 阶段
     */
    net_onGuide(target, guide) {
        this.currentData.setGuide(target, guide);
    }
    /**
     * 消耗
     * @param type 类型
     * @param num 数量
     */
    net_cost(coin, gem) {
        if (this.currentData.costMoney(coin, gem)) {
            return true;
        }
        return false;
    }
}

var foreign23 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GameModuleS: GameModuleS
});

/*
 * @Author: YuKun.Gao
 * @Date: 2022-06-27 10:15:29
 * @LastEditors: yukun.gao yukun.gao@appshahe.com
 * @LastEditTime: 2022-11-16 15:19:25
 * @Description: file content
 * @FilePath: \JavaScripts\module\guideModule\GuideModelData.ts
 */
/** 新手引导 存档数据 结构 */
class GuideSrcData {
    constructor() {
        /**
         * 已经完成的引导
         */
        this.complateGuide = null;
        /**
         * 当前引导
         */
        this.curGuide = 0;
    }
}
/** 新手引导 数据 操作类 */
class GuideDataHelper extends Subdata {
    constructor() {
        super(...arguments);
        this.onGuideChangeAction = new mw.Action();
        // @Decorator.persistence()
        // private data = new GuideSrcData();
        this.complateGuide = null;
        /**
         * 当前引导
         */
        this.curGuide = 0;
    }
    // public constructor() {
    //     super(GuideSrcData);
    // }
    get dataName() {
        return 'GuideSrcData';
    }
    /**
     * 初始化引导
     */
    initDefaultData() {
        if (this.complateGuide == null)
            this.complateGuide = [];
    }
    /**
     * 重置所有引导存档
     */
    resetAllGuide() {
        this.complateGuide = [];
        this.curGuide = 0;
        this.save(true);
    }
    /**
     * 重置引导存档
     * @param guideId
     */
    resetGuideById(guideId) {
        let newList = [];
        let has = false;
        this.complateGuide.forEach(e => {
            if (e == guideId) {
                has = true;
                return;
            }
            newList.push(guideId);
        });
        if (!has)
            return true;
        this.complateGuide = newList;
        if (this.curGuide == guideId) {
            this.curGuide = 0;
        }
        this.save(true);
        return true;
    }
    /**
     * 完成引导
     * @param guideId 引导id
     */
    onComplate(guideId) {
        this.complateGuide.push(guideId);
        this.onGuideChangeAction.call();
        this.save(true);
    }
    /**
     * 引导是否完成
     * @param guideId 引导id
     * @returns
     */
    guideIsComplate(guideId) {
        let guide = this.complateGuide.findIndex(e => { return e == guideId; });
        if (guide >= 0) {
            return true;
        }
    }
    /**
     * 获取当前引导
     */
    getCurGuide() {
        return this.curGuide;
    }
    /**
     * 设置当前引导阶段
     * @param val
     */
    setCurGuide(val) {
        this.curGuide = val;
        this.save(true);
    }
}
__decorate([
    Decorator.persistence()
], GuideDataHelper.prototype, "complateGuide", void 0);
__decorate([
    Decorator.persistence()
], GuideDataHelper.prototype, "curGuide", void 0);

var foreign26 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GuideDataHelper: GuideDataHelper,
    GuideSrcData: GuideSrcData
});

/**
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2023-03-14 17:16
 * @LastEditTime : 2023-05-15 17:30
 * @description  :
 */
/*
 * @Author: YuKun.Gao
 * @Date: 2022-06-27 09:56:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-01 14:47:41
 * @Description: file content
 * @FilePath: \JavaScripts\module\guideModule\GuideModuleS.ts
 */
/**
 * 新手引导服务器模块
 */
class GuideModuleS extends ModuleS {
    /**
     * 设置当前执行的引导
     * @param guideId
     */
    net_SetCurrentRunGuide(guideId) {
        this.currentData.setCurGuide(guideId);
    }
    /**
     * 重置所有引导
     */
    net_ResetAllGuide() {
        this.currentData.resetAllGuide();
    }
    /**
     * 重置指定引导
     * @param guideId
     * @returns
     */
    net_ResetGuideAtGuideId(guideId) {
        return this.currentData.resetGuideById(guideId);
    }
    /**
     * 完成引导
     * @param guideId
     */
    net_ComplateGuide(guideId) {
        //oTrace("完成引导 : " + guideId)
        // 引导是否完成
        if (this.currentData.guideIsComplate(guideId)) {
            return;
        }
        // 完成引导
        this.currentData.onComplate(guideId);
    }
    /**
     * 引导是否完成
     * @param guideId
     */
    guideIsComplate(guideId, playerId) {
        return DataCenterS.getData(playerId, GuideDataHelper).guideIsComplate(guideId);
    }
}

var foreign28 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GuideModuleS: GuideModuleS
});

class ItemInfo {
    constructor() {
        this.list = [];
        /**第一次升级 */
        this.isFirstUP = true;
        /**第一次商店购买 */
        this.isFirstShopBuy = true;
    }
}
class ItemData extends Subdata {
    constructor() {
        super(...arguments);
        // @Decorator.persistence()
        // data = new ItemInfo();
        this.list = [];
        /**第一次升级 */
        this.isFirstUP = true;
        /**第一次商店购买 */
        this.isFirstShopBuy = true;
    }
    get dataName() {
        return 'ItemData'; //.name;
    }
    onDataInit() {
        if (!this.list)
            this.list = [];
    }
    initDefaultData() {
        super.initDefaultData();
        this.list = [];
        this.isFirstUP = true;
        this.isFirstShopBuy = true;
    }
    get lenght() {
        return this.list.length;
    }
    /**
     * 是否第一次升级
     */
    // public get isFirstUP() {
    //     return this.isFirstUP;
    // }
    // /**是否第一次在商店购买 */
    // public get isFirstShopBuy() {
    //     return this.isFirstShopBuy;
    // }
    /**
     * 添加道具
     * @param id 配置ID
     * @param count 数量
     */
    addItem(id, count, isShopBuy = false, isGuideBuy = false) {
        let cell = this.getItem(id, true);
        cell.count += count;
        if (isShopBuy && this.isFirstShopBuy && !isGuideBuy) {
            this.isFirstShopBuy = false;
        }
        this.save(true);
    }
    /**
     * 道具升级
     * @param id 道具ID
     * @param lv 等级
     */
    upItem(id, lv) {
        if (this.isFirstUP) {
            this.isFirstUP = false;
        }
        let cell = this.getItem(id, true);
        cell.lv = lv;
        this.save(true);
        //this.syncToClient();
    }
    /**
     * 消耗道具
     * @param num 数量
     * @returns  是否成功
     */
    costItem(id, count) {
        let cell = this.getItem(id, false);
        if (!cell || cell.count < count)
            return false;
        cell.count -= count;
        this.save(true);
        return true;
    }
    /**
     * 获取道具的数量
     * @param id
     * @returns 数量
     */
    getItemCount(id) {
        let cell = this.getItem(id, false);
        return cell ? cell.count : 0;
    }
    /**
     * 获取道具等级
     * @param id 道具ID
     * @returns
     */
    getItemLv(id) {
        let cell = this.getItem(id, false);
        return cell ? cell.lv : 0;
    }
    /**
     * 获取一个道具
     * @param id 道具id
     * @param create 没有创建
     */
    getItem(id, create) {
        let item = null;
        for (let i = 0; i < this.list.length; i++) {
            let cell = this.list[i];
            if (cell.id == id) {
                item = cell;
                break;
            }
        }
        if (!item && create) {
            item = { id: id, count: 0, lv: 0 };
            this.list.push(item);
        }
        return item;
    }
}
__decorate([
    Decorator.persistence()
], ItemData.prototype, "list", void 0);
__decorate([
    Decorator.persistence()
], ItemData.prototype, "isFirstUP", void 0);
__decorate([
    Decorator.persistence()
], ItemData.prototype, "isFirstShopBuy", void 0);

var foreign29 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ItemData: ItemData,
    ItemInfo: ItemInfo
});

/**
 * @Author       : pengwei.shi
 * @Date         : 2022-11-29 16:54:09
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2022-12-13 11:26:59
 * @FilePath     : \streetparkour\JavaScripts\modules\item\ItemModuleS.ts
 * @Description  : 修改描述
 */
class ItemModuleS extends ModuleS {
    /**
     * 添加道具
     * @param id
     * @param count
     */
    net_addItem(id, count, isShop = false, isGuideBuy = false) {
        this.currentData.addItem(id, count, isShop, isGuideBuy);
    }
    /**
     * 消耗道具
     * @param id
     * @param count
     * @returns
     */
    net_costItem(id, count) {
        return this.currentData.costItem(id, count);
    }
    /**
     * 道具升级
     * @param id 道具ID
     * @param lv 等级
     * @param ut 升级类型
     * @param uc 升级花费
     */
    net_upItem(id, lv, ut, uc) {
        // let gms = ModuleService.getModule(GameModuleS);
        // let c = ut == 1 ? uc : 0;
        // let g = ut == 2 ? uc : 0;
        this.currentData.upItem(id, lv);
        // if (gms.cost(c, g)) {
        // }
    }
}

var foreign31 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ItemModuleS: ItemModuleS
});

/*
 * @Author: pengwei.shi
 * @Date: 2022-11-07 09:15:08
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-07 09:15:44
 * @FilePath: \streetparkour\JavaScripts\modules\obstacle\ObstacleModuleS.ts
 * @Description:
 */
class ObstacleModuleS extends ModuleS {
}

var foreign34 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ObstacleModuleS: ObstacleModuleS
});

/**
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2023-02-06 16:37
 * @LastEditTime : 2023-03-14 17:44
 * @description  :
 */
/*
 * @Author: pengwei.shi
 * @Date: 2022-11-21 10:01:07
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-22 16:51:01
 * @FilePath: \streetparkour\JavaScripts\modules\role\RoleData.ts
 * @Description:
 */
class RoleData extends Subdata {
    constructor() {
        super(...arguments);
        // @Decorator.persistence()
        // private data = new RoleInfo();
        this.clothesIDs = [];
        /**装备的服装ID */
        this.equipID = 1;
    }
    get dataName() {
        return 'RoleData';
    }
    onDataInit() {
        if (!this.clothesIDs || !this.equipID) {
            this.equipID = 1;
            this.clothesIDs = [1];
        }
    }
    initDefaultData() {
        super.initDefaultData();
        this.clothesIDs = [1];
        this.equipID = 1;
    }
    get curClothesIDs() {
        return this.clothesIDs;
    }
    get curEquitID() {
        return this.equipID;
    }
    setCurEquitID(val) {
        this.equipID = val;
    }
    saveClothesData(clothesID) {
        this.clothesIDs.push(clothesID);
        this.save(true);
    }
    saveEquipID(clothesID) {
        this.equipID = clothesID;
        this.save(true);
    }
}
__decorate([
    Decorator.persistence()
], RoleData.prototype, "clothesIDs", void 0);
__decorate([
    Decorator.persistence()
], RoleData.prototype, "equipID", void 0);

var foreign37 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    RoleData: RoleData
});

/**
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2023-02-06 16:37
 * @LastEditTime : 2023-03-08 18:12
 * @description  :
 */
class RoleModuleS extends ModuleS {
    onStart() {
        super.onStart();
    }
    onPlayerEnterGame(player) {
        super.onPlayerEnterGame(player);
        // console.log('enter ', player.playerId)
        //this.getAllClient().net_hideRole(player.playerId);
    }
    /**
     * 保存衣服数据
     * @param id
     */
    net_saveClothesData(id) {
        console.log(`cundang ${id}`);
        this.currentData.saveClothesData(id);
    }
    /**
     * 更新当前装备的服装
     * @param id
     */
    net_saveEquipData(id) {
        this.currentData.saveEquipID(id);
    }
}

var foreign40 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    RoleModuleS: RoleModuleS
});

/*
 * @Author: pengwei.shi
 * @Date: 2022-11-04 17:07:34
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-10 19:05:17
 * @FilePath: \streetparkour\JavaScripts\modules\scene\SceneModuleS.ts
 * @Description:
 */
class SceneModuleS extends ModuleS {
    onStart() {
    }
}

var foreign43 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SceneModuleS: SceneModuleS
});

/**
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2022-10-31 13:16
 * @LastEditTime : 2022-11-28 18:58
 * @description  : 启动类
 */
let GameStart = class GameStart extends mw.Script {
    constructor() {
        super(...arguments);
        this.isOnlineSave = true;
    }
    onStart() {
        // super.onStart();
        this.useUpdate = true;
        if (mw.SystemUtil.isClient()) {
            //设置配置表语言
            GameConfig.initLanguage(Utils.getLanguage(), (key) => {
                let ele = GameConfig.Language.getElement(key);
                if (ele == null)
                    return "unknow_" + key;
                return ele.Value;
            });
            mw.UIScript.addBehavior('lan', (ui) => {
                let key = ui.text;
                if (key) {
                    let lan = GameConfig.Language.getElement(key);
                    if (lan) {
                        ui.text = (lan.Value);
                    }
                }
            });
            mw.UIService.show(LoadingUI);
        }
        else if (this.isOnlineSave) {
            DataStorage.setTemporaryStorage(mw.SystemUtil.isPIE);
            //DataStorage.setTemporaryStorage(false)
            //console.log(mw.SystemUtil.isPIE, mw.SystemUtil.isMobile());
        }
        // DataStorage.setEvn(Global.isEditor);
        this.onRegisterModule();
    }
    onRegisterModule() {
        //
        ModuleService.registerModule(GameModuleS, GameModuleC, GameData);
        //ModuleService.setClientFirstStartModule(GameModuleC);
        ModuleService.registerModule(ItemModuleS, ItemModuleC, ItemData);
        ModuleService.registerModule(RoleModuleS, RoleModuleC, RoleData);
        ModuleService.registerModule(SceneModuleS, SceneModuleC, null);
        ModuleService.registerModule(ObstacleModuleS, ObstacleModuleC, null);
        ModuleService.registerModule(GuideModuleS, GuideModuleC, GuideDataHelper);
    }
    onUpdate(dt) {
        super.onUpdate(dt);
        mw.TweenUtil.TWEEN.update();
    }
    onClientLoading(msg, progress, completeAotoClose) {
        // if (!this._loadingUI) {
        //     this._loadingUI = mw.UIService.create(LoadingUI);
        //     this._loadingUI.rootCanvas.slot.zOrder = 2200;
        //     this._loadingUI.setVisible(mw.SlateVisibility.Visible);
        // }
        // this._loadingUI.setProgress(progress);
        // console.log(progress)
        // if (progress >= 1) {
        //     this._loadingUI.setVisible(mw.SlateVisibility.Hidden);
        //     this.enterGame();
        // }
    }
};
__decorate([
    mw.Property({ displayName: "是否线上存储" })
], GameStart.prototype, "isOnlineSave", void 0);
GameStart = __decorate([
    Component
], GameStart);
var GameStart$1 = GameStart;

var foreign15 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GameStart$1
});

class ModifiedCameraSystem {
    static get cameraLocationMode() {
        if (!SystemUtil.isClient()) {
            return;
        }
        return Camera.currentCamera.positionMode;
    }
    static set cameraLocationMode(newCameraLocationMode) {
        if (!SystemUtil.isClient()) {
            return;
        }
        let tempTransform = Camera.currentCamera.springArm.localTransform;
        Camera.currentCamera.positionMode = newCameraLocationMode;
        if (newCameraLocationMode == CameraPositionMode.PositionFollow) {
            Camera.currentCamera.parent = Player.localPlayer.character;
            Camera.currentCamera.springArm.localTransform = tempTransform;
        }
    }
    static setCameraFollowTarget(target) {
        if (!SystemUtil.isClient())
            return;
        Camera.currentCamera.parent = target;
        Camera.currentCamera.springArm.localTransform = Transform.identity;
    }
    static cancelCameraFollowTarget() {
        if (!SystemUtil.isClient())
            return;
        Camera.currentCamera.parent = Player.localPlayer.character;
        Camera.currentCamera.springArm.localTransform = Transform.identity;
    }
    static setOverrideCameraRotation(newOverrideRotation) {
        if (!SystemUtil.isClient())
            return;
        ModifiedCameraSystem.followEnable = true;
        ModifiedCameraSystem.followRotationValue = newOverrideRotation;
        Player.setControllerRotation(ModifiedCameraSystem.followRotationValue);
        if (!ModifiedCameraSystem.isBind) {
            TimeUtil.onEnterFrame.add(() => {
                if (ModifiedCameraSystem.followEnable) {
                    Player.setControllerRotation(ModifiedCameraSystem.followRotationValue);
                }
            }, this);
            ModifiedCameraSystem.isBind = true;
        }
    }
    static resetOverrideCameraRotation() {
        if (!SystemUtil.isClient())
            return;
        ModifiedCameraSystem.followEnable = false;
    }
    static getCurrentSettings() {
        if (!SystemUtil.isClient())
            return;
        cameraSystemConfig.cameraRelativeTransform = Camera.currentCamera.localTransform;
        cameraSystemConfig.cameraWorldTransform = Camera.currentCamera.worldTransform;
        cameraSystemConfig.targetArmLength = Camera.currentCamera.springArm.length;
        cameraSystemConfig.enableCameraLocationLag = Camera.currentCamera.positionLagEnabled;
        cameraSystemConfig.cameraLocationLagSpeed = Camera.currentCamera.positionLagSpeed;
        cameraSystemConfig.enableCameraRotationLag = Camera.currentCamera.rotationLagEnabled;
        cameraSystemConfig.cameraRotationLagSpeed = Camera.currentCamera.rotationLagSpeed;
        cameraSystemConfig.cameraFOV = Camera.currentCamera.fov;
        cameraSystemConfig.cameraLocationMode = Camera.currentCamera.positionMode;
        cameraSystemConfig.cameraRotationMode = Camera.currentCamera.rotationMode;
        cameraSystemConfig.enableCameraCollision = Camera.currentCamera.springArm.collisionEnabled;
        cameraSystemConfig.cameraUpLimitAngle = Camera.currentCamera.upAngleLimit;
        cameraSystemConfig.cameraDownLimitAngle = Camera.currentCamera.downAngleLimit;
        return cameraSystemConfig;
    }
    static applySettings(CameraSetting) {
        if (!SystemUtil.isClient())
            return;
        Camera.currentCamera.localTransform = CameraSetting.cameraRelativeTransform;
        Camera.currentCamera.springArm.length = CameraSetting.targetArmLength;
        Camera.currentCamera.positionLagEnabled = CameraSetting.enableCameraLocationLag;
        Camera.currentCamera.positionLagSpeed = CameraSetting.cameraLocationLagSpeed;
        Camera.currentCamera.rotationLagEnabled = CameraSetting.enableCameraRotationLag;
        Camera.currentCamera.rotationLagSpeed = CameraSetting.cameraRotationLagSpeed;
        Camera.currentCamera.fov = CameraSetting.cameraFOV;
        ModifiedCameraSystem.cameraLocationMode = CameraSetting.cameraLocationMode;
        Camera.currentCamera.rotationMode = CameraSetting.cameraRotationMode;
        Camera.currentCamera.springArm.collisionEnabled = CameraSetting.enableCameraCollision;
        Camera.currentCamera.upAngleLimit = CameraSetting.cameraUpLimitAngle;
        Camera.currentCamera.downAngleLimit = CameraSetting.cameraDownLimitAngle;
    }
    static cameraFocusing(targetArmLength, targetOffset, timeInterval = 20) {
        if (!SystemUtil.isClient())
            return;
        let timer = TimeUtil.onEnterFrame.add(() => {
            let interpolationValue = Camera.currentCamera.springArm.length + (targetArmLength - Camera.currentCamera.springArm.length) / timeInterval;
            Camera.currentCamera.springArm.length = interpolationValue;
            if (Math.abs(Camera.currentCamera.springArm.length - targetArmLength) <= 0.5) {
                TimeUtil.onEnterFrame.remove(timer);
            }
        });
    }
    static startCameraShake(shakeData) {
        if (!SystemUtil.isClient())
            return;
        let info = {
            rotationYAmplitude: shakeData.rotYawOscillation.amplitude,
            rotationYFrequency: shakeData.rotYawOscillation.frequency,
            rotationZAmplitude: shakeData.rotRollOscillation.amplitude,
            rotationZFrequency: shakeData.rotRollOscillation.frequency,
            rotationXAmplitude: shakeData.rotPitchOscillation.amplitude,
            rotationXFrequency: shakeData.rotPitchOscillation.frequency,
            positionXAmplitude: shakeData.locXOscillation.amplitude,
            positionXFrequency: shakeData.locXOscillation.frequency,
            positionYAmplitude: shakeData.locYOscillation.amplitude,
            positionYFrequency: shakeData.locYOscillation.frequency,
            positionZAmplitude: shakeData.locZOscillation.amplitude,
            positionZFrequency: shakeData.locZOscillation.frequency,
        };
        Camera.shake(info);
    }
    static stopCameraShake() {
        if (!SystemUtil.isClient())
            return;
        Camera.stopShake();
    }
    static getDefaultCameraShakeData() {
        const defaultOscillator = {
            amplitude: 0,
            frequency: 0,
            waveform: CameraModifid.EOscillatorWaveform.SineWave,
        };
        const defaultCameraShakeData = {
            rotPitchOscillation: { ...defaultOscillator },
            rotYawOscillation: { ...defaultOscillator },
            rotRollOscillation: { ...defaultOscillator },
            locXOscillation: { ...defaultOscillator },
            locYOscillation: { ...defaultOscillator },
            locZOscillation: { ...defaultOscillator },
            fovOscillation: { ...defaultOscillator },
        };
        return defaultCameraShakeData;
    }
}
ModifiedCameraSystem.isBind = false;
ModifiedCameraSystem.followTargetEnable = true;
ModifiedCameraSystem.followTargetInterpSpeed = 15;
var CameraModifid;
(function (CameraModifid) {
    (function (EOscillatorWaveform) {
        /** 正弦波 */
        EOscillatorWaveform[EOscillatorWaveform["SineWave"] = 0] = "SineWave";
        /** Perlin噪声 */
        EOscillatorWaveform[EOscillatorWaveform["PerlinNoise"] = 1] = "PerlinNoise";
    })(CameraModifid.EOscillatorWaveform || (CameraModifid.EOscillatorWaveform = {}));
})(CameraModifid || (CameraModifid = {}));
const cameraSystemConfig = {
    cameraRelativeTransform: Transform.identity,
    cameraWorldTransform: Transform.identity,
    targetArmLength: 400,
    enableCameraLocationLag: false,
    cameraLocationLagSpeed: 10,
    enableCameraRotationLag: false,
    cameraRotationLagSpeed: 10,
    cameraFOV: 90,
    cameraLocationMode: CameraPositionMode.PositionFollow,
    cameraRotationMode: CameraRotationMode.RotationControl,
    enableCameraCollision: true,
    cameraUpLimitAngle: 40,
    cameraDownLimitAngle: -40,
};

var foreign17 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get CameraModifid () { return CameraModifid; },
    ModifiedCameraSystem: ModifiedCameraSystem
});

class GeneralManager {
    vscodeChange() {
        let animation;
        animation.speed = 1; // 先通过vscodeF2替换为 rate 再替换为 speed
        let obj;
        obj.gameObjectId; // 先通过vscodeF2替换为 guid 再替换为 gameObjectId
        let camera;
        camera.worldTransform; // 先通过vscodeF2替换为 transform 再替换为 worldTransform
        let model;
        model.onTouch; // 先通过vscodeF2替换为 onEnter 再替换为 onTouch
        model.onTouchEnd; // 先通过vscodeF2替换为 onLeave 再替换为 onTouchEnd 
        let effect;
        effect.maskcolor; // 先通过vscodeF2替换为 color 再替换为 maskcolor
        effect.onFinish; // 先通过vscodeF2替换为 onFinished 再替换为 onFinish
        effect.timeLength; // 先通过vscodeF2替换为 particleLength 再替换为 timeLength
        let sound;
        sound.timePosition; // 先通过vscodeF2替换为 currentProgress 再替换为 timePosition
        sound.timeLength; // 先通过vscodeF2替换为 duration 再替换为 timeLength
        sound.timeLength; // 先通过vscodeF2替换为 timelength 再替换为 timeLength
        sound.isLoop; // 先通过vscodeF2替换为 loop 再替换为 isLoop
        let transform;
        transform.position; // 先通过vscodeF2替换为 location 再替换为 position
        class module extends ModuleC {
            get localPlayer() {
                return null;
            }
            get localPlayerId() {
                return null;
            }
        }
    }
    static async asyncRpcGetData(key) {
        let value = await DataStorage.asyncGetData(key);
        return value.data;
    }
    static async asyncRpcGetPlayer(playerId) {
        let player = Player.getPlayer(playerId);
        return Promise.resolve(player);
    }
    static rpcPlayEffectOnPlayer(source, target, slotType, loopCount, offset, rotation, scale) {
        let duration = undefined;
        if (loopCount < 0) {
            duration = -loopCount;
            loopCount = undefined;
        }
        return EffectService.playOnGameObject(source, target instanceof mw.Player ? target.character : target, {
            slotType: slotType,
            loopCount: loopCount,
            duration: duration,
            position: offset,
            rotation: rotation,
            scale: scale
        });
    }
    static rpcPlayEffectOnGameObject(source, target, loopCount, offset, rotation, scale) {
        let duration = undefined;
        if (loopCount < 0) {
            duration = -loopCount;
            loopCount = undefined;
        }
        return EffectService.playOnGameObject(source, target, {
            loopCount: loopCount,
            duration: duration,
            position: offset,
            rotation: rotation,
            scale: scale
        });
    }
    static rpcPlayEffectAtLocation(source, location, loopCount, rotation, scale) {
        let duration = undefined;
        if (loopCount < 0) {
            duration = -loopCount;
            loopCount = undefined;
        }
        return EffectService.playAtPosition(source, location, {
            loopCount: loopCount,
            duration: duration,
            rotation: rotation,
            scale: scale,
        });
    }
    static modifyShowAd(adsType, callback) {
        AdsService.showAd(adsType, isSuccess => {
            if (isSuccess) {
                callback(AdsState.Success);
                callback(AdsState.Close);
                callback(AdsState.Reward);
            }
            else {
                callback(AdsState.Fail);
            }
        });
    }
    static modiftEnterInteractiveState(inter, characterObj) {
        if (!(characterObj instanceof mw.Character)) {
            return Promise.resolve(false);
        }
        let reult = inter.enter(characterObj);
        if (!reult)
            return Promise.resolve(false);
        return new Promise((resolve, reject) => {
            let resultFun = () => {
                inter.onEnter.remove(resultFun);
                resolve(true);
            };
            inter.onEnter.add(resultFun);
        });
    }
    static modifyExitInteractiveState(inter, Location, stance) {
        let result = inter.leave(Location, null, stance);
        return Promise.resolve(result);
    }
    static modifyaddOutlineEffect(obj, OutlineColor, OutlineWidth, OutlineDepthOffset, OutlineClampValue, considerCameraPosition, outlineSilhouetteOnly) {
        if (obj instanceof mw.Model) {
            obj.setOutline(true, OutlineColor, OutlineWidth);
        }
    }
    static modifyRemoveOutlineEffect(obj) {
        if (obj instanceof mw.Model) {
            obj.setOutline(false);
        }
    }
    static modiftboxOverlap(startLocation, endLocation, width, height, drawDebug, objectsToIgnore, ignoreObjectsByType, self) {
        let halfSize = new Vector(1, width / 2, height / 2);
        let orientation = Vector.subtract(endLocation, startLocation).toRotation();
        let results = QueryUtil.boxTrace(startLocation, endLocation, halfSize, orientation, true, drawDebug, objectsToIgnore, ignoreObjectsByType, self);
        let objResults = new Array();
        for (let i = 0; i < results.length; i++) {
            let obj = results[i].gameObject;
            if (!obj)
                continue;
            if (objResults.indexOf(obj) == -1)
                objResults.push(obj);
        }
        return objResults;
    }
    static modifyboxOverlapInLevel(StartLocation, EndLocation, Width, Height, debug, IgnoreObjectsGuid, IgnoreByKind, Source) {
        let halfSize = new Vector(1, Width / 2, Height / 2);
        let orientation = Vector.subtract(EndLocation, StartLocation).toRotation();
        let results = QueryUtil.boxTrace(StartLocation, EndLocation, halfSize, orientation, true, debug, IgnoreObjectsGuid, IgnoreByKind, Source);
        let objResults = new Array();
        for (let i = 0; i < results.length; i++) {
            let obj = results[i].gameObject;
            if (!obj)
                continue;
            if (objResults.indexOf(obj) == -1)
                objResults.push(obj);
        }
        return objResults;
    }
    static modifyGetShootDir(chara, startPos, shootRange) {
        const camera = Camera.currentCamera;
        let start = Vector.zero;
        let end = Vector.zero;
        let dir = Vector.zero;
        if (startPos) {
            start = startPos;
        }
        if (camera) {
            end = camera.worldTransform.position.add(camera.worldTransform.getForwardVector().multiply(shootRange));
            const hits = QueryUtil.lineTrace(camera.worldTransform.position, end, false, true, [], false, false, chara);
            dir = end.subtract(start);
            if (hits.length > 0) {
                dir = hits[0].impactPoint.subtract(start);
            }
        }
        return dir.normalize();
    }
    static modifyProjectWorldLocationToWidgetPosition(player, worldLocation, outScreenPosition, isPlayerViewportRelative) {
        let result = InputUtil.projectWorldPositionToWidgetPosition(worldLocation, isPlayerViewportRelative);
        outScreenPosition.x = result.screenPosition.x;
        outScreenPosition.y = result.screenPosition.y;
        return result.result;
    }
    static setMaterialColor(model, Index, InColor) {
        let materialList = model.getMaterialInstance();
        materialList[Index].getAllVectorParameterName().forEach((v, i) => {
            materialList[Index].setVectorParameterValue(v, InColor);
        });
    }
    static getMaterialColor(model, Index) {
        let materialList = model.getMaterialInstance();
        if (!(materialList.length > 0)) {
            return;
        }
        let nameList = materialList[Index].getAllVectorParameterName();
        return nameList.length > 0 ? materialList[Index].getVectorParameterValue(nameList[0]) : new LinearColor(1, 1, 1, 1);
    }
}

var foreign20 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GeneralManager: GeneralManager
});

/**
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2022-11-22 09:44
 * @LastEditTime : 2023-01-05 18:02
 * @description  :
 */
let RoleTrigger = class RoleTrigger extends mw.Script {
    constructor() {
        super(...arguments);
        this.onEnter = (other) => {
            console.log('onEnter');
            // return;
            // let tag = other.name;
            // if (!tag)
            //     return;
            // let type = BlockType.None;
            // if (tag == 'pass') {
            //     //隐藏通过点
            //     other.setVisibility(mw.PropertyStatus.Off, true);
            //     other.setCollision(mw.CollisionStatus.Off);
            //     return;
            // }
            // else if (tag == 'block1') {
            //     type = BlockType.Stop;
            // }
            // else if (tag == 'block2') {
            //     type = BlockType.Pass;
            // }
            // else if (tag == 'board') {
            //     type = BlockType.Board;
            // }
            // else if (tag == 'block') {
            //     type = BlockType.Block;
            // }
            // else if (tag == 'block0') {
            //     type = BlockType.StepBlock;
            // }
            // else if (tag == 'border') {
            //     type = BlockType.Border;
            // }
            // else if (tag == 'step') {
            //     type = BlockType.Step;
            // }
            // else if (tag.indexOf('coin') >= 0 && other.visible) {
            //     other.setVisibility(mw.PropertyStatus.Off, true);
            //     other.setCollision(mw.CollisionStatus.Off);
            //     type = BlockType.Coin;
            //     Sound.instance.gameSound(SPSound.Coin);
            // }
            // else if (tag.indexOf('gem') >= 0 && other.visible) {
            //     other.setVisibility(mw.PropertyStatus.Off, true);
            //     other.setCollision(mw.CollisionStatus.Off);
            //     type = BlockType.Gem;
            //     Sound.instance.gameSound(SPSound.GetGem);
            // }
            // else if (tag.indexOf('item') >= 0 && other.visible) {
            //     other.setVisibility(mw.PropertyStatus.Off, true);
            //     other.setCollision(mw.CollisionStatus.Off);
            //     let id = 0;
            //     type = BlockType.Item;
            //     if (tag == 'item2')
            //         id = 2;
            //     else if (tag == 'item3')
            //         id = 3;
            //     else if (tag == 'item5')
            //         id = 5;
            //     else
            //         console.log(tag)
            //     this._host.useItem(id);
            //     DataManager.onItem(id, false);
            //     Sound.instance.gameSound(SPSound.GetItem);
            // }
            // this._host.onTrigger(type, other.worldTransform.position, other.guid);
        };
    }
    //宿主
    // private _host: RoleCtrl;
    // /**
    //  * 初始化
    //  * @param ctrl 角色
    //  */
    // public init(ctrl: RoleCtrl) {
    //     this._host = ctrl;
    // }
    onStart() {
        console.log('onStart');
        if (mw.SystemUtil.isClient()) {
            let trigger = this.gameObject;
            trigger.onEnter.add(this.onEnter);
            //trigger.onLeave.add(this.onLeave)
        }
    }
    onDestroy() {
        //this._host = null;
    }
};
RoleTrigger = __decorate([
    Component
], RoleTrigger);
var RoleTrigger$1 = RoleTrigger;

var foreign41 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RoleTrigger$1
});

/*
 * @Author: pengwei.shi
 * @Date: 2022-11-21 18:46:35
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-21 18:47:29
 * @FilePath: \streetparkour\JavaScripts\modules\shop\ShopModuleC.ts
 * @Description:
 */
class ShopModuleC extends ModuleC {
}

var foreign44 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ShopModuleC: ShopModuleC
});

class ShopModuleS extends ModuleS {
}

var foreign45 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ShopModuleS: ShopModuleS
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/PF_Rewards.ui
 * TIME: 2023.05.15-17.19.24
 */
let PF_Rewards_generate = class PF_Rewards_generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mImg_BG_Reward = undefined;
        this.mImg_Reward = undefined;
        this.mText_Reward = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        //按钮添加点击
        // 
        //按钮多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Btn_BG"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Rewards/Brn_Obtain"));
        //文本多语言
        this.initLanguage(this.mText_Reward);
        //文本多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Rewards/Canvas_Title/Text_Title"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('RootCanvas/Canvas_Rewards/ScorllBox_ItemList/Canvas_ItemList/Canvas_ItemReward/mImg_BG_Reward')
], PF_Rewards_generate.prototype, "mImg_BG_Reward", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Canvas_Rewards/ScorllBox_ItemList/Canvas_ItemList/Canvas_ItemReward/mImg_Reward')
], PF_Rewards_generate.prototype, "mImg_Reward", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Canvas_Rewards/ScorllBox_ItemList/Canvas_ItemList/Canvas_ItemReward/mText_Reward')
], PF_Rewards_generate.prototype, "mText_Reward", void 0);
PF_Rewards_generate = __decorate([
    UIBind('UI/PF_Rewards.ui')
], PF_Rewards_generate);
var PF_Rewards_generate$1 = PF_Rewards_generate;

var foreign67 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PF_Rewards_generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/SettingUI.ui
 * TIME: 2023.05.15-17.19.24
 */
let SettingUI_generate = class SettingUI_generate extends mw.UIScript {
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        //按钮添加点击
        // 
        //按钮多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Btn_BG"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Btn_Close"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Brn_Confirm"));
        //文本多语言
        //文本多语言
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Canvas_Title/Text_Title"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Settings/Canvas_ProgressBar_001/Text_Setting_001"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
SettingUI_generate = __decorate([
    UIBind('UI/SettingUI.ui')
], SettingUI_generate);
var SettingUI_generate$1 = SettingUI_generate;

var foreign73 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SettingUI_generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 不努力你什么都不是
 * UI: UI/UIRoot.ui
 * TIME: 2023.05.15-17.19.24
 */
let UIRoot_generate = class UIRoot_generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mImg_BG = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        // 
        //按钮添加点击
        // 
        //按钮多语言
        //文本多语言
        //文本多语言
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('Canvas/mImg_BG')
], UIRoot_generate.prototype, "mImg_BG", void 0);
UIRoot_generate = __decorate([
    UIBind('UI/UIRoot.ui')
], UIRoot_generate);
var UIRoot_generate$1 = UIRoot_generate;

var foreign78 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: UIRoot_generate$1
});

/**
 * @Author       : pengwei.shi
 * @Date         : 2022-12-02 13:52:36
 * @LastEditors  : xianjie.xia
 * @LastEditTime : 2022-12-05 14:11
 * @FilePath     : \streetparkour\JavaScripts\UIRoot.ts
 * @Description  : 修改描述
 */
class UIRoot extends UIRoot_generate$1 {
    onAwake() {
        mw.AssetUtil.asyncDownloadAsset('122885').then(() => {
            this.mImg_BG.visibility = mw.SlateVisibility.Hidden;
        });
    }
}

var foreign80 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UIRoot: UIRoot
});

const MWModuleMap = { 
     'build': foreign0,
     'JavaScripts/config/Assets': foreign1,
     'JavaScripts/config/ConfigBase': foreign2,
     'JavaScripts/config/GameConfig': foreign3,
     'JavaScripts/config/Global': foreign4,
     'JavaScripts/config/Guide': foreign5,
     'JavaScripts/config/Item': foreign6,
     'JavaScripts/config/Language': foreign7,
     'JavaScripts/config/Level': foreign8,
     'JavaScripts/config/RandomRank': foreign9,
     'JavaScripts/config/Role': foreign10,
     'JavaScripts/config/Voice': foreign11,
     'JavaScripts/const/Const': foreign12,
     'JavaScripts/const/Define': foreign13,
     'JavaScripts/data/DataManager': foreign14,
     'JavaScripts/GameStart': foreign15,
     'JavaScripts/LoadingUI': foreign16,
     'JavaScripts/Modified027Editor/ModifiedCamera': foreign17,
     'JavaScripts/Modified027Editor/ModifiedPlayer': foreign18,
     'JavaScripts/Modified027Editor/ModifiedSpawn': foreign19,
     'JavaScripts/Modified027Editor/ModifiedStaticAPI': foreign20,
     'JavaScripts/modules/game/GameData': foreign21,
     'JavaScripts/modules/game/GameModuleC': foreign22,
     'JavaScripts/modules/game/GameModuleS': foreign23,
     'JavaScripts/modules/guideModule/GuideContent': foreign24,
     'JavaScripts/modules/guideModule/GuideInfo': foreign25,
     'JavaScripts/modules/guideModule/GuideModelData': foreign26,
     'JavaScripts/modules/guideModule/GuideModuleC': foreign27,
     'JavaScripts/modules/guideModule/GuideModuleS': foreign28,
     'JavaScripts/modules/item/ItemData': foreign29,
     'JavaScripts/modules/item/ItemModuleC': foreign30,
     'JavaScripts/modules/item/ItemModuleS': foreign31,
     'JavaScripts/modules/obstacle/Obstacle': foreign32,
     'JavaScripts/modules/obstacle/ObstacleModuleC': foreign33,
     'JavaScripts/modules/obstacle/ObstacleModuleS': foreign34,
     'JavaScripts/modules/role/CameraCtrl': foreign35,
     'JavaScripts/modules/role/RoleCtrl': foreign36,
     'JavaScripts/modules/role/RoleData': foreign37,
     'JavaScripts/modules/role/RoleItem': foreign38,
     'JavaScripts/modules/role/RoleModuleC': foreign39,
     'JavaScripts/modules/role/RoleModuleS': foreign40,
     'JavaScripts/modules/role/RoleTrigger': foreign41,
     'JavaScripts/modules/scene/SceneModuleC': foreign42,
     'JavaScripts/modules/scene/SceneModuleS': foreign43,
     'JavaScripts/modules/shop/ShopModuleC': foreign44,
     'JavaScripts/modules/shop/ShopModuleS': foreign45,
     'JavaScripts/ui/GameUI': foreign46,
     'JavaScripts/ui/GuideModuleView': foreign47,
     'JavaScripts/ui/UIGameOver': foreign48,
     'JavaScripts/ui/UIGuide': foreign49,
     'JavaScripts/ui/UILobby': foreign50,
     'JavaScripts/ui/UIPause': foreign51,
     'JavaScripts/ui/UIRankItem': foreign52,
     'JavaScripts/ui/UIRelive': foreign53,
     'JavaScripts/ui/UIReward': foreign54,
     'JavaScripts/ui/UIRole': foreign55,
     'JavaScripts/ui/UIRoleHead': foreign56,
     'JavaScripts/ui/UIShopCity': foreign57,
     'JavaScripts/ui/UIShopCityItem': foreign58,
     'JavaScripts/ui/UISkill': foreign59,
     'JavaScripts/ui-generate/GameEndUI_generate': foreign60,
     'JavaScripts/ui-generate/GameUI_generate': foreign61,
     'JavaScripts/ui-generate/GuideModuleUI_generate': foreign62,
     'JavaScripts/ui-generate/GuideUI_generate': foreign63,
     'JavaScripts/ui-generate/LoadingUI_generate': foreign64,
     'JavaScripts/ui-generate/LobbyUI_generate': foreign65,
     'JavaScripts/ui-generate/PauseUI_generate': foreign66,
     'JavaScripts/ui-generate/PF_Rewards_generate': foreign67,
     'JavaScripts/ui-generate/RankBaseUI_generate': foreign68,
     'JavaScripts/ui-generate/ReliveUI_generate': foreign69,
     'JavaScripts/ui-generate/RewardUI_generate': foreign70,
     'JavaScripts/ui-generate/RoleHeadUI_generate': foreign71,
     'JavaScripts/ui-generate/RoleUI_generate': foreign72,
     'JavaScripts/ui-generate/SettingUI_generate': foreign73,
     'JavaScripts/ui-generate/ShopCityItemUI_generate': foreign74,
     'JavaScripts/ui-generate/ShopCityUI_generate': foreign75,
     'JavaScripts/ui-generate/SkillItemUI_generate': foreign76,
     'JavaScripts/ui-generate/SkillUI_generate': foreign77,
     'JavaScripts/ui-generate/UIRoot_generate': foreign78,
     'JavaScripts/ui-generate/UseItem_generate': foreign79,
     'JavaScripts/UIRoot': foreign80,
     'JavaScripts/untils/ActionMgr': foreign81,
     'JavaScripts/untils/MGSCenter': foreign82,
     'JavaScripts/untils/Pool': foreign83,
     'JavaScripts/untils/Sound': foreign84,
     'JavaScripts/untils/Utils': foreign85,
};

exports.MWModuleMap = MWModuleMap;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXMiOlsiLi4vSmF2YVNjcmlwdHMvY29uZmlnL0NvbmZpZ0Jhc2UudHMiLCIuLi9KYXZhU2NyaXB0cy9jb25maWcvQXNzZXRzLnRzIiwiLi4vSmF2YVNjcmlwdHMvY29uZmlnL0dsb2JhbC50cyIsIi4uL0phdmFTY3JpcHRzL2NvbmZpZy9HdWlkZS50cyIsIi4uL0phdmFTY3JpcHRzL2NvbmZpZy9JdGVtLnRzIiwiLi4vSmF2YVNjcmlwdHMvY29uZmlnL0xhbmd1YWdlLnRzIiwiLi4vSmF2YVNjcmlwdHMvY29uZmlnL0xldmVsLnRzIiwiLi4vSmF2YVNjcmlwdHMvY29uZmlnL1JhbmRvbVJhbmsudHMiLCIuLi9KYXZhU2NyaXB0cy9jb25maWcvUm9sZS50cyIsIi4uL0phdmFTY3JpcHRzL2NvbmZpZy9Wb2ljZS50cyIsIi4uL0phdmFTY3JpcHRzL2NvbmZpZy9HYW1lQ29uZmlnLnRzIiwiLi4vSmF2YVNjcmlwdHMvY29uc3QvQ29uc3QudHMiLCIuLi9KYXZhU2NyaXB0cy9jb25zdC9EZWZpbmUudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9XaW5kb3dzTm9FZGl0b3IvTVcvQ29udGVudC9CdWlsZFRvb2wvbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0xvYmJ5VUlfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy91bnRpbHMvTUdTQ2VudGVyLnRzIiwiLi4vSmF2YVNjcmlwdHMvbW9kdWxlcy9yb2xlL0NhbWVyYUN0cmwudHMiLCIuLi9KYXZhU2NyaXB0cy9Nb2RpZmllZDAyN0VkaXRvci9Nb2RpZmllZFBsYXllci50cyIsIi4uL0phdmFTY3JpcHRzL01vZGlmaWVkMDI3RWRpdG9yL01vZGlmaWVkU3Bhd24udHMiLCIuLi9KYXZhU2NyaXB0cy91bnRpbHMvUG9vbC50cyIsIi4uL0phdmFTY3JpcHRzL3VudGlscy9VdGlscy50cyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvaXRlbS9JdGVtTW9kdWxlQy50cyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvcm9sZS9Sb2xlSXRlbS50cyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvcm9sZS9Sb2xlQ3RybC50cyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvcm9sZS9Sb2xlTW9kdWxlQy50cyIsIi4uL0phdmFTY3JpcHRzL3VudGlscy9Tb3VuZC50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1JhbmtCYXNlVUlfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy91aS9VSVJhbmtJdGVtLnRzIiwiLi4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvR3VpZGVNb2R1bGVVSV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL3VudGlscy9BY3Rpb25NZ3IudHMiLCIuLi9KYXZhU2NyaXB0cy91aS9HdWlkZU1vZHVsZVZpZXcudHMiLCIuLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9HYW1lRW5kVUlfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9TaG9wQ2l0eVVJX2dlbmVyYXRlLnRzIiwiLi4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvU2hvcENpdHlJdGVtVUlfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy91aS9VSVNob3BDaXR5SXRlbS50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1NraWxsSXRlbVVJX2dlbmVyYXRlLnRzIiwiLi4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvU2tpbGxVSV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL3VpL1VJU2tpbGwudHMiLCIuLi9KYXZhU2NyaXB0cy91aS9VSVNob3BDaXR5LnRzIiwiLi4vSmF2YVNjcmlwdHMvdWkvVUlHYW1lT3Zlci50cyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvZ3VpZGVNb2R1bGUvR3VpZGVDb250ZW50LnRzIiwiLi4vSmF2YVNjcmlwdHMvbW9kdWxlcy9ndWlkZU1vZHVsZS9HdWlkZUluZm8udHMiLCIuLi9KYXZhU2NyaXB0cy9tb2R1bGVzL2d1aWRlTW9kdWxlL0d1aWRlTW9kdWxlQy50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1JvbGVVSV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1JvbGVIZWFkVUlfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy91aS9VSVJvbGVIZWFkLnRzIiwiLi4vSmF2YVNjcmlwdHMvdWkvVUlSb2xlLnRzIiwiLi4vSmF2YVNjcmlwdHMvdWkvVUlMb2JieS50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0xvYWRpbmdVSV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0d1aWRlVUlfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy91aS9VSUd1aWRlLnRzIiwiLi4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUGF1c2VVSV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL3VpL1VJUGF1c2UudHMiLCIuLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9SZWxpdmVVSV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1Jld2FyZFVJX2dlbmVyYXRlLnRzIiwiLi4vSmF2YVNjcmlwdHMvdWkvVUlSZXdhcmQudHMiLCIuLi9KYXZhU2NyaXB0cy91aS9VSVJlbGl2ZS50cyIsIi4uL0phdmFTY3JpcHRzL0xvYWRpbmdVSS50cyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvb2JzdGFjbGUvT2JzdGFjbGUudHMiLCIuLi9KYXZhU2NyaXB0cy9tb2R1bGVzL29ic3RhY2xlL09ic3RhY2xlTW9kdWxlQy50cyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvc2NlbmUvU2NlbmVNb2R1bGVDLnRzIiwiLi4vSmF2YVNjcmlwdHMvbW9kdWxlcy9nYW1lL0dhbWVNb2R1bGVDLnRzIiwiLi4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvR2FtZVVJX2dlbmVyYXRlLnRzIiwiLi4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvVXNlSXRlbV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL3VpL0dhbWVVSS50cyIsIi4uL0phdmFTY3JpcHRzL2RhdGEvRGF0YU1hbmFnZXIudHMiLCIuLi9KYXZhU2NyaXB0cy9tb2R1bGVzL2dhbWUvR2FtZURhdGEudHMiLCIuLi9KYXZhU2NyaXB0cy9tb2R1bGVzL2dhbWUvR2FtZU1vZHVsZVMudHMiLCIuLi9KYXZhU2NyaXB0cy9tb2R1bGVzL2d1aWRlTW9kdWxlL0d1aWRlTW9kZWxEYXRhLnRzIiwiLi4vSmF2YVNjcmlwdHMvbW9kdWxlcy9ndWlkZU1vZHVsZS9HdWlkZU1vZHVsZVMudHMiLCIuLi9KYXZhU2NyaXB0cy9tb2R1bGVzL2l0ZW0vSXRlbURhdGEudHMiLCIuLi9KYXZhU2NyaXB0cy9tb2R1bGVzL2l0ZW0vSXRlbU1vZHVsZVMudHMiLCIuLi9KYXZhU2NyaXB0cy9tb2R1bGVzL29ic3RhY2xlL09ic3RhY2xlTW9kdWxlUy50cyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvcm9sZS9Sb2xlRGF0YS50cyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvcm9sZS9Sb2xlTW9kdWxlUy50cyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvc2NlbmUvU2NlbmVNb2R1bGVTLnRzIiwiLi4vSmF2YVNjcmlwdHMvR2FtZVN0YXJ0LnRzIiwiLi4vSmF2YVNjcmlwdHMvTW9kaWZpZWQwMjdFZGl0b3IvTW9kaWZpZWRDYW1lcmEudHMiLCIuLi9KYXZhU2NyaXB0cy9Nb2RpZmllZDAyN0VkaXRvci9Nb2RpZmllZFN0YXRpY0FQSS50cyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvcm9sZS9Sb2xlVHJpZ2dlci50cyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvc2hvcC9TaG9wTW9kdWxlQy50cyIsIi4uL0phdmFTY3JpcHRzL21vZHVsZXMvc2hvcC9TaG9wTW9kdWxlUy50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1BGX1Jld2FyZHNfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9TZXR0aW5nVUlfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9VSVJvb3RfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy9VSVJvb3QudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9XaW5kb3dzTm9FZGl0b3IvTVcvQ29udGVudC9CdWlsZFRvb2wvbXctdmlydHVhbC1lbnRyeSJdLCJzb3VyY2VzQ29udGVudCI6W251bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XHJcbiAgICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cclxuICAgIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XHJcbiAgICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcclxuICAgIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xyXG4gICAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcclxuICAgICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xyXG4gICAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy5wdXNoKF8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnB1c2goXyk7XHJcbiAgICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XHJcbiAgICBkb25lID0gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XHJcbiAgICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcclxuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcclxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcclxuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xyXG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcclxuICAgICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XHJcbiAgICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcclxuICAgIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XHJcbn1cclxuIixudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCwiaW1wb3J0ICogYXMgZm9yZWlnbjAgZnJvbSAnLi9idWlsZCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMSBmcm9tICcuL0phdmFTY3JpcHRzL2NvbmZpZy9Bc3NldHMnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjIgZnJvbSAnLi9KYXZhU2NyaXB0cy9jb25maWcvQ29uZmlnQmFzZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMyBmcm9tICcuL0phdmFTY3JpcHRzL2NvbmZpZy9HYW1lQ29uZmlnJztcbmltcG9ydCAqIGFzIGZvcmVpZ240IGZyb20gJy4vSmF2YVNjcmlwdHMvY29uZmlnL0dsb2JhbCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNSBmcm9tICcuL0phdmFTY3JpcHRzL2NvbmZpZy9HdWlkZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNiBmcm9tICcuL0phdmFTY3JpcHRzL2NvbmZpZy9JdGVtJztcbmltcG9ydCAqIGFzIGZvcmVpZ243IGZyb20gJy4vSmF2YVNjcmlwdHMvY29uZmlnL0xhbmd1YWdlJztcbmltcG9ydCAqIGFzIGZvcmVpZ244IGZyb20gJy4vSmF2YVNjcmlwdHMvY29uZmlnL0xldmVsJztcbmltcG9ydCAqIGFzIGZvcmVpZ245IGZyb20gJy4vSmF2YVNjcmlwdHMvY29uZmlnL1JhbmRvbVJhbmsnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjEwIGZyb20gJy4vSmF2YVNjcmlwdHMvY29uZmlnL1JvbGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjExIGZyb20gJy4vSmF2YVNjcmlwdHMvY29uZmlnL1ZvaWNlJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xMiBmcm9tICcuL0phdmFTY3JpcHRzL2NvbnN0L0NvbnN0JztcbmltcG9ydCAqIGFzIGZvcmVpZ24xMyBmcm9tICcuL0phdmFTY3JpcHRzL2NvbnN0L0RlZmluZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTQgZnJvbSAnLi9KYXZhU2NyaXB0cy9kYXRhL0RhdGFNYW5hZ2VyJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xNSBmcm9tICcuL0phdmFTY3JpcHRzL0dhbWVTdGFydCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTYgZnJvbSAnLi9KYXZhU2NyaXB0cy9Mb2FkaW5nVUknO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE3IGZyb20gJy4vSmF2YVNjcmlwdHMvTW9kaWZpZWQwMjdFZGl0b3IvTW9kaWZpZWRDYW1lcmEnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE4IGZyb20gJy4vSmF2YVNjcmlwdHMvTW9kaWZpZWQwMjdFZGl0b3IvTW9kaWZpZWRQbGF5ZXInO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE5IGZyb20gJy4vSmF2YVNjcmlwdHMvTW9kaWZpZWQwMjdFZGl0b3IvTW9kaWZpZWRTcGF3bic7XG5pbXBvcnQgKiBhcyBmb3JlaWduMjAgZnJvbSAnLi9KYXZhU2NyaXB0cy9Nb2RpZmllZDAyN0VkaXRvci9Nb2RpZmllZFN0YXRpY0FQSSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMjEgZnJvbSAnLi9KYXZhU2NyaXB0cy9tb2R1bGVzL2dhbWUvR2FtZURhdGEnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjIyIGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9nYW1lL0dhbWVNb2R1bGVDJztcbmltcG9ydCAqIGFzIGZvcmVpZ24yMyBmcm9tICcuL0phdmFTY3JpcHRzL21vZHVsZXMvZ2FtZS9HYW1lTW9kdWxlUyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMjQgZnJvbSAnLi9KYXZhU2NyaXB0cy9tb2R1bGVzL2d1aWRlTW9kdWxlL0d1aWRlQ29udGVudCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMjUgZnJvbSAnLi9KYXZhU2NyaXB0cy9tb2R1bGVzL2d1aWRlTW9kdWxlL0d1aWRlSW5mbyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMjYgZnJvbSAnLi9KYXZhU2NyaXB0cy9tb2R1bGVzL2d1aWRlTW9kdWxlL0d1aWRlTW9kZWxEYXRhJztcbmltcG9ydCAqIGFzIGZvcmVpZ24yNyBmcm9tICcuL0phdmFTY3JpcHRzL21vZHVsZXMvZ3VpZGVNb2R1bGUvR3VpZGVNb2R1bGVDJztcbmltcG9ydCAqIGFzIGZvcmVpZ24yOCBmcm9tICcuL0phdmFTY3JpcHRzL21vZHVsZXMvZ3VpZGVNb2R1bGUvR3VpZGVNb2R1bGVTJztcbmltcG9ydCAqIGFzIGZvcmVpZ24yOSBmcm9tICcuL0phdmFTY3JpcHRzL21vZHVsZXMvaXRlbS9JdGVtRGF0YSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMzAgZnJvbSAnLi9KYXZhU2NyaXB0cy9tb2R1bGVzL2l0ZW0vSXRlbU1vZHVsZUMnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjMxIGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9pdGVtL0l0ZW1Nb2R1bGVTJztcbmltcG9ydCAqIGFzIGZvcmVpZ24zMiBmcm9tICcuL0phdmFTY3JpcHRzL21vZHVsZXMvb2JzdGFjbGUvT2JzdGFjbGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjMzIGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9vYnN0YWNsZS9PYnN0YWNsZU1vZHVsZUMnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjM0IGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9vYnN0YWNsZS9PYnN0YWNsZU1vZHVsZVMnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjM1IGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9yb2xlL0NhbWVyYUN0cmwnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjM2IGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9yb2xlL1JvbGVDdHJsJztcbmltcG9ydCAqIGFzIGZvcmVpZ24zNyBmcm9tICcuL0phdmFTY3JpcHRzL21vZHVsZXMvcm9sZS9Sb2xlRGF0YSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMzggZnJvbSAnLi9KYXZhU2NyaXB0cy9tb2R1bGVzL3JvbGUvUm9sZUl0ZW0nO1xuaW1wb3J0ICogYXMgZm9yZWlnbjM5IGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9yb2xlL1JvbGVNb2R1bGVDJztcbmltcG9ydCAqIGFzIGZvcmVpZ240MCBmcm9tICcuL0phdmFTY3JpcHRzL21vZHVsZXMvcm9sZS9Sb2xlTW9kdWxlUyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNDEgZnJvbSAnLi9KYXZhU2NyaXB0cy9tb2R1bGVzL3JvbGUvUm9sZVRyaWdnZXInO1xuaW1wb3J0ICogYXMgZm9yZWlnbjQyIGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9zY2VuZS9TY2VuZU1vZHVsZUMnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjQzIGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9zY2VuZS9TY2VuZU1vZHVsZVMnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjQ0IGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kdWxlcy9zaG9wL1Nob3BNb2R1bGVDJztcbmltcG9ydCAqIGFzIGZvcmVpZ240NSBmcm9tICcuL0phdmFTY3JpcHRzL21vZHVsZXMvc2hvcC9TaG9wTW9kdWxlUyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNDYgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS9HYW1lVUknO1xuaW1wb3J0ICogYXMgZm9yZWlnbjQ3IGZyb20gJy4vSmF2YVNjcmlwdHMvdWkvR3VpZGVNb2R1bGVWaWV3JztcbmltcG9ydCAqIGFzIGZvcmVpZ240OCBmcm9tICcuL0phdmFTY3JpcHRzL3VpL1VJR2FtZU92ZXInO1xuaW1wb3J0ICogYXMgZm9yZWlnbjQ5IGZyb20gJy4vSmF2YVNjcmlwdHMvdWkvVUlHdWlkZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNTAgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS9VSUxvYmJ5JztcbmltcG9ydCAqIGFzIGZvcmVpZ241MSBmcm9tICcuL0phdmFTY3JpcHRzL3VpL1VJUGF1c2UnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjUyIGZyb20gJy4vSmF2YVNjcmlwdHMvdWkvVUlSYW5rSXRlbSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNTMgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS9VSVJlbGl2ZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNTQgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS9VSVJld2FyZCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNTUgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS9VSVJvbGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjU2IGZyb20gJy4vSmF2YVNjcmlwdHMvdWkvVUlSb2xlSGVhZCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNTcgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS9VSVNob3BDaXR5JztcbmltcG9ydCAqIGFzIGZvcmVpZ241OCBmcm9tICcuL0phdmFTY3JpcHRzL3VpL1VJU2hvcENpdHlJdGVtJztcbmltcG9ydCAqIGFzIGZvcmVpZ241OSBmcm9tICcuL0phdmFTY3JpcHRzL3VpL1VJU2tpbGwnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjYwIGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvR2FtZUVuZFVJX2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ242MSBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0dhbWVVSV9nZW5lcmF0ZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNjIgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9HdWlkZU1vZHVsZVVJX2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ242MyBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0d1aWRlVUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjY0IGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvTG9hZGluZ1VJX2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ242NSBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0xvYmJ5VUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjY2IGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUGF1c2VVSV9nZW5lcmF0ZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNjcgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9QRl9SZXdhcmRzX2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ242OCBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1JhbmtCYXNlVUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjY5IGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUmVsaXZlVUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjcwIGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUmV3YXJkVUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjcxIGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUm9sZUhlYWRVSV9nZW5lcmF0ZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNzIgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9Sb2xlVUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjczIGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvU2V0dGluZ1VJX2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ243NCBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1Nob3BDaXR5SXRlbVVJX2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ243NSBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1Nob3BDaXR5VUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjc2IGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvU2tpbGxJdGVtVUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjc3IGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvU2tpbGxVSV9nZW5lcmF0ZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNzggZnJvbSAnLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9VSVJvb3RfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjc5IGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvVXNlSXRlbV9nZW5lcmF0ZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduODAgZnJvbSAnLi9KYXZhU2NyaXB0cy9VSVJvb3QnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjgxIGZyb20gJy4vSmF2YVNjcmlwdHMvdW50aWxzL0FjdGlvbk1ncic7XG5pbXBvcnQgKiBhcyBmb3JlaWduODIgZnJvbSAnLi9KYXZhU2NyaXB0cy91bnRpbHMvTUdTQ2VudGVyJztcbmltcG9ydCAqIGFzIGZvcmVpZ244MyBmcm9tICcuL0phdmFTY3JpcHRzL3VudGlscy9Qb29sJztcbmltcG9ydCAqIGFzIGZvcmVpZ244NCBmcm9tICcuL0phdmFTY3JpcHRzL3VudGlscy9Tb3VuZCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduODUgZnJvbSAnLi9KYXZhU2NyaXB0cy91bnRpbHMvVXRpbHMnO1xuZXhwb3J0IGNvbnN0IE1XTW9kdWxlTWFwID0geyBcbiAgICAgJ2J1aWxkJzogZm9yZWlnbjAsXG4gICAgICdKYXZhU2NyaXB0cy9jb25maWcvQXNzZXRzJzogZm9yZWlnbjEsXG4gICAgICdKYXZhU2NyaXB0cy9jb25maWcvQ29uZmlnQmFzZSc6IGZvcmVpZ24yLFxuICAgICAnSmF2YVNjcmlwdHMvY29uZmlnL0dhbWVDb25maWcnOiBmb3JlaWduMyxcbiAgICAgJ0phdmFTY3JpcHRzL2NvbmZpZy9HbG9iYWwnOiBmb3JlaWduNCxcbiAgICAgJ0phdmFTY3JpcHRzL2NvbmZpZy9HdWlkZSc6IGZvcmVpZ241LFxuICAgICAnSmF2YVNjcmlwdHMvY29uZmlnL0l0ZW0nOiBmb3JlaWduNixcbiAgICAgJ0phdmFTY3JpcHRzL2NvbmZpZy9MYW5ndWFnZSc6IGZvcmVpZ243LFxuICAgICAnSmF2YVNjcmlwdHMvY29uZmlnL0xldmVsJzogZm9yZWlnbjgsXG4gICAgICdKYXZhU2NyaXB0cy9jb25maWcvUmFuZG9tUmFuayc6IGZvcmVpZ245LFxuICAgICAnSmF2YVNjcmlwdHMvY29uZmlnL1JvbGUnOiBmb3JlaWduMTAsXG4gICAgICdKYXZhU2NyaXB0cy9jb25maWcvVm9pY2UnOiBmb3JlaWduMTEsXG4gICAgICdKYXZhU2NyaXB0cy9jb25zdC9Db25zdCc6IGZvcmVpZ24xMixcbiAgICAgJ0phdmFTY3JpcHRzL2NvbnN0L0RlZmluZSc6IGZvcmVpZ24xMyxcbiAgICAgJ0phdmFTY3JpcHRzL2RhdGEvRGF0YU1hbmFnZXInOiBmb3JlaWduMTQsXG4gICAgICdKYXZhU2NyaXB0cy9HYW1lU3RhcnQnOiBmb3JlaWduMTUsXG4gICAgICdKYXZhU2NyaXB0cy9Mb2FkaW5nVUknOiBmb3JlaWduMTYsXG4gICAgICdKYXZhU2NyaXB0cy9Nb2RpZmllZDAyN0VkaXRvci9Nb2RpZmllZENhbWVyYSc6IGZvcmVpZ24xNyxcbiAgICAgJ0phdmFTY3JpcHRzL01vZGlmaWVkMDI3RWRpdG9yL01vZGlmaWVkUGxheWVyJzogZm9yZWlnbjE4LFxuICAgICAnSmF2YVNjcmlwdHMvTW9kaWZpZWQwMjdFZGl0b3IvTW9kaWZpZWRTcGF3bic6IGZvcmVpZ24xOSxcbiAgICAgJ0phdmFTY3JpcHRzL01vZGlmaWVkMDI3RWRpdG9yL01vZGlmaWVkU3RhdGljQVBJJzogZm9yZWlnbjIwLFxuICAgICAnSmF2YVNjcmlwdHMvbW9kdWxlcy9nYW1lL0dhbWVEYXRhJzogZm9yZWlnbjIxLFxuICAgICAnSmF2YVNjcmlwdHMvbW9kdWxlcy9nYW1lL0dhbWVNb2R1bGVDJzogZm9yZWlnbjIyLFxuICAgICAnSmF2YVNjcmlwdHMvbW9kdWxlcy9nYW1lL0dhbWVNb2R1bGVTJzogZm9yZWlnbjIzLFxuICAgICAnSmF2YVNjcmlwdHMvbW9kdWxlcy9ndWlkZU1vZHVsZS9HdWlkZUNvbnRlbnQnOiBmb3JlaWduMjQsXG4gICAgICdKYXZhU2NyaXB0cy9tb2R1bGVzL2d1aWRlTW9kdWxlL0d1aWRlSW5mbyc6IGZvcmVpZ24yNSxcbiAgICAgJ0phdmFTY3JpcHRzL21vZHVsZXMvZ3VpZGVNb2R1bGUvR3VpZGVNb2RlbERhdGEnOiBmb3JlaWduMjYsXG4gICAgICdKYXZhU2NyaXB0cy9tb2R1bGVzL2d1aWRlTW9kdWxlL0d1aWRlTW9kdWxlQyc6IGZvcmVpZ24yNyxcbiAgICAgJ0phdmFTY3JpcHRzL21vZHVsZXMvZ3VpZGVNb2R1bGUvR3VpZGVNb2R1bGVTJzogZm9yZWlnbjI4LFxuICAgICAnSmF2YVNjcmlwdHMvbW9kdWxlcy9pdGVtL0l0ZW1EYXRhJzogZm9yZWlnbjI5LFxuICAgICAnSmF2YVNjcmlwdHMvbW9kdWxlcy9pdGVtL0l0ZW1Nb2R1bGVDJzogZm9yZWlnbjMwLFxuICAgICAnSmF2YVNjcmlwdHMvbW9kdWxlcy9pdGVtL0l0ZW1Nb2R1bGVTJzogZm9yZWlnbjMxLFxuICAgICAnSmF2YVNjcmlwdHMvbW9kdWxlcy9vYnN0YWNsZS9PYnN0YWNsZSc6IGZvcmVpZ24zMixcbiAgICAgJ0phdmFTY3JpcHRzL21vZHVsZXMvb2JzdGFjbGUvT2JzdGFjbGVNb2R1bGVDJzogZm9yZWlnbjMzLFxuICAgICAnSmF2YVNjcmlwdHMvbW9kdWxlcy9vYnN0YWNsZS9PYnN0YWNsZU1vZHVsZVMnOiBmb3JlaWduMzQsXG4gICAgICdKYXZhU2NyaXB0cy9tb2R1bGVzL3JvbGUvQ2FtZXJhQ3RybCc6IGZvcmVpZ24zNSxcbiAgICAgJ0phdmFTY3JpcHRzL21vZHVsZXMvcm9sZS9Sb2xlQ3RybCc6IGZvcmVpZ24zNixcbiAgICAgJ0phdmFTY3JpcHRzL21vZHVsZXMvcm9sZS9Sb2xlRGF0YSc6IGZvcmVpZ24zNyxcbiAgICAgJ0phdmFTY3JpcHRzL21vZHVsZXMvcm9sZS9Sb2xlSXRlbSc6IGZvcmVpZ24zOCxcbiAgICAgJ0phdmFTY3JpcHRzL21vZHVsZXMvcm9sZS9Sb2xlTW9kdWxlQyc6IGZvcmVpZ24zOSxcbiAgICAgJ0phdmFTY3JpcHRzL21vZHVsZXMvcm9sZS9Sb2xlTW9kdWxlUyc6IGZvcmVpZ240MCxcbiAgICAgJ0phdmFTY3JpcHRzL21vZHVsZXMvcm9sZS9Sb2xlVHJpZ2dlcic6IGZvcmVpZ240MSxcbiAgICAgJ0phdmFTY3JpcHRzL21vZHVsZXMvc2NlbmUvU2NlbmVNb2R1bGVDJzogZm9yZWlnbjQyLFxuICAgICAnSmF2YVNjcmlwdHMvbW9kdWxlcy9zY2VuZS9TY2VuZU1vZHVsZVMnOiBmb3JlaWduNDMsXG4gICAgICdKYXZhU2NyaXB0cy9tb2R1bGVzL3Nob3AvU2hvcE1vZHVsZUMnOiBmb3JlaWduNDQsXG4gICAgICdKYXZhU2NyaXB0cy9tb2R1bGVzL3Nob3AvU2hvcE1vZHVsZVMnOiBmb3JlaWduNDUsXG4gICAgICdKYXZhU2NyaXB0cy91aS9HYW1lVUknOiBmb3JlaWduNDYsXG4gICAgICdKYXZhU2NyaXB0cy91aS9HdWlkZU1vZHVsZVZpZXcnOiBmb3JlaWduNDcsXG4gICAgICdKYXZhU2NyaXB0cy91aS9VSUdhbWVPdmVyJzogZm9yZWlnbjQ4LFxuICAgICAnSmF2YVNjcmlwdHMvdWkvVUlHdWlkZSc6IGZvcmVpZ240OSxcbiAgICAgJ0phdmFTY3JpcHRzL3VpL1VJTG9iYnknOiBmb3JlaWduNTAsXG4gICAgICdKYXZhU2NyaXB0cy91aS9VSVBhdXNlJzogZm9yZWlnbjUxLFxuICAgICAnSmF2YVNjcmlwdHMvdWkvVUlSYW5rSXRlbSc6IGZvcmVpZ241MixcbiAgICAgJ0phdmFTY3JpcHRzL3VpL1VJUmVsaXZlJzogZm9yZWlnbjUzLFxuICAgICAnSmF2YVNjcmlwdHMvdWkvVUlSZXdhcmQnOiBmb3JlaWduNTQsXG4gICAgICdKYXZhU2NyaXB0cy91aS9VSVJvbGUnOiBmb3JlaWduNTUsXG4gICAgICdKYXZhU2NyaXB0cy91aS9VSVJvbGVIZWFkJzogZm9yZWlnbjU2LFxuICAgICAnSmF2YVNjcmlwdHMvdWkvVUlTaG9wQ2l0eSc6IGZvcmVpZ241NyxcbiAgICAgJ0phdmFTY3JpcHRzL3VpL1VJU2hvcENpdHlJdGVtJzogZm9yZWlnbjU4LFxuICAgICAnSmF2YVNjcmlwdHMvdWkvVUlTa2lsbCc6IGZvcmVpZ241OSxcbiAgICAgJ0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0dhbWVFbmRVSV9nZW5lcmF0ZSc6IGZvcmVpZ242MCxcbiAgICAgJ0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0dhbWVVSV9nZW5lcmF0ZSc6IGZvcmVpZ242MSxcbiAgICAgJ0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0d1aWRlTW9kdWxlVUlfZ2VuZXJhdGUnOiBmb3JlaWduNjIsXG4gICAgICdKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9HdWlkZVVJX2dlbmVyYXRlJzogZm9yZWlnbjYzLFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvTG9hZGluZ1VJX2dlbmVyYXRlJzogZm9yZWlnbjY0LFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvTG9iYnlVSV9nZW5lcmF0ZSc6IGZvcmVpZ242NSxcbiAgICAgJ0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1BhdXNlVUlfZ2VuZXJhdGUnOiBmb3JlaWduNjYsXG4gICAgICdKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9QRl9SZXdhcmRzX2dlbmVyYXRlJzogZm9yZWlnbjY3LFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUmFua0Jhc2VVSV9nZW5lcmF0ZSc6IGZvcmVpZ242OCxcbiAgICAgJ0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1JlbGl2ZVVJX2dlbmVyYXRlJzogZm9yZWlnbjY5LFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUmV3YXJkVUlfZ2VuZXJhdGUnOiBmb3JlaWduNzAsXG4gICAgICdKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9Sb2xlSGVhZFVJX2dlbmVyYXRlJzogZm9yZWlnbjcxLFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUm9sZVVJX2dlbmVyYXRlJzogZm9yZWlnbjcyLFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvU2V0dGluZ1VJX2dlbmVyYXRlJzogZm9yZWlnbjczLFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvU2hvcENpdHlJdGVtVUlfZ2VuZXJhdGUnOiBmb3JlaWduNzQsXG4gICAgICdKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9TaG9wQ2l0eVVJX2dlbmVyYXRlJzogZm9yZWlnbjc1LFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvU2tpbGxJdGVtVUlfZ2VuZXJhdGUnOiBmb3JlaWduNzYsXG4gICAgICdKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9Ta2lsbFVJX2dlbmVyYXRlJzogZm9yZWlnbjc3LFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvVUlSb290X2dlbmVyYXRlJzogZm9yZWlnbjc4LFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvVXNlSXRlbV9nZW5lcmF0ZSc6IGZvcmVpZ243OSxcbiAgICAgJ0phdmFTY3JpcHRzL1VJUm9vdCc6IGZvcmVpZ244MCxcbiAgICAgJ0phdmFTY3JpcHRzL3VudGlscy9BY3Rpb25NZ3InOiBmb3JlaWduODEsXG4gICAgICdKYXZhU2NyaXB0cy91bnRpbHMvTUdTQ2VudGVyJzogZm9yZWlnbjgyLFxuICAgICAnSmF2YVNjcmlwdHMvdW50aWxzL1Bvb2wnOiBmb3JlaWduODMsXG4gICAgICdKYXZhU2NyaXB0cy91bnRpbHMvU291bmQnOiBmb3JlaWduODQsXG4gICAgICdKYXZhU2NyaXB0cy91bnRpbHMvVXRpbHMnOiBmb3JlaWduODUsXG59XG4iXSwibmFtZXMiOlsiRVhDRUxEQVRBIiwiUmFua0Jhc2VVSV9nZW5lcmF0ZSIsIkd1aWRlTW9kdWxlVUlfZ2VuZXJhdGUiLCJTaG9wQ2l0eUl0ZW1VSV9nZW5lcmF0ZSIsIlNraWxsSXRlbVVJX2dlbmVyYXRlIiwiU2tpbGxVSV9nZW5lcmF0ZSIsIlNob3BDaXR5VUlfZ2VuZXJhdGUiLCJHYW1lRW5kVUlfZ2VuZXJhdGUiLCJSb2xlSGVhZFVJX2dlbmVyYXRlIiwiUm9sZVVJX2dlbmVyYXRlIiwiTG9iYnlVSV9nZW5lcmF0ZSIsIkd1aWRlVUlfZ2VuZXJhdGUiLCJQYXVzZVVJX2dlbmVyYXRlIiwiUmV3YXJkVUlfZ2VuZXJhdGUiLCJSZWxpdmVVSV9nZW5lcmF0ZSIsIkxvYWRpbmdVSV9nZW5lcmF0ZSIsIkdhbWVVSV9nZW5lcmF0ZSIsIlVzZUl0ZW1fZ2VuZXJhdGUiLCJVSVJvb3RfZ2VuZXJhdGUiXSwibWFw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QUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxrQ0FBa0MsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsa0NBQWtDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLGtDQUFrQyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsa0NBQWtDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxrQ0FBa0MsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLGtDQUFrQyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsa0NBQWtDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxrQ0FBa0MsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLGtDQUFrQyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsa0NBQWtDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxrQ0FBa0MsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLGtDQUFrQyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxZQUFZLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsa0NBQWtDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxrQ0FBa0MsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLGtDQUFrQyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsa0NBQWtDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLFVBQVUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxrQ0FBa0MsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLGtDQUFrQyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsa0NBQWtDLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxrQ0FBa0MsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLGtDQUFrQyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsa0NBQWtDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsa0NBQWtDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxrQ0FBa0MsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsa0NBQWtDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLGtDQUFrQyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxrQ0FBa0MsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsa0NBQWtDLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLGtDQUFrQyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxrQ0FBa0MsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxLQUFLLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsa0NBQWtDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLGtDQUFrQyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxrQ0FBa0MsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsa0NBQWtDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQW1CcjdGLE1BQU8sWUFBYSxTQUFRLFVBQTBCLENBQUE7QUFDM0QsSUFBQSxXQUFBLEdBQUE7UUFDQyxLQUFLLENBQUNBLFdBQVMsQ0FBQyxDQUFDO0tBQ2pCO0FBRUQ7Ozs7Ozs7QUN4QkQsTUFBTUEsV0FBUyxHQUFxQixDQUFDLENBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBaUJwUixNQUFPLFlBQWEsU0FBUSxVQUEwQixDQUFBO0FBQzNELElBQUEsV0FBQSxHQUFBO1FBQ0MsS0FBSyxDQUFDQSxXQUFTLENBQUMsQ0FBQztLQUNqQjtBQUVEOzs7Ozs7O0FDdEJELE1BQU1BLFdBQVMsR0FBcUIsQ0FBQyxDQUFDLElBQUksRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQVd0TyxNQUFPLFdBQVksU0FBUSxVQUF5QixDQUFBO0FBQ3pELElBQUEsV0FBQSxHQUFBO1FBQ0MsS0FBSyxDQUFDQSxXQUFTLENBQUMsQ0FBQztLQUNqQjtBQUVEOzs7Ozs7O0FDaEJELE1BQU1BLFdBQVMsR0FBcUIsQ0FBQyxDQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxlQUFlLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxlQUFlLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUEyQnR0QixNQUFPLFVBQVcsU0FBUSxVQUF3QixDQUFBO0FBQ3ZELElBQUEsV0FBQSxHQUFBO1FBQ0MsS0FBSyxDQUFDQSxXQUFTLENBQUMsQ0FBQztLQUNqQjtBQUVEOzs7Ozs7O0FDaENELE1BQU1BLFdBQVMsR0FBcUIsQ0FBQyxDQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLGdCQUFnQixFQUFDLGNBQWMsRUFBQyxlQUFlLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLFVBQVUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxhQUFhLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxZQUFZLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxPQUFPLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLE9BQU8sQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsY0FBYyxFQUFDLEtBQUssRUFBQyxhQUFhLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxjQUFjLEVBQUMsSUFBSSxFQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLGNBQWMsRUFBQyxLQUFLLEVBQUMsVUFBVSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsY0FBYyxFQUFDLElBQUksRUFBQyxPQUFPLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxjQUFjLEVBQUMsSUFBSSxFQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLGNBQWMsRUFBQyxJQUFJLEVBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsY0FBYyxFQUFDLElBQUksRUFBQyxPQUFPLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxjQUFjLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsY0FBYyxFQUFDLEdBQUcsRUFBQyxLQUFLLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxjQUFjLEVBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFdBQVcsRUFBQyxPQUFPLEVBQUMsU0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsV0FBVyxFQUFDLFFBQVEsRUFBQyxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFdBQVcsRUFBQyxRQUFRLEVBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFdBQVcsRUFBQyxRQUFRLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsV0FBVyxFQUFDLFFBQVEsRUFBQyxPQUFPLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLFVBQVUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsVUFBVSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsS0FBSyxFQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLElBQUksRUFBQyxRQUFRLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsS0FBSyxFQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsV0FBVyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEtBQUssRUFBQyxVQUFVLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEtBQUssRUFBQyxVQUFVLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsU0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEtBQUssRUFBQyxRQUFRLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsU0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEtBQUssRUFBQyxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsS0FBSyxFQUFDLE9BQU8sQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEtBQUssRUFBQyxPQUFPLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLElBQUksRUFBQyxRQUFRLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsS0FBSyxFQUFDLGFBQWEsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsU0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEtBQUssRUFBQyxPQUFPLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEtBQUssRUFBQyxRQUFRLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsS0FBSyxFQUFDLE9BQU8sQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsU0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEtBQUssRUFBQyxPQUFPLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsVUFBVSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxlQUFlLEVBQUMsSUFBSSxFQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLGVBQWUsRUFBQyxJQUFJLEVBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsZUFBZSxFQUFDLElBQUksRUFBQyxRQUFRLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxlQUFlLEVBQUMsS0FBSyxFQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLGVBQWUsRUFBQyxJQUFJLEVBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsZUFBZSxFQUFDLElBQUksRUFBQyxPQUFPLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxlQUFlLEVBQUMsSUFBSSxFQUFDLE9BQU8sQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLGVBQWUsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsZUFBZSxFQUFDLEtBQUssRUFBQyxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxlQUFlLEVBQUMsVUFBVSxFQUFDLHFDQUFxQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsZUFBZSxFQUFDLFVBQVUsRUFBQyxnQ0FBZ0MsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLGVBQWUsRUFBQyxVQUFVLEVBQUMscUNBQXFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxlQUFlLEVBQUMsVUFBVSxFQUFDLGdDQUFnQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsZUFBZSxFQUFDLFVBQVUsRUFBQyxnQ0FBZ0MsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLGVBQWUsRUFBQyxVQUFVLEVBQUMsZ0NBQWdDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxlQUFlLEVBQUMsVUFBVSxFQUFDLGdDQUFnQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsZUFBZSxFQUFDLFVBQVUsRUFBQyxnQ0FBZ0MsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLGVBQWUsRUFBQyxVQUFVLEVBQUMsZ0NBQWdDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxVQUFVLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLFVBQVUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxRQUFRLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLGFBQWEsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsZUFBZSxFQUFDLGlCQUFpQixFQUFDLDhEQUE4RCxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsZUFBZSxFQUFDLGlCQUFpQixFQUFDLGdEQUFnRCxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsZUFBZSxFQUFDLGtCQUFrQixFQUFDLHdEQUF3RCxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsWUFBWSxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsR0FBRyxFQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBQyxtQkFBbUIsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxRQUFRLEVBQUMsd0JBQXdCLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLFdBQVcsRUFBQyxRQUFRLEVBQUMsaUJBQWlCLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsV0FBVyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxXQUFXLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLGdCQUFnQixFQUFDLElBQUksRUFBQyxTQUFTLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxnQkFBZ0IsRUFBQyxJQUFJLEVBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsZ0JBQWdCLEVBQUMsS0FBSyxFQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLGdCQUFnQixFQUFDLFVBQVUsRUFBQyxxQ0FBcUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLGdCQUFnQixFQUFDLFVBQVUsRUFBQyxnQ0FBZ0MsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLGdCQUFnQixFQUFDLFVBQVUsRUFBQyxnQ0FBZ0MsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLGdCQUFnQixFQUFDLFVBQVUsRUFBQyxxQ0FBcUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLFdBQVcsRUFBQyxXQUFXLEVBQUMsd0NBQXdDLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFTbnVKLE1BQU8sY0FBZSxTQUFRLFVBQTRCLENBQUE7QUFDL0QsSUFBQSxXQUFBLEdBQUE7UUFDQyxLQUFLLENBQUNBLFdBQVMsQ0FBQyxDQUFDO0tBQ2pCOztJQUVELElBQUksVUFBVSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxFQUFDOzs7SUFFNUQsSUFBSSxVQUFVLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBLEVBQUM7OztJQUU1RCxJQUFJLFVBQVUsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBQzs7O0lBRTVELElBQUksVUFBVSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxFQUFDOzs7SUFFNUQsSUFBSSxRQUFRLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBLEVBQUM7OztJQUUxRCxJQUFJLFFBQVEsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBQzs7O0lBRTFELElBQUksUUFBUSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxFQUFDOzs7SUFFMUQsSUFBSSxRQUFRLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBLEVBQUM7OztJQUUxRCxJQUFJLFFBQVEsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBQzs7O0lBRTFELElBQUksUUFBUSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFM0QsSUFBSSxTQUFTLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU1RCxJQUFJLFlBQVksR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRS9ELElBQUksWUFBWSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFL0QsSUFBSSxZQUFZLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUUvRCxJQUFJLFlBQVksR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRS9ELElBQUksWUFBWSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFL0QsSUFBSSxZQUFZLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUUvRCxJQUFJLFlBQVksR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRS9ELElBQUksWUFBWSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFL0QsSUFBSSxZQUFZLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUUvRCxJQUFJLFlBQVksR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRS9ELElBQUksU0FBUyxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFNUQsSUFBSSxTQUFTLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU1RCxJQUFJLFNBQVMsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTVELElBQUksU0FBUyxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFNUQsSUFBSSxTQUFTLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU1RCxJQUFJLFNBQVMsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTVELElBQUksU0FBUyxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFNUQsSUFBSSxTQUFTLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU1RCxJQUFJLFNBQVMsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTVELElBQUksVUFBVSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFN0QsSUFBSSxVQUFVLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU3RCxJQUFJLFVBQVUsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTdELElBQUksVUFBVSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFN0QsSUFBSSxVQUFVLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU3RCxJQUFJLFVBQVUsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTdELElBQUksVUFBVSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFN0QsSUFBSSxVQUFVLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU3RCxJQUFJLFVBQVUsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTdELElBQUksVUFBVSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFN0QsSUFBSSxVQUFVLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU3RCxJQUFJLFVBQVUsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTdELElBQUksVUFBVSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFN0QsSUFBSSxVQUFVLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU3RCxJQUFJLFVBQVUsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTdELElBQUksVUFBVSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFN0QsSUFBSSxVQUFVLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU3RCxJQUFJLFVBQVUsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTdELElBQUksVUFBVSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFN0QsSUFBSSxVQUFVLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU3RCxJQUFJLFVBQVUsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTdELElBQUksVUFBVSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFN0QsSUFBSSxVQUFVLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU3RCxJQUFJLFVBQVUsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTdELElBQUksVUFBVSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFN0QsSUFBSSxVQUFVLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU3RCxJQUFJLFVBQVUsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTdELElBQUksVUFBVSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFN0QsSUFBSSxVQUFVLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU3RCxJQUFJLFVBQVUsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTdELElBQUksVUFBVSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFN0QsSUFBSSxVQUFVLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU3RCxJQUFJLFVBQVUsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTdELElBQUksVUFBVSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFN0QsSUFBSSxVQUFVLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU3RCxJQUFJLFVBQVUsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTdELElBQUksVUFBVSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFN0QsSUFBSSxVQUFVLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU3RCxJQUFJLFVBQVUsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRTdELElBQUksVUFBVSxHQUFvQixFQUFBLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxFQUFDOzs7SUFFN0QsSUFBSSxVQUFVLEdBQW9CLEVBQUEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEVBQUM7OztJQUU3RCxJQUFJLGFBQWEsR0FBb0IsRUFBQSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsRUFBQzs7O0lBRWhFLElBQUksYUFBYSxHQUFvQixFQUFBLE9BQU8sSUFB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QUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsRUFBQyxDQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFXbnFDLE1BQU8sV0FBWSxTQUFRLFVBQXlCLENBQUE7QUFDekQsSUFBQSxXQUFBLEdBQUE7UUFDQyxLQUFLLENBQUNBLFdBQVMsQ0FBQyxDQUFDO0tBQ2pCO0FBRUQ7Ozs7Ozs7QUNoQkQsTUFBTUEsV0FBUyxHQUFxQixDQUFDLENBQUMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFPeDZCLE1BQU8sZ0JBQWlCLFNBQVEsVUFBOEIsQ0FBQTtBQUNuRSxJQUFBLFdBQUEsR0FBQTtRQUNDLEtBQUssQ0FBQ0EsV0FBUyxDQUFDLENBQUM7S0FDakI7QUFFRDs7Ozs7OztBQ1pELE1BQU1BLFdBQVMsR0FBcUIsQ0FBQyxDQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLE1BQU0sRUFBQyxjQUFjLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxlQUFlLEVBQUMsQ0FBQyxFQUFDLGVBQWUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLENBQUMsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsZUFBZSxFQUFDLENBQUMsRUFBQyxlQUFlLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLGtDQUFrQyxFQUFDLGtDQUFrQyxFQUFDLGtDQUFrQyxFQUFDLGtDQUFrQyxFQUFDLGtDQUFrQyxFQUFDLGtDQUFrQyxDQUFDLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLGVBQWUsRUFBQyxDQUFDLEVBQUMsZUFBZSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxrQ0FBa0MsRUFBQyxrQ0FBa0MsRUFBQyxrQ0FBa0MsRUFBQyxrQ0FBa0MsRUFBQyxrQ0FBa0MsRUFBQyxrQ0FBa0MsQ0FBQyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxlQUFlLEVBQUMsQ0FBQyxFQUFDLGVBQWUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLENBQUMsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxFQUFDLGVBQWUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsa0NBQWtDLENBQUMsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxFQUFDLGVBQWUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsa0NBQWtDLENBQUMsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsZUFBZSxFQUFDLENBQUMsRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLENBQUMsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsZUFBZSxFQUFDLENBQUMsRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLENBQUMsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxFQUFDLGdCQUFnQixFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxrQ0FBa0MsQ0FBQyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxlQUFlLEVBQUMsQ0FBQyxFQUFDLGVBQWUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLENBQUMsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsZUFBZSxFQUFDLENBQUMsRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLENBQUMsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsZUFBZSxFQUFDLENBQUMsRUFBQyxlQUFlLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLGtDQUFrQyxFQUFDLGtDQUFrQyxFQUFDLGtDQUFrQyxFQUFDLGtDQUFrQyxFQUFDLGtDQUFrQyxFQUFDLGtDQUFrQyxDQUFDLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUF5QnYrRixNQUFPLFVBQVcsU0FBUSxVQUF3QixDQUFBO0FBQ3ZELElBQUEsV0FBQSxHQUFBO1FBQ0MsS0FBSyxDQUFDQSxXQUFTLENBQUMsQ0FBQztLQUNqQjtBQUVEOzs7Ozs7O0FDOUJELE1BQU0sU0FBUyxHQUFxQixDQUFDLENBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLGtCQUFrQixFQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLE9BQU8sQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsUUFBUSxDQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsV0FBVyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLEVBQUMsT0FBTyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsVUFBVSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLEVBQUMsT0FBTyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsVUFBVSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxTQUFTLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLE9BQU8sQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLFVBQVUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLG9EQUFvRCxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxTQUFTLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLFFBQVEsQ0FBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLGVBQWUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsUUFBUSxDQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsMkJBQTJCLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLFFBQVEsQ0FBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsU0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVB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QUFBLENBQUEsV0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsV0FBUyxDQUFBO0FBQ1QsSUFBQSxTQUFBLENBQUEsU0FBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLFFBQU0sQ0FBQTtBQUNOLElBQUEsU0FBQSxDQUFBLFNBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxNQUFJLENBQUE7QUFDSixJQUFBLFNBQUEsQ0FBQSxTQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsTUFBSSxDQUFBO0FBQ0osSUFBQSxTQUFBLENBQUEsU0FBQSxDQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLEtBQUcsQ0FBQTtBQUNILElBQUEsU0FBQSxDQUFBLFNBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsR0FBQSxNQUFJLENBQUE7QUFDUixDQUFDLEVBWlcsU0FBUyxLQUFULFNBQVMsR0FZcEIsRUFBQSxDQUFBLENBQUEsQ0FBQTtBQUVEO0FBQ0EsSUFBWSxLQU1YLENBQUE7QUFORCxDQUFBLFVBQVksS0FBSyxFQUFBO0FBQ2IsSUFBQSxLQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLElBQU0sQ0FBQTtBQUNOLElBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxNQUFRLENBQUE7QUFDUixJQUFBLEtBQUEsQ0FBQSxLQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsTUFBUSxDQUFBO0FBQ1IsSUFBQSxLQUFBLENBQUEsS0FBQSxDQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLE9BQVMsQ0FBQTtBQUNULElBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxNQUFRLENBQUE7QUFDWixDQUFDLEVBTlcsS0FBSyxLQUFMLEtBQUssR0FNaEIsRUFBQSxDQUFB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QSxTQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFaEMsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLHFDQUFxQyxDQUFDO0FBQ1YsQ0FBQSxFQUFBLGVBQUEsQ0FBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFbkMsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLDRCQUE0QixDQUFDO0FBQ0osQ0FBQSxFQUFBLGVBQUEsQ0FBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFaEMsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLHFDQUFxQyxDQUFDO0FBQ1YsQ0FBQSxFQUFBLGVBQUEsQ0FBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFbkMsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLDRCQUE0QixDQUFDO0FBQ0osQ0FBQSxFQUFBLGVBQUEsQ0FBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFaEMsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLHFDQUFxQyxDQUFDO0FBQ1YsQ0FBQSxFQUFBLGVBQUEsQ0FBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFbkMsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLDRCQUE0QixDQUFDO0FBQ0osQ0FBQSxFQUFBLGVBQUEsQ0FBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFaEMsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLG1CQUFtQixDQUFDO0FBQ0ssQ0FBQSxFQUFBLGVBQUEsQ0FBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFaEMsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLFVBQVUsQ0FBQztBQUNjLENBQUEsRUFBQSxlQUFBLENBQUEsU0FBQSxFQUFBLFVBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxD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
