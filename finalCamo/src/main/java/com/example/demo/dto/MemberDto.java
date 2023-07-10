package com.example.demo.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class MemberDto {
    private Long id;
    private String userName;
    private String nickName;
    private String password;
    private String email;
    private String userAddr;
    private String userPhoneNm;
    private String userImg;
    private String userGrade;
    private int userScore;
    private String reqAgreed;
    private String optAgreed;
    private String snsLogin;
    private LocalDate join_time;
}
