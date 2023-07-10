import axios from 'axios';

export const COMMENT_API_URL = '/comment';

const CommentApi = {
  // 댓글 생성
  createComment: async (reviewId, memberId, content) => {
    const comment = {
      reviewId: reviewId,
      memberId: memberId,
      content: content
    };
    return await axios.post(`${COMMENT_API_URL}`, comment);
  },

// 댓글 수정
updateComment: async (commentId, memberId, content) => {
  const comment = {
    content: content
  };
  const config = {
    params: {
      memberId: memberId
    }
  };
  return await axios.put(`${COMMENT_API_URL}/${commentId}`, comment, config);
},

// 댓글 삭제
deleteComment: async (commentId, memberId) => {
  const config = {
    params: {
      memberId: memberId
    }
  };
  return await axios.delete(`${COMMENT_API_URL}/${commentId}`, config);
},

  // 댓글 조회
  getCommentByReview: async (reviewId) => {
    return await axios.get(`${COMMENT_API_URL}/review/${reviewId}`);
  }
,

  // 특정 회원의 댓글 조회
  getCommentsByMember: async (memberId) => {
    return await axios.get(`${COMMENT_API_URL}/member/${memberId}`);
  }
};

export default CommentApi;

