import React from "react";
import Header from '../components/Header';
import Post from '../components/Post';

const PostList = (props) => {

    return (
        <React.Fragment>
            포스트리스트여~~ 우선 메인으로 쓸겡
            <Post/>
        </React.Fragment>
    );
};

export default PostList;