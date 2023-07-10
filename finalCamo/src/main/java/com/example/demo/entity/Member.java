package com.example.demo.entity;

//import com.example.demo.constant.Authority;
import com.example.demo.constant.Authority;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "member")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member {
    @Id
    @Column(name="member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userName;
    @Column(unique = true, nullable = false)
    private String nickName;

    @Column(nullable = false)
    private String password;
    @Column(unique = true, nullable = false)
    private String email;
    private String userAddr;
    private String userPhoneNm;
    @Column(length = 500)
    private String userImg;
    private String userGrade = "1";
    private int userScore;
    @Column(nullable = false)
    private String reqAgreed;
    private String optAgreed;
    private String snsLogin;
    private LocalDateTime join_time;


    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Builder
    public Member(String nickName, String email, String password, String reqAgreed, Authority authority){
        this.nickName = nickName;
        this.email = email;
        this.password = password;
        this.reqAgreed = reqAgreed;
        this.authority = authority;
    }

    @OneToMany(mappedBy = "member")
    private List<Cart> cart; // 회원의 장바구니 리스트

    @OneToMany(mappedBy = "member")
    private List<Comment> comment; // 답글

    @OneToMany(mappedBy = "member")
    private List<Likes> likes; // 좋아요

    @OneToMany(mappedBy = "member")
    private List<OneLineReview> oneLineReview; // 한줄평

//    @OneToMany(mappedBy = "member")
//    private List<Order> orders; // 주문

    @OneToMany(mappedBy = "member")
    private List<Review> review; // 리뷰게시판
}
