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
    let name = "파일명";

    // 파일이 잘 가져와졌는지 확인
    const selectFile = (e) => {
        // e.target은 input이죠!
        // input이 가진 files 객체를 살펴봅시다.
        console.log(e.target.files);
        // 선택한 파일이 어떻게 저장되어 있나 봅시다.
        console.log(e.target.files[0]);
    
        // ref로도 확인해봅시다. :)
        console.log(fileInput.current.files[0]);
        console.log("파일이름:",fileInput.current.files[0].name);
        name = fileInput.current.files[0].name;
        const reader = new FileReader();
        const file = e.target.files[0];

        // 파일 내용을 읽어온다.
        reader.readAsDataURL(file);

        // 읽기가 끝나면 발생하는 이벤트 핸들러
        reader.onloadend = () => {
            //reader.result는 파일의 컨텐츠(내용물)이다.
            console.log(reader.result);
            dispatch(imageActions.setPreview(reader.result));
        };
    };

    return(
        <React.Fragment>
            {/* disabled 이거는 왜 하는거지....?? */}
            <input value="" id="file" type="file" ref={fileInput} onChange={selectFile}
                disabled={is_uploading}/>
            {/* <Label htmlFor="file" disabled={is_uploading}> 파일 선택</Label> */}
        </React.Fragment>
    );
};

const Input = styled.input`
    height: 30px;
    widht: 200px;
    border: 1px solid gray;
    background-color: lightgray;
    border-radius: 4px;

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
    border-radius: 5px;
    font-family: "Pretendard-Regular";
    font-size: 16px;
    line-height: 30px;
`;

export default Upload;