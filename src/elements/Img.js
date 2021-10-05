import React from "react";
import styled from 'styled-components';

const Img = (props) => {
    const {src, alt, width, height, type} = props;

    const styles = {
        width:width,
        height:height,
    }

    if(type === "profile"){
        return(
            <React.Fragment>
                <ImageProfile {...styles} 
                src={src ? src : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"} alt={alt}></ImageProfile>
            </React.Fragment>
        );
    }

    return(
        <React.Fragment>
            <Image {...styles} src={src} alt={alt}></Image>
        </React.Fragment>
    );

};


Img.defaultProps = {
    width: "250px",
    heigh: false,
    type: false,
    alt: false,
    src: "https://lh3.googleusercontent.com/proxy/D_0VlMrepXVszFCkFjqtI-19WAuxuniy05n0NnrjVKootlMeGcI68byQoXLt9lzFA1c3-dv8OmCEW7-C4DGcYGzm6sOgEj9TYnezqQrwnEihg84Os8NkrmPl4mj0za4phNpKm0MU6t9jJClorwO8",
}

const Image = styled.image`
    min-width: 250px;
    ${(props) => (props.width ? `width: ${props.width};` : "")};
    ${(props) => (props.height ? `height: ${props.height};` : "")};
`;

const ImageProfile = styled.image`
    ${(props) => (props.width ? `width: ${props.width};` : "36px")};
    ${(props) => (props.height ? `height: ${props.height};` : "36px")};
`;

export default Img;