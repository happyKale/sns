import React from "react";
// 스타일드 컴포넌트를 사용하기 위해서 임포트
// yarn add styled-components를 해서 패키지를 설치해야 된다.
import styled from 'styled-components';

const Grid = (props) => {
    //props에서 값을 가져온다.
    const {id, _onClick , is_flex_column, is_flex, 
        is_flex_center, flex, width, height, margin, 
        padding, bg, children, border, radius, size, 
        maxwidth, fixed, is_shadow, color, cursor} = props;

    //props에서 가져온 값 중 스타일에 적용될 값들을 하나로 묶는다.
    const styles = {
        is_flex: is_flex,
        is_flex_center: is_flex_center,
        is_flex_column:is_flex_column,
        flex: flex,
        width: width,
        height: height,
        margin: margin,
        padding: padding,
        bg: bg,
        border:border,
        radius:radius,
        size:size,
        maxwidth:maxwidth,
        fixed: fixed,
        is_shadow:is_shadow,
        color:color,
        cursor:cursor,
    }

    return(
        <React.Fragment>
            <GridBox id={id} onClick={_onClick} {...styles}>{children}</GridBox>
        </React.Fragment>
    );
};

// 기본 props를 설정한다.
Grid.defaultProps = {
    id: null,
    _onClick: () => {},
    children: null,
    is_flex: false,
    is_flex_center: false,
    is_flex_column: false,
    flex: false,
    width: "100%",
    height: null,
    padding: false,
    margin: false,
    bg: false,
    border: false,
    radius: null,
    size:"14px",
    maxwidth:false,
    fixed: false,
    is_shadow: false,
    color:null,
    cursor:null,
}

// styles에서 넘겨주는 props를 가지고 스타일에 값을 부여한다.
const GridBox = styled.div`
    width: ${(props) => props.width};
    ${(props) => (props.height ? `height: ${props.height};`: "")}
    ${(props) => (props.size ? `font-size: ${props.size};` : "")}
    ${(props) => (props.color ? `color: ${props.color};` : "")}
    box-sizing: border-box;
    ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
    ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
    ${(props) => (props.border ? `border: ${props.border};` : "")}
    ${(props) => (props.radius ? `border-radius: ${props.radius};` : "")}
    ${(props) => (props.cursor ? `cursor: pointer;` : "")}
    ${(props) => (props.is_flex ? 
        `display: flex;
        align-items: center;
        justify-content: space-between;` : "")}
    ${(props) => (props.is_flex_center ? 
        `display: flex;
        align-items: center;
        justify-content: center;` : "")}
    ${(props) => (props.is_flex_column ? 
        `display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;` : "")}
    ${(props) => (props.flex ? `flex: ${props.flex};` : "")}   
    ${(props) => (props.maxwidth ? `max-width: ${props.maxwidth};` : "")}  
    ${(props) => (props.fixed ? `position: fixed; top: 0;` : "")}  
    ${(props) => (props.is_shadow ? `box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;` : "")} 
    `;

export default Grid;