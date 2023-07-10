import React, { useState, useEffect } from 'react';
import { HeartOutlined, EyeFilled, EditOutlined } from '@ant-design/icons';
import { Avatar, Card, Row, Col, Layout, Pagination, message } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import 사고팔기header from '../../../images/사고팔기header.jpg';
import ReviewApi from '../../../API/ReviewAPI';
import LikesApi from '../../../API/LikesAPI';
import { SelectButton } from '../community';
import Header from '../../../main/header';

const { Meta } = Card;
const { Content } = Layout;

const ReviewContent = styled(Card)`
  width: 300px;
  margin: 0 auto;
  margin-bottom: 40px;
  border: 1px solid #DDDDDD;
`;

const WriteButton = styled(Link)`
  position: absolute;
  top: 50px;
  right: 190px;
  display: flex;
  align-items: center;
  background-color: #2E2E2E;
  color: #fff;
  padding: 10px 15px;
  border-radius: 4px;
  text-decoration: none;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ReviewCards = () => {
  const [reviews, setReviews] = useState([]);
  const [likesCount, setLikesCount] = useState({});

  const heart = () => {
    message.success('좋아요 갯수가 현재 리뷰에 몇개가 있는지 알수있는 아이콘입니다.');
  };
  
  const view = () => {
    message.success('현재 리뷰의 조회수를 확인 할 수있습니다.');
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await ReviewApi.getAllReviews();
        console.log(response.data);
        const reviewData = response.data;
        setReviews(reviewData);

        let likesCountData = {};
        for (let review of reviewData) {
          const likesResponse = await LikesApi.countReviewLikes(review.id);
          likesCountData[review.id] = likesResponse.data;
        }
        setLikesCount(likesCountData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, []);

  const renderReviewCards = () => {
    return reviews.map((review, index) => {
      if (review.postType !== 1) {
        return null; // postType이 1이 아닌 경우, 리뷰 카드를 렌더링하지 않음
      }

      const memberProfileImg = review.member ? review.member.profileImg : '';

      return (
        <Col span={6} key={index}>
          <ReviewContent
            cover={
              <Link to={`/reviewDetail/${review.id}`}>
                <img
                  src={review.img}
                  alt="대표이미지"
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              </Link>
            }
            actions={[
              <span onClick={heart}><HeartOutlined /> {likesCount[review.id] || 0}</span>,
              <span onClick={view}><EyeFilled /> {review.viewCount || 0}</span>,
            ]}
          >
            <Meta
              avatar={<Avatar src={memberProfileImg} />}
              title={review.title}
            />
            <p>유료캠핑장</p>
          </ReviewContent>
        </Col>
      );
    });
  };

  return (
    <>
    <Header />
    <img
                  src={사고팔기header}
                  alt="대표이미지"
                  style={{ width: '100%', height: '270px', objectFit: 'cover' }}
                />
    <SelectButton />
    <Layout>
      <Content style={{ padding: '120px', position: 'relative', backgroundColor: '#FFFFFF' }}>
        <WriteButton to="/writeReviewPage">작성하기<EditOutlined style={{ marginLeft: '5px' }} /></WriteButton>
        <Row gutter={[10, 15]}>
          {reviews.length > 0 ? renderReviewCards() : <p>리뷰가 없습니다.</p>}
        </Row>
        <PaginationWrapper>
          <Pagination defaultCurrent={1} total={15} />
        </PaginationWrapper>
      </Content>
    </Layout>
    </>
  );
};

export default ReviewCards;
