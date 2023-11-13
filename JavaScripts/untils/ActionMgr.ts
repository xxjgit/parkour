

export class ActionMgr {
    public static get instance(): ActionMgr {
        if (!this._inst)
            this._inst = new ActionMgr();
        return this._inst;
    }

    private static _inst: ActionMgr;

    private _tweens = new Map<any, Array<mw.Tween<any>>>();
    /**新增
     * args:对象
     * target:当前的类
     */
    public runTween<T>(args: T, target: any): mw.Tween<T> {
        let pair: Array<mw.Tween<any>> = null
        if (this._tweens.has(target)) {
            pair = this._tweens.get(target)
        } else {
            pair = []
            this._tweens.set(target, pair)
        }

        let ret = new mw.Tween(args)
        pair.push(ret)
        return ret
    }

    /**
     *移除
     * @param target
     */
    public remove(target: any) {
        let pair = this._tweens.get(target)
        if (pair) {
            pair.forEach((tween) => {
                tween.stop()
            })
            this._tweens.delete(target)
        }
    }

    /**进度条缓动效果 */
    public SlowMotion_loadingBar(bar: mw.ProgressBar, newPercent: number, target: any, completeCallback?: () => void) {
        let currentValue = bar.currentValue
        let duration = (newPercent - currentValue) * 1000
        return this.runTween({ x: currentValue }, target)
            .to({ x: newPercent }, Math.abs(duration))
            .onUpdate((value) => {
                bar.percent = value.x
            }).start().onComplete(() => {
                if (completeCallback) {
                    completeCallback()
                }
            })
    }

    /**数字文本缓动效果 */
    public SlowMotion_UINumberText(text: mw.TextBlock, newNumber: number, target: any, format: string = "") {
        let curCounts = Number(text.text)
        if (!curCounts) {
            curCounts = 0
        }
        return this.runTween({ x: curCounts }, target)
            .to({ x: newNumber }, 300)
            .onUpdate((value) => {
                text.text = Math.round(value.x).toString() + format
            }).start()
    }

    /**
     * 震动物体
     */
    public ShakeObj(obj: mw.GameObject, axis: mw.Vector, amplitude: number, times: number = 0) {

    }


    /**
     * 震动UI
     */
    public ShakeUI(ui: mw.Widget, dir: mw.Vector2, target: any, amplitude: number = 10, duration: number = 200, times: number = Infinity) {
        let origin = ui.position;
        let pos0 = new mw.Vector2(origin.x, origin.y);
        let pos1 = pos0.add(dir.normalize().multiply(amplitude));
        return this.runTween(pos0, target).to(pos1, duration).onUpdate((v) => {
            ui.position = v
        }).start().yoyo(true).repeat(times);
    }

    /**
     * 过渡黑幕动画
     * @param duration
     * @param start
     */
    public showBlackMask(ui: mw.Widget, duration: number, target, start?: () => void, onTranparent?: () => void, complete?: () => void) {
        let lastOpacity = 0
        let exe = false
        return this.runTween({ x: 0 }, target).to({ x: [1, 0] }, duration)
            .onUpdate((opacity) => {
                if (opacity.x - lastOpacity < 0 && !exe) {
                    onTranparent && onTranparent()
                    exe = true
                }
                lastOpacity = opacity.x
                ui.renderOpacity = opacity.x
            })
            .onComplete(() => {
                complete && complete()
            })
            .onStart(() => {
                start && start()
            })
            .start()
    }

    public fadeIn(ui: mw.Widget, duration: number, target, complete?: () => void) {
        let color = ui.renderOpacity
        return this.runTween({ value: color }, target).to({ value: 1 }, duration)
            .onUpdate((ref) => {
                ui.renderOpacity = ref.value
            })
            .start().onComplete(() => {
                complete && complete()
            }).easing(mw.TweenUtil.Easing.Cubic.Out)
    }
    public fadeOut(ui: mw.Widget, duration: number, target, complete?: () => void, easing: TweenEasingFunction = mw.TweenUtil.Easing.Quadratic.In) {
        let color = ui.renderOpacity
        return this.runTween({ value: color }, target).to({ value: 0 }, duration)
            .onUpdate((ref) => {
                ui.renderOpacity = ref.value
            })
            .start().onComplete(() => {
                complete && complete()
            }).easing(easing)
    }

    public fadeInOut(ui: mw.Widget, duration: number, to: number[], target, outCallback?: () => void, complete?: () => void) {
        let lastValue = 0
        let call = true
        let color = ui.renderOpacity
        return this.runTween({ value: color }, target).to({ value: to }, duration)
            .onUpdate((ref) => {
                ui.renderOpacity = ref.value
                if (call && ref.value - lastValue < 0) {
                    outCallback && outCallback()
                    call = false
                }
                lastValue = ref.value
            })
            .start().onComplete(() => {
                complete && complete()
            }).easing(mw.TweenUtil.Easing.Cubic.Out)
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
    public flash(widget: mw.Widget, duration: number, target, time: number = Infinity, opacityMin: number = 0, opacityMax: number = 1) {
        return this.runTween({ value: opacityMax }, target).to({ value: [opacityMin, opacityMax] }, duration)
            .onUpdate((ref) => {
                widget.renderOpacity = ref.value
            })
            .start().yoyo()
            .repeat(time)
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
    public moveTo2D(widget: mw.Widget, start: mw.Vector2, end: mw.Vector2, duration: number, target, compelet?: () => void, easing?: TweenEasingFunction) {
        let st = new mw.Vector2(start.x, start.y)
        widget.position = st
        return this.runTween(st, target).to(end, duration)
            .onUpdate((pos) => {
                widget.position = pos
            })
            .onComplete(() => {
                compelet && compelet()
            })
            .start().easing(easing)
    }

    public moveTo3D(obj: mw.GameObject, to: mw.Vector, duration: number, target: any, onComplete?: () => void, easing?: TweenEasingFunction) {
        let start = new mw.Vector(obj.worldTransform.position.x, obj.worldTransform.position.y, obj.worldTransform.position.z)
        return this.runTween(start, target).to(to, duration)
            .onUpdate((pos) => {
                obj.worldTransform.position = pos
            })
            .onComplete(() => {
                onComplete && onComplete()
            })
            .start().easing(easing)
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
    public renderScaleTo(widget: mw.Widget, to: mw.Vector2, duration: number, target: any, onComplete?: () => void, easing?: TweenEasingFunction) {
        let st = widget.renderScale.clone()
        return this.runTween(st, target).to(to, duration)
            .onUpdate((s) => {
                widget.renderScale = s
            })
            .onComplete(() => {
                onComplete && onComplete()
            })
            .start().easing(easing)
    }
}