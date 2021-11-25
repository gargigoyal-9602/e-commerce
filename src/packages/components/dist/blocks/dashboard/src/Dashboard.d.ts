import DashboardController, { Props } from "./DashboardController";
export default class Dashboard extends DashboardController {
    constructor(props: Props);
    renderDashboardItems: ({ item }: any) => JSX.Element;
    render(): JSX.Element;
}
