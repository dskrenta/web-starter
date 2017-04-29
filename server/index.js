const Koa = require('koa');
const Router = require('koa-router');
const graphqlHTTP = require('koa-graphql');
const { buildSchema } = require('graphql');

const app = new Koa();
const router = new Router();

const schema = buildSchema(`
  type Query {
    hello: String,
    stuff: String
  }
`);

const root = {
  hello: () => {
    return 'Hello world!';
  },
  stuff: () => {
    return 'more stuff and even more!';
  }
};

router.all('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
