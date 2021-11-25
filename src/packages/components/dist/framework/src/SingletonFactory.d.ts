declare var SingletonFactory: {
    getRestBlockInstance: () => any;
    getSessionBlockInstance: () => any;
    getUserManagerInstance: () => any;
    getAuthManagerInstance: () => any;
};
export default SingletonFactory;
