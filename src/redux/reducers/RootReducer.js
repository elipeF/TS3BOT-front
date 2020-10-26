import { combineReducers } from "redux";
import ChannelGroupsReducer from "./ChannelGroupsReducer";
import ConfigReducer from "./ConfigReducer";
import NavigationReducer from "./NavigationReducer";
import NotificationsReducer from "./NotificationsReducer";
import ServerGroupsReducer from "./ServerGroupsReducer";
const RootReducer = combineReducers({
    navigation: NavigationReducer,
    config: ConfigReducer,
    servergroups: ServerGroupsReducer,
    channelgroups: ChannelGroupsReducer,
    notification: NotificationsReducer
});

export default RootReducer;