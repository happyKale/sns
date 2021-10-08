import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 이미지를 저장할 곳인 storage를 임포트!
import { storage } from '../../shared/firebase';

// 액션 타입
const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

// 액션 생성 함수
const uploading = createAction(UPLOADING, (uploading) => ({uploading}));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({image_url}));
const setPreview = createAction(SET_PREVIEW, (preview) => ({preview}));

// initial state
const initialState = {
    image_url: "http://via.placeholder.com/400x300",
    uploading: false,
    preview: null,
}

// 미들웨어 액션
const uploadImageFB = (image) => {
    return function (dispatch, getState, {history}) {

        // 업로드 되는중
        dispatch(uploading(true));

        const _upload = storage.ref(`images/${image.name}`).put(image);

        //업로드
        _upload.then((snapshot) => {
            console.log("uploadImageFB의 스냅샷: ",snapshot);
            //업로드한 파일의 다운로드 경로 가져오기
            snapshot.ref.getDownloadURL().then((url) => {
                console.log("다운로드 경로: ",url);
                dispatch(uploadImage(url));
            });
        }).catch(err => {
            dispatch(uploading(false));
        })
    };
};

// 리듀서
export default handleActions(
    {
        [UPLOADING]: (state, action) => produce(state, (draft) => {
            draft.uploading = action.payload.uploading;
        }),
        [UPLOAD_IMAGE]: (state, action) => produce(state, (draft) => {
            draft.image_url = action.payload.image_url;
            draft.uploading = false;
        }),
        [SET_PREVIEW]: (state, action) => produce(state, (draft) => {
            draft.preview = action.payload.preview;
        })
    }, initialState
);

const actionCreators = {
    uploadImage,
    uploadImageFB,
    setPreview,
};

export {actionCreators};