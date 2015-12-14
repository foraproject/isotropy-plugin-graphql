import type { KoaMiddlewareType } from "koa";

declare module "koa-convert" {
    declare function exports (fn: Function) : KoaMiddlewareType
}
