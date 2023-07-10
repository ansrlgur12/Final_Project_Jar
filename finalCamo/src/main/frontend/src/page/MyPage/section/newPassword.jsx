import React, { useContext, useState } from 'react';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import Header from '../../../main/header';
import Sidebar from '../sidebar';
import Modal from '../../../util/modal';
import { UserContext } from '../../../API/UserInfo';
import AxiosApi from '../../../API/TestAxios';

const LayoutContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  height: 150px;
  flex: 1;
  padding: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled(Form)`
  max-width: 800px;
`;

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 50px;

  .message{
    font-size: .8rem;
  }
  .checkNick{
    font-size: .8rem;
  }
  .success {
    color: royalblue;
  }
  .error {
    color: red;
  }
`;

const passwordRules = { //비밀번호 입력필드 유효성 검사 규칙 정의
  newPassword: [
    { required: true, message: '새로운 비밀번호를 입력해주세요' },
  ],
  confirmPassword: [
    { required: true, message: '비밀번호 다시한번 입력해주세요' },
    ({ getFieldValue }) => ({ //비밀번호 확인 필드검사하고, 오류나 성공 반환
      validator(_, value) {
        if (!value || getFieldValue('newPassword') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
      },
    }),
  ],
};

const NewPassword = () => { //새로운 비밀번호 입력하고 확인하는 함수
  const context = useContext(UserContext);
  const { userEmail } = context;

  const [newPwd, setNewPwd] = useState('');
  const [checkPwd, setCheckPwd] = useState('');

  const [isPw, setIsPw] = useState(false)
  const [isConPw, setIsConPw] = useState(false);
  const [pwdMessage, setPwdMessage] = useState("");
  const [checkPwdMessage, setCheckPwdMessage] = useState("");

  const [form] = Form.useForm();

  // 팝업
  const [modalOpen, setModalOpen] = useState(false);
  const [finishModal, setFinishModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const closeModal = () => {
    setFinishModal(false);
    setModalOpen(false);
  };

  // 비밀번호
  const passwordChange = (e) => {
    //const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value ;
    setNewPwd(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
        setPwdMessage('숫자+영문자 조합으로 8자리 이상 입력해주세요!')
        setIsPw(false)
    } else {
        setPwdMessage('안전한 비밀번호에요 : )')
        setIsPw(true);
    }  
    console.log("Password : " + e);
};

  // 비밀번호 검사
  const checkPasswordChange = (e) => {
    const passwordCurrent = e.target.value ;
    setCheckPwd(passwordCurrent)
    if (passwordCurrent !== newPwd) {
        setCheckPwdMessage('비밀 번호가 일치하지 않습니다.')
        setIsConPw(false)
    } else {
        setCheckPwdMessage('비밀 번호가 일치 합니다.')
        setIsConPw(true);
    }  
    console.log("checkPwd : " + e);
};
  
  const changeConfirm = async() => {
    const newPassword = await AxiosApi.newPassword(userEmail, newPwd);
    if(newPassword.data === true) {
      setFinishModal(true);
    } else {
      setModalOpen(true);
      setModalText("비밀 번호 변경에 실패했습니다.");
    }
  };

  return (
    <>
      <Header />
      <LayoutContainer>
        <Sidebar />
        <ContentContainer>
          <StyledForm form={form} name="dynamic_rule">
            <StyledFormItem
              name="newPassword"
              label="New Password"
              rules={passwordRules.newPassword}
            >
              <Input.Password placeholder="새로운 비밀번호를 입력하세요" onChange={passwordChange}/>
              {newPwd.length > 0 && <span className={`message ${isPw ? 'success' : 'error'}`}>{pwdMessage}</span>}
            </StyledFormItem>
            <StyledFormItem
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['newPassword']}
              rules={passwordRules.confirmPassword}
            >
              <Input.Password placeholder="다시한번 입력해주세요." onChange={checkPasswordChange}/>
              {checkPwd.length > 0 && <span className={`message ${isConPw ? 'success' : 'error'}`}>{checkPwdMessage}</span>}
            </StyledFormItem>
            <StyledFormItem>
              {(isPw && isConPw) ?
              <Button type="primary" onClick={changeConfirm}>
                비밀번호 변경
              </Button> : 
              <Button type="primary" disabled>
              비밀번호 변경
              </Button>
              }
            </StyledFormItem>
          </StyledForm>
        </ContentContainer>
      </LayoutContainer>
      <Modal open={modalOpen} confirm={closeModal} justConfirm={true} header="오류">{modalText}</Modal>
      <Modal open={finishModal} confirm={closeModal} justConfirm={true} header="성공">비밀 번호가 변경 되었습니다.</Modal>
    </>
  );
};

export default NewPassword;
