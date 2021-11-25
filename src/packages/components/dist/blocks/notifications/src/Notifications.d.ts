import NotificationsController, { Props } from "./NotificationsController";
export default class Notifications extends NotificationsController {
    constructor(props: Props);
    _renderSearchResultsFooter: () => JSX.Element | null;
    renderNoNotificationsView: () => JSX.Element;
    onPressDeleteItem: () => void;
    getSwipeControl: (item: any) => JSX.Element;
    renderNotificationCell: (item: any, index: any) => JSX.Element;
    renderNotificationListView: () => JSX.Element;
    render(): JSX.Element;
}
