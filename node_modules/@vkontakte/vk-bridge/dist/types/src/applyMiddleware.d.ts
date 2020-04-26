import { VKBridge } from './types/bridge';
import { Middleware } from './types/middleware';
/**
 * Creates the VK Bridge enhancer that applies middleware to the `send`
 * method. This is handy for a variety of task such as logging every sent
 * event.
 *
 * @param middlewares The middleware chain to be applied.
 * @returns The VK Bridge enhancer applying the middleware.
 */
export declare function applyMiddleware(...middlewares: Array<Middleware | undefined | null>): (bridge: VKBridge) => VKBridge;
