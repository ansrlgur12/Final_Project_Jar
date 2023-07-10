package com.example.demo.service;

import com.example.demo.dto.CommentDto;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Member;
import com.example.demo.entity.Review;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional //@Transactional 메서드가 포함하고 있는 작업 중에 하나라도 실패할 경우 전체 작업을 취소한다.
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final ReviewRepository reviewRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, MemberRepository member1Repository,
                          ReviewRepository reviewRepository) {
        this.commentRepository = commentRepository;
        this.memberRepository = member1Repository;
        this.reviewRepository = reviewRepository;
    }

    /**
     * 특정 회원 댓글 생성
     */
    public CommentDto createComment(Long reviewId, Long memberId, String content) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원이 없습니다.")); // 에러처리
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("리뷰가 없습니다.")); // 에러처리

        Comment comment = new Comment();
        comment.setReview(review);
        comment.setMember(member);
        comment.setContent(content);
        comment.setCreatedAt(LocalDateTime.now());

        Comment savedComment = commentRepository.save(comment);

        return CommentDto.builder()
                .id(savedComment.getId())
                .postType(savedComment.getPostType())
                .reviewId(savedComment.getReview().getId())
                .memberId(savedComment.getMember().getId())
                .content(savedComment.getContent())
                .createdAt(savedComment.getCreatedAt())
                .build();
    }



    /**
     * 특정 회원 댓글 수정
     */
    public CommentDto updateComment(Long commentId, Long memberId, String content) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 댓글이 없습니다."));

        if(!comment.getMember().getId().equals(memberId)) {
            throw new IllegalStateException("댓글 작성자만 댓글을 수정할 수 있습니다.");
        }
        comment.setContent(content);

        commentRepository.save(comment);

        return new CommentDto(comment);
    }

    /**
     * 특정 회원 댓글 삭제
     */
    public void deleteComment(Long commentId, Long memberId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 댓글이 없습니다.")); // 에러처리

        if(!comment.getMember().getId().equals(memberId)){
            throw new IllegalStateException("댓글 작성자만 댓글을 작성할 수 있습니다.");
        }

        commentRepository.deleteById(commentId);

    }


    /**
     * 특정 게시글 댓글 조회
     */
    public List<CommentDto> getCommentsByReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("리뷰가 없습니다.")); // 에러처리

        List<Comment> comments = commentRepository.findByReview(review);
        List<CommentDto> commentDtos = new ArrayList<>();

        for (Comment comment : comments) {
            CommentDto commentDto = CommentDto.builder()
                    .id(comment.getId())
                    .postType(comment.getPostType())
                    .reviewId(comment.getReview().getId())
                    .memberId(comment.getMember().getId())
                    .content(comment.getContent())
                    .createdAt(comment.getCreatedAt())
                    .build();
            commentDtos.add(commentDto);
        }

        return commentDtos;
    }

    /**
     * 특정 회원이 작성한 댓글 가져오기
     */
    public List<CommentDto> getCommentsByMember(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원이 없습니다."));

        List<Comment> comments = commentRepository.findByMember(member);
        List<CommentDto> commentDtoList = new ArrayList<>();
        for (Comment comment : comments) {
            CommentDto commentDto = CommentDto.builder()
                    .id(comment.getId())
                    .reviewId(comment.getReview().getId())
                    .memberId(comment.getMember().getId())
                    .content(comment.getContent())
                    .createdAt(comment.getCreatedAt())
                    .build();
            commentDtoList.add(commentDto);
        }
        return commentDtoList;
    }

}

