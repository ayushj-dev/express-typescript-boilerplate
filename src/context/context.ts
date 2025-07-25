import { logger } from '@/utils/logger.util';
import { AsyncLocalStorage } from 'async_hooks';

export interface RequestContext {
  requestId: string;
  userId?: string;
  userRole?: string;
}

export const asyncLocalStorage = new AsyncLocalStorage<RequestContext>();

/**
 * Gets a specific value from the request context.
 */
export function getContext<K extends keyof RequestContext>(key: K): RequestContext[K] | undefined {
  const store = asyncLocalStorage.getStore();
  return store ? store[key] : undefined;
}

/**
 * Sets or updates a value in the current request context.
 * This should typically be used within middleware or route handlers
 * after the context has been initialized by the Request Middleware.
 */
export function setContext<K extends keyof RequestContext>(key: K, value: RequestContext[K]): void {
  const store = asyncLocalStorage.getStore();
  if (store) {
    store[key] = value;
  } else {
    logger.warn(`Attempted to set context key '${String(key)}' outside of an active request context.`);
  }
}
