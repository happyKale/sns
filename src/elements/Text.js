import React from "react";
import styled from 'styled-components';

const Text = (props) => {
    const {overflow, textover, children, size, bold, 
        color, align, margin, family, hovercolor,
        height, width
    } = props;

    const styles = {
        width:width,
        height:height,
        margin:margin,
        size:size,
        bold:bold,
        color:color,
        align: align,
        family: family,
        hovercolor: hovercolor,
        textover:textover,
        overflow:overflow,
    }

    return(
        <React.Fragment>
            <TextBox {...styles}>{children}</TextBox>
        </React.Fragment>
    );
};

Text.defaultProps = {
    height:"",
    width:"",
    margin: false,
    children: null,
    bold: false,
    size: "14px",
    color: null,
    align: false,
    family: false,
    hovercolor: false,
    textover:false,
    overflow:null,
}

const TextBox = styled.p`
    ${(props) => (props.height ? `height: ${props.height};` : "")}
    ${(props) => (props.width ? `width: ${props.width};` : "")}
    font-size: ${(props) => props.size};
    font-weight: ${(props) => (props.bold ? "600" : "400")};
    color: ${(props) => (props.color ? props.color : "#262626")};
    ${(props) => (props.align ? `text-align: ${props.align};` : "")}
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
    ${(props) => (props.family ? `font-family: ${props.family};` : "")}
    ${(props) => (props.textover ? `text-overflow: ellipsis;` : "")}
    ${(props) => (props.overflow ? `overflow: auto;` : "")}
    /* hover */
    &:hover {
        ${(props) => (props.hovercolor ? `color: ${props.hovercolor};` : "")}
    }
`;

export default Text;