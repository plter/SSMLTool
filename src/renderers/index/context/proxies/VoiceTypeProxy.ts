import BaseProxy from "./BaseProxy";
import IAppContext from "../../providers/IAppContext";
import ProviderNames from "../../providers/ProviderNames";
import {reactive} from "vue";

export interface IVoiceType {
    value: number;
    label: string;
}

export default class VoiceTypeProxy extends BaseProxy {

    private voiceTypes = reactive(new Array<IVoiceType>())

    constructor(context: IAppContext) {
        super(context);

        context.app.provide(ProviderNames.VOICE_TYPES, this.voiceTypes);

        this.voiceTypes.push(
            {value: 1001, label: "智瑜 - 情感女声 - 标准音色 - 中文"},
            {value: 1002, label: "智聆 - 通用女声 - 标准音色 - 中文"},
            {value: 1003, label: "智美 - 客服女声 - 标准音色 - 中文"},
            {value: 1004, label: "智云 - 通用男声 - 标准音色 - 中文"},
            {value: 1005, label: "智莉 - 通用女声 - 标准音色 - 中文"},
            {value: 1007, label: "智娜 - 客服女声 - 标准音色 - 中文"},
            {value: 1008, label: "智琪 - 客服女声 - 标准音色 - 中文"},
            {value: 1009, label: "智芸 - 知性女声 - 标准音色 - 中文"},
            {value: 1010, label: "智华 - 通用男声 - 标准音色 - 中文"},
            {value: 1017, label: "智蓉 - 情感女声 - 标准音色 - 中文"},
            {value: 1018, label: "智靖 - 情感男声 - 标准音色 - 中文"},
            {value: 1050, label: "WeJack - 英文男声 - 标准音色 - 英文"},
            {value: 1051, label: "WeRose - 英文女声 - 标准音色 - 英文"},
            {value: 10510000, label: "智逍遥 - 阅读男声 - 标准音色 - 中文"},
            {value: 100510000, label: "智逍遥 - 阅读男声 - 精品音色 - 中文"},
            {value: 101001, label: "智瑜 - 情感女声 - 精品音色 - 中文"},
            {value: 101002, label: "智聆 - 通用女声 - 精品音色 - 中文"},
            {value: 101003, label: "智美 - 客服女声 - 精品音色 - 中文"},
            {value: 101004, label: "智云 - 通用男声 - 精品音色 - 中文"},
            {value: 101005, label: "智莉 - 通用女声 - 精品音色 - 中文"},
            {value: 101006, label: "智言 - 助手女声 - 精品音色 - 中文"},
            {value: 101007, label: "智娜 - 客服女声 - 精品音色 - 中文"},
            {value: 101008, label: "智琪 - 客服女声 - 精品音色 - 中文"},
            {value: 101009, label: "智芸 - 知性女声 - 精品音色 - 中文"},
            {value: 101010, label: "智华 - 通用男声 - 精品音色 - 中文"},
            {value: 101011, label: "智燕 - 新闻女声 - 精品音色 - 中文"},
            {value: 101012, label: "智丹 - 新闻女声 - 精品音色 - 中文"},
            {value: 101013, label: "智辉 - 新闻男声 - 精品音色 - 中文"},
            {value: 101014, label: "智宁 - 新闻男声 - 精品音色 - 中文"},
            {value: 101015, label: "智萌 - 男童声 - 精品音色 - 中文"},
            {value: 101016, label: "智甜 - 女童声 - 精品音色 - 中文"},
            {value: 101017, label: "智蓉 - 情感女声 - 精品音色 - 中文"},
            {value: 101018, label: "智靖 - 情感男声 - 精品音色 - 中文"},
            {value: 101019, label: "智彤 - 粤语女声 - 精品音色 - 中文"},
            {value: 101020, label: "智刚 - 新闻男声 - 精品音色 - 中文"},
            {value: 101021, label: "智瑞 - 新闻男声 - 精品音色 - 中文"},
            {value: 101022, label: "智虹 - 新闻女声 - 精品音色 - 中文"},
            {value: 101023, label: "智萱 - 聊天女声 - 精品音色 - 中文"},
            {value: 101024, label: "智皓 - 聊天男声 - 精品音色 - 中文"},
            {value: 101025, label: "智薇 - 聊天女声 - 精品音色 - 中文"},
            {value: 101026, label: "智希 - 通用女声 - 精品音色 - 中文"},
            {value: 101027, label: "智梅 - 通用女声 - 精品音色 - 中文"},
            {value: 101028, label: "智洁 - 通用女声 - 精品音色 - 中文"},
            {value: 101029, label: "智凯 - 通用男声 - 精品音色 - 中文"},
            {value: 101030, label: "智柯 - 通用男声 - 精品音色 - 中文"},
            {value: 101031, label: "智奎 - 通用男声 - 精品音色 - 中文"},
            {value: 101032, label: "智芳 - 通用女声 - 精品音色 - 中文"},
            {value: 101033, label: "智蓓 - 客服女声 - 精品音色 - 中文"},
            {value: 101034, label: "智莲 - 通用女声 - 精品音色 - 中文"},
            {value: 101035, label: "智依 - 通用女声 - 精品音色 - 中文"},
            {value: 101040, label: "智川 - 四川女声 - 精品音色 - 中文"},
            {value: 101050, label: "WeJack - 英文男声 - 精品音色 - 英文"},
            {value: 101051, label: "WeRose - 英文女声 - 精品音色 - 英文"},
            {value: 101052, label: "智味 - 通用男声 - 精品音色 - 中文"},
            {value: 101053, label: "智方 - 通用男声 - 精品音色 - 中文"},
            {value: 101054, label: "智友 - 通用男声 - 精品音色 - 中文"},
            {value: 101055, label: "智付 - 通用女声 - 精品音色 - 中文"},
            {value: 101056, label: "智林 - 东北男声 - 精品音色 - 中文"},
        );
    }

    dispose(): void {
    }
}