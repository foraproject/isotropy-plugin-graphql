declare module "koa-convert" {
    declare type KoaNextType = () => Promise;
    declare type KoaContextType = {
        code: number;
        redirect: (url: string) => void;
        method: string;
        path: string;
        status: number;
    }
    declare type KoaMiddlewareType = (context: KoaContextType, next: KoaNextType) => Promise
    declare function exports (fn: Function) : KoaMiddlewareType
}
