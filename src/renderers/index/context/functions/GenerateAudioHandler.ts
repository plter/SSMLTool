import GenerateAudioEvent from "../../events/GenerateAudioEvent";
import IAppContext from "../../providers/IAppContext";
import ExternalInterface from "../../external/ExternalInterface";
import Constants from "../../constants/Constants";

export default async function GenerateAudioHandler(event: GenerateAudioEvent) {
    const context: IAppContext = this;

    let tencentAI = ExternalInterface.getInstance().tencentAI;
    if (!tencentAI.tencentTtsClientConfigured) {
        tencentAI.configTencentTtsClient(Constants.TENCENT_AI_APP_SECRET_ID, Constants.TENCENT_AI_API_SECRET_KEY);
    }
    let taskResult = await tencentAI.createTtsTask({
        "Text": event.ssml,
        "ModelType": 1,
        "VoiceType": event.voiceType // 音色列表 https://cloud.tencent.com/document/product/1073/92668
    });

    if (!taskResult || !taskResult.Data || !taskResult.Data.TaskId) {
        event.errorCallback?.call(undefined, new Error("Can not create tts task"));
        return;
    }

    for (let i = 1; ; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        event.progressCallback?.call(undefined, i);

        let queryResult = await tencentAI.describeTtsTaskStatus({
            TaskId: taskResult.Data.TaskId
        });

        if (!queryResult || !queryResult.Data) {
            event.errorCallback?.call(undefined, new Error("Unable to query result status"));
            break;
        }

        switch (queryResult.Data.Status) {
            case 0:
            case 1:
                continue;
            case 2:
                event.doneCallback?.call(undefined, queryResult.Data);
                return;
            case 3:
                event.errorCallback?.call(undefined, new Error(queryResult.Data.ErrorMsg));
                return;
            default:
                event.errorCallback?.call(undefined, new Error("Unknown error"));
                return;
        }
    }
}