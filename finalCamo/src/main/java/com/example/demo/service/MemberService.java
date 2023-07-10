package com.example.demo.service;

import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@ToString
@Service
//@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public MemberService (MemberRepository memberRepository, PasswordEncoder passwordEncoder){
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Member> findMember() {
        return memberRepository.findAll();
    }

    /**
     * 회원 가입
     * */
    public boolean regMember(String nickName, String email, String password, String agreed) {
        // 이메일 중복 체크
        Optional<Member> existingMember = memberRepository.findByEmail(email);
        if (existingMember.isPresent()) {
            // 이미 같은 이메일로 가입된 회원이 있는 경우
            return false;
        }
        // 회원 가입 로직을 처리하는 코드 작성
        Member newMember = new Member();
        newMember.setNickName(nickName);
        newMember.setEmail(email);
        newMember.setPassword(password);
        newMember.setReqAgreed(agreed);
        newMember.setJoin_time(LocalDateTime.now());
        newMember.setUserGrade("1");
        // 회원 저장
        memberRepository.save(newMember);

        return true;
    }

    /**
     * 로그인(JSON 반환)
     * */
    public Optional<Member> login(String email, String password) {
        // 이메일과 비밀번호를 기반으로 회원을 검색
        Optional<Member> memberOptional = memberRepository.findByEmailAndPassword(email, password);
        if (memberOptional.isPresent()) {
            // 회원이 존재하면 로그인 성공
            return memberOptional;
        } else {
            // 회원이 존재하지 않으면 로그인 실패
            return Optional.empty();
        }
    }


    /**
     * 비밀번호 변경
     */
    public boolean changePwd(String email, String newPwd) {
        Optional<Member> memberEmail = memberRepository.findByEmail(email);
        if(memberEmail.isEmpty()) return false;
        Member member = memberEmail.get();
        member.setPassword(newPwd);
//        member.setPassword(passwordEncoder.encode(newPwd));
        Member savedMember = memberRepository.save(member);
        log.info(savedMember.toString());
        return true;
    }
    /**
     * 비밀번호 찾기
     */
    public boolean findPwd(String nickName, String email) {
        return !memberRepository.findByNickNameAndEmail(nickName, email).isEmpty();
    }

    /**
     * 닉네임 중복 확인
     */
    public boolean nickOverlap(String nickName) {
        Optional<Member> nickOver = memberRepository.findByNickName(nickName);
        if(nickOver.isPresent()){
            return false;
        }
        return true;
    }

    /**
     * 프로필 수정
     */
    public boolean newProfile(Long id, String newNick, String email, String userPhoneNm, String userImg){
        Optional<Member> memberProfile=memberRepository.findById(id);
        if(memberProfile.isEmpty()) return false;
        Member member = memberProfile.get();
        if (!newNick.isEmpty()) {
            member.setNickName(newNick);
        }
        if (!email.isEmpty()) {
            member.setEmail(email);
        }
        if (!userPhoneNm.isEmpty()) {
            member.setUserPhoneNm(userPhoneNm);
        }
        if (!userImg.isEmpty()) {
            member.setUserImg(userImg);
        }
        Member savedMember = memberRepository.save(member);
        log.info(savedMember.toString());
        return true;
    }

    /**
     * 회원 탈퇴
     */


    /**
     * 계정 찾기
     */

}
