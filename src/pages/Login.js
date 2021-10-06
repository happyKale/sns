import React from "react";
import Header from '../components/Header';
import { setCookie } from '../shared/Cookie';
import { Grid, Btn, Input, Text } from '../elements';

import { useHistory } from 'react-router-dom';

import { actionCreators as userActions} from '../redux/modules/user';
import { useDispatch } from 'react-redux';

const Login = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [id, setId] = React.useState("");
    const [pwd, setPwd] = React.useState("");

    const changeId = (e) => {
        setId(e.target.value);
    };
    const changePwd = (e) => {
        setPwd(e.target.value);
    };
    const login = () => {
        dispatch(userActions.loginAction({user_name: "seyeon"}));
    }

    return (
        <React.Fragment>
            <Grid margin="auto" width="80%" maxwidth="700px">
                <Grid margin="7vh 0px 10vh 0px">
                    <Text family="BBTreeGB" margin="0px 0px 10px 0px" size="24px" bold align="center">로그인</Text>
                    <Text family="Pretendard-Regular" color="#A6A6A6" margin="0px" size="16px" align="center">이메일과 비밀번호를 입력하세요.</Text>
                </Grid>
                <Grid margin="0px 0px 10vh 0px">
                    <Input _onChange={changeId} family="Pretendard-Regular" border="1px solid lightgray" radius="15px 15px 0px 0px" height="60px" padding="0px 15px" placeholder="이메일"/>
                    <Input type="password" _onChange={changePwd} family="Pretendard-Regular" border="1px solid lightgray" bordertop radius="0px 0px 15px 15px" height="60px" padding="0px 15px" placeholder="비밀번호"/>
                </Grid>
                <Grid>
                    <Btn _onClick={() => {login();}} family="BBTreeGB" size="20px" bg="#448AFF" color="white" radius="10px" width="100%">로그인</Btn>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Login;