import { createAction, handleActions } from 'redux-actions';
import { produce } from "immer";

import { setCookie, getCookie, deleteCookie } from '../../shared/Cookie';

// auth 가져오기
import { auth } from "../../shared/firebase";
import firebase from "firebase/compat/app";

// 액션 
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// 액션 생성 함수
// const logIn = createAction(LOG_IN, (user) => ({user}));
const logOut = createAction(LOG_OUT, (user) => ({user}));
const getUser = createAction(GET_USER, (user) => ({user}));
const setUser = createAction(SET_USER, (user) => ({user}));


// initialState
const initialState = {
    user: null,
    is_login: false,
}

// 미들웨어 액션
const loginAction = (user) => {
    return function (dispatch, getState, {history}) {
        dispatch(setUser(user));
        history.push('/');
    }
}

// 회원가입
const signupFB = (id, pwd, user_name) => {
    return function (dispatch, getState, {history}) {

        auth
        .createUserWithEmailAndPassword(id, pwd)
        .then((user) => {
            console.log("유저: ",user);
            auth.currentUser.updateProfile({
                displayName: user_name,
            }).then(()=>{
                dispatch(setUser({user_name: user_name, id: id, user_profile: 'https://pbs.twimg.com/media/C8Y79mAVYAAdWOS.jpg'}));
                history.push('/');
            }).catch((error) => {
                console.log(error);
            });

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
    
    }
}

// 로그인
const loginFB = (id, pwd) => {
    return function (dispatch, getState, {history}) {

        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then((res) => {
            auth
              .signInWithEmailAndPassword(id, pwd)
              .then((user) => {     
                dispatch(
                  setUser({
                    user_name: user.user.multiFactor.user.displayName,
                    id: id,
                    user_profile: "https://pbs.twimg.com/media/C8Y79mAVYAAdWOS.jpg",
                    uid: user.user.multiFactor.user.uid,
                  })
                );
                history.push("/");
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
              });
          });
    };
};

// 로그인체크
// 로그인 유지할 때 사용한다. 파이어베이스를 통해 로그인 한 상태가 맞나 확인.
// 맞다면 유저 정보를 가져다가 넣어준다.
// App.js에서 사용한다.
const loginCheckFB = () => {
    return function (dispatch, getState, {history}) {
        auth.onAuthStateChanged((user) => {
            if(user){
                dispatch(
                  setUser({
                    user_name: user.displayName,
                    user_profile: "",
                    id: user.email,
                    uid: user.uid,
                  })
                );
              }else{
                dispatch(logOut());
              }
        })
    };
};

// 로그아웃
const logoutFB = () => {
    return function (dispatch, getState, {history}) {
        auth.signOut().then(() => {
            dispatch(logOut());
            //replace는 뒤로가기해도 원래 페이지가 안 나옴.
            history.replace('/');
        })

    };
};



// 리듀서
export default handleActions({
    [SET_USER]: (state, action) => produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
    }),
    [LOG_OUT]: (state, action) => produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
    }), 
    [GET_USER]: (state, action) => produce(state, (draft) => {

    })
    
},initialState);

// actionCreators 내보내기
const actionCreators = {
    logOut,
    getUser,
    loginAction,
    signupFB,
    loginCheckFB,
    logoutFB,
    loginFB,
};

export { actionCreators };

