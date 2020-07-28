import React from 'react';
import asyncComponent from "../src/util/asyncComponent"
import { Route, Switch, Redirect } from 'react-router-dom'

const Index = asyncComponent(() => import("./pages/Index/Index"))
const Detail = asyncComponent(() => import("./pages/Detail/Detail"))
const Comment = asyncComponent(() => import("./pages/Comments/comments"))
const Collection = asyncComponent(() => import("./pages/Collections/Collection"))



function App() {
  return (
    <div>
      <Switch>
        <Route path="/index" component={Index}></Route>
        <Route path="/detail" component={Detail}></Route>
        <Route path="/comments/:id" component={Comment}></Route>
        <Route path="/collection" component={Collection}></Route>
          <Redirect to="/index"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
