import {ConfigBase, IElementBase} from "./ConfigBase";
import {AssetsConfig} from "./Assets";
import {GlobalConfig} from "./Global";
import {GuideConfig} from "./Guide";
import {ItemConfig} from "./Item";
import {LanguageConfig} from "./Language";
import {LevelConfig} from "./Level";
import {RandomRankConfig} from "./RandomRank";
import {RoleConfig} from "./Role";
import {VoiceConfig} from "./Voice";

export class GameConfig{
	private static configMap:Map<string, ConfigBase<IElementBase>> = new Map();
	/**
	* 多语言设置
	* @param languageIndex 语言索引(-1为系统默认语言)
	* @param getLanguageFun 根据key获取语言内容的方法
	*/
	public static initLanguage(languageIndex:number, getLanguageFun:(key:string|number)=>string){
		ConfigBase.initLanguage(languageIndex, getLanguageFun);
		this.configMap.clear();
	}
	public static getConfig<T extends ConfigBase<IElementBase>>(ConfigClass: { new(): T }): T {
		if (!this.configMap.has(ConfigClass.name)) {
			this.configMap.set(ConfigClass.name, new ConfigClass());
		}
		return this.configMap.get(ConfigClass.name) as T;
	}
	public static get Assets():AssetsConfig{ return this.getConfig(AssetsConfig) };
	public static get Global():GlobalConfig{ return this.getConfig(GlobalConfig) };
	public static get Guide():GuideConfig{ return this.getConfig(GuideConfig) };
	public static get Item():ItemConfig{ return this.getConfig(ItemConfig) };
	public static get Language():LanguageConfig{ return this.getConfig(LanguageConfig) };
	public static get Level():LevelConfig{ return this.getConfig(LevelConfig) };
	public static get RandomRank():RandomRankConfig{ return this.getConfig(RandomRankConfig) };
	public static get Role():RoleConfig{ return this.getConfig(RoleConfig) };
	public static get Voice():VoiceConfig{ return this.getConfig(VoiceConfig) };
}