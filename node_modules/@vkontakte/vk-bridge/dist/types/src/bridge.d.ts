import { VKBridge } from './types/bridge';
/** Is the client side runtime environment */
export declare const IS_CLIENT_SIDE: boolean;
/** Is the runtime environment an Android app */
export declare const IS_ANDROID_WEBVIEW: boolean;
/** Is the runtime environment an iOS app */
export declare const IS_IOS_WEBVIEW: boolean;
/** Is the runtime environment a browser */
export declare const IS_WEB: boolean;
/** Is the runtime environment m.vk.com */
export declare const IS_MVK: boolean;
/** Is the runtime environment vk.com */
export declare const IS_DESKTOP_VK: boolean;
/** Type of subscribe event */
export declare const EVENT_TYPE: string;
/** Methods supported on the desktop */
export declare const DESKTOP_METHODS: string[];
/**
 * Creates a VK Bridge API that holds functions for interact with runtime
 * environment.
 *
 * @param version Version of the package
 */
export declare function createVKBridge(version: string): VKBridge;
