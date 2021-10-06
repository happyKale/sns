import React from "react";
import styled from 'styled-components';

const Img = (props) => {
    const {src, width, height, type} = props;

    const styles = {
        width:width,
        height:height,
        src: src,
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
            <Image {...styles}></Image>
        </React.Fragment>
    );

};


Img.defaultProps = {
    width: "250px",
    heigh: false,
    type: false,
    src: null,
}

const Image = styled.div`
    background-image: url("${(props => props.src)}");
    background-size: cover;
    ${(props) => (props.width ? `width: ${props.width};` : "")};
    ${(props) => (props.height ? `height: ${props.height};` : "")};
`;

const ImageProfile = styled.div`
    --size: ${(props) => props.size}px;
    width var(--size);
    height: var(--size);
    border-radius: var(--size);
    background-image: url("${(props) => (props.src ?  `${props.src}`: `https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png`)}");
    background-size: cover;
`;

export default Img;