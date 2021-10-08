import { createAction, handleActions } from 'redux-actions';
import {produce} from "immer";

// 파이어베이스 연결
import { firestore, storage } from '../../shared/firebase';

// moment 패키지는 날짜, 시간 객체를 편히 다루게 해준다.
// yarn add moment
import moment from "moment";

import { actionCreators as imageActions } from './image';

// 액션 타입
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const ADD_LIKE ="ADD_LIKE";
const DELETE_LIKE ="DELETE_LIKE";

// 액션 생성 함수
const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id, post}));
const deletePost = createAction(DELETE_POST, (post_id) => ({post_id}));
const addLike = createAction(ADD_LIKE, (post_id, uid) => ({post_id, uid}));
const deleteLike = createAction(DELETE_LIKE, (post_id, uid) => ({post_id, uid}));

// initialState
const initialState = {
    list: []
};

// initialPost
const initialPost = {
    image_url: "https://pbs.twimg.com/media/E_uPJtnVEAIQleT.jpg",
    contents: "",
    comment_cnt: 0,
    like_cnt: [],
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

            //입력날짜 순서대로 정렬
            // 최근에 올린 게시물이 위에 있도록!
            const result = post_list.sort(function (a, b) {
                let x = a.insert_dt.toLowerCase();
                let y = b.insert_dt.toLowerCase();
                if (x > y) {
                    return -1;
                }
                if (x < y) {
                    return 1;
                }
                return 0;
            });

            console.log("getPostFB의 포스트:", post_list);
            dispatch(setPost(result));
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
       
        // getState()로 store의 상태값에 접근할 수 있다.
        const _image = getState().image.preview;
        
        // 파일 이름은 유저의 id와 현재 시간을 밀리초로 넣어준다.
        const _upload = storage
            .ref(
                `images/${user_info.user_id}_${new Date().getTime()}`
            )
            .putString(_image, "data_url");

        // 게시글을 작성하기 전에 이미지를 먼저 업로드하고 성공했을 때만
        // firestore에 게시글 정보를 저장한다.
        _upload.then((snapshot) => {
            snapshot
                .ref
                .getDownloadURL()
                .then((url) => {
                    console.log(url);
                    dispatch(imageActions.uploadImage(url));
                    return url;
                })
                .then((url) => {
                    //return으로 넘겨준 값을 확인.
                    console.log(url);

                    postDB.add({...user_info, ..._post, image_url: url}).then((doc) => {
                        //아이디 추가!
                        let post = {user_info, ..._post, id:doc.id, image_url: url};
                        //리덕스에 넣어준다.
                        dispatch(addPost(post));
                        //메인화면으로 이동한다.
                        history.replace("/");
                        console.log("addPostFB에서 아이디 추가한 post: ", post);
                    }).catch((err) => {
                        window.alert('게시글 작성에 문제가 생겼습니다!')
                        console.log('게시글 작성 실패! ',err);
                    });
                });
        })
        .catch((err) => {
            window.alert('이미지 업로드에 실패하였습니다.');
            console.log('이미지 업로드 실패!');
        });
    };
};

// 게시글 수정
const editPostFB = (post_id = null, post ={}) => {
    return function (dispatch, getState, {history}){
        if(!post_id){
            console.log("게시물 정보가 없습니다!");
            return;
        }
        
        //사용자가 사진을 수정하지 않았는지 확인
        const _image = getState().image.preview;

        const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
        const _post = getState().post.list[_post_idx];
        console.log(_post);
        console.log("수정했다고!!!!");
        console.log("가져온포스트:", post);

        const postDB = firestore.collection("post");

        // 이미지 수정 안 했을 때
        if(_image === _post.image_url){
            postDB.doc(post_id).update(post).then(doc => {
                dispatch(editPost(post.id, {...post}));
                history.replace('/');
            })
            return;
        }else{
        // 이미지 수정 했을 때 
            const user_id = getState().user.user.uid;
            // addPostFB에서 작성해 놓은 걸 가져옴!
            // 파일 이름은 유저의 id와 현재 시간을 밀리초로 넣어준다.
            const _upload = storage
            .ref(
                `images/${user_id}_${new Date().getTime()}`
            )
            .putString(_image, "data_url");

            // 게시글을 작성하기 전에 이미지를 먼저 업로드하고 성공했을 때만
            // firestore에 게시글 정보를 저장한다.
            _upload.then((snapshot) => {
                snapshot
                    .ref
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url);
                        dispatch(imageActions.uploadImage(url));
                        return url;
                    })
                    .then((url) => {
                        postDB.doc(post_id).update({...post, image_url: url}).then(doc => {
                            dispatch(editPost(post.id, {...post, image_url: url}));
                            history.replace('/');
                        })
                    });
            })
            .catch((err) => {
                window.alert('이미지 업로드에 실패하였습니다.');
                console.log('이미지 업로드 실패!');
            });
        }
    };
};
// 게시글 삭제
const deletePostFB = (post_id = null) => {
    return function (dispatch, getState, {history}) {
        if(!post_id){
            console.log("게시물 정보가 없습니다!");
            return;
        }

        const postDB = firestore.collection("post");
        postDB.doc(post_id).delete().then(() => {
            console.log("게시글 삭제 성공!");
            dispatch(deletePost(post_id));
            history.replace('/');
        })
    };
};

//좋아요 추가하기
const addLikeFB = (post_id = null) => {
    return function (dispatch, getState, {history}){
        if(!post_id){
            console.log("게시물 정보가 없습니다!");
            return;
        }

        // "post" 컬렉션의 데이터 가져옴
        const postDB = firestore.collection("post");
        // 리덕스에 있는 유저 정보 가져옴
        const user = getState().user.user;
        // 유저 아이디
        const user_id = user.uid;

        // 리덕스에 있는 게시글 데이터 중에서 좋아요를 누른 게시물을 찾음.
        const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
        const _post = getState().post.list[_post_idx];
        // 좋아요 누른 게시글의 현재 좋아요 데이터.
        let result = _post.like_cnt;
        console.log("아이디: ",user_id);
        console.log("좋아요 데이터: ",result);

        // 좋아요 데이터는 배열 형태로 좋아요를 누른 유저의 아이디를 담고 있음.
        // 좋아요 데이터 중에서 현재 유저 아이디와 동일한 아이디가 있는지 확인.
        let idx = result.findIndex((id) => id === user_id);
        console.log("인덱스: ",idx);
        // 좋아요 데이터에 유저 아이디가 없다면 좋아요 데이터에 현재 유저 아이디를 추가.
        // 이미 좋아요 데이터에 유저 아이디가 있다면 종료.
        if(idx === -1){
            result = [...result, user_id];
        }else{
            return;
        }

        // "post" 컬렉션의 해당 게시글 데이터에 좋아요 데이터를 업데이트 함.
        postDB.doc(post_id).update({
            like_cnt: result
        }).then((doc) => {
            //  성공적으로 업데이트 되었다면 
            // 리덕스 데이터에도 업데이트 함.
            dispatch(addLike(post_id, user_id));
        })
    };
};
//좋아요 삭제하기
const deleteLikeFB = (post_id = null) => {
    return function (dispatch, getState, {history}){
        if(!post_id){
            console.log("게시물 정보가 없습니다!");
            return;
        }

        // "post" 컬렉션의 데이터 가져옴
        const postDB = firestore.collection("post");
        // 리덕스에 있는 유저 정보 가져옴
        const user = getState().user.user;
        // 유저 아이디
        const user_id = user.uid;

        const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
        const _post = getState().post.list[_post_idx];
        const _like_cnt = _post.like_cnt;

        // 좋아요 데이터의 길이가 0이라면 종료.
        // 좋아요를 누른 사람이 아무도 없다는 뜻.
        // 좋아요를 취소할 것도 없다는 뜻.
        if(_like_cnt.length === 0){
            return;
        }

        // 좋아요 데이터 중에서 현재 유저 아이디와 같은 아이디가 있으면 삭제한다.
        const result = _like_cnt.filter((like, idx) => {
            return like !== user_id;
        })

        // "post" 컬렉션의 해당 게시글 데이터에 좋아요 데이터를 업데이트 함.
        postDB.doc(post_id).update({
            like_cnt: result
        }).then((doc) => {
            //  성공적으로 업데이트 되었다면 
            // 리덕스 데이터에도 업데이트 함.
            dispatch(deleteLike(post_id, user_id));
        })
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
        [EDIT_POST]: (state, action) => produce(state, (draft) => {
            //리스트의 몇 번재를 고쳐야 되는지 알아야한다.
            //findIndex는 배열에서 조건에 맞는 아이템의 인덱스를 반환해준다.
            let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

            draft.list[idx] = {...draft.list[idx], ...action.payload.post};
        }),
        [DELETE_POST]: (state, action) => produce(state, (draft) => {
            draft.list.filter((p, idx) => {
                return p.id !== action.payload.post_id;
            })
        }),
        [ADD_LIKE]: (state, action) => produce(state, (draft) => {
            // 리덕스에 있는 게시글 데이터 중에서 현재 액션이 일어난 게시글을 찾음.
            let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
            // 해당 게시글의 좋아요 데이터
            let like = draft.list[idx].like_cnt;
            // 만약 좋아요 데이터에 유저아이디가 없다면 유저아이디를 추가한다.
            if(like.findIndex((id) => id === action.payload.uid) === -1){
                draft.list[idx].like_cnt.push(action.payload.uid);
            }
        }),
        [DELETE_LIKE]: (state, action) => produce(state, (draft) => {   
            let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
            let result = draft.list[idx].like_cnt.filter((id)=>{
                return id !== action.payload.uid;
            }) 
            draft.list[idx].like_cnt = result;
        }),
    },initialState
);

const actionCreators = {
    setPost,
    addPost,
    editPost,
    deletePost,
    addLike,
    deleteLike,
    getPostFB,
    addPostFB,
    editPostFB,
    deletePostFB,
    addLikeFB,
    deleteLikeFB,
};

export {actionCreators};
