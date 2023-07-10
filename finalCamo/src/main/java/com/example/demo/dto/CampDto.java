package com.example.demo.dto;

import com.example.demo.entity.Likes;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class CampDto {
        private Long id;
        private String facltNm;
        private String brazierCl;
        private String sbrsCl;
        private String sbrsEtc;
        private String wtrplCo;
        private String toiletCo;
        private String swrmCo;
        private String doNm;
        private String sigunguNm;
        private String addr1;
        private String mapX;
        private String mapY;
        private String tel;
        private String homepage;
        private String resveCl;
        private String intro;
        private String featureNm;
        private String animalCmgCl;
        private String firstImageUrl;
        private String createdtime;
        private String lineIntro;
        private String eqpmnLendCl;

        private Integer viewCount;

        private String contentId;
        private int likes;
        private int comments;
}
