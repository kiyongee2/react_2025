package com.springboot.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.springboot.entity.Member;
import com.springboot.service.MemberService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", 
	allowCredentials = "true")
public class MemberController {

    private final MemberService service;

    //회원 등록
    @PostMapping
    public ResponseEntity<Member> create(@RequestBody Member member) {
        Member saved = service.save(member);
        return ResponseEntity.ok(saved);
    }
    
    //회원 목록
    @GetMapping
    public ResponseEntity<List<Member>> getAllMember(){
    	return ResponseEntity.ok(service.findAll());
    }
    
    // 로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Member member, HttpSession session) {
        Member loginMember = service.login(member.getEmail(), member.getPassword());
        session.setAttribute("loginMember", loginMember);
        return ResponseEntity.ok("로그인 성공");
    }
    
    // 로그인 상태 확인
    @GetMapping("/me")
    public ResponseEntity<?> getLoginMember(HttpSession session) {
        Member loginMember = (Member) session.getAttribute("loginMember");
        if (loginMember != null) {
            return ResponseEntity.ok(loginMember);
        }
        return ResponseEntity.status(401).body("로그인 필요");
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("로그아웃 성공");
    }

}









