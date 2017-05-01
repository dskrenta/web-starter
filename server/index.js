const Koa = require('koa');
const Router = require('koa-router');
const graphqlHTTP = require('koa-graphql');
const { buildSchema } = require('graphql');
const crypto = require('crypto');

const app = new Koa();
const router = new Router();

class TodoItem {
  constructor(id, content, created) {
    this.id = id;
    this.content = content;
    this.created = created;
  }
}

function generateID() {
  return crypto.randomBytes(10).toString('hex');
}

const fakeDB = [
  new TodoItem(generateID(), 'Hello, todo!', new Date()),
  new TodoItem(generateID(), 'Hang up laundry.', new Date()),
  new TodoItem(generateID(), 'Order Chinese food from Door Dash.', new Date())
];

const schema = buildSchema(`
  type TodoItem {
    id: String!
    content: String!
    created: String!
  }

  type Mutation {
    addTodoItem(content: String): TodoItem
  }

  type Query {
    getTodoItems: [TodoItem]
  }
`);

const root = {
  getTodoItems: () => {
    return fakeDB;
  },
  addTodoItem: ({content}) => {
    const newItem = new TodoItem(generateID(), content, new Date());
    fakeDB.push(newItem);
    return newItem;
  }
};

router.all('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
