import React, { useEffect, useState, useContext } from 'react';
import { HeartOutlined, EyeFilled } from '@ant-design/icons';
import { Avatar, Card, Row, Col, Layout } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import profile from "../../../images/profile.png";
import camping from "../../../images/camping.png";
import Header from '../../../main/header';
import Sider from 'antd/es/layout/Sider';
import Sidebar from '../sidebar';
import axios from 'axios';
import AxiosApi from '../../../API/TestAxios';
import { UserContext } from '../../../API/UserInfo';
import { MarkerContext } from '../../../context/MarkerInfo';

const { Meta } = Card;

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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyPostsWrapper = styled.div`
  padding: 40px;
  text-align: center;
`;

const PostContent = styled(Card)`
  width: 20vw;
  margin: 2vw;
  margin-bottom: 40px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const Title = styled.h2`
  margin-bottom: 30px;
`;

const MyOji = () => {
  const [posts, setPosts] = useState([]);
  const idContext = useContext(UserContext);
  const context = useContext(MarkerContext);
  const {id} = idContext;
  const {setOverlayOpen, setLocation, setZoomLev, setMarkerLat, setMarkerLng} = context;
  const nav = useNavigate();

  useEffect(() => {
    const memberId = id; // Your memberId constant
    fetchPostsByMember(memberId);
  }, [id]);

  const fetchPostsByMember = async (memberId) => {
    try {
      const response = await AxiosApi.memberMarkedCamp(memberId);
      const data = response.data;
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const onClickImage = (x, y) => {
    nav("/ojinoji");
    setZoomLev(1);
    setMarkerLat(y);
    setMarkerLng(x);
    setLocation([x, y])
    setOverlayOpen(true);
    

    
  };

  const renderPosts = () => {
    return posts.map((post) => (
      <Col span={10} key={post.id}>
        <PostContent
          cover={
              <img
                onClick={()=>onClickImage(post.mapX, post.mapY)}
                alt="대표이미지"
                src={post.url}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
          }
        >
          <Meta avatar={<Avatar src={profile} />} title={post.facltNm}/>
        </PostContent>
      </Col>
    ));
  };

  return (
    <>
      <Header />
      <StyledLayout>
        <Sidebar />
        <StyledContent>
          <MyPostsWrapper>
            <Row gutter={[50, 15]}>{renderPosts()}</Row>
          </MyPostsWrapper>
        </StyledContent>
      </StyledLayout>
    </>
  );
};

export default MyOji;
