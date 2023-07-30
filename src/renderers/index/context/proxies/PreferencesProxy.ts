import BaseProxy from "./BaseProxy";
import IAppContext from "../../providers/IAppContext";
import LocalStorageKeys from "../../constants/LocalStorageKeys";
import EventNames from "../../events/EventNames";
import SaveSelectedVoiceTypeEvent from "../../events/SaveSelectedVoiceTypeEvent";
import GetSelectedVoiceTypeFromPreferencesEvent from "../../events/GetSelectedVoiceTypeFromPreferencesEvent";
import GetPreferencesEvent from "../../events/GetPreferencesEvent";
import SaveVolumePreferenceEvent from "../../events/SaveVolumePreferenceEvent";
import LaunchTaskEvent from "../../events/LaunchTaskEvent";

export interface IPreferences {
    selectedVoiceType?: number;
    volume?: number;// In dB
    ffmpegPath?: string;
}

export default class PreferencesProxy extends BaseProxy {

    private readonly _preferences: IPreferences = {};

    constructor(context: IAppContext) {
        super(context);

        let preferencesString = localStorage.getItem(LocalStorageKeys.PREFERENCES);
        if (preferencesString) {
            try {
                this._preferences = JSON.parse(preferencesString);
            } catch (e) {
                console.warn(e);
            }
        }

        context.addEventListener(EventNames.SAVE_PREFERENCES, this.savePreferencesHandler);
        context.addEventListener(EventNames.SAVE_SELECTED_VOICE_TYPE, this.saveSelectedVoiceTypeHandler);
        context.addEventListener(EventNames.GET_SELECTED_VOICE_TYPE_FROM_PREFERENCES, this.getSelectedVoiceTypeFromPreferencesHandler);
        context.addEventListener(EventNames.GET_PREFERENCES, this.getPreferencesHandler);
        context.addEventListener(EventNames.SAVE_VOLUME_REFERENCE, this.saveVolumePreferenceHandler);
        context.addEventListener(EventNames.SAVE_FFMPEG_PATH_TO_PREFERENCES, this.saveFfmpegPathToPreferencesHandler);
    }

    private saveFfmpegPathToPreferencesHandler = (event: LaunchTaskEvent<string, any, any, any>) => {
        this._preferences.ffmpegPath = event.inputData;
        this.savePreferencesHandler();
    }

    private saveVolumePreferenceHandler = (event: SaveVolumePreferenceEvent) => {
        this._preferences.volume = event.volume;
        this.savePreferencesHandler();
    }

    private getPreferencesHandler = (event: GetPreferencesEvent) => {
        event.doneCallback?.call(undefined, this._preferences);
    }

    private savePreferencesHandler = () => {
        localStorage.setItem(LocalStorageKeys.PREFERENCES, JSON.stringify(this._preferences));
    }

    private saveSelectedVoiceTypeHandler = (event: SaveSelectedVoiceTypeEvent) => {
        this._preferences.selectedVoiceType = event.voiceType;
        this.savePreferencesHandler();
    }

    private getSelectedVoiceTypeFromPreferencesHandler = (event: GetSelectedVoiceTypeFromPreferencesEvent) => {
        event.doneCallback?.call(undefined, this._preferences.selectedVoiceType);
    }

    dispose(): void {
        this.context.removeEventListener(EventNames.SAVE_PREFERENCES, this.savePreferencesHandler);
        this.context.removeEventListener(EventNames.SAVE_SELECTED_VOICE_TYPE, this.saveSelectedVoiceTypeHandler);
        this.context.removeEventListener(EventNames.GET_SELECTED_VOICE_TYPE_FROM_PREFERENCES, this.getSelectedVoiceTypeFromPreferencesHandler);
        this.context.removeEventListener(EventNames.GET_PREFERENCES, this.getPreferencesHandler);
        this.context.removeEventListener(EventNames.SAVE_VOLUME_REFERENCE, this.saveVolumePreferenceHandler);
        this.context.removeEventListener(EventNames.SAVE_FFMPEG_PATH_TO_PREFERENCES, this.saveFfmpegPathToPreferencesHandler);
    }
}