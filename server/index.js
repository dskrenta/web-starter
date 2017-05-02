const Koa = require('koa');
const Router = require('koa-router');
const graphqlHTTP = require('koa-graphql');
const { buildSchema } = require('graphql');
const crypto = require('crypto');

const app = new Koa();
const router = new Router();

class FakeDB {
  constructor() {
    this.store = {};
  }

  addItem(content) {
    const newItem = new TodoItem(content);
    this.store[newItem.id] = newItem;
    return newItem;
  }

  deleteItem(id) {
    delete this.store[id];
  }

  updateItem(id, content) {
    this.store[id].content = content;
  }

  getItems() {
    return Object.values(this.store);
  }
}

class TodoItem {
  static generateID() {
    return crypto.randomBytes(10).toString('hex');
  }

  static generateTimestamp() {
    return new Date();
  }

  constructor(content) {
    this.id = TodoItem.generateID();
    this.created = TodoItem.generateTimestamp();
    this.content = content;
  }
}

const fakeDB = new FakeDB();
['Take out the trash', 'Pick up the dry cleaning', 'Do homework']
  .map(content => fakeDB.addItem(content));

const schema = buildSchema(`
  type TodoItem {
    id: ID!
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
    return fakeDB.getItems();
  },
  addTodoItem: ({content}) => {
    const newItem = fakeDB.addItem(content);
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
