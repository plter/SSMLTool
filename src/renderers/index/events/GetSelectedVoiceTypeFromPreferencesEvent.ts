import EventNames from "./EventNames";

type DoneCallback = (selectedVoiceType: number) => void;

export default class GetSelectedVoiceTypeFromPreferencesEvent extends Event {
    private readonly _doneCallback: DoneCallback;

    constructor(doneCallback: DoneCallback) {
        super(EventNames.GET_SELECTED_VOICE_TYPE_FROM_PREFERENCES);
        this._doneCallback = doneCallback;
    }


    get doneCallback(): DoneCallback {
        return this._doneCallback;
    }
}