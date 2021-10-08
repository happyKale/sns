import { createAction, handleActions } from 'redux-actions';
import {produce} from "immer";

// 파이어베이스 연결
import { firestore } from '../../shared/firebase';

// moment 패키지는 날짜, 시간 객체를 편히 다루게 해준다.
// yarn add moment
import moment from "moment";

// 액션 타입
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

// 액션 생성 함수
const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));

// initialState
const initialState = {
    list: []
};

// initialPost
const initialPost = {
    image_url: "https://pbs.twimg.com/media/E_uPJtnVEAIQleT.jpg",
    contents: "",
    comment_cnt: 0,
    like_cnt: 0,
    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    layout_type: "",
};

// 미들웨어 액션
// 데이터 베이스에 있는 게시글 정보를 가져온다.
const getPostFB = () => {
    return function (dispatch, getState, {history}){
        
        const postDB = firestore.collection("post");

        postDB.get().then((docs) => {
            let post_list = [];

            docs.forEach((doc) => {
                // DB에서 가져온 것과 우리가 Post 컴포넌트에서 쓰는 데이터 
                // 모양새가 다르기 때문에 모양을 맞춰줘야 한다.
                let _post = doc.data();
                let post = {
                    id: doc.id,
                    user_info: {
                        user_name: _post.user_name,
                        user_profile: _post.user_profile,
                        user_id: _post.user_id,
                    },
                    contents: _post.contents,
                    image_url: _post.image_url,
                    comment_cnt: _post.comment_cnt,
                    like_cnt: _post.like_cnt,
                    insert_dt: _post.insert_dt,
                    layout_type: _post.layout_type
                }
                post_list.push(post);
            })
            console.log("getPostFB의 포스트:", post_list);
            dispatch(setPost(post_list));
        })
    };
};

// 작성한 게시글을 저장한다.
const addPostFB = (contents = "", layout = "") => {
    return function (dispatch, getState, {history}){

        const postDB = firestore.collection("post");

        const _user = getState().user.user;
        const user_info = {
            user_name: _user.user_name,
            user_id: _user.uid,
            user_profile: _user.user_profile,
        };

        const _post = {
            ...initialPost,
            contents: contents,
            layout_type: layout,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss")
        };

        console.log("addPostFB의 _post: ",_post);

        postDB.add({...user_info, ..._post}).then((doc) => {
            //아이디 추가!
            let post = {user_info, ..._post, id:doc.id};
            //리덕스에 넣어준다.
            dispatch(addPost(post));
            //메인화면으로 이동한다.
            history.replace("/");
            console.log("addPostFB에서 아이디 추가한 post: ", post);
        }).catch((err) => {
            console.log('post 작성 실패! ',err);
        });

    };
};



// 리듀서
export default handleActions(
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload.post_list;
        }),
        [ADD_POST]: (state, action) => produce(state, (draft) => {
            //unshift는 배열 맨 앞에 데이터를 넣어준다.
            draft.list.unshift(action.payload.post);
        }),

    },initialState
);

const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB,
};

export {actionCreators};
