/* @flow */
export type KoaType = {
    use: (middleware: KoaMiddlewareType) => void;
    middleware: Array<KoaMiddlewareType>;
}

export type KoaNextType = () => Promise

export type KoaContextType = {
    code: number;
    redirect: (url: string) => void;
    method: string;
    path: string;
    status: number;
}

export type KoaMiddlewareType = (context: KoaContextType, next: KoaNextType) => Promise

export type KoaHandlerType = () => Promise;