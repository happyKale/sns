import React from "react";
import styled from 'styled-components';

const Input = (props) => {
    const {_onChange, type, width, height, size, margin, padding, border, radius, placeholder, bordertop, family} = props;

    const styles = {
        width:width,
        height:height,
        size: size,
        margin: margin,
        padding: padding,
        border: border,
        radius: radius,
        bordertop: bordertop,
        family: family,
    };

    return(
        <React.Fragment>
            <InputBox onChange={_onChange} type={type} {...styles} placeholder={placeholder}></InputBox>
        </React.Fragment>
    );
};

Input.defaultProps = {
    type: "text",
    _onChange: () => {},
    width: "100%",
    height: "40px",
    size: "14px",
    margin: false,
    padding: false,
    border: false,
    radius: null,
    placeholder: null,
    bordertop: false,
    family: false,
}

const InputBox = styled.input`
    outline: none;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    font-size: ${(props) => props.size};
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
    ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
    ${(props) => (props.border ? `border: ${props.border};` : "")}
    ${(props) => (props.radius ? `border-radius: ${props.radius};` : "")}
    box-sizing: border-box;
    ${(props) => (props.bordertop ? `border-top: none;` : "")}
    ${(props) => (props.family ? `font-family: ${props.family};` : "")}
`;

export default Input;