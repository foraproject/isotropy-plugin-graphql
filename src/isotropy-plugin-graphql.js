/* @flow */
import Router from "isotropy-router";
import graphqlHTTP from 'isotropy-graphql';
import type { IncomingMessage, ServerResponse } from "./flow/http"
import type { HttpMethodRouteOptionsType, HttpMethodRouteArgsType } from "isotropy-router";

export type GraphqlAppType = {
  type: string,
  schema: Object,
  path: string,
  onError?: (req: IncomingMessage, res: ServerResponse, e: any) => void,
  graphiql?: boolean
}

export type GraphqlConfigType = {}

export type getDefaultsParamsType = {
  type: string,
  schema: Object,
  path?: string,
  onError?: (req: IncomingMessage, res: ServerResponse, e: any) => void,
  graphiql?: boolean
}

const getDefaults = function(val: getDefaultsParamsType) : GraphqlAppType {
  return {
    type: val.type,
    schema: val.schema,
    path: val.path || "/graphql",
    onError: val.onError,
    graphiql: val.graphiql
  };
};


const setup = async function(appConfig: GraphqlAppType, router: Router, config: Object) : Promise {
    const graphqlFn = graphqlHTTP({
      schema: appConfig.schema,
      graphiql: appConfig.graphiql
    });

  router.when(() => true, async (req, res) => {
    await graphqlFn(req, res);
  });
};


export default {
  name: "graphql",
  getDefaults,
  setup
};
