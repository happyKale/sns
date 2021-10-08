export const emailCheck = (email) => {
    //이메일 형식: aa_aa@aa.com
    let _reg = /^[0~9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
      
    //_reg의 패턴에 맞으면 true가 반환되고 아니면 false가 반환됨.
    //_reg.test(id);
    // console.log(_reg.test(id));
    return _reg.test(email);
};