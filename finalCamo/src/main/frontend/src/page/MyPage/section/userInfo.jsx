import React, { useContext } from 'react';
import { Descriptions } from 'antd';
import styled from 'styled-components';
import Header from '../../../main/header';
import Sidebar from '../sidebar';
import { UserContext } from '../../../API/UserInfo';

const StyledLayout = styled.div`
  display: flex;
`;

const StyledContent = styled.div`
  flex: 1;
  padding: 20px;
  margin: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const UserInfo = () => {
  const context = useContext(UserContext);
  const { nickName, userName, userPhoneNm, userEmail, userAddr } = context;
  return (
    <>
      <Header />
      <StyledLayout>
        <Sidebar />
        <StyledContent>
          <Descriptions title="User Info">
            <Descriptions.Item label="UserName">{userName}</Descriptions.Item>
            <Descriptions.Item label="NickName">{nickName}</Descriptions.Item>
            <Descriptions.Item label="Telephone">{userPhoneNm}</Descriptions.Item>
            <Descriptions.Item label="Email">{userEmail}</Descriptions.Item>
            <Descriptions.Item label="Address">
              {userAddr}
            </Descriptions.Item>
          </Descriptions>
        </StyledContent>
      </StyledLayout>
    </>
  );
};

export default UserInfo;
