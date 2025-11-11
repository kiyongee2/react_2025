package com.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByEmail(String email); //이메일 중복 유무
}