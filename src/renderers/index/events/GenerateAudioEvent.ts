import EventNames from "./EventNames";
import {
    DescribeTtsTaskStatusRespData
} from "tencentcloud-sdk-nodejs-tts/tencentcloud/services/tts/v20190823/tts_models";

type DoneCallback = (result: DescribeTtsTaskStatusRespData) => void;

type ErrorCallback = (e: any) => void;

type ProgressCallback = (queryTimes: number) => void;

export default class GenerateAudioEvent extends Event {
    private readonly _ssml: string;
    private readonly _doneCallback: DoneCallback;
    private readonly _errorCallback: ErrorCallback;
    private readonly _progressCallback: ProgressCallback;
    private readonly _voiceType: number;

    constructor(ssml: string, voiceType: number, doneCallback: DoneCallback, errorCallback: ErrorCallback, progressCallback: ProgressCallback) {
        super(EventNames.GENERATE_AUDIO);
        this._ssml = ssml;
        this._doneCallback = doneCallback;
        this._errorCallback = errorCallback;
        this._progressCallback = progressCallback;
        this._voiceType = voiceType;
    }

    get ssml(): string {
        return this._ssml;
    }

    get doneCallback(): DoneCallback {
        return this._doneCallback;
    }

    get errorCallback(): ErrorCallback {
        return this._errorCallback;
    }

    get progressCallback(): ProgressCallback {
        return this._progressCallback;
    }


    get voiceType(): number {
        return this._voiceType;
    }
}