import React from "react";
import styled from 'styled-components';

const Img = (props) => {
    const {margin ,id, src, width, height, type, _onClick, radius, sizetype, position} = props;

    const styles = {
        margin:margin,
        width:width,
        height:height,
        src: src,
        radius:radius,
        sizetype:sizetype,
        position:position,
    }

    if(type === "profile"){
        return(
            <React.Fragment>
                <ImageProfile {...styles}></ImageProfile>
            </React.Fragment>
        );
    }

    return(
        <React.Fragment>
            <Image id={id} onClick={_onClick} {...styles}></Image>
        </React.Fragment>
    );

};


Img.defaultProps = {
    margin:false,
    _onClick: () => {},
    width: "250px",
    heigh: false,
    type: false,
    src: null,
    radius: null,
    sizetype: "contain",
    position: "center",
}

const Image = styled.div`
    border:none;
    background-image: url("${(props => props.src)}");
    background-size: ${(props) => props.sizetype};
    background-repeat: no-repeat;
    background-position: ${(props) => props.position};
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
    ${(props) => (props.width ? `width: ${props.width};` : "")};
    ${(props) => (props.height ? `height: ${props.height};` : "")};
    ${(props) => (props.radius ? `border-radius: ${props.radius};` : "")};
`;

const ImageProfile = styled.div`
    --size: ${(props) => props.size}px;
    width var(--size);
    height: var(--size);
    border-radius: var(--size);
    background-image: url("${(props => props.src)}");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

export default Img;