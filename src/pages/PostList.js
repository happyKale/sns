import React from "react";
import Post from '../components/Post';
import { Grid } from '../elements';

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions} from '../redux/modules/post';

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state)=> state.post.list);
    const user_info = useSelector((state) => state.user.user);
    console.log("유저인포: ",user_info);

    React.useEffect(() => {
        dispatch(postActions.getPostFB());
    }, []);

    return (
        <React.Fragment>
            <Grid  margin="auto" padding="0px 0px 3vh 0px" width="95%" maxwidth="700px">
                {
                    post_list.map((p, idx) => {
                        let alreadyLike = false;
                        
                        if(user_info && p.like_cnt.findIndex((id) => id === user_info.uid) !== -1){
                            alreadyLike = true;
                        }

                        if(user_info && p.user_info.user_id === user_info.uid){
                            return <Post key={p.id} {...p} is_me={true} alreadyLike={alreadyLike}/>
                        }
                        return <Post key={p.id} {...p} alreadyLike={alreadyLike}/>
                    })
                }
            </Grid>
        </React.Fragment>
    );
};

export default PostList;