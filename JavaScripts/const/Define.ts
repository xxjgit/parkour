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
export enum MoveType {
    None,   //空
    Jump,   //跳
    Left,   //左
    Right,  //右
    Down,   //下
}
export enum GameState {
    None,
    Init,   //初始化
    Ready,  //准备中
    Game,  //游戏中
    End,   //结束
    Puase,  //暂停
    Over,   //结算 
}

/**资源类型 */
export enum ResourceType {
    /**不能随机 */
    CantRandom = 0,
    /**可以随机、可以通过 */
    CanRandomAndCanPass = 1,
    /**可以随机、不能通过 */
    CanRandomAndCantPass = 2,
    /**不能随机、可以通过 */
    CantRandomAndCanPass = 3,
    /**可随机、不可以通过、小范围随机位置 */
    CanRamdomAndCantPassPos = 4,
    /**天空金币奖励 */
    SkyCoins = 6,
}
export enum BlockType {
    None,
    Pass,  //可穿过的
    Stop,   //停止的
    Board,   //跳板
    Block,   //全阻挡
    StepBlock, //梯子后阻挡
    Border,
    Step,    //梯子
    Coin,    //金币
    Gem,     //宝石
    Item,
}

/**UI引导 */
export enum Guide {
    UP = 0,
    Down = 1,
    Left = 2,
    Right = 3,
    Hand = 4,
}

/**埋点事件 */
export enum MGSEvent {
    /**障碍触发器guid */
    DIE_ITEMGUID = 'DIE_ITEMGUID',
    /**重置金币事件计数 */
    GOLD_NUM_RESET = 'GOLD_NUM_RESET',
}


/**音效 */
export enum SPSound {
    Lobby = 1,
    Game = 2,
    Jump = 3,
    Move = 4,
    /**滑铲 */
    Down = 5,
    Coin = 6,
    PressButton = 7,
    /**眩晕 */
    vertigo = 8,
    Death = 9,
    /**游戏结束、开始结算 */
    GameOver = 10,
    /**超越最高分 */
    OverMaxScore = 11,
    GetItem = 12,
    UpGrade = 13,
    BuyItem = 14,
    BuyRole = 15,
    /**护盾爆炸 */
    ShieldBomb = 16,
    /**复活爆炸 */
    ReliveBomb = 17,
    /**获得钻石 */
    GetGem = 18,
}


/**
 * 动画资源
 */
export enum AnimRes {
    Idel = '46302',
    Idel2 = '33579',
    Run = '78633',
    Run2 = '84859',
    Jump = '21614',

    Trun = '52967',//21614',
    Down = '35443',
    //Drop = '14599',
    Die = '84923',
    Fly = '121604',
    Jump2 = '14710',
}
/**
 * 特效资源
 */
export enum EffectRes {
    Vertigo = '88830',
    Coin = '88789',
    Relive = '89080',
}

/**地铁跑酷ui点击事件 */
export enum SPUIEvent {
    /**选中头像 */
    SelectIcon = 'SelectIcon',
    /**点选道具 */
    PropPress = 'PropPress',
    /**技能升级 */
    SkillLvUp = 'SkillLvUp',
    /**选中、装备 */
    SelectRole = 'SelectRole',
}

export enum PriceType {
    Coin = 1,
    Diamonds = 2,
}


//引导类型
export enum GuideTarget {
    Scene,
    Shop,
    Role,
}