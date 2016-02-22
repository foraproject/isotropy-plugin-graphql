/* @flow */
import Router from "isotropy-router";
import graphqlHTTP from 'isotropy-graphql';

import type { HttpMethodRouteOptionsType, HttpMethodRouteArgsType } from "isotropy-router";

export type GraphqlAppType = {
  schema: Object,
  type: string,
  path: string,
  graphiql?: boolean
}

export type GraphqlConfigType = {
}

const getDefaults = function(val: Object = {}) : GraphqlAppType {
  return {
    type: val.type || "graphql",
    schema: val.schema,
    path: val.path || "/graphql"
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
  getDefaults,
  setup
};
