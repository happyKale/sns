import React from "react";
import "./style.css";
import {Switch, Route, BrowserRouter} from "react-router-dom";

import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

//컴포넌트
import Header from "../components/Header";
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PostList from '../pages/PostList';
import PostWrite from '../pages/PostWrite';
import {Grid} from '../elements';


function App() {
  return (
    <React.Fragment>
      {/* <Grid bg="#F3F5F9"> */}
        <Header width="100%"/>
        <ConnectedRouter history={history}>
          <Route exact path="/" component={PostList}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/write" component={PostWrite}/>
        </ConnectedRouter>
      {/* </Grid> */}
    </React.Fragment>
  );
}

export default App;
