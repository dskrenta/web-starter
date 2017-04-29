const Koa = require('koa');
const Router = require('koa-router');
const graphqlHTTP = require('koa-graphql');
const { buildSchema } = require('graphql');

const app = new Koa();
const router = new Router();

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => {
    return 'Hello world!';
  }
};

router.all('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.use(ctx => {
  ctx.body = 'Hello Koa';
});


app.listen(3000);
