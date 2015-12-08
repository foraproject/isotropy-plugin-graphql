import __polyfill from "babel-polyfill";
import should from 'should';
import http from "http";
import koa from "koa";
import querystring from "querystring";
import MySchema from "./my-schema";
import graphqlPlugin from "../isotropy-plugin-graphql";

describe("Isotropy React Plugin", () => {

    let defaultInstance: KoaAppType;

    const makeRequest = (host, port, path, method, headers, _postData, cb, onErrorCb) => {
        const postData = (typeof _postData === "string") ? _postData : querystring.stringify(_postData);
        const options = { host, port, path, method, headers };

        let result = "";
        const req = http.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(data) { result += data; });
            res.on('end', function() { cb(result); });
        });
        req.on('error', function(e) { onErrorCb(e); });
        req.write(postData);
        req.end();
    };


    before(function() {
        defaultInstance = new koa();
        defaultInstance.listen(8080);
    });


    it(`Should get default configuration values`, () => {
        const config = {};
        const completedConfig = graphqlPlugin.getDefaultValues(config);
        completedConfig.type.should.equal("graphql");
        completedConfig.path.should.equal("/graphql");
    });


    it(`Should respond to a GraphQL Query`, () => {
        const appConfig = { schema: MySchema };

        const options = {
            dir: __dirname
        };

        const promise = new Promise((resolve, reject) => {
            graphqlPlugin.setup(appConfig, defaultInstance, options).then(() => {
                const query = "query QueryRoot { greeting }";
                makeRequest(
                    "localhost",
                    8080,
                    "/graphql",
                    "POST",
                    { 'Content-Type': 'application/json' },
                    `{ "query": "query QueryRoot { greeting(id: 200)}" }`,
                    resolve,
                    reject
                );
            }, reject);
        });

        return promise.then((data) => {
            data.should.equal(`{"data":{"greeting":"Hello user 200"}}`);
        });
    });
});
