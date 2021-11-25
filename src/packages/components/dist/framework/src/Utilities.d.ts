export declare function getOS(): string;
export declare const scaleRatio: number;
export declare const deviceWidth: number;
export declare const deviceHeight: number;
export declare const deviceAspectRatio: number;
export declare const scaledSize: (size: any) => number;
export declare const widthFromPercentage: (per: number) => number;
export declare const heightFromPercentage: (per: number) => number;
export declare const calculateDelta: () => {
    latitudeDelta: number;
    longitudeDelta: number;
};
/**
 * CHECKS IF THE PASSED VALUE IS EMPTY STRING OR NOT
 * RETURN `true` IF STRING IS EMPTY ELSE RETURN `false`
 */
export declare function isEmpty(val: any): boolean;
/**
 * CHECKS IF THE PASSED VALUE IS VALID EMAIL
 * RETURN `true` IF VALID ELSE RETURN `false`
 */
export declare function isEmail(fieldName: string, val: string): {
    status: boolean;
    message: string;
};
export declare function phoneValidate(fieldName: string, value: any): {
    status: boolean;
    message: string;
};
export declare function confirmPasswordValidate(fieldName: string, confirmPassword: string, fieldName2?: string, password?: string): {
    status: boolean;
    message: string;
};
export declare function passwordValidate(fieldName: string, password?: string): {
    status: boolean;
    message: string;
};
export declare function requireValidate(fieldName: string, value: any, isBool?: boolean): {
    status: boolean;
    message: string;
};
export declare const customAlert: (title?: string, message?: string, okOnPress?: Function | any, cancelOnPress?: Function | any) => void;
export declare function setStorageData(key: string, data: any): Promise<void>;
export declare function getStorageData(key: string, parseToJson?: boolean): Promise<any>;
export declare function removeStorageData(key: string): Promise<void>;
export declare function logoutUser(logoutType?: string): Promise<void>;
export declare function fetchImageUrl(url: any): Promise<string>;
export declare function setNavigator(nav: any): void;
export declare function getActiveRouteName(state: any): any;
export declare function resetTo(routeName: any, params?: object): void;
/** Navigation Services Helper Ends*/ 
