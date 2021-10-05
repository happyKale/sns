import React from "react";
import styled from 'styled-components';

const Btn = (props) => {
    const {children, width, height, bg, size, radius, onClick, color} = props;

    const styles = {
        width: width,
        height: height,
        bg: bg,
        size: size,
        radius: radius,
        color: color,
    }

    return(
        <React.Fragment>
            <Button {...styles} onClick={onClick}>
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
    size: "14px",
    radius: null,
    color: "black",
    onClick: () => {},
}

const Button = styled.button`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
    font-size: ${(props) => props.size};
    border: none;
    ${(props) => (props.radius ? `border-radius: ${props.radius};` : "")}
    color: ${(props) => props.color};
`;

export default Btn;