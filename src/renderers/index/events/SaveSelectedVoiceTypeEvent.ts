import EventNames from "./EventNames";

export default class SaveSelectedVoiceTypeEvent extends Event {
    private readonly _voiceType: number;

    constructor(voiceType: number) {
        super(EventNames.SAVE_SELECTED_VOICE_TYPE);
        this._voiceType = voiceType;
    }


    get voiceType(): number {
        return this._voiceType;
    }
}