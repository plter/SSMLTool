import {createApp} from 'vue'
import MainApp from "./components/MainApp.vue"

import './styles/globals.css'
import ProviderNames from "@/providers/ProviderNames";
import AppContext from "@/providers/AppContext";
import EventNames from "@/events/EventNames";
import GenerateAudioHandler from "@/context/functions/GenerateAudioHandler";
import VoiceTypeProxy from "@/context/proxies/VoiceTypeProxy";
import AppContextVarKeys from "@/providers/AppContextVarKeys";
import PreferencesProxy from "@/context/proxies/PreferencesProxy";

const app = createApp(MainApp);
let appContext = new AppContext(app);

// Register proxies
appContext.setVar(AppContextVarKeys.VOICE_TYPE_PROXY, new VoiceTypeProxy(appContext));
appContext.setVar(AppContextVarKeys.PREFERENCES_PROXY, new PreferencesProxy(appContext));

appContext.addEventListener(EventNames.GENERATE_AUDIO, GenerateAudioHandler.bind(appContext));

app.provide(ProviderNames.APP_CONTEXT, appContext);

// Start the app
app.mount('#app');
