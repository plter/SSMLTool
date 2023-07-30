<script setup>
import {darkTheme, lightTheme, NConfigProvider, NMessageProvider, NDialogProvider} from "naive-ui";
import {ref} from "vue";
import SsmlTool from "./SsmlTool.vue"

const selectedTheme = ref(darkTheme);
</script>

<template>
  <n-config-provider :theme="selectedTheme" style="width: 100%;height: 100%;overflow: hidden;">
    <n-dialog-provider>
      <n-message-provider>
        <ssml-tool></ssml-tool>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style scoped>
</style>
