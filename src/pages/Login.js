import React from "react";
import Header from '../shared/Header';
import { Grid, Btn, Input, Text } from '../elements';

const Login = (props) => {

    return (
        <React.Fragment>
            <Header/>
            <Grid margin="auto" width="80%" height="80%">
                <Grid margin="50px 0px 100px 0px">
                    <Text margin="0px 0px 10px 0px" size="22px" bold align="center">로그인</Text>
                    <Text margin="0px" size="14px" align="center">이메일과 비밀번호를 입력하세요.</Text>
                </Grid>
                <Grid margin="0px 0px 5vh 0px">
                    <Input border="1px solid lightgray" radius="10px 10px 0px 0px" height="60px" padding="0px 15px" placeholder="이메일"/>
                    <Input border="1px solid lightgray" bordertop radius="0px 0px 10px 10px" height="60px" padding="0px 15px" placeholder="비밀번호"/>
                </Grid>
                <Grid>
                    <Grid margin="0px 0px 15px 0px">
                        <Btn bg="#CFD8DC" color="white" radius="10px" width="100%">회원가입</Btn> 
                    </Grid>
                    <Btn bg="#448AFF" color="white" radius="10px" width="100%">로그인</Btn>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Login;