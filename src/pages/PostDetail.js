import React from "react";
import { Grid, Btn, Img, Text } from '../elements';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from "react-router-dom";
import { actionCreators as postActions } from '../redux/modules/post';
import {history} from "../redux/configureStore";

const PostDetail = (props) => {
    const dispatch = useDispatch();

    const post_id = props.match.params.id;
    const user_info = useSelector((state) => state.user.user);
    const post_list = useSelector((state) => state.post.list);
    const post = post_list.find((p)=>p.id === post_id);

    let is_me = false;
    if(user_info && post.user_info.user_id === user_info.uid){
        is_me = true;
    }

    let like = post.like_cnt;
    if(like === 0){
        like = false;
    }

    const clickLike = (e) => {
        let target = e.target.style.color;
        if(target == ''){
            e.target.style.color = 'red';
            dispatch(postActions.addLikeFB(post_id));
        }else{
            e.target.style.color = '';
            dispatch(postActions.deleteLikeFB(post_id));
        }
    }

    const layout = [post.layout_type];
    
    return (
        <React.Fragment>
            <Grid>
                <Grid margin="auto" width="100%" maxwidth="800px">
                    <Grid
                    bg="#fff"
                    margin="3vh 0px">
                    {/* 헤더 */}
                    <Grid is_flex padding="1vh 0px" height="7vh"margin="auto">
                        <Grid is_flex_center width="23%">
                            <Grid width="5vh" height="5vh">
                                <Img width="100%" height="100%" radius="30%" sizetype="cover" src={post.user_info.user_profile}/>
                            </Grid>
                            <Text family="BBTreeGB" bold="bold" size="14px" margin="0px 0px 0px 13px">{post.user_info.user_name}</Text>
                        </Grid>
                        <Grid is_flex_column width="33%">
                            <Text align="right" margin="0px" family="Pretendard-Regular" size="14px">
                                {post.insert_dt.split(' ')[0]}
                            </Text>                        
                            <Text align="right" margin="0px" family="Pretendard-Regular" size="14px">
                                {post.insert_dt.split(' ')[1]}
                            </Text>
                        </Grid>
                    </Grid>
                    {
                        layout.map((lay)=>{
                            if(lay === "layout1"){
                                return(
                                    // 사진왼쪽 글오른쪽
                                    // key 값은... 아니 계속 콘솔에 경고문이 뜨길래...
                                    // 넣어주니까 안 뜨긴 하더라구.. 우선 넣어줄게.
                                    <Grid key="lay" is_flex width="100%">
                                        <Grid height="100%" width="70%">
                                            <Img type="rectangle" width="100%" height="100%" src={post.image_url}/>
                                        </Grid>
                                        <Grid height="100%" width="30%" padding="20px">
                                            <Text width="100%" height="100%" margin="0px" family="Pretendard-Regular" size="16px">
                                                {post.contents}
                                            </Text>
                                        </Grid>
                                    </Grid> 
                                );
                            }else if(lay === "layout2"){
                                return(
                                    // 글왼쪽 사진오른쪽
                                    <Grid key="lay" is_flex width="100%">
                                        <Grid height="100%" width="30%" padding="20px">
                                            <Text margin="0px" family="Pretendard-Regular" size="14px">
                                                {post.contents}
                                            </Text>
                                        </Grid>
                                        <Grid height="100%" width="70%">
                                            <Img type="rectangle" width="100%" height="100%" src={post.image_url}/>
                                        </Grid>
                                    </Grid> 
                                );
                            }else{
                                return(
                                    // 글위쪽 사진아래쪽
                                    <Grid key="lay" width="100%">
                                        <Grid width="100%"  bg="#fff" padding="2vh 8%">
                                            <Text margin="0px" family="Pretendard-Regular" size="14px">
                                                {post.contents}
                                            </Text>
                                        </Grid>
                                        <Grid height="90%" width="100%">
                                            <Img type="rectangle" width="100%" height="100%" src={post.image_url}/>
                                        </Grid>
                                    </Grid>
                                );
                            }
                        })
                    }
                    {/* 하트와 수정하기 버튼 */}
                    <Grid is_flex height="6vh">
                        <Grid margin="0px 0px 0px 4vh" is_flex_center width="15%">
                        <Btn size="3vh" height="100%" bg="transparent" color="gray" width="50%" margin="5%">
                            <i onClick={clickLike} className="fas fa-heart"></i>
                        </Btn>
                        <Text family="BBTreeGB" size="18px" width="50%" margin="auto" align="left">
                            {like}
                        </Text>
                        </Grid>
                        {
                            is_me && (
                                <Grid width="35%" >
                                    <Grid width="50%" margin="auto">
                                        <Btn bg="#ECEFF1" radius="10px" width="100%" height="3.5vh" 
                                        size="15px" family="Pretendard-Regular"
                                        _onClick={()=>{
                                            history.push(`/write/${post.id}`);
                                        }}>
                                            수정하기
                                        </Btn>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default PostDetail;