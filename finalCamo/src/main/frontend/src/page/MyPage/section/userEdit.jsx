import React, { useContext, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload, Checkbox } from 'antd';
import styled from 'styled-components';
import Header from '../../../main/header';
import Sidebar from '../sidebar';
import { UserContext } from '../../../API/UserInfo';
import AxiosApi from '../../../API/TestAxios';
import Modal from '../../../util/modal';

const LayoutContainer = styled.div`
  display: flex;
`;

const SidebarContainer = styled.div`
  flex: 0 0 200px;
  height: 10vh;
  background-color: #FFFFFF;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const StyledCheckbox = styled(Checkbox)`
  width: 300px;
  margin-bottom: 20px;
`;

const StyledUserEdit = styled(Form)`
  width: 600px;

  .hint {
    font-size: 0.6rem;
    margin: 0;
  }
  .success {
    color: royalblue;
    margin: 0;
  }
  .error {
    color: red;
    margin: 0;
  }
`;

const StyledButton = styled(Button)`
  display: flex;
  margin: auto;
`;

const normFile = (e) => { //프로필사진 업로드 설정 함수
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const UserEdit = () => {
  const context = useContext(UserContext);
  const { nickName, userPhoneNm, userEmail, userAddr, id } = context;

  // 전송 데이터
  const [chgNick, setChgNick] = useState('');
  const [chgEmail, setChgEmail] = useState('');
  const [chgPhone, setChgPhone] = useState('');
  const [chgImg, setChgImg] = useState('');
  
  // 팝업
  const [modalOpen, setModalOpen] = useState(false);
  const [finishModal, setFinishModal] = useState(false);
  const [modalText, setModalText] = useState("중복된 아이디 입니다.");
  const closeModal = () => {
    setFinishModal(false);
    setModalOpen(false);
  };

  // 오류 메세지
  const [nickMessage, setNickMessage] = useState("");
  const [mailMessage, setMailMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");

  //유효성 검사
  const [isNick, setIsNick] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  const generateDummyData = () => {
    return {
      userId: id,
      userNname: nickName,
      userMail: userEmail,
      userTel: userPhoneNm,
    };
  };

  const changeNick = (e) => {
    setChgNick(e.target.value);
    if (e.target.value.length < 5 || e.target.value.length > 12) {
        setNickMessage("5자리 이상 12자리 미만으로 입력해 주세요.");
        setIsNick(false);    
    } else {
        setNickMessage("올바른 형식 입니다.");
        setIsNick(true);
    }
  };

  const changeEmail = (e) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const emailCurrent = e.target.value;
    setChgEmail(emailCurrent);
    if (!emailRegex.test(emailCurrent)) {
        setMailMessage('이메일 형식을 입력해주세요.');
        setIsEmail(false);
    } else {
        setMailMessage('이메일 형식에 맞습니다.');
        setIsEmail(true);
    }
  };

  const changePhone = (e) => {
    const phoneNumber = e.target.value; // 입력된 값을 문자열로 직접 가져옵니다.
    setChgPhone(phoneNumber);
    if (phoneNumber.length < 5 || phoneNumber.length > 12) {
        setPhoneMessage("전화번호 형식에 맞춰 주세요.");
        setIsPhone(false);    
    } else {
        setPhoneMessage("올바른 형식 입니다.");
        setIsPhone(true);
    }
  };



  const [formDisabled, setFormDisabled] = useState(true);
  const [initialValues, setInitialValues] = useState(generateDummyData());

  const subUserInfo = async() => {
    const infoUpdate = await AxiosApi.userInfo(id, chgNick, chgEmail, chgPhone, chgImg)
    if(!infoUpdate.data === true){
      setModalText("입력 사항을 다시 확인해 주세요.");
      setModalOpen(true);
    } else {
      setFinishModal(true);
    }
  };

  return (
    <>
      <Header />
      <LayoutContainer>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <ContentContainer>
          <StyledCheckbox
            checked={!formDisabled}
            onChange={(e) => setFormDisabled(!e.target.checked)}
          >
            나의 정보 수정하기
          </StyledCheckbox>

          <StyledUserEdit
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            initialValues={initialValues}
          >
            <Form.Item label="User ID" name="userId">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Nickname" name="userNname">
              <Input disabled={formDisabled} onChange={changeNick} />
              {chgNick.length > 0 && <span className={`hint ${isNick ? 'success' : 'error'}`}>{nickMessage}</span>}
            </Form.Item>
            <Form.Item label="Email" name="userMail">
              <Input disabled={formDisabled} onChange={changeEmail}/>
              {chgEmail.length > 0 && <span className={`hint ${isEmail ? 'success' : 'error'}`}>{mailMessage}</span>}
            </Form.Item>
            <Form.Item label="Phone Number" name="userTel">
              <Input disabled={formDisabled} onChange={changePhone}/>
              {chgPhone > 0 && <span className={`hint ${isPhone ? 'success' : 'error'}`}>{phoneMessage}</span>}
            </Form.Item>
            <Form.Item
              label="Profile Image"
              name="userImage"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload action="/upload.do" listType="picture-card" disabled={formDisabled}>
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>사진 올리기</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item>
              <StyledButton type="primary" disabled={formDisabled} onClick={subUserInfo}>
                회원 정보 변경
              </StyledButton>
            </Form.Item>
          </StyledUserEdit>
        </ContentContainer>
      </LayoutContainer>
      <Modal open={modalOpen} confirm={closeModal} justConfirm={true} header="오류">{modalText}</Modal>
      <Modal open={finishModal} confirm={closeModal} justConfirm={true} header="성공">회원 정보가 변경 되었습니다.</Modal>
    </>
  );
};

export default UserEdit;
