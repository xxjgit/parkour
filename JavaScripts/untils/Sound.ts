import { GameConfig } from "../config/GameConfig";
import { SPSound } from "../const/Define";
import { RoleModuleC } from "../modules/role/RoleModuleC";

export class Sound {

    public static get instance(): Sound {
        if (!this._inst)
            this._inst = new Sound();
        return this._inst;
    }

    private static _inst: Sound;
    /**
     * 播放bgm
     * @param soundType 
     */
    public gameBGM(soundType: SPSound) {
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
    public gameSound(soundType: SPSound) {
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
    public setSoundActive(): boolean {
        let vscale = mw.SoundService.BGMVolumeScale;
        if (vscale == 0) {
            mw.SoundService.BGMVolumeScale = 1;
            mw.SoundService.volumeScale = 1;
            return true;
        } else {
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
    private getAsset(index: number) {
        return GameConfig.Voice.getElement(index);
    }

    /**
    * 播放bgm
    * @param guid 
    * @param volume 
    */
    private playBGM(guid: string, volume?: number) {
        mw.SoundService.stopBGM();
        mw.SoundService.playBGM(guid, volume);
    }

    /**
     * 
     * @param guid 
     * @param volume 
     * @param needPauseSound 是否需要暂停音效
     */
    private playSound(guid: string, needPauseSound: boolean = true, volume?: number, loopNum?: number) {
        if (needPauseSound) {
            mw.SoundService.stopAllSound();
        }
        mw.SoundService.playSound(guid, loopNum, volume);
    }
}