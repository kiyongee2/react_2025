package com.springboot.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.springboot.entity.Member;
import com.springboot.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService {

	private final MemberRepository repository;

	public Member save(Member m) {
		if (m.getEmail() != null && repository.existsByEmail(m.getEmail())) {
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }
        return repository.save(m);
	}

	public List<Member> findAll() {
		return repository.findAll();
	}
}
