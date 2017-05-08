import React, { Component } from 'react';

import {
  QueryRenderer,
  graphql,
} from 'react-relay';

import environment from './createRelayEnvironment';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Todo App</h2>

        <QueryRenderer
          environment={environment}

          query={graphql`
            query AppGetItemsQuery {
              getTodoItems {
                id
                content
                created
              }
            }
          `}

          render={({ error, props }) => {
            if (error) {
              return <div>{error.message}</div>;
            } else if (props) {
              return <TodoItem todoItems={props.getTodoItems} />
            }
            return <div>Loading</div>;
          }}
        />
      </div>
    );
  }
}

const TodoItem = ({ todoItems }) => (
  <div>
    {todoItems.map(item => (
      <p key={item.id}>{item.content}, {item.created}</p>
    ))}
  </div>
);

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/hello" component={App} />
    </div>
  </Router>
);

export default Routes;
