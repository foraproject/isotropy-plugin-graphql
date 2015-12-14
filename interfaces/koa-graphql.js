type ArgumentType = {
    schema: Object,
    graphiql: boolean
}

declare module "koa-graphql" {
    declare function exports (arg: ArgumentType) : Function
}
