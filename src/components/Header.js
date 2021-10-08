import React from "react";
import { Grid, Btn } from '../elements';
import { getCookie, deleteCookie } from '../shared/Cookie';
import {history} from "../redux/configureStore";

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import { apiKey } from '../shared/firebase';

const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    // const history = useHistory();
    
    // // 로그인 유뮤 확인하는 변수.
    // const [is_login, setIsLogin] = React.useState(false);

    // // 쿠키 유무로 로그인 확인.
    // React.useEffect(() => {
    //     let cookie = getCookie("user_id");
    //     if (cookie) {
    //         setIsLogin(true);
    //     } else {
    //         setIsLogin(false);
    //     }
    // });

    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_session_key);

    if(is_login && is_session){
        return(
            <React.Fragment>
            <Grid padding="10px 5vh" bg="white">
                <Grid margin="auto" maxwidth="700px" is_flex>
                    <Btn hovercolor="#448AFF" size="10px" bg="white" height="4vh" width="60px" _onClick={()=>{history.push("/")}}>
                        <Grid is_flex_center height="3vh" margin="auto" size="20px">
                            <i className="fas fa-home"></i>
                        </Grid>
                        메인
                    </Btn>
                    <Btn hovercolor="#448AFF" size="10px" bg="white" height="4vh" width="60px" _onClick={()=>{history.push("/write")}}>
                        <Grid is_flex_center height="3vh" margin="auto" size="20px">
                            <i className="fas fa-pen-square"></i>
                        </Grid>
                        글작성
                    </Btn>
                    <Btn hovercolor="#448AFF" size="10px" bg="white" height="4vh" width="60px" 
                        _onClick={()=>{
                            console.log("로그아웃 하자구!")
                            dispatch(userActions.logoutFB());
                        }}>
                        <Grid is_flex_center height="3vh" margin="auto" size="20px">
                            <i className="far fa-user"></i>
                        </Grid>
                        로그아웃
                    </Btn>
                </Grid>
            </Grid>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Grid padding="10px 5vh" bg="white" is_flex>
                <Grid margin="auto" maxwidth="700px" is_flex>
                    <Btn hovercolor="#448AFF" size="10px" bg="white" height="4vh" width="60px" _onClick={()=>{history.push("/")}}>
                        <Grid is_flex_center height="3vh" margin="auto" size="20px">
                            <i className="fas fa-home"></i>
                        </Grid>
                        메인
                    </Btn>
                    <Btn hovercolor="#448AFF" size="10px" bg="white" height="4vh" width="60px" _onClick={()=>{history.push("/login")}}>
                        <Grid is_flex_center height="3vh" margin="auto" size="20px">
                            <i className="far fa-user"></i>
                        </Grid>
                        로그인
                    </Btn>
                    <Btn hovercolor="#448AFF" size="10px" bg="white" height="4vh" width="70px" _onClick={()=>{history.push("/signup")}}>
                        <Grid is_flex_center height="3vh" margin="auto" size="20px">
                            <i className="fas fa-user-plus"></i>
                        </Grid>
                        회원가입
                    </Btn>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Header;