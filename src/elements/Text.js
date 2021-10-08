import React from "react";
import styled from 'styled-components';

const Text = (props) => {
    const {children, size, bold, color, align, margin, family, hovercolor} = props;

    const styles = {
        margin:margin,
        size:size,
        bold:bold,
        color:color,
        align: align,
        family: family,
        hovercolor: hovercolor,
    }

    return(
        <React.Fragment>
            <TextBox {...styles}>{children}</TextBox>
        </React.Fragment>
    );
};

Text.defaultProps = {
    margin: false,
    children: null,
    bold: false,
    size: "14px",
    color: null,
    align: false,
    family: false,
    hovercolor: false,
}

const TextBox = styled.p`
    font-size: ${(props) => props.size};
    font-weight: ${(props) => (props.bold ? "600" : "400")};
    color: ${(props) => (props.color ? props.color : "#262626")};
    text-align: ${(props) => (props.align ? props.align : "left")};
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
    ${(props) => (props.family ? `font-family: ${props.family};` : "")}

    /* hover */
    &:hover {
        ${(props) => (props.hovercolor ? `color: ${props.hovercolor};` : "")}
    }
`;

export default Text;