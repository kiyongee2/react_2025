package com.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.springboot.entity.Member;
import com.springboot.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService {

	private final MemberRepository repository;
	private final PasswordEncoder pwEncoder;

	//회원 가입
	public Member save(Member m) {
		if (m.getEmail() != null && repository.existsByEmail(m.getEmail())) {
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }
		m.setPassword(pwEncoder.encode(m.getPassword())); //비밀번호 암호화
		m.setRole("ROLE_USER");  //권한
        return repository.save(m);
	}

	//회원 목록
	public List<Member> findAll() {
		return repository.findAll();
	}

	//로그인(이메일 + 비밀번호)
	public Member login(String email, String rawPassword) {
		Optional<Member> optional = repository.findByEmail(email);
        if (optional.isPresent()) {
            Member member = optional.get();
            if (pwEncoder.matches(rawPassword, member.getPassword())) {
                return member;
            }
        }
        throw new RuntimeException("이메일 또는 비밀번호가 올바르지 않습니다.");
	}
}
