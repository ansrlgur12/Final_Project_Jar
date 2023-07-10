package com.example.demo.service;

import com.example.demo.dto.CommentDto;
import com.example.demo.dto.ReviewDto;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Member;
import com.example.demo.entity.Review;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, MemberRepository memberRepository,
                         CommentRepository commentRepository) {
        this.reviewRepository = reviewRepository;
        this.memberRepository = memberRepository;
        this.commentRepository = commentRepository;
    }

    /**
     * 리뷰 작성
     */
    public ReviewDto createReview(Long memberId, String title, String content, LocalDate date, int postType,
                                  Long viewCount, String img) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원이 없습니다."));

        Review review = new Review();
        review.setMember(member);
        review.setTitle(title);
        review.setContent(content);
        review.setDate(date);
        review.setPostType(postType);
        review.setViewCount(viewCount);
        review.setImg(img);

        Review savedReview = reviewRepository.save(review);

        return ReviewDto.builder()
                .id(savedReview.getId())
                .memberId(savedReview.getMember().getId())
                .title(savedReview.getTitle())
                .content(savedReview.getContent())
                .date(savedReview.getDate())
                .postType(savedReview.getPostType())
                .img(savedReview.getImg())
                .viewCount(review.getViewCount() + 1)
                .build();
    }

    /**
     * 리뷰 수정
     */
    @Transactional
    public ReviewDto updateReview(Long id, ReviewDto reviewDto, Long memberId) {  // memberId 파라미터 추가
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

        if (!review.getMember().getId().equals(memberId)) {  // 작성자와 로그인한 사용자가 다른 경우 예외 발생
            throw new IllegalStateException("본인이 작성한 리뷰만 수정할 수 있습니다.");
        }

        review.setTitle(reviewDto.getTitle());
        review.setContent(reviewDto.getContent());
        review.setDate(reviewDto.getDate());
        review.setPostType(reviewDto.getPostType());
        review.setViewCount(review.getViewCount());
        review.setImg(review.getImg());

        Review updatedReview = reviewRepository.save(review);

        return ReviewDto.builder()
                .id(updatedReview.getId())
                .memberId(updatedReview.getMember().getId())
                .title(updatedReview.getTitle())
                .content(updatedReview.getContent())
                .date(updatedReview.getDate())
                .postType(updatedReview.getPostType())
                .img(updatedReview.getImg())
                .viewCount(review.getViewCount() + 1)
                .build();
    }

    /**
     * 리뷰 삭제
     */
    public void deleteReview(Long id, Long memberId) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 리뷰가 없습니다."));

        if (!review.getMember().getId().equals(memberId)) {
            throw new IllegalArgumentException("리뷰 작성자만 리뷰를 삭제할 수 있습니다.");
        }

        // 관련된 댓글 삭제
        List<Comment> comments = review.getComment();
        commentRepository.deleteAll(comments);

        // 리뷰 삭제
        reviewRepository.deleteById(id);
    }


    /**
     * 모든 리뷰 가져오기
     */
    @Transactional(readOnly = true)
    public List<ReviewDto> getAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        List<ReviewDto> reviewDtoList = new ArrayList<>();
        for (Review review : reviews) {
            ReviewDto reviewDto = ReviewDto.builder()
                    .id(review.getId())
                    .memberId(review.getMember().getId())
                    .title(review.getTitle())
                    .content(review.getContent())
                    .date(review.getDate())
                    .postType(review.getPostType())
                    .img(review.getImg())
                    .viewCount(review.getViewCount() + 1)
                    .build();
            reviewDtoList.add(reviewDto);
        }
        return reviewDtoList;
    }

    /**
     * 특정 회원이 작성한 리뷰 가져오기
     */
    @Transactional(readOnly = true)
    public List<ReviewDto> getReviewsByMember(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원이 없습니다."));

        List<Review> reviews = reviewRepository.findByMember(member);
        List<ReviewDto> reviewDtoList = new ArrayList<>();
        for (Review review : reviews) {
            ReviewDto reviewDto = ReviewDto.builder()
                    .id(review.getId())
                    .memberId(review.getMember().getId())
                    .title(review.getTitle())
                    .content(review.getContent())
                    .date(review.getDate())
                    .postType(review.getPostType())
                    .img(review.getImg())
                    .viewCount(review.getViewCount() + 1)
                    .build();
            reviewDtoList.add(reviewDto);
        }
        return reviewDtoList;
    }

    /**
     * 특정 게시글에 맞는 리뷰 가져오기
     */
    @Transactional
    public List<ReviewDto> getReviewsByPostType(int postType) {
        List<Review> reviews = reviewRepository.findByPostType(postType);
        List<ReviewDto> reviewDtoList = new ArrayList<>();
        for (Review review : reviews) {
            ReviewDto reviewDto = ReviewDto.builder()
                    .id(review.getId())
                    .memberId(review.getMember().getId())
                    .title(review.getTitle())
                    .content(review.getContent())
                    .date(review.getDate())
                    .postType(review.getPostType())
                    .img(review.getImg())
                    .viewCount(review.getViewCount() + 1)
                    .build();
            reviewDtoList.add(reviewDto);
        }
        return reviewDtoList;
    }

    /**
     * 특정 게시글번호에 해당하는 리뷰 가져오기 및 조회수 증가
     */
    public ReviewDto getReviewById(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));
        reviewRepository.incrementViewCount(id);
        return ReviewDto.builder()
                .id(review.getId())
                .memberId(review.getMember().getId())
                .title(review.getTitle())
                .content(review.getContent())
                .date(review.getDate())
                .postType(review.getPostType())
                .img(review.getImg())
                .viewCount(review.getViewCount() + 1)
                .build();
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