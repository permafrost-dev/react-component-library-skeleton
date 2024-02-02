export type TDeferredPromise<T> = {
    promise: Promise<T>;
    resolve: (resolve?: T) => void;
    reject: (error?: Error | any) => void;
};

/**
 * @name deferredPromise
 * @return TDeferredPromise
 */
export function deferredPromise<T>(registry: any): TDeferredPromise<T> {
    const deferred: TDeferredPromise<T> | any = {};

    const newDeferred = Object.assign({}, deferred);

    newDeferred.promise = new Promise((resolve, reject) => {
        newDeferred.resolve = resolve;
        newDeferred.reject = reject;
    });

    registry.push(newDeferred);

    return newDeferred;
}

export const onDocumentReady = async <T>(_passThrough?: PromiseLike<T> | T) => {
    if (document.readyState !== 'interactive') {
        return new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', () => resolve(_passThrough));
        });
    }
    return Promise.resolve(_passThrough);
};

export function debounce(func, wait) {
    let timeout;

    return function (...a) {
        const args = a;

        const later = () => {
            timeout = null;

            // @ts-ignore
            func.apply(this, args);
        };

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);
    };
}

export function classNames(...classes: unknown[]): string {
    return classes.filter(Boolean).join(' ');
}
