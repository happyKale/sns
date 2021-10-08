import React from "react";
import { useHistory } from 'react-router-dom';
import { Grid, Img, Btn, Text, TextArea } from '../elements';
import { useSelector, useDispatch } from 'react-redux';

import {actionCreators as postActions} from "../redux/modules/post";

import Upload from '../shared/Upload';

// 레이아웃 이미지
import layout1 from "../img/layout1.png";
import layout2 from "../img/layout2.png";
import layout3 from "../img/layout3.png";

const PostWrite = (props) => {
    const dispatch = useDispatch();
    // 입력칸의 내용 저장하기
    const [contents, setContents] = React.useState('');
    const [layoutType, setLayoutType] = React.useState('');

    // 잘 모르겠어서 그냥 자바스크립트 문법으로 합니다.
    // 왜 useRef()가 안되는걸까요....

    // 로그인 체크하기
    const is_login = useSelector((state) => state.user.is_login);
    // 이거..모르겠어.. 왜 props를 히스토리에..??
    const {history} = props;

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
        console.log(e.target.value);
        setContents(e.target.value);
    }

    // 데이터베이스에 게시글 정보 저장하는 함수
    const addPost = () => {
        dispatch(postActions.addPostFB(contents, layoutType));
    }

    return (
        <React.Fragment>
            <Grid margin="auto" width="80%" maxwidth="600px">
                {/* 제목 */}
                <Grid margin="3vh 0px">
                    <Text family="BBTreeGB" margin="0px 0px 10px 0px" size="24px" bold align="center">게시글 작성</Text>
                </Grid>
                <Grid margin="0px 0px 3vh 0px">
                    {/* 글작성 */}
                    <TextArea _onChange={chageContents} radius="10px" border="1px solid lightgray" padding="15px" family="Pretendard-Regular" placeholder="게시글을 작성하세요."/>
                    {/* 사진첨부 */}
                    <Grid radius="10px" margin="2vh 0px" height="30vh" bg="white" border="1px solid lightgray">
                        <Grid border="1px solid red">
                            <Upload/>
                        </Grid>
                    </Grid>
                    {/* 레이아웃 */}
                    <Text family="Pretendard-Regular" margin="0px 0px 1vh 0px" align="center" size="17px">레이아웃</Text>
                    <Grid height="9.5vh" margin="auto" is_flex radius="10px" bg="white" border="1px solid lightgray">
                        <Grid border="5px solid #fff" _onClick={layoutClick} radius="10px" flex="1 1 0" width="96%" height="90%" margin="0.5vh" padding="2px 0px">
                            <Img id="lay1" width="100%" height="100%" src={layout1}/>
                        </Grid>
                        <Grid margin="1vh" width="1px" height="8vh" border="1px solid lightgray"></Grid>
                        <Grid border="5px solid #fff" _onClick={layoutClick} radius="10px" flex="1 1 0" width="96%" height="90%" margin="0.5vh" padding="2px 0px">
                            <Img id="lay2" width="100%" height="100%" src={layout2}/>
                        </Grid>
                        <Grid margin="1vh" width="1px" height="8vh" border="1px solid lightgray"></Grid>
                        <Grid border="5px solid #fff" _onClick={layoutClick} radius="10px" flex="1 1 0" width="96%" height="90%" margin="0.5vh" padding="2px 0px">
                            <Img margin="auto" id="lay3" width="80%" height="100%" src={layout3}/>
                        </Grid>
                    </Grid>
                    {/* 레이아웃 끝 */}
                </Grid>
                {/* 작성하기 버튼 */}
                <Grid>
                    <Btn _onClick={addPost} family="BBTreeGB" size="20px" bg="#448AFF" color="white" radius="10px" width="100%">작성하기</Btn>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default PostWrite;