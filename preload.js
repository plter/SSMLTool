const electron = require("electron");
const path = require("path");
const AliyunOSS = require("ali-oss");
const child_process = require("child_process");
const os = require("os");
const readline = require("readline");
const AsrClient = require("tencentcloud-sdk-nodejs-asr").asr.v20190614.Client;
const TtsClient = require("tencentcloud-sdk-nodejs-tts").tts.v20190823.Client;
const COS = require('cos-nodejs-sdk-v5');
const fs = require("fs");

let aliyunOSSClient = undefined;
let tencentAsrClient = undefined;
let tencentTtsClient = undefined;
let tencentCosClient = undefined;

electron.contextBridge.exposeInMainWorld("ExternalInterface", {
    node_path_join(...args) {
        return path.join(...args);
    },

    node_fs_writeFileSync(path, data, options) {
        return fs.writeFileSync(path, data, options);
    },

    node_os_tmpdir() {
        return os.tmpdir();
    },

    get os_tmpdir() {
        return os.tmpdir();
    },

    shell_showItemInFolder(filePath) {
        electron.shell.showItemInFolder(filePath);
    },

    async runCommand(command, args, options, stdoutLineCallback, stderrLineCallback) {
        return new Promise((resolve, reject) => {
            let p = child_process.spawn(command, args, options);
            readline.createInterface(p.stdout).on("line", line => {
                if (stdoutLineCallback) {
                    stdoutLineCallback(line);
                }
            });
            readline.createInterface(p.stderr).on("line", line => {
                if (stderrLineCallback) {
                    stderrLineCallback(line);
                }
            });
            p.on("exit", code => {
                resolve(code);
            });
            p.on("error", err => {
                reject(err);
            });
        });
    },

    async getAppPath() {
        return await electron.ipcRenderer.invoke("getAppPath");
    },

    aliyunOSS: {
        get clientConfigured() {
            return !!aliyunOSSClient
        },
        configClient(accessKeyId, accessKeySecret, region, bucket) {
            aliyunOSSClient = new AliyunOSS({
                accessKeySecret, accessKeyId, region, bucket
            });
        },
        async put(ossPath, data) {
            return await aliyunOSSClient.put(ossPath, Buffer.from(data));
        }
    },

    tencentAI: {
        get tencentAsrClientConfigured() {
            return !!tencentAsrClient;
        },
        configTencentAsrClient(secretId, secretKey) {
            tencentAsrClient = new AsrClient({
                credential: {
                    secretId,
                    secretKey,
                },
                region: "ap-guangzhou",
                profile: {
                    httpProfile: {
                        endpoint: "asr.tencentcloudapi.com",
                    },
                },
            });
        },
        async createRecognizeTask(params) {
            return await tencentAsrClient.CreateRecTask(params);
        },
        async describeRecognizeTaskStatus(params) {
            return await tencentAsrClient.DescribeTaskStatus(params);
        },

        get tencentTtsClientConfigured() {
            return !!tencentTtsClient;
        },
        configTencentTtsClient(secretId, secretKey) {
            tencentTtsClient = new TtsClient({
                credential: {
                    secretId,
                    secretKey,
                },
                region: "",
                profile: {
                    httpProfile: {
                        endpoint: "tts.tencentcloudapi.com",
                    },
                },
            })
        },
        async createTtsTask(params) {
            return await tencentTtsClient.CreateTtsTask(params);
        },
        async describeTtsTaskStatus(params) {
            return await tencentTtsClient.DescribeTtsTaskStatus(params);
        }
    },

    tencentCos: {
        get tencentCosClientConfigured() {
            return !!tencentCosClient;
        },

        configTencentCosClient(SecretId, SecretKey) {
            tencentCosClient = new COS({
                SecretId,
                SecretKey
            });
        },

        putObject(localFilePath, cosKey, Bucket, Region, progressCallback) {
            return new Promise((resolve, reject) => {
                tencentCosClient.putObject({
                    Bucket,
                    Region,
                    Key: cosKey,
                    StorageClass: 'STANDARD',
                    Body: fs.createReadStream(localFilePath),
                    onProgress: progressCallback
                }, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        }
    }
});