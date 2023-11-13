import { SpawnManager, SpawnInfo, } from '../Modified027Editor/ModifiedSpawn';

/**
 * 根据GUID返回全局唯一POOL
 */
export namespace SharePool {
	const pools: Map<string, IPool<any>> = new Map();
	export function getPool<T extends mw.GameObject>(guid: string): Pool<T> {
		let pool = pools.get(guid);
		if (!pool) {
			pool = new Pool(guid);
			pools.set(guid, pool);
		}
		return pool as Pool<T>;
	}
	export function getCreaterPool<T>(name: string, creater: (...param) => T, spawn: (object: T) => void, despawn: (object: T) => void): IPool<T> {
		let pool = pools.get(name);
		if (!pool) {
			pool = new CreaterPool(creater, spawn, despawn);
			pools.set(name, pool);
		}
		return pool;
	}
	export function getClonePool<T extends mw.GameObject>(guid: string): ClonePool<T> {
		let pool = pools.get(guid);
		if (!pool) {
			pool = new ClonePool(guid);
			pools.set(guid, pool);
		}
		return pool as ClonePool<T>;
	}
}
export interface IPool<T> {
	spawn(...param): IPoolObject<T>;
	despawn(obj: IPoolObject<T>);
}
interface IMWPool<T extends mw.GameObject> extends IPool<T> {
	despawn(obj: PObject<T>);
}
class Pool<T extends mw.GameObject> implements IMWPool<T> {
	/**
	 * 物品GUID
	 */
	private guid: string;

	private cache: PObject<T>[];
	constructor(guid: string) {
		this.guid = guid;
		this.cache = [];
	}
	/**
	 * 从对象池获取一个物体
	 * @returns 
	 */
	public spawn(): PObject<T> {
		if (this.cache.length > 0) {
			return this.cache.shift()["show"]();
		}
		const obj = SpawnManager.spawn({ guid: this.guid }) as T;
		return new PObject(this, obj);
	}
	/**
	 * 归还一个物体到对象池
	 * @returns 
	 */
	public despawn(obj: PObject<T>) {
		this.cache.push(obj);
	}
}
class CreaterPool<T> implements IPool<T>  {

	private cache: PObject2<T>[];
	constructor(private _creater: (...param) => T, private _spawn: (object: T) => void, private _despawn: (object: T) => void) {
		this.cache = [];
	}
	/**
	 * 从对象池获取一个物体
	 * @returns 
	 */
	public spawn(...param): PObject2<T> {
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
	public despawn(obj: PObject2<T>) {
		this._despawn(obj.obj);
		this.cache.push(obj);
	}
}
class ClonePool<T extends mw.GameObject> implements IMWPool<T>  {
	/**
	 * 物品GUID
	 */
	private guid: string;

	private cache: PObject<T>[];
	constructor(guid: string) {
		this.guid = guid;
		this.cache = [];
	}
	/**
	 * 从对象池获取一个物体
	 * @returns 
	 */
	public spawn(): PObject<T> {
		if (this.cache.length > 0) {
			return this.cache.shift()["show"]();
		}
		const obj = GameObject.findGameObjectById(this.guid).clone() as T;
		return new PObject(this, obj);
	}
	/**
	 * 归还一个物体到对象池
	 * @returns 
	 */
	public despawn(obj: PObject<T>) {
		this.cache.push(obj);
	}
}
export interface IPoolObject<T> {
	obj: T;
	despawn();
	isCreated(): boolean;
}
class PObject2<T> implements IPoolObject<T> {
	private _isCreated: boolean;

	protected show(): this {
		this._isCreated = false;
		return this;
	}
	despawn() {
		this.pool.despawn(this);
	}
	isCreated(): boolean {
		return this._isCreated;
	}
	constructor(private pool: IPool<T>, public obj: T) {
		this._isCreated = true;
	}
}
class PObject<T extends mw.GameObject> implements IPoolObject<T>  {
	private _isCreated: boolean;
	/**
	 * 是否是创建的
	 */
	public isCreated() {
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
	protected show(): this {
		this._isCreated = false;
		this.obj.setVisibility(mw.PropertyStatus.On);
		return this;
	}
	/**
	 * 隐藏
	 * @returns 
	 */
	protected hide(): this {
		this.obj.setVisibility(mw.PropertyStatus.Off);
		return this;
	}
	constructor(private pool: IMWPool<T>, public obj: T) {
		this._isCreated = true;
	}

}
