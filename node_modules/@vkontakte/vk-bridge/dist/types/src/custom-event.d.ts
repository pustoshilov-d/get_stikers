/**
 * Creates the CustomEvent polyfill. VK apps use the CustomEvent for transfer
 * data.
 */
export declare function createCustomEventPolyfill(): {
    <T>(typeArg: string, eventInitDict?: CustomEventInit<T> | undefined): CustomEvent<T>;
    prototype: Event;
};
