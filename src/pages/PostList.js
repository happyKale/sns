import React from "react";
import Post from '../components/Post';
import { Grid } from '../elements';

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions} from '../redux/modules/post';

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state)=> state.post.list);
    const user_info = useSelector((state) => state.user.user);

    React.useEffect(() => {
        dispatch(postActions.getPostFB());
    }, []);

    return (
        <React.Fragment>
            <Grid  margin="auto" padding="0px 0px 3vh 0px" width="95%" maxwidth="700px">
                {
                    post_list.map((p, idx) => {

                        if(user_info && p.user_info.user_id === user_info.uid){
                            return <Post key={p.id} {...p} is_me={true}/>
                        }
                        return <Post key={p.id} {...p}/>
                    })
                }
            </Grid>
        </React.Fragment>
    );
};

export default PostList;