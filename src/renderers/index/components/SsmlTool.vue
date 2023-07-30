<script lang="ts" setup>
import {NButton, NInput, NText} from "naive-ui";
import {Ref, ref} from "vue";
import AppContext from "../providers/AppContext";
import GenerateAudioEvent from "../events/GenerateAudioEvent";
import VoiceTypeSelect from "../components/VoiceTypeSelect.vue";

const ssmlInputValue = ref("");
const statusLabel = ref("");
const processRunning = ref(false);
const context = AppContext.getCurrentAppContext();
const voiceTypeSelect: Ref<VoiceTypeSelect> = ref(null);


async function btnGenerateAudioClicked() {
  if (!ssmlInputValue.value) {
    statusLabel.value = "请输入内容";
    return;
  }
  processRunning.value = true;
  statusLabel.value = "正在创建任务";

  try {
    /**
     * @type {DescribeTtsTaskStatusRespData}
     */
    let result = await new Promise((resolve, reject) => {
      context.dispatchEvent(new GenerateAudioEvent(ssmlInputValue.value, voiceTypeSelect.value.getSelectedVoiceType(), resolve, reject, queryTimes => {
        statusLabel.value = `第 ${queryTimes} 次查询结果`;
      }));
    });
    statusLabel.value = "完成";

    let link = document.createElement("a");
    link.download = `${Date.now()}.mp3`;
    link.href = result.ResultUrl;
    link.click();
  } catch (e) {
    statusLabel.value = "" + e;
  }

  processRunning.value = false;
}
</script>

<template>
  <div style="height: 100%;height:100%;display: flex;flex-direction: column;">
    <n-input type="textarea" v-model:value="ssmlInputValue" placeholder="输入纯文字或 SSML"
             style="width: 100%;flex: 1;"></n-input>
    <div style="height: 10px;"></div>
    <div style="display: flex;flex-direction: row;">
      <voice-type-select
          ref="voiceTypeSelect"
          style="flex: 1;"></voice-type-select>
      <div style="width: 10px;"></div>
      <n-button :disabled="processRunning" @click="btnGenerateAudioClicked">生成音频</n-button>
    </div>
    <div>
      <n-text>{{ statusLabel }}</n-text>
    </div>
  </div>
</template>

<style>

</style>