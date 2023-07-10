package com.example.demo.service;

import com.example.demo.dto.CampDto;
import com.example.demo.dto.OjiNojiDto;
import com.example.demo.entity.Camp;
import com.example.demo.entity.OjiNoji;
import com.example.demo.repository.OjiNojiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OjiNojiService {
    @Autowired
    private OjiNojiRepository ojiNojiRepository;
    private OjiNojiDto ojiNojiDto;

    public Boolean save(Map<String, String> data){
        OjiNoji ojiNoji = new OjiNoji();
        System.out.println(data);
        ojiNoji.setMemberId(data.get("memberId"));
        ojiNoji.setMapX(data.get("mapX"));
        ojiNoji.setMapY(data.get("mapY"));
        ojiNoji.setSbrsCl(data.get("sbrsCl"));
        ojiNoji.setDoNm(data.get("doNm"));
        ojiNoji.setSigunguNm(data.get("sigunguNm"));
        ojiNoji.setFacltNm(data.get("facltNm"));
        ojiNoji.setDiff(data.get("diff"));
        ojiNoji.setIntro(data.get("intro"));
        ojiNoji.setAddr1(data.get("addr1"));
        ojiNoji.setUrl(data.get("url"));

        ojiNojiRepository.save(ojiNoji);
        return true;
    }

    public List<OjiNojiDto> getOjiData(String dho, String sigungu){
        List<OjiNoji> items = ojiNojiRepository.findAll();
        List<OjiNoji> itemsBySelect = ojiNojiRepository.findByDoNmContainingAndSigunguNmContaining(dho, sigungu);
        List<OjiNoji> itemsByDho = ojiNojiRepository.findByDoNmContaining(dho);
        List<OjiNojiDto> ojiNojiDtos = new ArrayList<>();
        if("ALL".equals(dho) && "시.군.구".equals(sigungu)){
            for (OjiNoji camp : items) {
                OjiNojiDto campDto = new OjiNojiDto();
                campDto.setFacltNm(camp.getFacltNm());
                campDto.setDoNm(camp.getDoNm());
                campDto.setSigunguNm(camp.getSigunguNm());
                campDto.setMapX(camp.getMapX());
                campDto.setMapY(camp.getMapY());
                campDto.setIntro(camp.getIntro());
                campDto.setDiff(camp.getDiff());
                campDto.setSbrsCl(camp.getSbrsCl());
                campDto.setAddr1(camp.getAddr1());
                campDto.setUrl(camp.getUrl());
                campDto.setViewCount(camp.getViewCount());
                ojiNojiDtos.add(campDto);
            }
        } else if (!"ALL".equals(dho) && "시.군.구".equals(sigungu)) {
            for (OjiNoji camp : itemsByDho) {
                OjiNojiDto campDto = new OjiNojiDto();
                campDto.setFacltNm(camp.getFacltNm());
                campDto.setFacltNm(camp.getFacltNm());
                campDto.setDoNm(camp.getDoNm());
                campDto.setSigunguNm(camp.getSigunguNm());
                campDto.setMapX(camp.getMapX());
                campDto.setMapY(camp.getMapY());
                campDto.setIntro(camp.getIntro());
                campDto.setDiff(camp.getDiff());
                campDto.setSbrsCl(camp.getSbrsCl());
                campDto.setAddr1(camp.getAddr1());
                campDto.setUrl(camp.getUrl());
                campDto.setViewCount(camp.getViewCount());
                ojiNojiDtos.add(campDto);

            }
        } else {
            for (OjiNoji camp : itemsBySelect) {
                OjiNojiDto campDto = new OjiNojiDto();
                campDto.setFacltNm(camp.getFacltNm());
                campDto.setDoNm(camp.getDoNm());
                campDto.setSigunguNm(camp.getSigunguNm());
                campDto.setMapX(camp.getMapX());
                campDto.setMapY(camp.getMapY());
                campDto.setIntro(camp.getIntro());
                campDto.setDiff(camp.getDiff());
                campDto.setSbrsCl(camp.getSbrsCl());
                campDto.setAddr1(camp.getAddr1());
                campDto.setUrl(camp.getUrl());
                campDto.setViewCount(camp.getViewCount());
                ojiNojiDtos.add(campDto);

            }
        }
        return ojiNojiDtos;
    }
    public List<OjiNojiDto> getOjiOverlay(String xValue, String yValue){
        List<OjiNoji> items = ojiNojiRepository.findByMapXAndMapY(xValue, yValue);
        List<OjiNojiDto> ojiNojiDtos = new ArrayList<>();
        for (OjiNoji camp : items ) {
            OjiNojiDto ojiNojiDto = new OjiNojiDto();
            ojiNojiDto.setFacltNm(camp.getFacltNm());
            ojiNojiDto.setAddr1(camp.getAddr1());
            ojiNojiDto.setMapX(camp.getMapX());
            ojiNojiDto.setMapY(camp.getMapY());
            ojiNojiDto.setIntro(camp.getIntro());
            ojiNojiDto.setDiff(camp.getDiff());
            ojiNojiDto.setSbrsCl(camp.getSbrsCl());
            ojiNojiDto.setUrl(camp.getUrl());
            ojiNojiDto.setViewCount(camp.getViewCount());
            ojiNojiDtos.add(ojiNojiDto);
        }
        return ojiNojiDtos;
    }

    public List<OjiNojiDto> getSearchData(String searchValue){

        List<OjiNoji> items = ojiNojiRepository.findByFacltNmContaining(searchValue);
        List<OjiNojiDto> ojiNojiDtos = new ArrayList<>();

            for (OjiNoji camp : items ) {
                OjiNojiDto ojinojiDto = new OjiNojiDto();
                ojinojiDto.setFacltNm(camp.getFacltNm());
                ojinojiDto.setAddr1(camp.getAddr1());
                ojinojiDto.setMapX(camp.getMapX());
                ojinojiDto.setMapY(camp.getMapY());
                ojinojiDto.setViewCount(camp.getViewCount());
                ojinojiDto.setUrl(camp.getUrl());
                ojiNojiDtos.add(ojinojiDto);
            }
        return ojiNojiDtos;
    }

    public List<OjiNojiDto> getMemberMarkedCamp(String memberId) {
        List<OjiNoji> items = ojiNojiRepository.findByMemberId(memberId);
        List<OjiNojiDto> ojiNojiDtos = new ArrayList<>();

        for (OjiNoji camp : items ) {
            OjiNojiDto ojinojiDto = new OjiNojiDto();
            ojinojiDto.setFacltNm(camp.getFacltNm());
            ojinojiDto.setMapX(camp.getMapX());
            ojinojiDto.setMapY(camp.getMapY());
            ojinojiDto.setUrl(camp.getUrl());
            ojiNojiDtos.add(ojinojiDto);
        }
        return ojiNojiDtos;
    }
}
