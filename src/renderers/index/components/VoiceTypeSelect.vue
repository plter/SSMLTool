<script lang="ts" setup>
import {NSelect} from "naive-ui";
import {inject, onMounted, ref} from "vue";
import ProviderNames from "../providers/ProviderNames";
import IAppContext from "../providers/IAppContext";
import SaveSelectedVoiceTypeEvent from "../events/SaveSelectedVoiceTypeEvent";
import {IVoiceType} from "@/context/proxies/VoiceTypeProxy";
import GetSelectedVoiceTypeFromPreferencesEvent from "../events/GetSelectedVoiceTypeFromPreferencesEvent";

const voiceTypes: IVoiceType[] = inject(ProviderNames.VOICE_TYPES);
const context: IAppContext = inject(ProviderNames.APP_CONTEXT);
const selectedVoiceType = ref(null as number);

defineExpose({
  getSelectedVoiceType(): number {
    return selectedVoiceType.value;
  }
});


function valueUpdateHandler(voiceType: number) {
  context.dispatchEvent(new SaveSelectedVoiceTypeEvent(voiceType));
}

onMounted(async () => {
  let storedVoiceType: number = await new Promise(resolve => context.dispatchEvent(new GetSelectedVoiceTypeFromPreferencesEvent(resolve)));
  if (storedVoiceType) {
    selectedVoiceType.value = storedVoiceType;
  } else {
    selectedVoiceType.value = voiceTypes[0].value;
  }
});

</script>

<template>
  <n-select v-model:value="selectedVoiceType" :options="voiceTypes" @update:value="valueUpdateHandler"
            placeholder="请选择音色"></n-select>
</template>

<style scoped>

</style>