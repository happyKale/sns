import React from "react";
import { Grid, Btn, Img, Text } from '../elements';

const PostDetail = (props) => {
    const url = "https://images6.fanpop.com/image/photos/41200000/-RM-bts-41298207-900-1200.jpg";
    const url2 = "https://pbs.twimg.com/media/E_uPJtnVEAIQleT.jpg";
    return (
        <React.Fragment>
            <Grid>
                <Grid margin="auto" width="100%" maxwidth="1000px">
                    <Grid
                    bg="#fff"
                    margin="3vh 0px" height="73vh">
                    {/* 헤더 */}
                    <Grid is_flex padding="1vh 0px" height="7vh"margin="auto">
                        <Grid is_flex_center width="33%">
                            <Grid width="5vh" height="5vh">
                                <Img width="100%" height="100%" radius="30%" sizetype="cover" src={url}/>
                            </Grid>
                            <Text family="BBTreeGB" bold="bold" size="14px" margin="0px 0px 0px 13px">김남준</Text>
                        </Grid>
                        <Grid is_flex_center width="30%">
                            <Text align="right" family="Pretendard-Regular" size="14px">2021-10-07</Text>
                        </Grid>
                    </Grid>
                    {/* 사진과 글 */}
                        {/* 사진왼쪽 글오른쪽 */}
                    {/* <Grid is_flex width="100%" height="60vh">
                        <Grid height="100%" width="70%">
                            <Img width="100%" height="100%" sizetype="cover" src={url2}/>
                        </Grid>
                        <Grid height="100%" width="30%" bg="pink" padding="20px">
                            <Text margin="0px" family="Pretendard-Regular" size="14px">
                                여기다가 게시글 쓰기 우리애들 11월 말에 스타디움 공연해~!
                            </Text>
                        </Grid>
                    </Grid> */}
                        {/* 글왼쪽 사진오른쪽 */}
                    {/* <Grid is_flex width="100%" height="60vh">
                        <Grid height="100%" width="30%" bg="pink" padding="20px">
                            <Text margin="0px" family="Pretendard-Regular" size="14px">
                                여기다가 게시글 쓰기 우리애들 11월 말에 스타디움 공연해~!
                            </Text>
                        </Grid>
                        <Grid height="100%" width="70%">
                            <Img width="100%" height="100%" sizetype="cover" src={url2}/>
                        </Grid>
                    </Grid> */}
                        {/* 글위쪽 사진아래쪽 */}
                    <Grid width="100%" height="60vh">
                        <Grid width="100%"  bg="#e5e5e5" padding="2vh 8%">
                            <Text margin="0px" family="Pretendard-Regular" size="14px">
                                게시글 상세 페이지!! 
                                오늘 자는 건 글렀구나~~~~ 
                            </Text>
                        </Grid>
                        <Grid height="90%" width="100%">
                            <Img width="100%" height="100%" sizetype="cover" src={url2}/>
                        </Grid>
                    </Grid>
                    {/* 하트와 수정하기 버튼 */}
                    <Grid is_flex height="6vh">
                        <Grid width="25%">
                            <Grid size="3vh" color="lightgray" width="30px" margin="auto">
                                <i class="fas fa-heart"></i>
                            </Grid>
                        </Grid>
                        <Grid width="35%" >
                            <Grid width="60%" margin="auto">
                                <Btn bg="#ECEFF1" radius="10px" width="100%" height="3vh" size="12px" family="Pretendard-Regular">수정하기</Btn>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default PostDetail;