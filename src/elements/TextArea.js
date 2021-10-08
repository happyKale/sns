import React from "react";
import styled from 'styled-components';

const TextArea = (props) => {
    const {_onChange, name, width, cols, rows, size, border, bg, radius, padding, margin, family, placeholder} = props;

    const styles = {
        width:width,
        size:size,
        border:border,
        bg:bg,
        radius:radius,
        padding:padding,
        margin:margin,
        family:family,
    };

    return(
        <React.Fragment>
            <Area {...styles} onChange={_onChange} name={name} cols={cols} rows={rows} placeholder={placeholder}></Area>
        </React.Fragment>
    );
};

TextArea.defaultProps = {
    _onChange: () => {},
    name: null,
    width: "100%",
    cols:"40",
    rows:"4",
    size: "14px",
    border: false,
    bg: false,
    radius: null,
    padding: false,
    margin: false,
    family: false,
    placeholder: null,
}

const Area = styled.textarea`
    width: ${(props) => props.width};
    font-size: ${(props) => props.size};
    ${(props) => (props.border ? `border: ${props.border};` : "")}
    ${(props) => (props.radius ? `border-radius: ${props.radius};` : "")}
    ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
    ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
    ${(props) => (props.family ? `font-family: ${props.family};` : "")}
    resize: none;
    box-sizing: border-box;
    outline: none;
`;

export default TextArea;