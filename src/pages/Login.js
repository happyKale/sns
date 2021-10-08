import React from "react";
import { Grid, Btn, Input, Text } from '../elements';
import { setCookie, getCookie, deleteCookie } from '../shared/Cookie';

import { actionCreators as userActions} from '../redux/modules/user';
import { useDispatch } from 'react-redux';
import { emailCheck } from '../shared/common';

const Login = (props) => {
    const dispatch = useDispatch();
    const [id, setId] = React.useState("");
    const [pwd, setPwd] = React.useState("");
    const idRef = React.useRef('');

    const changeId = (e) => {
        setId(e.target.value);
    };
    const changePwd = (e) => {
        setPwd(e.target.value);
    };
    const login = () => {
        if( id === "" || pwd === "" ){
            window.alert("아이디 혹은 비밀번호가 공란입니다! 입력해주세요!");
            return;
        }

        if(!emailCheck(id)){
            window.alert("이메일 형식이 맞지 않습니다!");
            return;
        }

        // dispatch(userActions.loginAction({user_name: "seyeon"}));
        dispatch(userActions.loginFB(id, pwd));
    }

    return (
        <React.Fragment>
            <Grid margin="auto" width="80%" maxwidth="700px">
                <Grid margin="7vh 0px 10vh 0px">
                    <Text family="BBTreeGB" margin="0px 0px 10px 0px" size="24px" bold align="center">로그인</Text>
                    <Text family="Pretendard-Regular" color="#A6A6A6" margin="0px" size="16px" align="center">이메일과 비밀번호를 입력하세요.</Text>
                </Grid>
                <Grid margin="0px 0px 10vh 0px">
                    <Input ref={idRef} _onChange={changeId} family="Pretendard-Regular" border="1px solid lightgray" radius="15px 15px 0px 0px" height="60px" padding="0px 15px" placeholder="이메일"/>
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