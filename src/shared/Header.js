import React from "react";
import { Grid, Btn } from '../elements';
import { useHistory } from 'react-router-dom';

const Header = (props) => {
    const history = useHistory();

    return (
        <React.Fragment>
            <Grid height="5vh" bg="red" is_flex>
                <Btn onClick={()=>{history.push("/")}}>
                    홈
                </Btn>
                <Btn onClick={()=>{history.push("/login")}}>
                    로그인
                </Btn>
                <Btn onClick={()=>{history.push("/signup")}}>
                    회원가입
                </Btn>
            </Grid>
        </React.Fragment>
    );
}

export default Header;