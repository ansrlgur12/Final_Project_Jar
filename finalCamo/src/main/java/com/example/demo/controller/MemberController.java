package com.example.demo.controller;

import com.example.demo.dto.MemberDto;
import com.example.demo.entity.Member;
import com.example.demo.service.EmailService;
import com.example.demo.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@Slf4j
@RequestMapping("")
public class MemberController {

    /**
     * Service 로직 연결
     */
    private final MemberService memberService;

    private final EmailService emailService;

    @Autowired
    public MemberController(MemberService memberService, EmailService emailService) {
        this.memberService = memberService;
        this.emailService = emailService;
    }

    /**
     * 회원 가입
     */

    @RequestMapping(value = "/intro/signup", method = RequestMethod.POST)
    @PostMapping("/signup")
    public ResponseEntity<Boolean> registerMember(@RequestBody Map<String, String> data) {
        System.out.println("넘어온 데이터 : " + data);
        String nickName = data.get("nickName"); // 전송하는 키 값을 맞춰야함
        String email = data.get("email");
        String password = data.get("password");
        String agreed = data.get("agreed");
        boolean isTrue = memberService.regMember(nickName, email, password, agreed);
        return new ResponseEntity<>(isTrue, HttpStatus.OK);
    }

    /**
     * 로그인(JSON)
     */
    @PostMapping("/intro/login")
    public ResponseEntity<Member> login(@RequestBody MemberDto memberDto) {
        Optional<Member> member = memberService.login(memberDto.getEmail(), memberDto.getPassword());
        System.out.println("1 : " + memberDto);
        if (member.isPresent()) {
            // 로그인 성공
            return new ResponseEntity<>(member.get(), HttpStatus.OK);
        } else {
            System.out.println("2 : " + member.isPresent());
            // 로그인 실패
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    /**
     * 비밀번호 변경
     */
    @PostMapping("/NewPassword")
    @ResponseBody
    public ResponseEntity<Boolean> newPwd(@RequestBody Map<String, String> resetPwdData) {
        String email = resetPwdData.get("email");
        String newPwd = resetPwdData.get("newPwd");
        return ResponseEntity.ok(memberService.changePwd(email, newPwd));
    }

    /**
     * 비밀 번호 찾기
     */
    @PostMapping("/intro/findpwd")
    public ResponseEntity<Boolean> memberFindPwd(@RequestBody Map<String, String> findPwdData) {
        String nickName = findPwdData.get("nickName");
        String email = findPwdData.get("email");
        return ResponseEntity.ok(memberService.findPwd(nickName, email));
    }

    /**
     * 닉네임 중복 확인
     */
    @GetMapping("/intro")
    public ResponseEntity<Boolean> overlapNick(@RequestParam String nickName){
        boolean isOverlap = memberService.nickOverlap(nickName);
        return new ResponseEntity<>(isOverlap, HttpStatus.OK);
    }

    /**
     * 프로필 수정
     */
    @PostMapping("/UserEdit")
    @ResponseBody
    public ResponseEntity<Boolean> newProfile(@RequestBody Map<String, String> newData){
        Long id = Long.valueOf(newData.get("id"));
        String newNick = newData.get("newNick");
        String email = newData.get("email");
        String userPhoneNm = newData.get("newPhone");
        String userImg = newData.get("newImg");
        return ResponseEntity.ok(memberService.newProfile(id, newNick, email, userPhoneNm, userImg));
    }

    /**
     * 회원 탈퇴
     */

    /**
     * 계정 찾기
     */

    /**
     * 이메일 인증번호 전송
     */
    @PostMapping("/intro")
    @ResponseBody
    public Object findEmailOverlap(@RequestBody Map<String, String> findEmailOver) throws Exception {
        String email = findEmailOver.get("emailOverlap");
        boolean isOverlap = emailService.emailOverlap(email);
        if (isOverlap) {
            System.out.println("이메일 등록여부 : " + isOverlap);
            return false; // 이메일이 이미 등록되어 있다면 false를 반환합니다.
        } else {
            String code = emailService.sendSimpleMessage(email);
            System.out.println(email);
            log.info("인증 코드: " + code);
            return code; // 인증 코드를 반환합니다.
        }
    }


}