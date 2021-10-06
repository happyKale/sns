import React from "react";
import styled from 'styled-components';

const Btn = (props) => {
    const {children, width, height, bg, size, radius, _onClick, color, family, hoverbg, hovercolor} = props;

    const styles = {
        children:children[0],
        width: width,
        height: height,
        bg: bg,
        size: size,
        radius: radius,
        color: color,
        family: family,
        hoverbg: hoverbg,
        hovercolor: hovercolor,
    }

    return(
        <React.Fragment>
            <Button {...styles} onClick={_onClick}>
                {children}
            </Button>
        </React.Fragment>
    );
};

Btn.defaultProps = {
    children: null,
    width: "100px",
    height: "40px",
    bg: false,
    hoverbg: false,
    size: "14px",
    radius: null,
    color: "black",
    _onClick: () => {},
    family: false,
    hovercolor: false,
}

const Button = styled.button`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
    font-size: ${(props) => props.size};
    border: none;
    ${(props) => (props.radius ? `border-radius: ${props.radius};` : "")}
    color: ${(props) => props.color};
    ${(props) => (props.family ? `font-family: ${props.family};` : "")}

    /* hover */
    &:hover {
        cursor:pointer;
        ${(props) => (props.hoverbg ? `background-color: ${props.hoverbg};` : "")}
        ${(props) => (props.hovercolor ? `color: ${props.hovercolor};` : "")}
    }
`;

export default Btn;