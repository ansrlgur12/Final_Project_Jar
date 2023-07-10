package com.example.demo.service;

import com.example.demo.dto.CampDto;
import com.example.demo.dto.LikesDto;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class LikesService {

    private final LikesRepository likesRepository;
    private final MemberRepository memberRepository;
    private final ProductRepository productRepository;
    private final CampRepository campRepository;

    private final ReviewRepository reviewRepository;

    @Autowired
    public LikesService(LikesRepository likesRepository, MemberRepository memberRepository,
                        ProductRepository productRepository, CampRepository campRepository,
                        ReviewRepository reviewRepository){

        this.likesRepository = likesRepository;
        this.memberRepository = memberRepository;
        this.productRepository = productRepository;
        this.campRepository = campRepository;
        this.reviewRepository = reviewRepository;
    }

    /**
     * 특정 상품 좋아요
     */
    public LikesDto likeProductByMember(Long memberId, Long productId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원이 없습니다."));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("제품이 없습니다."));

        Likes savedLike = Likes.builder()
                .member(member)
                .product(product)
                .build();
        savedLike = likesRepository.save(savedLike);

        LikesDto likesDto = LikesDto.builder()
                .count(savedLike.getCount())
                .productId(savedLike.getProduct().getId())
                .memberId(savedLike.getMember().getId())
                .build();

        return likesDto;
    }

    /**
     * 특정 상품 좋아요 취소
     */
    public void unlikeProductByMember(Long memberId, Long productId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원이 없습니다."));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("제품이 없습니다."));
        likesRepository.deleteByMemberAndProduct(member, product);
    }

    /**
     * 특정 상품 좋아요 갯수 확인
     */
    public int countLikesByProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("제품이 없습니다."));
        return likesRepository.countByProduct(product);
    }

    /**
     * 특정 캠핑장 좋아요
     */
    public LikesDto likeCampByMember(Long memberId, Long campId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원이 없습니다."));
        Camp camp = campRepository.findById(campId)
                .orElseThrow(() -> new RuntimeException("캠핑장이 없습니다."));

        Likes savedLike = Likes.builder()
                .member(member)
                .camp(camp)
                .build();
        savedLike = likesRepository.save(savedLike);

        LikesDto likesDto = LikesDto.builder()
                .count(savedLike.getCount())
                .campId(savedLike.getCamp().getId())
                .memberId(savedLike.getMember().getId())
                .build();

        return likesDto;
    }


    /**
     * 특정 캠핑장 좋아요 취소
     */
    public void unlikeCampByMember(Long memberId, Long campId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원이 없습니다."));
        Camp camp = campRepository.findById(campId)
                .orElseThrow(() -> new RuntimeException("캠프가 없습니다."));
        likesRepository.deleteByMemberAndCamp(member, camp);
    }

    /**
     * 특정 캠핑장 좋아요 갯수 확인
     */
    public int countLikesByCamp(Long campId) {
        Camp camp = campRepository.findById(campId)
                .orElseThrow(() -> new RuntimeException("캠프가 없습니다."));
        return likesRepository.countByCamp(camp);
    }

    /**
     * 특정 게시판 리뷰 좋아요 추가
     */
    public LikesDto likeReviewByMember(Long memberId, Long reviewId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원이 없습니다."));
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("리뷰가 없습니다."));

        Likes savedLike = Likes.builder()
                .member(member)
                .review(review)
                .build();
        savedLike = likesRepository.save(savedLike);

        LikesDto likesDto = LikesDto.builder()
                .count(savedLike.getCount())
                .reviewId(savedLike.getReview().getId())
                .memberId(savedLike.getMember().getId())
                .build();

        return likesDto;
    }

    /**
     * 특정 게시판 리뷰 좋아요 취소
     */
    public void unlikeReviewByMember(Long memberId, Long reviewId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원이 없습니다."));
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("리뷰가 없습니다."));
        likesRepository.deleteByMemberAndReview(member, review);
    }

    /**
     * 특정 게시판 리뷰 갯수 확인
     */
    public int countLikesByReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("리뷰가 없습니다."));
        return likesRepository.countByReview(review);
    }

    /**
     * 특정 회원 좋아요 여부 확인
     */
    public int checkLike(Long campId, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원이 없습니다."));
        Camp camp = campRepository.findById(campId)
                .orElseThrow(() -> new RuntimeException("캠프가 없습니다."));

        boolean liked = likesRepository.existsByCampAndMember(camp, member);

        if (liked) {
            return 1; // 좋아요를 이미 눌렀음
        } else {
            return 0; // 좋아요를 누르지 않았음
        }
    }

    /**
     * 특정 회원 좋아요 클릭한 캠핑장 목록
     */
    public List<CampDto> getMemberLikedCamps(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원이 없습니다."));

        List<Camp> likedCamps = member.getLikes().stream()
                .map(Likes::getCamp)
                .collect(Collectors.toList());

        List<CampDto> campDtos = likedCamps.stream()
                .map(camp -> {
                    CampDto campDto = new CampDto();
                    campDto.setFacltNm(camp.getFacltNm());
                    campDto.setAddr1(camp.getAddr1());
                    campDto.setMapX(camp.getMapX());
                    campDto.setMapY(camp.getMapY());
                    campDto.setFirstImageUrl(camp.getFirstImageUrl());
                    return campDto;
                })
                .collect(Collectors.toList());

        return campDtos;
    }
}
