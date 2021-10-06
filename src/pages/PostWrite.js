import React from "react";
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { Grid, Img, Btn, Text, TextArea } from '../elements';

const PostWrite = (props) => {

    return (
        <React.Fragment>
            <Grid margin="auto" width="80%">
                {/* 제목 */}
                <Grid margin="5vh 0px">
                    <Text family="BBTreeGB" margin="0px 0px 10px 0px" size="24px" bold align="center">게시글 작성</Text>
                </Grid>
                <Grid margin="0px 0px 5vh 0px">
                    {/* 글작성 */}
                    <TextArea rows="7" radius="10px" border="1px solid lightgray" padding="15px" family="Pretendard-Regular" placeholder="게시글을 작성하세요."/>
                    {/* 사진첨부 */}
                    <Grid radius="10px" bg="white" border="1px solid lightgray"></Grid>
                    {/* 레이아웃 */}
                    <Text family="Pretendard-Regular" align="center">레이아웃</Text>
                    <Grid is_flex radius="10px" bg="white" border="1px solid lightgray">
                        <Grid border="4px solid #9EF1ED" radius="10px" flex="1 1 0" width="100px" height="8vh" margin="10px">
                            {/* 도대체 왜 그림이 안 나올까 */}
                            <Img width="100%" height="100%" src="../img/layout1.png"/>
                        </Grid>
                        <Grid width="1px" height="8vh" border="1px solid lightgray"></Grid>
                        <Grid radius="10px" flex="1 1 0" width="100px" height="8vh" margin="10px">
                            <Img width="100%" height="100%" src="../img/layout1.png"/>
                        </Grid>
                        <Grid width="1px" height="8vh" border="1px solid lightgray"></Grid>
                        <Grid radius="10px" flex="1 1 0" width="100px" height="8vh" margin="10px">
                        <Img width="100%" height="100%" src="../img/layout3.png"/>
                        </Grid>
                    </Grid>
                    {/* 레이아웃 끝 */}
                </Grid>
                {/* 작성하기 버튼 */}
                <Grid>
                    <Btn family="BBTreeGB" size="20px" bg="#448AFF" color="white" radius="10px" width="100%">작성하기</Btn>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default PostWrite;