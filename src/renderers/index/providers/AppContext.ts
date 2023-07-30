import {App, inject} from "vue";
import ProviderNames from "./ProviderNames";
import IAppContext from "./IAppContext";
import ConsoleLogEvent, {IConsoleLogMessage} from "../events/ConsoleLogEvent";
import {IPreferences} from "../context/proxies/PreferencesProxy";
import GetPreferencesEvent from "../events/GetPreferencesEvent";
import {DialogApiInjection} from "naive-ui/es/dialog/src/DialogProvider";
import LaunchTaskEvent from "../events/LaunchTaskEvent";
import EventNames from "../events/EventNames";

export default class AppContext extends EventTarget implements IAppContext {

    private readonly _app: App<Element>;
    private readonly _vars = new Map<string, any>();

    static getCurrentAppContext(): AppContext {
        return inject(ProviderNames.APP_CONTEXT);
    }

    constructor(app: App<Element>) {
        super();

        this._app = app;
    }

    get app(): App<Element> {
        return this._app;
    }

    get vars(): Map<string, any> {
        return this._vars;
    }

    setVar(key: string, value: any) {
        this.vars.set(key, value);
    }

    getVar(key: string) {
        return this.vars.get(key);
    }

    getPreferences(): Promise<IPreferences> {
        return new Promise<IPreferences>(resolve => this.dispatchEvent(new GetPreferencesEvent(resolve)));
    }
}