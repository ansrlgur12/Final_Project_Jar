package com.example.demo.controller;

import com.example.demo.dto.CampDto;
import com.example.demo.dto.OjiNojiDto;
import com.example.demo.entity.Camp;
import com.example.demo.entity.OjiNoji;
import com.example.demo.repository.OjiNojiRepository;
import com.example.demo.service.OjiNojiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/oji")
public class OjiNojiController {

    private final OjiNojiService ojiNojiService;
    private final OjiNojiRepository ojiNojiRepository;


    @PostMapping("/newMark")
    public ResponseEntity<Boolean> newMark(@RequestBody Map<String, String> data) {
        System.out.println(data);
        Boolean isTrue = ojiNojiService.save(data);
        return new ResponseEntity<>(isTrue, HttpStatus.OK);
    }

    @GetMapping("/ojiData/{dho}/{sigungu}")
    public ResponseEntity<List<OjiNojiDto>> campData(@PathVariable String dho, @PathVariable String sigungu) {
        List<OjiNojiDto> list = ojiNojiService.getOjiData(dho, sigungu);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/overlay/{xValue}/{yValue}")
    public ResponseEntity<List<OjiNojiDto>> overlay(@PathVariable String xValue, @PathVariable String yValue){
        List<OjiNojiDto> list = ojiNojiService.getOjiOverlay(xValue, yValue);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/searchOjiData/{searchValue}")
    public ResponseEntity<List<OjiNojiDto>> searchData(@PathVariable String searchValue){
        System.out.println(searchValue);
        List<OjiNojiDto> list = ojiNojiService.getSearchData(searchValue);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    @GetMapping("/viewCount/{facltNm}")
    public ResponseEntity<String> viewCount(@PathVariable String facltNm) {
        List<OjiNoji> ojiNojis = ojiNojiRepository.findByFacltNm(facltNm);
        if (ojiNojis.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        OjiNoji ojiNoji = ojiNojis.get(0);
        ojiNoji.setViewCount(ojiNoji.getViewCount() + 1);
        ojiNojiRepository.save(ojiNoji);
        return ResponseEntity.ok(facltNm + "의 조회수가 증가되었습니다.");
    }

    @GetMapping("/memberMarkedCamp/{memberId}")
    public ResponseEntity<List<OjiNojiDto>> memberMarkedCamp(@PathVariable String memberId) {
        List<OjiNojiDto> list = ojiNojiService.getMemberMarkedCamp(memberId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
