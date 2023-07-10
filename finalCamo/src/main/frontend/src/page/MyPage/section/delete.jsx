import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../../main/header';
import Sidebar from '../sidebar';

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
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const NoticeList = styled.ul`
  list-style: disc inside;
  padding: 20px;
`;

const Input = styled.input`
  width: 280px;
  height: 40px;
  margin-right: 5px;
`;

const ConfirmButton = styled.button`
  padding: 8px 16px;
  color: #fff;
  background-color: #6c757d;
  border-radius: 5px;
  font-size: 16px;
  border: 0;
`;

function Delete() {
  const [inputPwd, setInputPwd] = useState('');

  const handleChangePassword = (e) => { //패스워드 입력 필드의 값이 변경될때 호출
    setInputPwd(e.target.value);
  }

  const handleDeleteMember = () => { 
//회원 탈퇴 로직구간
  }
  
  return (
    <>
      <Header />
      <LayoutContainer>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <ContentContainer>
          <h4>정말 탈퇴 하시겠습니까?</h4>
          <NoticeList>
            <li>탈퇴신청 시 1주일 뒤에 처리됩니다.</li>
            <li>1주일 이내 다시 로그인 할 경우 다시 복구신청이 가능합니다.</li>
            <li>탈퇴신청 1주일이 지나면 영구탈퇴가 되므로 주의바랍니다.</li>
          </NoticeList>
          <div>
            <Input value={inputPwd} onChange={handleChangePassword} type='password' placeholder='패스워드를 입력 후 확인을 눌러주세요' />
            <ConfirmButton onClick={handleDeleteMember} type='button'>확인</ConfirmButton>
          </div>
        </ContentContainer>
      </LayoutContainer>
    </>
  );
}

export default Delete;
