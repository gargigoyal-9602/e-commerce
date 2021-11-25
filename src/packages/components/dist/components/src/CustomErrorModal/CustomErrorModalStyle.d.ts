declare const styles: {
    container: {
        width: string;
        height: string;
        justifyContent: "center";
        alignItems: "center";
        zIndex: number;
        position: "absolute";
        backgroundColor: string;
    };
    modalContainer: {
        flex: number;
        justifyContent: "flex-end";
    };
    bottomView: {
        alignSelf: "flex-end";
        width: number;
        height: number;
        backgroundColor: string;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
        justifyContent: "center";
    };
    alertText: {
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
        color: string;
        width: number;
        marginLeft: number;
    };
    crossIcon: {
        width: number;
        height: number;
        position: "absolute";
        bottom: number;
        right: number;
    };
};
export default styles;
