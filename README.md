# web-starter
Web application boilerplate

## Explore the API on GraphiQL

The GraphQL API lives on `http://localhost:3000`.

```
query getItems {
  getTodoItems {
    id
    content
    created
  }
}

mutation addItem {
	addTodoItem(content: "Even another todo item") {
    id
    content
    created
  }
}

mutation removeItem {
  removeTodoItem(id: "7652e25757cc414f3d9c")
}

mutation updateItem {
  updateTodoItem(content: "updated item", id: "6530cc87b4391a602cc3") {
    id
    created
    content
  }
}
```
