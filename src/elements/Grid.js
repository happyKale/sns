import React from "react";
// 스타일드 컴포넌트를 사용하기 위해서 임포트
// yarn add styled-components를 해서 패키지를 설치해야 된다.
import styled from 'styled-components';

const Grid = (props) => {
    //props에서 값을 가져온다.
    const {is_flex, width, height, margin, padding, bg, children} = props;

    //props에서 가져온 값 중 스타일에 적용될 값들을 하나로 묶는다.
    const styles = {
        is_flex: is_flex,
        width: width,
        height: height,
        margin: margin,
        padding: padding,
        bg: bg,
    }

    return(
        <React.Fragment>
            <GridBox {...styles}>{children}</GridBox>
        </React.Fragment>
    );
};

// 기본 props를 설정한다.
Grid.defaultProps = {
    children: null,
    is_flex: false,
    width: "100%",
    height: "100%",
    padding: false,
    margin: false,
    bg: false,
}

// styles에서 넘겨주는 props를 가지고 스타일에 값을 부여한다.
const GridBox = styled.div`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    box-sizing: border-box;
    ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
    ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
    ${(props) => (props.is_flex ? 
        `display: flex;
        align-items: center;
        justify-content: space-between;` : "")}
`;

export default Grid;