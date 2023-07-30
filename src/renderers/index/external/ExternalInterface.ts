import {PutObjectResult} from "cos-nodejs-sdk-v5";

export interface IAliyunOSSResult {
    name: string;
    url: string;
}

export interface IAliyunOSS {
    get clientConfigured();

    configClient(accessKeyId, accessKeySecret, region, bucket);

    put(ossPath, data): Promise<IAliyunOSSResult>;
}

export interface ICreateTtsTaskResult {
    Data: { TaskId: string };
    RequestId: string;
}

export interface ITencentAI {
    get tencentAsrClientConfigured(): boolean;

    configTencentAsrClient(secretId: string, secretKey: string);

    createRecognizeTask(params: any): Promise<any>;

    describeRecognizeTaskStatus(params: any): Promise<any>;

    get tencentTtsClientConfigured(): boolean;

    configTencentTtsClient(secretId: string, secretKey: string);

    createTtsTask(params): Promise<ICreateTtsTaskResult>;

    describeTtsTaskStatus(params): Promise<any>;
}

export interface ITencetCos {
    get tencentCosClientConfigured(): boolean;

    configTencentCosClient(SecretId: string, SecretKey: string): void;

    putObject(localFilePath: string, cosKey: string, Bucket: string, Region: string, progressCallback?: any): Promise<PutObjectResult>;
}

interface IExternalInterface {
    runCommand(command: string, args: string[], options: any, stdoutLineCallback: (line: string) => void, stderrLineCallback: (line: string) => void): Promise<number>;

    node_path_join(...args: Array<any>): any;

    node_fs_writeFileSync(path: string, data: Uint8Array, options?: any): any;

    aliyunOSS: IAliyunOSS;
    tencentAI: ITencentAI;

    get os_tmpdir(): string;

    getAppPath(): Promise<string>;

    shell_showItemInFolder(filePath: string): void;

    tencentCos: ITencetCos;
}

export default class ExternalInterface {
    static getInstance(): IExternalInterface {
        return window["ExternalInterface"];
    }
}