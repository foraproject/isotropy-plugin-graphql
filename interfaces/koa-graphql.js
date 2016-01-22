declare module "koa-graphql" {
  declare type KoaGraphqlArgumentType = {
    schema: Object,
    graphiql: boolean
  }
  declare function exports (arg: KoaGraphqlArgumentType) : Function
}
