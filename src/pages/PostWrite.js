import React from "react";
import { useHistory } from 'react-router-dom';
import { Grid, Img, Btn, Text, TextArea } from '../elements';
import { useSelector, useDispatch } from 'react-redux';

import {actionCreators as postActions} from "../redux/modules/post";
import {actionCreators as imageActions} from "../redux/modules/image";

import Upload from '../shared/Upload';

// 레이아웃 이미지
import layout1 from "../img/layout1.png";
import layout2 from "../img/layout2.png";
import layout3 from "../img/layout3.png";

const PostWrite = (props) => {
    const dispatch = useDispatch();
    const preview = useSelector((state) => state.image.preview);
    const post_list = useSelector((state) => state.post.list);
    // 로그인 체크하기
    const is_login = useSelector((state) => state.user.is_login);
    // 이거..모르겠어.. 왜 props를 히스토리에..??
    const {history} = props;
    //주소롤 넘겨줬던 id를 받아온다.
    //이걸 가지고 수정인지 아닌지를 구별하자!
    const post_id = props.match.params.id;
    // post_id가 있으면 true, 없으면 false.
    const is_edit = post_id? true : false;
    //수정모드면 게시글 데이터를 가져온다. 아니면 null.
    let _post = is_edit ? post_list.find((p)=>p.id === post_id) : null;
    console.log("포스트 없자요???? ", _post);
    React.useEffect(()=>{
        if(is_edit && !_post){
            console.log('게시글 정보가 없습니다!');
            history.goBack();
            return;
        }

        // 여기서 post를 체크하진 않는 이유는 post가 없었다면 이미 위에서
        // 리턴이 되었기 떄문이다.
        if(is_edit){
            dispatch(imageActions.setPreview(_post.image_url));
        }else{
            //아니... 잘 됬었는데 갑자기 글작성하고 다시 글작성하려니까 그 전에 글작성 때
            // 쓴 이미지가 프리뷰로 나와있는거야... 왜지.... 도대체.....
            dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"));
        }
    },[]);

    // 입력칸의 내용 저장하기
    const [contents, setContents] = React.useState(_post ? _post.contents : "");
    const [layoutType, setLayoutType] = React.useState('');


    // 잘 모르겠어서 그냥 자바스크립트 문법으로 합니다.
    // 왜 useRef()가 안되는걸까요....

    // 로그인이 안 되어 있으면 다른 화면을 보여주기
    // 로그인하러 갈 수 있도록 안내문 적어넣음.
    if(!is_login){
        return(
            <Grid margin="auto" width="80%" maxwidth="600px">
                {/* 제목 */}
                <Grid margin="5vh 0px">
                    <Text family="BBTreeGB" margin="0px 0px 10px 0px" size="24px" bold align="center">
                        잘못된 경로입니다!
                    </Text>
                    <Text family="Pretendard-Regular" margin="0px 0px 50px 0px" size="18px"  align="center">
                        로그인 후에만 글을 작성할 수 있습니다.
                    </Text>
                    <Grid width="70%" margin="auto">
                        <Btn family="BBTreeGB" size="20px" bg="#448AFF" 
                            color="white" radius="10px" width="100%"
                            _onClick={()=>{
                                history.replace("/login");
                            }}>
                                로그인 하러가기
                        </Btn>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
    
    const changeBorder = (a, b, c) => {
        a.style.border = "5px solid #9EF1ED";
        b.style.border = "5px solid #fff";
        c.style.border = "5px solid #fff";
    }
    // 레이아웃 선택하면 보더의 색이 바뀌면서 어떤 레이아웃을 선택했는지 알 수 있음.
    const layoutClick = (e) => {
        const layoutBox1 = document.getElementById("lay1").parentElement;
        const layoutBox2 = document.getElementById("lay2").parentElement;
        const layoutBox3 = document.getElementById("lay3").parentElement;

        // 게시글 정보에 넣을 레이아웃 타입을 지정해준다.
        let target = e.target;
        if(target.id === "lay1"){
            setLayoutType("layout1");
            changeBorder(layoutBox1,layoutBox2,layoutBox3);
        }else if(target.id === "lay2"){
            setLayoutType("layout2");
            changeBorder(layoutBox2,layoutBox1,layoutBox3);
        }else if(target.id === "lay3"){
            setLayoutType("layout3");
            changeBorder(layoutBox3,layoutBox1,layoutBox2);
        }
    };

    // TextArea의 글을 저장하는 함수
    const chageContents = (e) => {
        // console.log(e.target.value);
        setContents(e.target.value);
    }

    // 게시글 정보 저장하는 함수
    const addPost = () => {
        dispatch(postActions.addPostFB(contents, layoutType));
    }
    // 게시글 정보 수정하는 함수
    const editPost = () => {
        dispatch(postActions.editPostFB(post_id, {contents: contents, layout_type:layoutType}));
    }
    // 게시글 정보 삭제하는 함수
    const deletePost = () => {
        dispatch(postActions.deletePostFB(post_id));
    }

    return (
        <React.Fragment>
            <Grid margin="auto" width="80%" maxwidth="600px">
                {/* 제목 */}
                <Grid margin="3vh 0px">
                    <Text family="BBTreeGB" margin="0px 0px 10px 0px" size="24px" bold align="center">
                        { is_edit ? "게시글 수정" : "게시글 작성" }
                    </Text>
                </Grid>
                <Grid margin="0px 0px 3vh 0px">
                    {/* 글작성 */}
                    <TextArea value={contents} _onChange={chageContents} radius="10px" border="1px solid lightgray" padding="15px" family="Pretendard-Regular" placeholder="게시글을 작성하세요."/>
                    {/* 사진첨부 */}
                    <Grid radius="10px" padding="10px" margin="2vh 0px" height="30vh" bg="white" border="1px solid lightgray">
                        <Grid margin="0px 0px 10px 0px">
                            <Upload/>
                        </Grid>
                        <Grid width="100%" height="80%">
                            <Img width="100%" height="100%"
                               src={preview ? preview : "http://via.placeholder.com/400x300"}
                            />
                        </Grid>
                    </Grid>
                    {/* 레이아웃 */}
                    <Text family="Pretendard-Regular" margin="0px 0px 1vh 0px" align="center" size="17px">레이아웃</Text>
                    <Grid height="9.5vh" margin="auto" is_flex radius="10px" bg="white" border="1px solid lightgray">
                        <Grid border="5px solid #fff" _onClick={layoutClick} radius="10px" flex="1 1 0" width="96%" height="90%" margin="0.5vh" padding="2px">
                            <Img id="lay1" width="100%" height="100%" src={layout1}/>
                        </Grid>
                        <Grid margin="0.5vh" bg="lightgray" width="1px" height="8vh" border="1px solid lightgray"></Grid>
                        <Grid border="5px solid #fff" _onClick={layoutClick} radius="10px" flex="1 1 0" width="96%" height="90%" margin="0.5vh" padding="2px">
                            <Img id="lay2" width="100%" height="100%" src={layout2}/>
                        </Grid>
                        <Grid margin="0.5vh" bg="lightgray" width="1px" height="8vh" border="1px solid lightgray"></Grid>
                        <Grid border="5px solid #fff" _onClick={layoutClick} radius="10px" flex="1 1 0" width="96%" height="90%" margin="0.5vh" padding="2px">
                            <Img margin="auto" id="lay3" width="98%" height="100%" src={layout3}/>
                        </Grid>
                    </Grid>
                    {/* 레이아웃 끝 */}
                </Grid>
                {/* 작성하기 버튼 */}
                <Grid>
                { is_edit ? (
                    <Grid is_flex width="100%">
                        <Grid is_flex_center>
                            <Btn _onClick={deletePost} family="BBTreeGB" size="20px" bg="#00BCD4" color="white" radius="4px" width="90%">삭제하기</Btn>
                        </Grid>
                        <Grid is_flex_center>
                            <Btn _onClick={editPost} family="BBTreeGB" size="20px" bg="#448AFF" color="white" radius="4px" width="90%">수정하기</Btn>
                        </Grid>
                    </Grid>                        
                ) : (
                    <Btn _onClick={addPost} family="BBTreeGB" size="20px" bg="#448AFF" color="white" radius="10px" width="100%">작성하기</Btn>
                )}
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default PostWrite;