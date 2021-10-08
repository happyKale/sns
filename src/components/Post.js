import React from "react";
import styled from 'styled-components';
import {Grid, Img, Text, Btn} from '../elements';
import { useDispatch } from 'react-redux';
import {history} from "../redux/configureStore";
import { actionCreators as postActions } from '../redux/modules/post';

const Post = (props) => {
    const layout = [props.layout_type];
    const dispatch = useDispatch();

    let like = props.like_cnt;
    if(like === 0){
        like = false;
    }

    // 게시글 상세페이지로 이동
    const postDetail = () => {
        history.push(`/post/${props.id}`);
    }

    const clickLike = (e) => {
        let target = e.target.style.color;
        if(target == ''){
            e.target.style.color = 'red';
            dispatch(postActions.addLikeFB(props.id));
        }else{
            e.target.style.color = '';
            dispatch(postActions.deleteLikeFB(props.id));
        }
    }

    return (
        <React.Fragment>
            <Grid
                is_shadow="is_shadow"
                bg="#fff"
                radius="15px"
                margin="3vh auto"
                width="55vh"
                maxwidth="100%">
                {/* 헤더 */}
                <Grid is_flex padding="1vh 0px" height="7vh"margin="auto">
                    <Grid is_flex_center width="23%">
                        <Grid width="5vh" height="5vh">
                            <Img width="100%" height="100%" radius="30%" sizetype="cover" src={props.user_info.user_profile}/>
                        </Grid>
                        <Text family="BBTreeGB" bold="bold" size="14px" margin="0px 0px 0px 13px">{props.user_info.user_name}</Text>
                    </Grid>
                    <Grid is_flex_column width="40%" height="100%">
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
                                <Grid _onClick={postDetail} key="lay" is_flex width="100%" height="45vh">
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
                                 <Grid _onClick={postDetail} key="lay" is_flex width="100%" height="45vh">
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
                                <Grid _onClick={postDetail} key="lay" width="100%" height="45vh">
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
                    <Grid is_flex_center width="25%" margin="0px 0px 0px 1vh">
                        <Btn size="3vh" height="100%" bg="transparent" color="gray" width="33%" margin="5%">
                            <i onClick={clickLike} className="fas fa-heart"></i>
                        </Btn>
                        <Text family="BBTreeGB" size="18px" width="70%" margin="auto" align="left">
                            {like}
                        </Text>
                    </Grid>
                    {
                        props.is_me && (
                            <Grid width="35%" >
                                <Grid width="60%" margin="auto">
                                    <Btn bg="#ECEFF1" radius="5px" width="100%" height="3vh" 
                                        size="12px" family="Pretendard-Regular"
                                        _onClick={()=>{
                                            history.push(`/write/${props.id}`);
                                        }}>
                                            수정하기
                                    </Btn>
                                </Grid>
                            </Grid>
                        )
                    }
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

Post.defaultProps = {
    user_info: {
      user_name: "mean0",
      user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
    },
    image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
    contents: "고양이네요!",
    comment_cnt: 10,
    insert_dt: "2021-02-27 10:00:00",
  };

export default Post;