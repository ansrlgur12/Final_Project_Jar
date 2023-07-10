//package com.example.demo.controller;
//
//import com.example.demo.dto.MemberDto;
//import com.example.demo.dto.MemberRequestDto;
//import com.example.demo.dto.MemberResponseDto;
//import com.example.demo.dto.TokenDto;
//import com.example.demo.entity.Member;
//import com.example.demo.service.AuthService;
//import com.example.demo.service.MemberService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import javax.servlet.http.Cookie;
//import javax.servlet.http.HttpServletResponse;
//import java.util.Map;
//import java.util.Optional;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:3000")
//@RequestMapping("/intro")
//@RequiredArgsConstructor
//public class AuthController {
//    private final AuthService authService;
//
//    @PostMapping("/signup")
//    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto requestDto) {
//        return ResponseEntity.ok(authService.signup(requestDto));
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto requestDto) {
//        return ResponseEntity.ok(authService.login(requestDto));
//    }
//
//}
