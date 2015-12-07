/* @flow */
import { KoaContextType, KoaHandlerType } from "koa";
import type KoaAppType from "koa";
import graphqlHTTP from 'koa-graphql';
import convert from "koa-convert";

export type GraphqlAppType = {
    schema: Object,
    type: string,
    path: string
}

export type GraphqlConfigType = {
    graphiql: boolean
}

const getDefaultValues = function(val: Object = {}) : GraphqlAppType {
    return {
        type: val.type || "graphql",
        schema: val.schema,
        path: val.path || "/graphql"
    };
};


const setup = async function(app: GraphqlAppType, server: KoaAppType, config: GraphqlConfigType) : Promise {
    const graphiql = config.graphiql;
    server.use(
        convert(graphqlHTTP({
            schema: app.schema,
            graphiql
        }))
    );
};


export default {
    getDefaultValues,
    setup
};
