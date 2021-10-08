import React from "react";
import styled from 'styled-components';
import {Grid, Img, Text, Btn} from '../elements';

const Post = (props) => {
    const layout = [props.layout_type];
    console.log("레이아웃",layout[0]);
    return (
        <React.Fragment>
            <Grid
                is_shadow="is_shadow"
                bg="#fff"
                radius="15px"
                margin="3vh 0px">
                {/* 헤더 */}
                <Grid is_flex padding="1vh 0px" height="7vh"margin="auto">
                    <Grid is_flex_center width="33%">
                        <Grid width="5vh" height="5vh">
                            <Img width="100%" height="100%" radius="30%" sizetype="cover" src={props.user_info.user_profile}/>
                        </Grid>
                        <Text family="BBTreeGB" bold="bold" size="14px" margin="0px 0px 0px 13px">{props.user_info.user_name}</Text>
                    </Grid>
                    <Grid is_flex_column width="30%" height="100%">
                        <Text align="right" margin="0px" family="Pretendard-Regular" size="14px">
                            {props.insert_dt.split(' ')[0]}
                        </Text>                        
                        <Text align="right" margin="0px" family="Pretendard-Regular" size="14px">
                            {props.insert_dt.split(' ')[1]}
                        </Text>
                    </Grid>
                </Grid>
                {/* 사진과 글 */}
                { 
                    layout.map((lay) => {
                        if(lay === "layout1"){
                            return(
                                // 사진왼쪽 글오른쪽
                                // key 값은... 아니 계속 콘솔에 경고문이 뜨길래...
                                // 넣어주니까 안 뜨긴 하더라구.. 우선 넣어줄게.
                                <Grid key="lay" is_flex width="100%" height="50vh">
                                    <Grid height="100%" width="60%">
                                        <Img width="100%" height="100%" sizetype="cover" src={props.image_url}/>
                                    </Grid>
                                    <Grid height="100%" width="40%" padding="20px">
                                        <Text margin="0px" family="Pretendard-Regular" size="14px">
                                            {props.contents}
                                        </Text>
                                    </Grid>
                                </Grid> 
                            );
                        }else if(lay === "layout2"){
                            return(
                                //글왼쪽 사진오른쪽
                                 <Grid key="lay" is_flex width="100%" height="50vh">
                                    <Grid height="100%" width="40%" padding="20px">
                                        <Text margin="0px" family="Pretendard-Regular" size="14px">
                                            {props.contents}
                                        </Text>
                                    </Grid>
                                    <Grid height="100%" width="60%">
                                        <Img width="100%" height="100%" sizetype="cover" src={props.image_url}/>
                                    </Grid>
                                </Grid> 
                            );
                        }else{
                            return(
                                //글위쪽 사진아래쪽
                                <Grid key="lay" width="100%" height="50vh">
                                    <Grid height="20%" width="100%" padding="2vh">
                                        <Text margin="0px" family="Pretendard-Regular" size="14px">
                                            {props.contents}
                                        </Text>
                                    </Grid>
                                    <Grid height="80%" width="100%">
                                        <Img width="100%" height="100%" sizetype="cover" src={props.image_url}/>
                                    </Grid>
                                </Grid>
                            );
                        }
                    })
                }
                {/* 하트와 수정하기 버튼 */}
                <Grid is_flex height="5vh">
                    <Grid width="25%">
                        <Grid size="3vh" color="lightgray" width="30px" margin="auto">
                            <i className="fas fa-heart"></i>
                        </Grid>
                    </Grid>
                    <Grid width="35%" >
                        <Grid width="60%" margin="auto">
                            <Btn bg="#ECEFF1" radius="10px" width="100%" height="3vh" size="12px" family="Pretendard-Regular">수정하기</Btn>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Post;