import React from "react";
import styled from 'styled-components';

const Input = (props) => {
    const {width, height, margin, padding, border, radius, placeholder, bordertop} = props;

    const styles = {
        width:width,
        height:height,
        margin: margin,
        padding: padding,
        border: border,
        radius: radius,
        bordertop: bordertop,
    };

    return(
        <React.Fragment>
            <InputBox type="text" {...styles} placeholder={placeholder}></InputBox>
        </React.Fragment>
    );
};

Input.defaultProps = {
    width: "100%",
    height: "40px",
    margin: false,
    padding: false,
    border: false,
    radius: null,
    placeholder: null,
    bordertop: false,
}

const InputBox = styled.input`
    outline: none;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
    ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
    ${(props) => (props.border ? `border: ${props.border};` : "")}
    ${(props) => (props.radius ? `border-radius: ${props.radius};` : "")}
    box-sizing: border-box;
    ${(props) => (props.bordertop ? `border-top: none;` : "")}
`;

export default Input;