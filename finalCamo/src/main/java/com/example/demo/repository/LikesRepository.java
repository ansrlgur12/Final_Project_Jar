package com.example.demo.repository;

import com.example.demo.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {
    int countByProduct(Product product);
    void deleteByMemberAndProduct(Member member, Product product);

    int countByCamp(Camp camp);
    void deleteByMemberAndCamp(Member member, Camp camp);
    void deleteByMemberAndReview(Member member, Review review);
    int countByReview(Review review);
    boolean existsByCampAndMember(Camp camp, Member member);
}