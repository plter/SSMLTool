import LaunchTaskEvent, {DoneCallback} from "./LaunchTaskEvent";
import {IPreferences} from "../context/proxies/PreferencesProxy";
import EventNames from "./EventNames";

export default class GetPreferencesEvent extends LaunchTaskEvent<any, IPreferences, any, any> {

    constructor(doneCallback: DoneCallback<IPreferences>) {
        super(EventNames.GET_PREFERENCES, undefined, doneCallback, undefined, undefined);
    }
}