export type DoneCallback<ResultType> = (result: ResultType) => void;
export type OnErrorCallback<ErrorType> = (error: ErrorType) => void;
export type OnProgressCallback<ProgressType> = (progress: ProgressType) => void;

export default class LaunchTaskEvent<InputDataType, ResultType, ErrorType, ProgressType> extends Event {
    private readonly _doneCallback: DoneCallback<ResultType>;
    private readonly _errorCallback: OnErrorCallback<ErrorType>;
    private readonly _progressCallback: OnProgressCallback<ProgressType>;
    private readonly _inputData: InputDataType;

    constructor(name: string, inputData?: InputDataType, doneCallback?: DoneCallback<ResultType>, errorCallback?: OnErrorCallback<ErrorType>, progressCallback?: OnProgressCallback<ProgressType>) {
        super(name);
        this._doneCallback = doneCallback;
        this._errorCallback = errorCallback;
        this._progressCallback = progressCallback;
        this._inputData = inputData;
    }


    get doneCallback(): DoneCallback<ResultType> {
        return this._doneCallback;
    }

    get errorCallback(): OnErrorCallback<ErrorType> {
        return this._errorCallback;
    }

    get progressCallback(): OnProgressCallback<ProgressType> {
        return this._progressCallback;
    }

    get inputData(): InputDataType {
        return this._inputData;
    }
}