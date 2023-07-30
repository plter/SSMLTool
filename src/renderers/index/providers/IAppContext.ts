import {App} from "vue";
import ConsoleLogEvent, {IConsoleLogMessage} from "../events/ConsoleLogEvent";
import {IPreferences} from "../context/proxies/PreferencesProxy";
import {DialogApiInjection} from "naive-ui/es/dialog/src/DialogProvider";

export default interface IAppContext {
    addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): any;

    dispatchEvent(event: Event): boolean;

    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): any;

    get vars(): Map<string, any>;

    setVar(key: string, value: any): any;

    getVar(key: string): any;

    get app(): App<Element>;

    getPreferences(): Promise<IPreferences>;
}