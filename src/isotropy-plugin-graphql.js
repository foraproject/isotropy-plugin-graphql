/* @flow */
import type { KoaType, KoaContextType, KoaHandlerType } from "./flow/koa-types";
import graphqlHTTP from 'koa-graphql';
import convert from "koa-convert";

export type GraphqlAppType = {
  schema: Object,
  type: string,
  path: string
}

export type GraphqlConfigType = {
  graphiql?: boolean
}

const getDefaults = function(val: Object = {}) : GraphqlAppType {
  return {
    type: val.type || "graphql",
    schema: val.schema,
    path: val.path || "/graphql"
  };
};


const setup = async function(app: GraphqlAppType, server: KoaType, config: GraphqlConfigType) : Promise {
  const graphiql = (typeof config.graphiql !== "undefined" && config.graphiql !== null) ? config.graphiql : false;
  server.use(
    convert(graphqlHTTP({
      schema: app.schema,
      graphiql
    }))
  );
};


export default {
  getDefaults,
  setup
};
