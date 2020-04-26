import './custom-event';
declare const bridge: import("./types/bridge").VKBridge;
export * from './types/data';
export * from './types/bridge';
export * from './types/middleware';
export * from './types/deprecated';
export { applyMiddleware } from './applyMiddleware';
export { bridge as default };
