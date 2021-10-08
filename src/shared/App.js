import React from "react";
import "./style.css";
import {Route} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

//컴포넌트
import Header from "../components/Header";
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PostList from '../pages/PostList';
import PostWrite from '../pages/PostWrite';
import PostDetail from '../pages/PostDetail';
import {Grid} from '../elements';

import {useDispatch} from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user";

import {apiKey} from "./firebase";

function App() {

  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key)? true : false;

  React.useEffect(() => {
    if(is_session){
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <React.Fragment>
      {/* <Grid bg="#F3F5F9"> */}
        <Header width="100%"/>
        <ConnectedRouter history={history}>
          <Route exact path="/" component={PostList}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/write" component={PostWrite}/>
          <Route exact path="/write/:id" component={PostWrite}/>
          <Route exact path="/post/" component={PostDetail}/>
          <Route exact path="/post/:id" component={PostDetail}/>
        </ConnectedRouter>
      {/* </Grid> */}
    </React.Fragment>
  );
}

export default App;
