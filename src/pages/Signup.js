import React from "react";
import { Grid, Btn, Input, Text } from '../elements';

import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

const Signup = (props) => {
    const dispatch = useDispatch();

    const [id, setId] = React.useState("");
    const [pwd, setPwd] = React.useState("");
    const [pwd_check, setPwdCheck] = React.useState("");
    const [user_name, setUserName] = React.useState("");

    const signup = () => {
        // 입력칸 중에 빈 곳이 있으면 실행되지 않음.
        if( id === "" || pwd === "" || pwd_check === "" || user_name === ""){
            return;
        }
        // 비밀번호와 비밀번호 확인 값이 다르면 실행되지 않음.
        if( pwd !== pwd_check){
            return;
        }
        
        dispatch(userActions.signupFB(id, pwd, user_name));
    }

    return (
        <React.Fragment>
            <Grid>
                <Grid margin="auto" width="80%" maxwidth="700px">
                    <Grid margin="5vh 0px 8vh 0px">
                        <Text family="BBTreeGB" margin="0px 0px 10px 0px" size="24px" bold align="center">회원가입</Text>
                        <Text family="Pretendard-Regular" color="#A6A6A6" margin="0px" size="16px" align="center">이메일과 닉네임, 비밀번호를 입력하세요.</Text>
                    </Grid>
                    <Grid margin="0px 0px 7vh 0px">
                        <Input family="Pretendard-Regular"
                                border="1px solid lightgray" 
                                radius="15px 15px 0px 0px" 
                                height="60px" 
                                padding="0px 15px" 
                                placeholder="이메일"
                                _onChange={(e) => {
                                    setId(e.target.value);
                                }}/>
                        <Input family="Pretendard-Regular" 
                                border="1px solid lightgray" 
                                bordertop 
                                height="60px" 
                                padding="0px 15px" 
                                placeholder="닉네임"
                                _onChange={(e) => {
                                    setUserName(e.target.value);
                                }}/>
                        <Input family="Pretendard-Regular" 
                                type="password"
                                border="1px solid lightgray" 
                                bordertop 
                                height="60px" 
                                padding="0px 15px" 
                                placeholder="비밀번호"
                                _onChange={(e) => {
                                    setPwd(e.target.value);
                                }}/>
                        <Input family="Pretendard-Regular" 
                                type="password"
                                border="1px solid lightgray" 
                                bordertop 
                                radius="0px 0px 15px 15px" 
                                height="60px" 
                                padding="0px 15px" 
                                placeholder="비밀번호 확인"
                                _onChange={(e) => {
                                    setPwdCheck(e.target.value);
                                }}/>
                    </Grid>
                    <Grid>
                        <Btn family="BBTreeGB" 
                            size="20px" 
                            bg="#448AFF" 
                            color="white" 
                            radius="10px" 
                            width="100%"
                            _onClick={signup}>회원가입</Btn>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Signup;