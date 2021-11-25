import { BlockComponent } from "../../framework/src/BlockComponent";
interface Props {
    navigation: any;
    id: string;
}
interface S {
}
interface SS {
}
declare class HomeScreen extends BlockComponent<Props, S, SS> {
    static instance: HomeScreen;
    constructor(props: Props);
    render(): JSX.Element;
}
export default HomeScreen;
