import React, { useState, useEffect } from 'react';
import { HeartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Layout, Modal } from 'antd';
import styled from 'styled-components';
import camping from '../../../images/camping.png';
import ReviewApi from '../../../API/ReviewAPI';
import CommentForm from './commentForm';
import CommentList from './commentList';
import { useParams, Link } from 'react-router-dom';
import Header from '../../../main/header';
import LikesApi from '../../../API/LikesAPI';

const { Content } = Layout;

const ReviewContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #DDDDDD;
`;

const ReviewTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ReviewContent = styled.p`
  font-size: 16px;
  line-height: 1.6;
`;

const ReviewImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

const ReviewMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const ReviewDate = styled.p`
  font-size: 14px;
  color: #888;
`;

const ReviewActions = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: ${({ liked }) => (liked ? '#f5222d' : '#888')};
  margin-left: 10px;
`;

const ReviewDetail = () => {
  const [review, setReview] = useState(null);
  const [liked, setLiked] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id } = useParams();
  const memberId = 1;

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await ReviewApi.getReviewById(id);
        const reviewData = response.data;
        setReview(reviewData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReview();
  }, [id]);

  const handleLikeReview = async () => {
    try {
      if (!liked) {
        await LikesApi.likeReview(memberId, id);
        setLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReview = async () => {
    try {
      await ReviewApi.deleteReview(memberId, review?.id);
      setShowDeleteModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <Layout>
      <Header />
      <Content style={{ padding: '120px', position: 'relative', backgroundColor: '#FFFFFF' }}>
        {review ? (
          <ReviewContainer>
            <ReviewTitle>{review.title}</ReviewTitle>
            <ReviewContent>{review.content}</ReviewContent>
            <ReviewImage src={review.img} alt="Review Image" />
            <ReviewMeta>
              <ReviewDate>작성일: {review.date}</ReviewDate>
              <ReviewActions>
                <ReviewButton onClick={handleLikeReview} liked={liked}>
                  <HeartOutlined />
                  좋아요
                </ReviewButton>
                <Link to={`/modifiedReview/${id}`}>
                  <ReviewButton>
                    <EditOutlined />
                    수정하기
                  </ReviewButton>
                </Link>
                <ReviewButton onClick={handleDeleteReview}>
                  <DeleteOutlined />
                  삭제하기
                </ReviewButton>
              </ReviewActions>
            </ReviewMeta>
            <CommentList reviewId={review?.id} />
            <CommentForm reviewId={review?.id} />

            <Modal
              title="리뷰 삭제"
              visible={showDeleteModal}
              onOk={handleConfirmDelete}
              onCancel={handleCancelDelete}
              footer={null}
            >
              <h3>삭제 완료</h3>
              <p>글이 성공적으로 삭제되었습니다.</p>
              <Link to="/community">확인</Link>
            </Modal>
          </ReviewContainer>
        ) : (
          <p>리뷰가 없습니다.</p>
        )}
      </Content>
    </Layout>
  );
};

export default ReviewDetail;
