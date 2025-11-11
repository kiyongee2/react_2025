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

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
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

}









