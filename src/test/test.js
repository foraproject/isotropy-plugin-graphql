import __polyfill from "babel-polyfill";
import should from 'should';
import http from "http";
import querystring from "querystring";
import promisify from "nodefunc-promisify";
import Router from "isotropy-router";
import urlMiddleware from "isotropy-middleware-url";
import MySchema from "./my-schema";
import graphqlPlugin from "../isotropy-plugin-graphql";

describe("Isotropy React Plugin", () => {

  const makeRequest = (host, port, path, method, headers, _postData) => {
    return new Promise((resolve, reject) => {
      const postData = (typeof _postData === "string") ? _postData : querystring.stringify(_postData);
      const options = { host, port, path, method, headers };

      let result = "";
      const req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(data) { result += data; });
        res.on('end', function() { resolve({ result, res }); });
      });
      req.on('error', function(e) { reject(e); });
      req.write(postData);
      req.end();
    });
  };


  let server, router;

  before(async () => {
    server = http.createServer((req, res) => {
      urlMiddleware(req, res)
        .then(() => router.doRouting(req, res));
    });
    const listen = promisify(server.listen.bind(server));
    await listen(0);
  });

  beforeEach(() => {
    router = new Router();
  });


  it(`Should get default configuration values`, () => {
    const config = {};
    const completedConfig = graphqlPlugin.getDefaults(config);
    completedConfig.type.should.equal("graphql");
    completedConfig.path.should.equal("/graphql");
  });


  it(`Should respond to a GraphQL Query`, async () => {
    const appConfig = { schema: MySchema };
    const options = { dir: __dirname };

    await graphqlPlugin.setup(appConfig, router, options);
    const query = "query QueryRoot { greeting }";
    const data = await makeRequest(
      "localhost",
      server.address().port,
      "/graphql",
      "POST",
      { 'Content-Type': 'application/json' },
      `{ "query": "query QueryRoot { greeting(id: 200)}" }`,
    );
    data.result.should.equal(`{"data":{"greeting":"Hello user 200"}}`);
  });
});
