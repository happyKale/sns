import React from "react";
import styled from 'styled-components';

const Text = (props) => {
    const {children, size, bold, color, align, margin} = props;

    const styles = {
        size:size,
        bold:bold,
        color:color,
        align: align,
        margin: margin,
    }

    return(
        <React.Fragment>
            <TextBox {...styles}>{children}</TextBox>
        </React.Fragment>
    );
};

Text.defaultProps = {
    children: null,
    bold: false,
    size: "14px",
    color: null,
    align: false,
    margin: false,
}

const TextBox = styled.p`
    font-size: ${(props) => props.size};
    font-weight: ${(props) => (props.bold ? "600" : "400")};
    color: ${(props) => (props.color ? props.color : "#262626")};
    text-align: ${(props) => (props.align ? props.align : "left")};
    ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
`;

export default Text;