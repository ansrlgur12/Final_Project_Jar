package com.example.demo.controller;

import com.example.demo.dto.CampDto;
import com.example.demo.dto.LikesDto;
import com.example.demo.service.LikesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/likes")
public class LikesController {

    private final LikesService likesService;

    @Autowired
    public LikesController(LikesService likesService) {
        this.likesService = likesService;
    }

    /**
     * 특정 상품 좋아요
     */
    @PostMapping("/product/{productId}/member/{memberId}")
    public ResponseEntity<LikesDto> likeProduct(@PathVariable Long memberId, @PathVariable Long productId) {
        return ResponseEntity.ok(likesService.likeProductByMember(memberId, productId));
    }

    /**
     * 특정 상품 좋아요 취소
     */
    @DeleteMapping("/product/{productId}/member/{memberId}")
    public ResponseEntity<Void> unlikeProduct(@PathVariable Long memberId, @PathVariable Long productId) {
        likesService.unlikeProductByMember(memberId, productId);
        return ResponseEntity.ok().build();
    }

    /**
     * 특정 상품 좋아요 갯수 확인
     */
    @GetMapping("/product/{productId}")
    public ResponseEntity<Integer> countProductLikes(@PathVariable Long productId) {
        return ResponseEntity.ok(likesService.countLikesByProduct(productId));
    }

    /**
     * 특정 캠핑장 좋아요
     */
    @PostMapping("/camp/{campId}/member/{memberId}")
    public ResponseEntity<LikesDto> likeCamp(@PathVariable Long memberId, @PathVariable Long campId) {
        return ResponseEntity.ok(likesService.likeCampByMember(memberId, campId));
    }

    /**
     * 특정 캠핑장 좋아요 취소
     */
    @DeleteMapping("/camp/{campId}/member/{memberId}")
    public ResponseEntity<Void> unlikeCamp(@PathVariable Long memberId, @PathVariable Long campId) {
        likesService.unlikeCampByMember(memberId, campId);
        return ResponseEntity.ok().build();
    }

    /**
     * 특정 상품 캠핑장 갯수 확인
     */
    @GetMapping("/camp/{campId}")
    public ResponseEntity<Integer> countCampLikes(@PathVariable Long campId) {
        return ResponseEntity.ok(likesService.countLikesByCamp(campId));
    }

    /**
     * 특정 리뷰 좋아요
     */
    @PostMapping("/review/{reviewId}/member/{memberId}")
    public ResponseEntity<LikesDto> likeReview(@PathVariable Long memberId, @PathVariable Long reviewId) {
        return ResponseEntity.ok(likesService.likeReviewByMember(memberId, reviewId));
    }

    /**
     * 특정 리뷰 좋아요 취소
     */
    @DeleteMapping("/review/{reviewId}/member/{memberId}")
    public ResponseEntity<Void> unlikeReview(@PathVariable Long memberId, @PathVariable Long reviewId) {
        likesService.unlikeReviewByMember(memberId, reviewId);
        return ResponseEntity.ok().build();
    }

    /**
     * 특정 리뷰 좋아요 갯수 확인
     */
    @GetMapping("/review/{reviewId}")
    public ResponseEntity<Integer> countReviewLikes(@PathVariable Long reviewId) {
        return ResponseEntity.ok(likesService.countLikesByReview(reviewId));
    }

    /**
     * 특정 회원 좋아요 클릭 여부
     */
    @GetMapping("/checkLike/{campId}/{memberId}")
    public ResponseEntity<Integer> checkLike(@PathVariable Long campId, @PathVariable Long memberId) {
        int count = likesService.checkLike(campId, memberId);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    /**
     * 특정 회원 좋아요 클릭한 캠핑장 목록
     */
    @GetMapping("/memberLikedCamp/{memberId}")
    public ResponseEntity<List<CampDto>> getMemberLikedCamps(@PathVariable Long memberId) {
        List<CampDto> campDtos = likesService.getMemberLikedCamps(memberId);
        return ResponseEntity.ok(campDtos);
    }
}
