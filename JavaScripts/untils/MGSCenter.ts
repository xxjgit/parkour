/*
 * @Author: pengwei.shi
 * @Date: 2022-11-13 15:20:38
 * @LastEditors: pengwei.shi
 * @LastEditTime: 2022-11-27 11:48:45
 * @FilePath: \streetparkour\JavaScripts\untils\MGSCenter.ts
 * @Description: 
 */
class MGSCenterBase {

	static msgUpload(key: string, des: string, data: {}) {
		//console.log("统计", key, des, JSON.stringify(data));
		mw.RoomService.reportLogInfo(key, des, JSON.stringify(data));

	}
}
/**
 * SP埋点
 */
export namespace MGSCenter {
	let guidsMap: Map<string, number> = new Map;
	export function addGuid(guid, group) {
		guidsMap.set(guid, group);
	}

	/**
	 * 看进入游戏次数和人数
	 */
	export function ts_game_start() {
		MGSCenterBase.msgUpload(`ts_game_start`, `记录游戏中开局事件,进入游戏记录`, { game_mode: 50 });
	}

	/**
	 * 核心循环开始
	 */
	export function ts_coregameplay_start() {
		MGSCenterBase.msgUpload(`ts_coregameplay_start`, `玩家开局`, { gameid: mw.RouteService.getMGSGameId() });
	}

	/**
	 * 核心循环结束
	 */
	export function ts_coregameplay_end() {
		MGSCenterBase.msgUpload(`ts_coregameplay_end`, `玩家吃到50金币`, { gameid: mw.RouteService.getMGSGameId() });
	}

	/**
	 * 新手引导开始
	 */
	export function ts_tutorial_start() {
		MGSCenterBase.msgUpload(`ts_tutorial_start`, `玩家首次开跑`, { gameid: mw.RouteService.getMGSGameId() });
	}


	/**
	 * 新手引导步骤
	 * @param step 
	 */
	export function ts_tutorial_step(step: number) {
		let steps = 'step';
		steps = steps + step.toFixed(0);
		MGSCenterBase.msgUpload(`ts_tutorial_step`, `新手引导步骤`, { tutorial_step: steps });
	}


	/**
	 * 新手引导结束
	 */
	export function ts_tutorial_end() {
		MGSCenterBase.msgUpload(`ts_tutorial_end`, `新手引导结束`, { gameid: mw.RouteService.getMGSGameId() });
	}

	/**
	 * 死亡埋点
	 * @param guid 障碍物guid
	 * @param randomLevel 随机关卡个数
	 */
	export function ts_action_dead(guid: string, randomLevel: number) {
		let group = guidsMap.get(guid);
		MGSCenterBase.msgUpload(`ts_action_dead`, `玩家死亡`, { death_type: group, stage_level: randomLevel });
	}

	/**
	 * 看一局进行的时间
	 * 和当前所游玩过的轮数
	 * @param roundTime 
	 * @param roundNum 
	 */
	export function ts_game_result(roundTime: number, roundNum: number) {
		MGSCenterBase.msgUpload(`ts_game_result`, `看一局多长时间,看一个玩家完成了多少局`, { round_length: roundTime, round: roundNum });
	}


	/**
	 * 游戏结算
	 * @param score 分数
	 * @param money 金币数
	 * @param roundWake 本次游戏内超越最高分的次数
	 */
	export function ts_game_over_one(score: number, money: number) {
		MGSCenterBase.msgUpload(`ts_game_over`, `游戏内一局结算`, { player_level: score, round_money: money });
	}
	/**
	 * 游戏结算
	 * @param roundWake 本次游戏内超越最高分的次数
	 */
	export function ts_game_over_two(roundWake: number) {
		MGSCenterBase.msgUpload(`ts_game_over`, `游戏内一局结算`, { round_wave: roundWake });
	}

	/**
	 * 游戏结算
	 * @param gemNum 钻石数量
	 * @param sheildNum 吃到的护盾数量
	 * @param flyNum 吃到的飞行道具数量
	 * @param doubleCoin 吃到的双倍金币数量
	 * @param activeUseSheild 主动使用护盾次数
	 * @param activeUseRebirth 主动复活次数
	 */
	export function ts_game_over_three(gemNum: number, sheildNum: number, flyNum: number, doubleCoin: number, activeUseSheild: number, activeUseRebirth) {
		MGSCenterBase.msgUpload(`ts_game_over`, `游戏内一局结算`, { point_hold: gemNum, ghost_killall: sheildNum, ghost_timeout: flyNum, ghost_fail: doubleCoin, student_leave: activeUseSheild, student_dead: activeUseRebirth });
	}

	/**
	 * 主界面Start按钮
	 */
	export function lobbyGoButton() {
		MGSCenterBase.msgUpload(`ts_action_click`, `点击主界面GO`, { button: 'skill' });
	}

	/**
	 * 点击主界面关闭音乐
	 */
	export function lobbyCloseSound() {
		MGSCenterBase.msgUpload(`ts_action_click`, `点击主界面关闭音乐`, { button: 'gem_1' });
	}

	/**
	 * 点击跑酷界面暂停
	 */
	export function gamePause() {
		MGSCenterBase.msgUpload(`ts_action_click`, `跑酷暂停`, { button: 'gem_2' });
	}

	/**
	 * 点击结算界面GO
	 */
	export function gameContine() {
		MGSCenterBase.msgUpload(`ts_action_click`, `结算界面`, { button: 'gem_3' });
	}

	/**
	 * 点击结算界面返回大庁
	 */
	export function backLobby() {
		MGSCenterBase.msgUpload(`ts_action_click`, `结算回家`, { button: 'gem_4' });
	}


	/**
	 * 点击排行榜
	 */
	export function mgsRank() {
		MGSCenterBase.msgUpload(`ts_action_click`, `点击主界面排行榜`, { button: 'gem_5' });
	}

	/**
	 * 点击主界面角色
	 */
	export function mgsLobbyRole() {
		MGSCenterBase.msgUpload(`ts_action_click`, `点击主界面角色`, { button: 'gem6' });
	}

	/**
	 * 点击主界面角色
	 */
	export function mgsLobbyShop() {
		MGSCenterBase.msgUpload(`ts_action_click`, `点击主界面商店`, { button: 'gem7' });
	}

	/**
	 * 点击结算界面角色
	 */
	export function mgsGameOverRole() {
		MGSCenterBase.msgUpload(`ts_action_click`, `点击结算界面角色`, { button: 'gem8' });
	}

	/**
	 * 点击结算界面商店
	 */
	export function mgsGameOverShop() {
		MGSCenterBase.msgUpload(`ts_action_click`, `点击结算界面商店`, { button: 'gem9' });
	}

	/**
	 * 首次购买角色
	 */
	export function mgsIsFirstRoleActionBuy() {
		MGSCenterBase.msgUpload(`ts_action_buy_plane`, `玩家购买角色触发`, { isfirstbuy: 50 });
	}

	/**
	 * 玩家购买角色情况
	 * @param roleID 
	 */
	export function mgsRoleActionBuy(roleID: number) {
		MGSCenterBase.msgUpload(`ts_action_unlock`, `玩家购买角色触发`, { area_id: roleID });
	}

	/**
	 * 首次购买道具
	 */
	export function mgsIsFirstItemActionBuy() {
		MGSCenterBase.msgUpload(`ts_action_buy_skill`, `玩家购买道具触发`, { isfirstbuy: 50 });
	}

	/**
	 * 购买道具
	 * @itemID
	 */
	export function mgsItemActionBuy(itemID: number) {
		MGSCenterBase.msgUpload(`ts_action_unlock`, `玩家购买道具触发`, { item_id: itemID });
	}

	/**
	 * 玩家道具升级情况
	 * @param itemID 
	 * @param isFirst 是否首次升级
	 */
	export function mgsItemActionUP(itemID: number, isFirst: boolean = false) {
		if (isFirst) {
			MGSCenterBase.msgUpload(`ts_action_buy_storage`, `玩家升级道具触发`, { storage_id: itemID, isfirstbuy: 50 });
		} else {
			MGSCenterBase.msgUpload(`ts_action_buy_storage`, `玩家升级道具触发`, { storage_id: itemID });
		}
	}


	/**
	 * 道具使用情况
	 * @param itemID 
	 */
	export function mgsActionUseItem(itemID: number) {
		MGSCenterBase.msgUpload(`ts_action_use_item`, `使用道具`, { item_id: itemID });
	}

	/**
	 * 玩家打开界面埋点
	 * 1 从角色界面跳转到道具界面
	 * 2 从道具界面跳转到角色界面
	 * @param id 
	 */
	export function ts_task(id: number) {
		MGSCenterBase.msgUpload(`ts_task`, `玩家打开页面触发`, { task_id: id })
	}


	/**
	 * 主动使用飞行和双倍道具
	 * @param fly 
	 * @param doubleCoin 
	 */
	export function ts_action_pick(fly: number, doubleCoin: number) {
		MGSCenterBase.msgUpload(`ts_action_pick`, `主动使用飞行或者双倍时`, { loot: fly, object: doubleCoin });
	}

	/**
	 * 吃到道具和生成道具的比值
	 * @param ratio 
	 */
	export function ts_game_over(ratio: number) {
		MGSCenterBase.msgUpload(`ts_game_over`, `玩家吃到道具和出现道具的比值`, { all_talent: ratio.toFixed(1) });
	}

	/**
	 * 引导玩家道具系统时一步步触发
	 * @param id 
	 */
	export function ts_action_firstdo(id: number) {
		MGSCenterBase.msgUpload(`ts_action_firstdo`, `引导步骤完成度`, { record: id });
	}

}