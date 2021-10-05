import React from "react";
import {Route, BrowserRouter} from "react-router-dom";

//컴포넌트
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PostList from '../pages/PostList';
import {Grid} from '../elements';


function App() {
  return (
    <React.Fragment>
      <Grid bg="#F9FBE7">
        <BrowserRouter>
          <Route exact path="/" component={PostList}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
        </BrowserRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
