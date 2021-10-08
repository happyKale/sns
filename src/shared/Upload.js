import React from "react";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as imageActions } from '../redux/modules/image';

import { Btn } from '../elements';
import { storage } from './firebase';

const Upload = (props) => {
    const dispatch = useDispatch();
    const is_uploading = useSelector((state) => state.image.uploading);
    const fileInput = React.useRef();

    // 파일이 잘 가져와졌는지 확인
    const selectFile = (e) => {
        // e.target은 input이죠!
        // input이 가진 files 객체를 살펴봅시다.
        console.log(e.target.files);
        // 선택한 파일이 어떻게 저장되어 있나 봅시다.
        console.log(e.target.files[0]);
    
        // ref로도 확인해봅시다. :)
        console.log(fileInput.current.files[0]);
    };

    // Storage에 업로드
    const uploadFB = () => {
        if (!fileInput.current || fileInput.current.files.length === 0) {
            window.alert("파일을 선택해주세요!");
            return;
        }
        dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
    }

    return(
        <React.Fragment>
            {/* disabled 이거는 왜 하는거지....?? */}
            <Input id="file" type="file" ref={fileInput} onChange={selectFile}
                disabled={is_uploading}/>
            {/* <Label for="file">업로드</Label> */}
            <Btn _onClick={uploadFB}>업로드하기!!!</Btn>
        </React.Fragment>
    );
};

const Input = styled.input`
    background-color: pink;
`;
const Label = styled.label`
    display: inline-block; 
    width: 100px; 
    height: 30px;
    color: #fff; 
    text-align: center;
    background-color: #03A9F4; 
    cursor: pointer;
    border: 1px solid lightgray;
    border-radius: 15px;

`;

export default Upload;